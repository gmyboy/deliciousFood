//通过百度地图选择坐标
(function() {
    function MapSelector(opts) {
        this.options = $.extend(true, {}, MapSelector.defaults, opts);
        this.map = null;
        this.geocoder = null;
        this.marker = null;
    	this.currentLng = 0;
    	this.currentLat = 0;
        
        this.init();
    }

    MapSelector.defaults = {
    	//地图ID
        mapBoxId: "J_MapBox",
        //地图显示的高度
        height: 540,
        //地图默认参数
        mapInitParams: {
            enableMapClick: false,
            minZoom: 5
        },
        //地图默认中心点
        point: null,
        //地图默认的层级
        zoom: 16,
        enableSearchBar: false, //是否启用搜索
        address: '广东省深圳市宝安区' //省市区街道门牌号
    }

    MapSelector.prototype = {
        constructor: MapSelector,
        init: function() {
            this.setWrapHeight();
            this.initMap();
            this.bindMapEvents();
            this.getPoint();
        },
        
        /* 设置地图外壳的高 */
        setWrapHeight: function(){
        	var box = document.getElementById(this.options.mapBoxId);
        	box.style.height = this.options.height + 'px';
        },

        /* 初始化地图 */
        initMap: function() {
            var map = new BMap.Map(this.options.mapBoxId, this.options.mapInitParams);
            var point = new BMap.Point(116.4, 39.9);
            var geocoder = new BMap.Geocoder();

            map.centerAndZoom(point, this.options.zoom);
            map.addControl(new BMap.NavigationControl());
            map.addControl(new BMap.ScaleControl());
            map.addControl(new BMap.OverviewMapControl());
            map.enableScrollWheelZoom();
            map.enableContinuousZoom();
            
            if(this.options.enableSearchBar){
            	map.addControl(new SearchControl({mapSelector: this}));
            }

            this.map = map;
            this.geocoder = geocoder;
        },
        
        /* 重新设置地图，恢复地图初始化时的中心点和级别 */
        reset: function(){
            this.map.reset();
        },

        /* 绑定地图事件 */
        bindMapEvents: function() {
            var _this = this;

            //地图加载完成
            this.map.addEventListener("tilesloaded", function() {
            	if(!_this.inCurrentArea()){
	                var center = _this.map.getCenter(); //获取中心点
	                _this.setMarker(center);
	                _this.getLocation(center);
                }
            });
        },
        
        /* 地址逆解析 */
        getPoint: function(){
        	var _this = this;
        	
        	//如果有经纬度则直接定位
        	if(_this.options.point.lng && _this.options.point.lat){
        		_this.map.setCenter(new BMap.Point(_this.options.point.lng, _this.options.point.lat));
        		return;
        	}

        	//如果没有地址则通过访问IP定位城市
        	if(!_this.options.address){
        		var myCity = new BMap.LocalCity();
        		myCity.get(function(result){
        			_this.map.setCenter(result.name);
        		});       		
        		return;
        	}
        	
        	_this.geocoder.getPoint(_this.options.address, function(point){
        		_this.map.setCenter(point);
	    	});
        },
        
        /* 设置标注点 */
        setMarker: function(point){
        	if(this.marker){
        		this.marker.setPosition(point);
        		return;
        	}
        	
        	var _this = this;
        	var marker = new BMap.Marker(point);
        	marker.enableDragging();
            this.map.addOverlay(marker);
            
            //标注拖拽事件
            marker.addEventListener("dragend", function(e) {
            	var pt = e.point;
            	_this.getLocation(pt);
            });

            this.marker = marker;
        },
        
        /* 根据点的位置获取详细信息 */
        getLocation: function(point){
        	var _this = this;
        	if (point) {
        		this.currentLng = point.lng;
        		this.currentLat = point.lat;
    			this.geocoder.getLocation(point, function(rs){     			
        			if(typeof _this.options.onchange === 'function'){
        				var result = $.extend({lng: point.lng, lat:point.lat}, rs.addressComponents);
        				_this.options.onchange(result);
        			}
        		});
    		}else{
    			this.currentLng = 0;
        		this.currentLat = 0;
    			if(typeof this.options.onchange === 'function'){
    				this.options.onchange(null);
    			}
    		}
        },
        
        /* 返回当前的经纬度 */
        getLngAndLat: function(){
        	return {lng: this.currentLng, lat: this.currentLat};
        },
        
        /* 判断一个坐标是否在当前显示的区域 */
        inCurrentArea: function(){
        	var bs = this.map.getBounds(); //获取可视区域
            var bssw = bs.getSouthWest(); //可视区域左下角
            var bsne = bs.getNorthEast(); //可视区域右上角
            var leftBottomLong = bssw.lng;
            var leftBottomLat = bssw.lat;
            var rightTopLong = bsne.lng;
            var rightTopLat = bsne.lat;
            
            return !!(leftBottomLong <= this.currentLng && rightTopLong >= this.currentLng && leftBottomLat <= this.currentLat && rightTopLat >= this.currentLat);
        }
    }
    
    //定义一个搜索控件类
	function SearchControl(opts){
	  //默认停靠位置和偏移量
	  this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
	  this.defaultOffset = new BMap.Size(10, 10);
	  this.mapSelector = opts.mapSelector;
	}

	//通过JavaScript的prototype属性继承于BMap.Control
	SearchControl.prototype = new BMap.Control();

	//自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
	//在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
	SearchControl.prototype.initialize = function(map){
	  // 创建一个Form表单
	  var form = document.createElement("form");
	  form.id = 'mapSearchForm';
	  form.name = 'mapSearchForm';
	  form.className = 'mapsearchform';
	  
	  //创建输入框
	  var input = document.createElement('input');
	  var keyWords = '输入关键词';
	  input.type = 'text';
	  input.className = 'input-text';
	  input.value = keyWords;
	  input.name = 'mapSearch';
	  input.id = 'mapSearch';
	  
	  //创建按钮
	  var button = document.createElement('button');
	  var search = '搜索';
	  button.type = 'subimt';
	  button.className = 'btn btn-primary';
	  button.innerHTML = '<span><span>'+search+'</span></span>'
	  
	  form.appendChild(input);
	  form.appendChild(button);
	  
	  // 输入框绑定事件
	  input.onfocus = function (e){
		  if(this.value === keyWords){			  
			  this.value = '';
		  }
	  }
	  input.onblur = function(e){
		  if(this.value === ''){			  
			  this.value = keyWords;
		  }
	  }
	  
	  //搜索提交
	  var _this = this;
	  form.onsubmit = function(e){
		  var value = input.value;
		  if(value === ''){
			  return false;
		  }
		  
		  _this.mapSelector.geocoder.getPoint(value, function(point){
			  _this.mapSelector.map.setCenter(point);
		  });
		  
		  return false;
	  }
	  
	  // 添加DOM元素到地图中
	  map.getContainer().appendChild(form);
	  
	  // 将DOM元素返回
	  return form;
	}

    window.MapSelector = MapSelector;
})();