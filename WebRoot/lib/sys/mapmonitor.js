//地图监控构造函数
(function() {
    function MapMonitor(opts) {
        this.options = $.extend(true, {}, MapMonitor.defaults, opts);
        this.map = null;
        this.data = null;
        this.postData = null;
        this.queryParams = opts.queryParams;
        this.markers = {};
        this.points = {};
        this.selectedPointId = '';
        
        this.init();
    }

    MapMonitor.defaults = {
    	//地图ID
        mapBoxId: "J_MapBox",
        //地图显示的高度
        height: 500,
        //地图默认参数
        mapInitParams: {
            enableMapClick: false,
            minZoom: 5
        },
        //开始打点的层级，因为统计与打点的ACTION不一样，通过此参数来决定多少层级来切换ACTION请求
        pointZoom: 17,
        //创建信息窗口的回调函数
        infoWindowCallback: function(data){
            var opts = {
                    width: 200, // 信息窗口宽度    
                    height: 80, // 信息窗口高度    
                    title: '电梯：<abbr class="identity" title="电梯工号 | 具体位置别名">'+(data.factoryNO || '') + ' | ' + (data.aliasOfAddress || '') +'</abbr>' // 信息窗口标题   
                }
            var content = '<a href="'+Common.pieceUrl(URL.MonitorOfDetails + '&elevId='+data.id)+'" target="_blank">'+Lang.enterTheMonitor+'</a>';
            var infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象

            return infoWindow;
        },
        //打点图标
        pointIconPath:{
            normal: loginData.getResourcePath() + '/lib/base/images/' + 'point_remark.png',
            offline: loginData.getResourcePath() + '/lib/base/images/' + 'point_gray.png',
            hover: loginData.getResourcePath() + '/lib/base/images/' + 'point_hover.png'
        },
        //统计图标
        remarkIconPath:{
            normal: '',
            offline: '',
            hover: ''
        },
        //地图默认中心点
        point: {lng:116.4, lat:39.9},
        //地图默认的层级
        zoom: 5,
        //打开实时路况
        openTraffic: false
    }

    MapMonitor.prototype = {
        constructor: MapMonitor,
        init: function() {
            this.setWrapHeight();
            this.initMap();
            this.bindMapEvents();
            this.setPostDatas();
            this.eventsHandler();
        },
        
        /* 设置地图外壳的高 */
        setWrapHeight: function(){
        	var box = document.getElementById(this.options.mapBoxId);
        	box.style.height = this.options.height + 'px';
        },

        /* 初始化地图 */
        initMap: function() {
            var map = new BMap.Map(this.options.mapBoxId, this.options.mapInitParams);
            var point = new BMap.Point(this.options.point.lng, this.options.point.lat);

            map.centerAndZoom(point, this.options.zoom);
            map.addControl(new BMap.NavigationControl());
            map.addControl(new BMap.ScaleControl());
            map.addControl(new BMap.OverviewMapControl());
            map.enableScrollWheelZoom();
            map.enableContinuousZoom();
            
            if(this.options.openTraffic){
            	var trafficControl = new BMapLib.TrafficControl({
                    showPanel: true //是否显示路况提示面板
                });
            	map.addControl(trafficControl);
            }

            this.map = map;
        },
        
        /* 重新设置地图，恢复地图初始化时的中心点和级别 */
        reset: function(){
            this.postData = null;
            this.map.reset();
        },
        
        /* 重设参数配置 */
        setOptions: function(opts){
            this.options = $.extend(this.options, opts);
        },

        /* 设置中心点和级别 */
        centerAndZoom: function(lng, lat, zoom) {
        	if(zoom === this.map.getZoom() && this.inCurrentArea(lng, lat)){
        		this.openInfoWindow();
        		return;
        	}
            this.map.centerAndZoom(new BMap.Point(lng, lat), zoom);
        },

        /* 绑定地图事件 */
        bindMapEvents: function() {
            var _this = this;

            //地图加载完成
            this.map.addEventListener("tilesloaded", function() {
                _this.setPostDatas();
                _this.eventsHandler();
            });
        },

        /* 设置提交数据 */
        setPostDatas: function(data) {
            var zoom = this.map.getZoom(); //获取当前的层级
            var center = this.map.getCenter(); //获取中心点
            var bs = this.map.getBounds(); //获取可视区域
            var bssw = bs.getSouthWest(); //可视区域左下角
            var bsne = bs.getNorthEast(); //可视区域右上角

            this.postData = $.extend(this.queryParams, {
                leftBottomLong: bssw.lng,
                leftBottomLat: bssw.lat,
                rightTopLong: bsne.lng,
                rightTopLat: bsne.lat,
                tier: zoom
            }, data);
            
        },
        
        /* 设置当前打开信息窗口的id */
        setSelectedPointId: function(id){
        	this.selectedPointId = id;
        },
        
        /* 地图拖动缩放事件处理 */
        eventsHandler: function() {
            var _this = this;
            
            postData = _this.postData;
            url = _this.options.url;
            
            _this.map.clearOverlays(); //清除所有覆盖物

            //当前层级大于17的时候打点
            if(postData.tier >= _this.options.pointZoom){
                url = _this.options.pointUrl
            }else if(!_this.options.url){
                return;
            }
            
            $.ajax({
                url: url,
                data: postData,
                type: 'POST',
                success: function(data) {
                    if (!Common.escapeValue(data)) {
                        return;
                    }
                    data = Common.stringToJSON(data);
                    _this.data = data;

                    $.each(
                        data,
                        function(i, v) {
                            if(postData.tier >= _this.options.pointZoom){
                                _this.addPoint(v);
                            }else{
                                _this.addMarker(v);
                            }
                        }
                    );
                },
                error: function() {

                }
            });
        },

        /* 编写自定义函数,创建标注 */
        addMarker: function(data) {
            //如果小区名字
            if(this.postData.buildingName){
                this.centerAndZoom(data.gpsLong, data.gpsLat, this.postData.tier);
            }
            
            var _this = this;
            var point = new BMap.Point(data.gpsLong, data.gpsLat);

            // 添加自定义覆盖物   
            var marker = new SquareOverlay(point, data, 65);

            _this.map.addOverlay(marker);
        },
        
        /* 打点 */
        addPoint: function (data) {
            if(data.gpsLng * 1 == 0 && data.gpsLat*1 == 0){
                Debug.log('设备经纬度为0，打点失败.');
                return;
            }
            var _this = this;
            var point = new BMap.Point(data.gpsLng, data.gpsLat);
            var iconPath = _this.getIconPath(data.deviceStatus);
            var iconHoverPath = _this.getIconPath(-1);
            var myIcon = new BMap.Icon(iconPath, new BMap.Size(34, 49));
            var myIconHover = new BMap.Icon(iconHoverPath, new BMap.Size(34, 49));

            // 创建标注对象并添加到地图
            var marker = new BMap.Marker(point, {
                icon: myIcon
            });
            var infoWindow = _this.getInfoWindow(data);

            _this.map.addOverlay(marker);
            
            _this.setPoints(data.id, point, infoWindow);
            
            // 监听标注事件
            marker.addEventListener("click", function(){ 
                _this.map.openInfoWindow(infoWindow, point); // 打开信息窗口
            });
            
            //监听标注mouser事件
            marker.addEventListener("mouseover", function(){
               this.setIcon(myIconHover);
            });
            marker.addEventListener("mouseout", function(){
               this.setIcon(myIcon);
            });
            
            // 默认打开已选中的信息窗口
            if(_this.selectedPointId === data.id){
            	_this.openInfoWindow();
            }
        },
        
        /* 获取信息窗口 */
        getInfoWindow: function(data){
            if(typeof this.options.infoWindowCallback === 'function'){
                return this.options.infoWindowCallback(data);
            }
        },
        
        /* 以经纬度为KEY的点对象 */
        setPoints: function(id, point, infoWindow){
            if(!this.points[id]){
                this.points[id] = {
                    point: point,
                    infoWindow: infoWindow
                };
            }
        },
        
        /* 根据以唯一id打开信息窗口 */
        openInfoWindow: function(id){
        	id = id || this.selectedPointId;
            if(this.points[id]){
                this.map.openInfoWindow(this.points[id].infoWindow, this.points[id].point);
            }
        },
        
        /* 通过设备状态返回对应的点图标 */
        getIconPath: function(status){
            //正常
            if(status == 1){
                return this.options.pointIconPath.normal;
            }
            //hover
            else if(status == -1){
                return this.options.pointIconPath.hover;
            }
            //离线
            else{
                return this.options.pointIconPath.offline;
            }
        },
        
        /* 判断一个坐标是否在当前显示的区域 */
        inCurrentArea: function(lng, lat){
        	return !!(this.postData.leftBottomLong <= lng && this.postData.rightTopLong >= lng && this.postData.leftBottomLat <= lat && this.postData.rightTopLat >= lat);
        }
    }

    // 定义自定义覆盖物的构造函数  
    function SquareOverlay(point, data, size) {
        this._point = point;
        this._data = data;
        this._size = size;
        this._text = '<span class="name">'+(data.name || '')+'</span><span class="number">'+(data.all || '')+'</span>';
        this._cssName = data.fault ? ' overlay-fault' : ' overlay-normal';
        this._map = null;
        this._infoWindow = null;
    }
    
    // 继承API的BMap.Overlay    
    SquareOverlay.prototype = new BMap.Overlay();
    
    // 实现初始化方法  
    SquareOverlay.prototype.initialize = function(map) {
        var _this = this;
        
        // 保存map对象实例   
        this._map = map;
        
        // 创建div元素，作为自定义覆盖物的容器   
        var div = document.createElement("div");
        div.className = 'overlay' + this._cssName;
        div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
        div.style.position = "absolute";
        
        // 可以根据参数设置元素外观   
        div.style.width = this._size + "px";
        div.style.height = this._size + "px";
        
        div.innerHTML = this._text;
        
        // 事件
        div.onmouseover = function(){
            this.style.zIndex = 9999;
            _this.drawInfoWindow();
        }
        
        div.onmouseout = function(){
            this.style.zIndex = BMap.Overlay.getZIndex(_this._point.lat);
            _this.hideInfoWindow();
        }
        
        // 将div添加到覆盖物容器中   
        map.getPanes().markerPane.appendChild(div);

        // 保存div实例   
        this._div = div;
        
        // 需要将div元素作为方法的返回值，当调用该覆盖物的show、hide方法，或者对覆盖物进行移除时，API都将操作此元素。   
        return div;
    }
        
    // 实现绘制窗口信息方法
    SquareOverlay.prototype.drawInfoWindow = function() {
        if(this._infoWindow){
            this.showInfoWindow();
            return;
        }
        
        var strArray = [];
        var div = document.createElement('div');
        var position = this._map.pointToOverlayPixel(this._point);

        div.className = 'mapwin-box';
        div.style.width = '160px';
        div.style.height = '110px';
        div.style.position = "absolute";
        div.style.left = position.x - 80 + "px";
        div.style.top = position.y - 125 - this._size/2 + "px";
        
        strArray.push('<ul>');
        strArray.push('<li class="normal">正常：<span>'+(this._data.normal)+'</span></li>');
        strArray.push('<li class="check">检修：<span>'+(this._data.check)+'</span></li>');
        strArray.push('<li class="fault">故障：<span>'+(this._data.fault)+'</span></li>');
        strArray.push('<li class="offline">离线：<span>'+(this._data.offline)+'</span></li>');
        strArray.push('</ul>');
        strArray.push('<div class="sbox sbox-bottom"><s class="s"></s><s class="s s2"></s></div>');
        
        div.innerHTML = strArray.join('\n');
        
        this._map.getPanes().markerPane.appendChild(div);
        
        this._infoWindow = div;
    }
        
    // 实现隐藏窗口信息方法
    SquareOverlay.prototype.hideInfoWindow = function() {
        if(this._infoWindow){
            this._infoWindow.style.display = 'none';
        }
    }
    
    // 实现显示窗口信息方法
    SquareOverlay.prototype.showInfoWindow = function() {
        if(this._infoWindow){
            this._infoWindow.style.display = 'block';
        }
    }

    // 实现绘制方法   
    SquareOverlay.prototype.draw = function() {
        // 根据地理坐标转换为像素坐标，并设置给容器    
        var position = this._map.pointToOverlayPixel(this._point);
        this._div.style.left = position.x - this._size / 2 + "px";
        this._div.style.top = position.y - this._size / 2 + "px";
    }
    
    // 实现显示方法    
    SquareOverlay.prototype.show = function() {
        if (this._div) {
            this._div.style.display = "";
        }
    }
    
    // 实现隐藏方法  
    SquareOverlay.prototype.hide = function() {
        if (this._div) {
            this._div.style.display = "none";
        }
    }
    
    //实现清除方法
    SquareOverlay.prototype.remove = function() {
        if (this._div) {
            this._div.style.display = "none";
        }
    }
    
    // 添加自定义方法   
    SquareOverlay.prototype.toggle = function() {
        if (this._div) {
            if (this._div.style.display == "") {
                this.hide();
            } else {
                this.show();
            }
        }
    }

    window.MapMonitor = MapMonitor;
})();