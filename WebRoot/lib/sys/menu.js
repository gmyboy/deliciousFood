/* 菜单 */
(function() {
    //1.左侧菜单 2.页面tabs选项卡 3.APP菜单 4.分类（闪灯） 5.操作按钮 6.在线编辑 7.添加 8.面包屑 9.总闪灯 10.连接 11.实时数据 12.页面模块
    var MENUTYPE_MAIN = 1,
        MENUTYPE_TABS = 2,
        MENUTYPE_APP = 3,
        MENUTYPE_CATEGORIES = 4,
        MENUTYPE_BUTTONS = 5,
        MENUTYPE_ADD = 7,
        MENUTYPE_BREADCRUMBS = 8,
        MENUTYPE_FLASHES = 9,
        MENUTYPE_LINK = 10,
        MENUTYPE_REALTIMEDATA = 11,
        MENUTYPE_PAGE_MODEL = 12,
        
        MENUNO_UPKEEP = 1000,//维保管理
        MENUNO_BASEINFO = 2000,//基础信息管理
        MENUNO_APP = 3000, //APP
        MENUNO_AUTHORIZED = 4000,//权限管理
        MENUNO_MONITOR = 5000,//监控管理
        MENUNO_KNOWLEDGE  = 6000,//事件管理
        MENUNO_HOTLINE = 7000,//400电话管理
        MENUNO_FLASHES = 8000, //状态提醒
        MENUNO_STATISTICAL = 9000,//统计分析
    
        MENUNO_FLASHES_STATUS = 8500; //机器设备状态
    
    var params = Common.getSearch(),
    	menuNO = params ? Common.stringToNumber(params.menuNO) : 0,
        parentMenuNO = params ? Common.stringToNumber(params.parentMenuNO) : 0;
    
    function Menu(opts) {
        this.options = $.extend(true, Menu.defaults, opts || {});
        
        this.menuTree = loginData.getMenuTree();
        this.menuList = loginData.getMenuList();
        
        this.menuType = 0; //装载当前menuNO的类型
        this.menuChirden = null; //装载当前menuNO以及下面的所有子级菜单
        this.menuParents = null; //装载当前menuNO以及上面的所有父级菜单
        this.menuParent = null; //装载当前menuNO的直接父级菜单
        this.menuParentParent = null; //装载当前menuNO的父级的父级菜单
        this.linksUrl = [];
        this.realTimeDataItems = [];
        
        this.winIds = {}; //{'10000': window.open('', '_blank')};
        
        /* 装载带有html字符串 */
        this.mainMenuStr = '';
        this.tabsMenuStr = '';
        this.flashesMenuStr = '';
        this.flashesStatusMenuStr = '';
        this.buttonsMenuStr = '';
        this.addMenuStr = '';
        this.categoriesStr = '';
        this.breadcrumbsStr = '';
        
        this.init();
    }
    
    //默认参数
    Menu.defaults = {
		menuNO: menuNO,
        parentMenuNO: parentMenuNO,
        showMenuType: [],
        iconBaseClass: 'icon',
        mainWrapperId: 'J_NavBox',
        breadcrumbsWrapperId: 'J_Shell',
        tabsWrapperId: 'J_Shell',
        addButtonsWrapperId: 'J_ToolBar',
        categoriesWrapperId: 'J_Categories',
        linksWrapperId: 'J_Shell',
        flashesWrapperId: 'J_FlashesBox',
        buttonsWrapperId: 'J_ToolBar'
    };

    Menu.prototype = {
        constructor: Menu,
        init: function() {
            this.menuParents = this.getParentsByMenuNO();
            
            /* 创建菜单 */
            this.buildMenuStr();
            
            if(this.options.showMenuType.length === 0){
                Debug.log('实例化菜单时没有showMenuType参数！');
                return;
            }

            var _this = this;
            
            /* 按需将菜单追加到文档中 */
            $.each(
                this.options.showMenuType,
                function(i, v){
                    if(v === MENUTYPE_MAIN){
                        _this.buildMainMenu();
                        return true;
                    }
                    if(v === MENUTYPE_TABS){
                        _this.buildTabs();
                        return true;
                    }
                    if(v === MENUTYPE_CATEGORIES){
                        _this.buildCategories();
                        return true;
                    }
                    if(v === MENUTYPE_BUTTONS){
                        _this.buildButtons();
                        return true;
                    }
                    if(v === MENUTYPE_ADD){
                        _this.buildAddButton();
                        return true;
                    }
                    if(v === MENUTYPE_BREADCRUMBS){
                        _this.buildBreadcrumbs();
                        return true;
                    }
                    if(v === MENUTYPE_FLASHES){
                        _this.buildFlashes();
                        return true;
                    }
                }
            );

        },
        /* 主菜单 */
        buildMainMenu: function() {
        	var _this = this;
            if(!this.mainMenuStr){
                return;
            }
            $(this.mainMenuStr).appendTo($('#' + this.options.mainWrapperId));
            
            //绑定事件
            $("#J_NavList a").click(function (e) {
                var isTopLevel = $(this).hasClass('parent-link'),
                    $subList = $(this).next('ul'),
                    $icon = $(this).find('.J_Icon'),
                    $items = $(this).parents('ul').children(),
                    $item = $(this).parent('li'),
                    $list = $("#J_NavList .parent-link").next('ul');

                if($(this).attr('data-class-alias') === "openLink"){
                	var url = $(this).attr('href');
                	var openName = $(this).parent().attr('data-menu-number')+'';
                	if(_this.winIds[openName] && _this.winIds[openName].open && !_this.winIds[openName].closed){
                		_this.winIds[openName].close();
                	}
                	_this.winIds[openName] = window.open('', openName);
                	_this.winIds[openName].location = url;
                	
                	$(this).data('winid', _this.winIds[openName]);
                	
                	e.preventDefault();
                }
                
                if ($subList.length == 0) {
                    return true;
                }

                if (!isTopLevel) {
                    return true;
                }
                

                e.preventDefault();

                if ($item.hasClass('selected')) {
                    if($.browser.msie && $.browser.version <= 8){
                    	$subList.hide();
                    	$item.removeClass('selected');
                		$(this).addClass('hidden');
                		$icon.removeClass('icon-small-up').addClass('icon-small-down');
                    }else{
                    	$subList.slideUp('fast', function () {
                    		$item.removeClass('selected');
                    		$(this).addClass('hidden');
                    		$icon.removeClass('icon-small-up').addClass('icon-small-down');
                    	});
                    }
                    return true;
                }

                $items.removeClass('selected');
                
                if($.browser.msie && $.browser.version <= 8){
                	$list.hide();
                	$list.addClass('hidden');
            		if(layoutSize){
            			layoutSize.init();
            		}
                }else{
                	$list.slideUp('fast', function () {
                		$list.addClass('hidden');
                		if(layoutSize){
                			layoutSize.init();
                		}
                	})
                }
                $items.find('.J_Icon').removeClass('icon-small-up').addClass('icon-small-down');
                $item.addClass('selected');
                
                if($.browser.msie && $.browser.version <= 8){
                	$subList.show();
                	$(this).removeClass('hidden');
            		$icon.removeClass('icon-small-down').addClass('icon-small-up');
            		if(layoutSize){
            			layoutSize.init();
            		}
                }else{
                	$subList.slideDown('fast', function () {
                		$(this).removeClass('hidden');
                		$icon.removeClass('icon-small-down').addClass('icon-small-up');
                		if(layoutSize){
                			layoutSize.init();
                		}
                	});
                }
            });
            
            //根据当前menuNO打开对应的菜单
            var parents = this.menuParents;              
            var _this = this;
            var _currentElement = null;
            if(parents && parents.length > 0){
                $.each(
                    parents,
                    function(i, v){                          
                        if(v.menuType === MENUTYPE_MAIN){                    
                            _currentElement = $('#' + _this.options.mainWrapperId).find('[data-menu-number="'+v.menuNO+'"]');
                            _currentElement.addClass('selected');
                            _currentElement.find('.parent-link .J_Icon').removeClass('icon-small-down').addClass('icon-small-up');
                            _currentElement.find('.nav-list').show();
                        }
                    }
                );   
            }
        },

        /* tab菜单 */
        buildTabs: function() {
            if(!this.tabsMenuStr){
                return;
            }
            var $html = $('<div class="fl tab"><ul id="J_TabList" class="tab-list">' + this.tabsMenuStr + '</ul></div>');
            $html.appendTo($('#' + this.options.tabsWrapperId));
        },
        
        /* 闪灯菜单 */
        buildFlashes: function() {
            if(this.flashesMenuStr){
                var $html = $('<ul class="list-inline list-flashes list-flashes-upkeep-status">' + this.flashesMenuStr + '</ul>');
                $html.appendTo($('#' + this.options.flashesWrapperId));
                
                if(this.flashesStatusMenuStr){
                    var $html1 = $('<ul class="list-unstyled list-flashes-machine-menu">' + this.flashesStatusMenuStr + '</ul>');
                    $html1.appendTo($('#' + this.options.flashesWrapperId));
                    
                    $html1.hover(function() {
                        $(this).addClass('list-menu-hover');
                        $(this).parent('div').addClass('flash-box-hover');
                    }, function() {
                    	$(this).removeClass('list-menu-hover');
                    	$(this).parent('div').removeClass('flash-box-hover');
                    });
                }
            }else{
            	if(this.flashesStatusMenuStr){
	                var $html1 = $('<ul class="list-inline list-flashes list-flashes-machine-status">' + this.flashesStatusMenuStr + '</ul>');
	                $html1.appendTo($('#' + this.options.flashesWrapperId));
	            }
            }
            
            
        },
        
        /* 设置总闪灯字符串 */
        setFlashesMenuStr: function(data){
            if(!data || !data.children){
                return;
            }
            
            //状态提醒
            var statusAlert = {
                '8510': {
                    key: 'elevAllCounts',
                    menuName: '全部',
                    cssName: 'tag-primary',
                    params: ''
                },
                '8520': {
                    key: 'elevOfflineCounts',
                    menuNO: '离线',
                    cssName: 'tag-default',
                    params: '&deviceStatus=2'
                },
                '8530': {
                    key: 'elevFaultCounts',
                    menuNO: '故障',
                    cssName: 'tag-danger',
                    params: '&elevStatus=6'
                },
                '8540': {
                    key: 'elevMaintainCounts',
                    menuNO: '检修',
                    cssName: 'tag-warning',
                    params: '&elevStatus=7'
                },
                '8550': {
                    key: 'elevNormalCounts',
                    menuNO: '正常',
                    cssName: 'tag-success',
                    params: '&elevStatus=00'
                },
                '8560': {
                    key: 'elevTrapsPeopleCounts',
                    menuNO: '困人',
                    cssName: 'tag-danger'
                },
                '8570': {
                    key: 'elevCommunicationExceptionCounts',
                    menuNO: '串口异常',
                    cssName: 'tag-danger',
                    params: '&elevStatus=08'
                },
                '8100':{
                    key: 'contractTips',
                    menuNO: '合同',
                    cssName: 'tag-danger',
                    params: ''
                },
                '8200':{
                    key: 'trapsTips',
                    menuNO: '困人急修',
                    cssName: 'tag-danger',
                    params: ''
                },
                '8300':{
                    key: 'nonTrapsTips',
                    menuNO: '非困人急修',
                    cssName: 'tag-warning',
                    params: ''
                },
                '8400':{
                    key: 'inspectionTips',
                    menuNO: '年检',
                    cssName: 'tag-blue-gray',
                    params: ''
                }
            };

            var _this = this,
                _url = '',
                _menuNO = 0,
                _menuName = '',
                _key = '',
                _cssName = 'tag-default',
                _num = 0;
            
            var latestStateFlashes = Common.stringToJSON(loginData.getItem('latestStateFlashes'));
            var latestUpkeepFlashes = Common.stringToJSON(loginData.getItem('latestUpkeepFlashes'));
    
            $.each(
                data.children,
                function(i, v){
                    //机器状态
                    if(v.menuNO == MENUNO_FLASHES_STATUS){
                        if(!v.children){
                            return true;
                        }
                        $.each(
                            v.children,
                            function(idx, val){
                                _menuNO = val.menuNO;
                                _menuName = val.menuName;
                                _url = Common.pieceUrl('/' + val.projectName + val.url);
                                _key = statusAlert[_menuNO].key;
                                _cssName = statusAlert[_menuNO].cssName;
                                _num = latestStateFlashes[_key] || 0;
                                _this.flashesStatusMenuStr += '<li class="flashes-item" data-menu-number="'+_menuNO+'" data-name="'+_key+'"><a href="'+_url+'">'+_menuName+'<sup class="tag '+_cssName+'">'+_num+'</sup></a></li>';
                            }
                        )
                        return true;
                    }

                    _menuNO = v.menuNO;
                    _menuName = v.menuName;
                    _url = Common.pieceUrl('/' + v.projectName + v.url);
                    _key = statusAlert[_menuNO].key;
                    _cssName = statusAlert[_menuNO].cssName;
                    _num = latestUpkeepFlashes[_key] || 0;

                    //其它
                    _this.flashesMenuStr += '<li class="flashes-item" data-menu-number="'+_menuNO+'" data-name="'+_key+'"><a href="'+_url+'">'+_menuName+'<sup class="tag '+_cssName+'">'+_num+'</sup></a></li>';
                }
            )
        },

        /* 编辑、删除等按钮 */
        buildButtons: function() {
            if(!this.buttonsMenuStr && !this.addMenuStr){
                $('#' + this.options.buttonsWrapperId).remove();
                return;
            }
            if(!this.buttonsMenuStr){
                return;
            }
            var $html = $('<div class="actions fl"><i class="icon icon-point-up"></i>' + this.buttonsMenuStr + '</div>');
            $html.appendTo($('#' + this.options.buttonsWrapperId));
        },

        /* 新增按钮 */
        buildAddButton: function() {
            if(!this.addMenuStr){
                return;
            }
            var $html = $('<div class="fr actions">' + this.addMenuStr + '</div>');
            $html.prependTo($('#' + this.options.addButtonsWrapperId));
        },

        /* 分类菜单包括数字标识 */
        buildCategories : function(){
        	if(!this.categoriesStr){
        		$('#' + this.options.categoriesWrapperId).remove();
                return;
            }
            var $html = $('<ul class="category-list">' + this.categoriesStr + '</ul>');
            $html.prependTo($('#' + this.options.categoriesWrapperId));
        },
        
        /* 面包屑导航 */
        buildBreadcrumbs: function() {           
            var split = '<span class="split">»</span>',
                htmlArray = [],
                parentsArray = this.menuParents,
                url = '';
            
            htmlArray.push('<div class="breadcrumbs">');
            htmlArray.push('    <h3 class="breadcrumbs-title">' + Lang.position + Lang.commonColon + '</h3>');
            htmlArray.push('    <ul class="breadcrumbs-list">');

            $.each(
                parentsArray,
                function(i, v) {
                    url = v.url ? pieceUrl(v) : 'javascript:;';
                    htmlArray.push('<li class="breadcrumbs-item">');

                    if (i < parentsArray.length - 1) {
                        if (v.url) {
                            htmlArray.push('<a class="link" href="' + url + '">' + v.menuName + '</a>');
                        } else {
                            htmlArray.push(v.menuName);
                        }
                        htmlArray.push(split);
                    } else {
                        htmlArray.push('<strong>' + v.menuName + '</strong>');
                    }

                    htmlArray.push('</li>');
                }
            );

            htmlArray.push('    </ul>');
            htmlArray.push('</div>');
            $(htmlArray.join('\n')).appendTo($('#' + this.options.breadcrumbsWrapperId));
        },
            
        /* 根据当前menuNO获取它以及它所有上级公司的数组对象
           [{'menuNO': 3120, 'parentMenuNO': 3100, 'menuName': '电梯信息管理', 'url': '/baseinfo/page/elev_info.jsp', 'projectName': 'upkeep', 'menuType': 4}]
        */
        getParentsByMenuNO: function(){
            if(this.menuParents){
                return this.menuParents;
            }
            
            var _this = this;
            var parentsArray = [];
            var fun = function(menuNO){
                $.each(
                    _this.menuList,
                    function(i, v){
                        if(v.menuNO === menuNO){
                            parentsArray.unshift(v);
                            fun(v.parentMenuNO);
                            return false;
                        }
                    }
                );
            }
            fun(this.options.menuNO);
            
            return parentsArray;
        },
        
        /* 遍例menuTree创建各个区域菜单字符串 */
        buildMenuStr: function(){
            var _this = this;
            var level = 1;
            var fun = function(data, n, menuNO, hasMenuType1, parent){
                var _menuType = 0,
                    _menuNO = 0,
                    _classAlias = '',
                    _url = '',
                    _menuName = '',
                    _children = [],
                    _selected = '',
                    _aClass = '',
                    _leftIcon = '',
                    _rightIcon = '',
                    _navListID = (n == 1) ? ' id="J_NavList"' : '',
                    _target = '_self',
                    _hidden = (n == 2) ? ' hidden' : '';
                    
               if(hasMenuType1){
                    _this.mainMenuStr += '<ul class="nav-list' + _hidden + '"' + _navListID + '>';
               }
                
                $.each(
                    data,
                    function (index, value) {
                        //屏蔽手机端权限
                        if (value.menuType === MENUTYPE_APP) {
                            return true;
                        }
                        
                        _menuType = value.menuType;
                        _menuNO = value.menuNO;
                        _classAlias = value.classAlias;
                        _menuName = value.menuName;
                        _children = value.children;
                        _target = _classAlias === 'blank' ? '_blank' : '_self';
                        _url = value.url ? pieceUrl(value) : 'javascript:;';
                        
                        _selected = (value.menuNO === MENUNO_UPKEEP) ? ' selected' : '';
                        _aClass = _this.__getLinkStyle(n);
                        _leftIcon = _this.__getLeftIcon(n, _menuNO);
                        _rightIcon = _this.__getRightIcon(n, _menuNO);
                        
                        //状态提醒
                        if (_menuType === MENUTYPE_FLASHES) {
                            _this.setFlashesMenuStr(value);
                            return true;
                        }
             
                        //主菜单
                        if(_menuType === MENUTYPE_MAIN){
                            _this.mainMenuStr += '<li class="nav-item" data-menu-number="' + _menuNO + '">';
                            _this.mainMenuStr += '<a href="' + _url + '" class="' + _aClass + '" target="' + _target + '" data-class-alias="'+_classAlias+'">' + _leftIcon + _rightIcon + _menuName + '</a>';                   
                        }
                        
                        //如果有选项卡即menuType == 2的情况，保存当前menuNO父级的父级
                        if((_menuNO === _this.options.parentMenuNO || _menuNO === _this.options.menuNO) && _menuType === MENUTYPE_TABS){
                            _this.menuParentParent = parent;
                        }
                        
                        //保存当前menuNO的菜单信息并构造其它菜单
                        if(_menuNO === _this.options.menuNO){
                            _this.menuChirden = value;
                            _this.menuParent = parent;
                            _this.menuType = _menuType;
                            _this.buildOtherMenu();
                        }
                        
                        if (_children.length > 0) {
                            fun(_children, n+1, _menuNO, isExistByMenuType(_children, MENUTYPE_MAIN), value);
                        }
                        
                        if(_menuType === MENUTYPE_MAIN){
                            _this.mainMenuStr += '</li>';
                        }
                    }
                );
                
                if(hasMenuType1){
                    _this.mainMenuStr += '</ul>';
                }
                
            }
            
            fun(this.menuTree, level, 0, true, null);
        },
        
        /* 根据menuNO对象创建除主菜单以外的其它菜单 */
        buildOtherMenu: function(){
            var _this = this;
            var data = (_this.menuType === MENUTYPE_CATEGORIES) ? _this.menuParent.children : _this.menuChirden.children;
            var fun = function(data){
                var _menuType = 0,
                    _menuNO = 0,
                    _classAlias = '',
                    _url = '',
                    _menuName = '',
                    _children = null,
                    _selected = '';

                $.each(
                    data,
                    function(index, value){
                        _menuType = value.menuType;
                        _menuNO = value.menuNO;
                        _parentMenuNO = value.parentMenuNO;
                        _classAlias = value.classAlias;
                        _menuName = value.menuName;
                        _children = value.children;
                        _url = value.url ? pieceUrl(value) : 'javascript:;';
                        _selected = (_menuNO === _this.options.menuNO) ? ' selected' : '';
                        
                        //分类（闪灯）
                        if(_menuType === MENUTYPE_CATEGORIES){
                            _this.categoriesStr += '<li class="category-item" data-menu-number="' + _menuNO + '"><a class="'+_selected+'" href="' + _url + '" target="_self">' + _menuName + '</a></li>';
                            if (_children.length > 0) {
                                fun(_children);
                            }
                            
                            return;
                        }
                        
                        //屏蔽非直接子级的菜单
                        if(_parentMenuNO !== _this.options.menuNO){
                            return;
                        }
                        
                        //操作按钮
                        if(_menuType === MENUTYPE_BUTTONS){
                            _this.buttonsMenuStr += '<button type="button" class="btn btn-middle btn-default" data-class-alias="'+_classAlias+'" data-menu-number="' + _menuNO + '" data-href="' + _url + '"><span><span>' + _menuName + '</span></span></button>';
                        }

                        //添加按钮
                        if(_menuType === MENUTYPE_ADD){
                            _this.addMenuStr += '<a class="btn btn-middle btn-success" href="' + _url + '" data-class-alias="'+_classAlias+'" data-menu-number="' + _menuNO + '"><span><span>' + _menuName + '</span></span></a>';
                        }
                        
                        //添加连接隐藏域
                        if(_menuType === MENUTYPE_LINK){
                            _this.linksUrl.push({'url': _url, 'classAlias': _classAlias, 'menuNO':_menuNO, 'menuName':_menuName, 'children': _children});
                        }
                        
                        //添加实时数据项
                        if(_menuType === MENUTYPE_REALTIMEDATA){
                            _this.realTimeDataItems.push({'url': _url, 'classAlias': _classAlias, 'menuNO':_menuNO, 'menuName':_menuName});
                        }
                    }
                );
            }
            fun(data);
                                   
            //创建TAB菜单
            var _menuNO = 0;
            var _url = '';
            var _classAlias = '';
            var _menuName = '';
            var _selected = ' selected';
            var _selectedIcon = '<i class="icon-text icon-text-arrow">▼</i>';

            if(this.menuParentParent){
                $.each(
                    this.menuParentParent.children,
                    function(i, v){
                        _menuNO = v.menuNO;
                        _url = v.url ? pieceUrl(v) : 'javascript:;';
                        _classAlias = v.classAlias;
                        _menuName = v.menuName;
                        _selected = (_menuNO === _this.options.parentMenuNO) || (_menuNO === _this.options.menuNO) ? ' selected' : '';
                        _selectedIcon = (_menuNO === _this.options.parentMenuNO) || (_menuNO === _this.options.menuNO) ? '<i class="icon-text icon-text-arrow">▼</i>' : '';
                        
                        _this.tabsMenuStr += '<li class="tab-item'+_selected+'" data-menu-number="' + _menuNO + '"><a class="tab-link" href="' + _url + '" data-class-alias="'+_classAlias+'">' + _menuName + _selectedIcon + '</a></li>';
                    }
                )
            }else{
                _data = (this.menuType === MENUTYPE_CATEGORIES) ? this.menuParent : this.menuChirden;
                _menuNO = _data.menuNO;
                _url = _data.url ? pieceUrl(_data) : 'javascript:;';
                _classAlias = _data.classAlias;
                _menuName = _data.menuName;
                
               this.tabsMenuStr += '<li class="tab-item'+_selected+'" data-menu-number="' + _menuNO + '"><a class="tab-link" href="' + _url + '" data-class-alias="'+_classAlias+'">' + _menuName + _selectedIcon + '</a></li>';
            }
        },
        
        //获取A链接的样式
        __getLinkStyle: function(level) {
            if(level === 1){
                return 'parent-link';
            }
            if(level === 2){
                return 'sub-link';
            }
            
            return 'link';
        },
        
        //获取主菜单中左边图标
        __getLeftIcon: function(level, menuNO) {
            var styleObj = {
//                    1000: 'icon-eye-open', //用户管理
//                    2000: 'icon-th-large', //基础信息管理
//                    2400: 'icon-briefcase', //单位管理
//                    3000: 'icon-signal', //手机APP
//                    4000: 'icon-list-alt', //权限管理
//                    5000: 'icon-facetime-video', //监控管理
//                    6000: 'icon-leaf', //事件管理
//                    7000: 'icon-cog', //系统管理
//                    8000: 'icon-cog', //闪灯
//                    9000: 'icon-tasks', //统计数据
//                    9500: 'icon-heart'//400
                }
            
            if(level === 1){
                var style = styleObj[menuNO] ? styleObj[menuNO] : 'icon-folder-close';
                return '<i class="' + this.options.iconBaseClass + ' '+ style +'"></i>';
            }
            
            if(level === 2){
                var style = 'icon-arrow-dubble-right';
                return '<i class="' + this.options.iconBaseClass + ' '+ style +'"></i>';
            }
            
            return '';
        },

        //获取主菜单中右边图标
        __getRightIcon: function(level, menuNO) {
            var style = 'icon-small-down';//menuNO == 1000 ? 'icon-small-up' : 'icon-small-down';
            return (level == 1) ? '<i class="' + this.options.iconBaseClass + ' '+ style +' J_Icon"></i>' : '';
        },
        
        //根据menuNO判断是否有存在于menulist
        inMenuListByMenuNO: function(menuNO){
            if(!this.menuList){
                return;
            }
            var flag = false;
            $.each(
                this.menuList,
                function(i, v){
                    if(v.menuNO === menuNO * 1){
                        flag = true;
                        return false;
                    }
                }
            );
            return flag;
        },
        
        //获取树菜单 
        getMenuTree: function(){
        	return this.menuTree;
        },
        
        //获取列表菜单
        getMenuList: function(){
        	return this.menuList;
        },
        
        //获取当前激活的所有上级对象
        getMenuParents: function(){
            return this.menuParents;
        },
        
        //获取当前激活的直接父级对象
        getMenuParent: function(){
            return this.menuParent;
        },
        
        //获取当前激活的所有下级对象
        getMenuChirden: function(){
            return this.menuChirden;
        },
        
        //创建隐藏连接文本域
        getLinkUrl: function(){
            return this.linksUrl;
        },
        
        //获取实时数据项集合
        getRealTimeDataItems: function(){
            return this.realTimeDataItems;
        },
        
        //获取主菜单HTML字符串
        getMainMenuStr: function(){
        	return this.mainMenuStr;
        },
        
        //获取选项卡HTML字符串
        getTabsMenuStr: function(){
        	return this.tabsMenuStr;
        },

        //获取分类(三级菜单/闪灯)HTML字符串
        getCategoriesStr: function(){
        	return this.categoriesStr;
        },
        
        //获取闪灯(维保)HTML字符串
        getFlashesMenuStr: function(){
        	return this.flashesMenuStr;
        },
        
        //获取闪灯(状态)HTML字符串
        getFlashesStatusMenuStr: function(){
        	return this.flashesStatusMenuStr;
        },
        
        //获取添加按钮HTML字符串
        getAddMenuStr: function(){
        	return this.addMenuStr;
        },
        
        //获取操作按钮HTML字符串
        getButtonsMenuStr: function(){
        	return this.buttonsMenuStr;
        },
        
        //获取面包屑HTML字符串
        getBreadcrumbsStr: function(){
        	return this.breadcrumbsStr;
        },
        
        //获取window.open()对象
        getWinIds: function(){
        	return this.winIds;
        }
    }
    
    //判断下面是否有menuType=2 即选项卡的菜单
    function hasTabMenu(data){
        var has = false;
        $.each(
            data,
            function (idx, val) {
                if (val.menuType === MENUTYPE_TABS){
                    has = true;
                    return false;
                }
            }
        );
        return has;
    }
    
    //menuType=4 分类(闪灯)的菜单
    function hasCategory(data){
        var has = false;
        $.each(
            data,
            function (idx, val) {
                if (val.menuType === MENUTYPE_CATEGORIES){
                    has = true;
                    return false;
                }
            }
        );
        return has;
    }
    
    //根据mentType获取第一个Url
    function getFirstUrlByMenuType(menuType, data){
    	var url = '';
    	$.each(
            data,
            function (idx, val) {
                if (val.menuType === menuType){
                    url = pieceUrl(val);
                    return false;
                }
            }
        );
    	return url;
    }
            
    //拼接URL
    function pieceUrl(data){
        if(!data){
            return;
        }
        
        var chirden = data.children,
            projectName = data.projectName,
            url = projectName ? '/' + projectName + data.url : data.url,
            menuNO = data.menuNO,
            menuType = data.menuType,
            parentMenuNO = data.parentMenuNO,
            hasParam = url.indexOf('?') != -1;

        //如果子级有menuType==4菜单项时
        if(chirden && chirden.length > 0 && isExistByMenuType(chirden, MENUTYPE_CATEGORIES)){
            return arguments.callee(chirden[0]);
        }
        
        //如果子级有menuType==2菜单项时
        if(chirden && chirden.length > 0 && isExistByMenuType(chirden, MENUTYPE_TABS)){
            return arguments.callee(chirden[0]);
        }
        
        //其它情况
        url += (hasParam ? '&' : '?') + 'menuNO=' + menuNO;
        url += (menuType == MENUTYPE_CATEGORIES) ? '&parentMenuNO=' + parentMenuNO : '';
//        url += '&sid=' + loginData.getSID();

        return url;
    }
    
    //判断下面是否有某个menuType存在
    function isExistByMenuType(data, menuType){
        var flag = false; 
        if(data.length === 0){
            return flag;
        }
        $.each(
            data,
            function (idx, val) {
                if (val.menuType != menuType){
                    return true;
                }
                flag = true;
                return false;
            }
        );
        return flag;
    }

    window.Menu = Menu;
})();