(function(){
    /* 登录数据构造函数 */
    function LoginData(){
    	this.init();
    }
    
    //默认参数
    LoginData.defaults = {
    	storageKeys: ['customerInfo', 'company', 'gdhsInfo', 'menuTree', 'menuList', 'user', 'sid', 'resourcePath', 'customResourcePath', 'localImagePath', 'localAppPath', 'loginUrl'],
		storageType: 2, //本地存储类型，1为sessionStorage,2为localStorage
		logoImage: '/lib/base/images/logo.png', //默认的LOGO地址
		loginBackImage: '/lib/base/images/login_bg.png', //默认登录页的背景图片地址
		loginBackColor: '#5d84a5', //默认登录页的背景颜色值
		headImg: '/lib/base/images/head.gif' //左边菜单上面那个头像图片地址
    };
    
    LoginData.prototype = {
        constructor: LoginData,
        
        /* 初始化数据 */
        init: function(){
        	var keys = LoginData.defaults.storageKeys;
        	var value = '';
        	for(var i = keys.length; i > 0; i--){
        		this[keys[i-1]] = this.getItem(keys[i-1]);
        	}
        },
        
        /* 缓存登录信息至本地存储 */
        setCacheData: function(data){
            if(!data){
                return;
            }
            
            data = stringToJSON(data);

            this.setItem('company', data.company);
            this.setItem('gdhsInfo', data.gdhsInfo);
            this.setItem('menuList', data.menuList);
            this.setItem('menuTree', data.menuTree);
            this.setItem('user', data.user);
            this.setItem('sid', data.sid);
        },
        
        /* 设置项 */
        setItem: function(key, value){
        	setStorage(key, value, LoginData.defaults.storageType);
        	this[key] = value;
        },
        
        /* 获取项 */
        getItem: function(key){
        	return getStorage(key, LoginData.defaults.storageType) || '';
        },
        
        /* 删除项 */
        removeItem: function(key){
        	removeStorage(key, LoginData.defaults.storageType);
        	if(this[key]){
        		this[key] = null;
        	}
        },
        
        /* 设置customerInfo */
        setCustomerInfo: function(data){
        	if(!data){
        		return;
        	}
        	
        	data = stringToJSON(data);
        	this.setItem('customerInfo', data);
        },
        
        /* 返回customerInfo */
        getCustomerInfo: function(){
        	return this.customerInfo;
        },
        
        /* 清除登录缓存数据 */
        removeCacheData: function(key){
            this.removeItem(key);
        },

        /* 设置资源文件地址 */
        setResourcePath: function(path){
        	if(!path){
        		return;
        	}
        	
        	this.setItem('resourcePath', path);
        },

        /* 获取树型菜单列表 */
        getMenuTree:  function () {
            return this.menuTree;
        },

        /* 获取菜单列表 */
        getMenuList:  function () {
            return this.menuList;
        },

        /* 获取sid */
        getSID:  function () {
            return this.sid;
        },

        /* 获取公司信息 */
        getCompany:  function () {
            return this.company;
        },
        
        /* 获取当前登录公司名 */
        getLoginCompanyName:  function () {
//            return this.company ? (this.company.companyName || '') : '';
        	return this.user ? (this.user.companyName || '') : '';
        },
        
        /* 获取当前登录渠道号 */
        getLoginChannelNo:  function () {
//            return this.company ? (this.company.companyName || '') : '';
        	return this.user ? (this.user.channelNo || '') : '';
        },
        
        /* 获取公司名称 */
        getCompanyName: function(){
            return this.customerInfo ? (this.customerInfo.companyName || '') : '';
        },
        
        /* 获取公司地址 */
        getCompanyAddress: function(){
            return this.customerInfo ? (this.customerInfo.address || '') : '';
        },
        
        /* 获取公司电话 */
        getCompanyTel: function(){
            return this.customerInfo ? (this.customerInfo.phone || '') : '';
        },
        
        /* 获取公司邮箱 */
        getCompanyEmail: function(){
            return this.customerInfo ? (this.customerInfo.email || '') : '';
        },
        
        /* 获取公司传真 */
        getCompanyFax: function(){
            return this.customerInfo ? (this.customerInfo.fax || '') : '';
        },
        
        /* 获取网站名称 */
        getWebsiteName: function(){
            return this.customerInfo ? (this.customerInfo.customerSiteName || '') : '';  
        },
        
        /* 获取网站副标题 */
        getWebsiteSubName: function(){
            return this.customerInfo ? (this.customerInfo.customerSubTitle || '') : '';  
        },
        
        /* 获取当前域名 */
        getDomain: function(){
            return this.customerInfo ? ('http://' + this.customerInfo.subDomain || '') : '';
        },
        
        getAppUrl:function(){
        	return this.customerInfo ? (this.customerInfo.appUrl || '') : '';
        },
        getQrcodeUrl:function(){
        	return this.customerInfo ? (this.customerInfo.qrcodeUrl || '') : '';
        },
        
        /* 获取自定义资源文件路径 */
        getCustomResourcePath: function(){
        	return this.customResourcePath;
        },
        
        /* 获取自定义资源文件路径 */
        setCustomResourcePath: function(path){
        	if(!path){
        		return;
        	}
        	
        	this.setItem('customResourcePath', path);
        },
        
        /* 设置本地图片路径 */
        setLocalImagePath: function(path){
        	if(!path){
        		return;
        	}
        	
        	this.setItem('localImagePath', path);
        },
        
        /* 设置本地APP路径  */
        setLocalAppPath: function(path){
        	if(!path){
        		return;
        	}
        	
        	this.setItem('localAppPath', path);
        },
        
        /* 获取本地图片路径 */
        getLocalImagePath: function(){
        	return this.localImagePath;
        },
        
        /* 获取本地APP路径 */
        getLocalAppPath: function(){
        	return this.localAppPath;
        },
        
        /* 获取网站logo地址 */
        getLogoImg: function(){
        	var img = '';
        	if(this.customerInfo){
        		img = this.customerInfo.logoImg;
        		img = img ? (this.customResourcePath ? this.customResourcePath + img : img) : (this.resourcePath + LoginData.defaults.logoImage);
        	}
        	return img;
        },
        
        /* 设置网站logo地址 */
        setLogoImg: function(logoImg){
        	this.customerInfo.logoImg = logoImg;
        	this.setItem('customerInfo', this.customerInfo);
        },
        
        /* 获取背景颜色 */
        getBackColor: function(){
        	return this.customerInfo ? (this.customerInfo.backColor || LoginData.defaults.loginBackColor) : LoginData.defaults.loginBackColor;
        },
        
        /* 获取背景图片 */
        getBackImg: function(){
        	var img = '';
        	if(this.customerInfo){
        		img = this.customerInfo.backImg;
        		img = img ? (this.customResourcePath + img) : (this.resourcePath + LoginData.defaults.loginBackImage);
        	}

        	return img;
        },
        
        /* 获取用户唯一标识customerCode */
        getCustomerCode: function(){
        	return this.customerInfo ? (this.customerInfo.customerCode || '') : '';
        },
        
        /* 获取行业类型 */
        getType: function(){
        	return this.customerInfo ? (this.customerInfo.type || '') : '';
        },

        /* 获取员工姓名 */
        getEmployeeName:  function () {
            return this.user ? (this.user.fullName || '') : '';
        },
        
        /* 获取用户信息 */
        setUser: function(data){
        	this.setItem('user', data);
        },
        
        /* 返回user */
        getUser: function(){
        	return this.user;
        },
        
        /* 获取用户电话 */
        getUserPhone: function(){
            return this.user ? (this.user.phone || '') : '';  
        },
        
        /* 获取用户email */
        getUserEmail: function(){
            return this.user ? (this.user.email || '') : '';
        },
        
        /* 获取用户名 */
        getUserName:  function () {  
            return this.user ? (this.user.userName || '') : '';
        },
        
        /* 获取用户ID */
        getUserId: function(){
            return this.user ? (this.user.id || '') : '';
        },
        
        /* 获取用户头像 */
        getUserHeadImage: function(){
            return this.user ? (this.user.headImageUrl || this.getResourcePath()+LoginData.defaults.headImg) : this.getResourcePath()+LoginData.defaults.headImg;
        },

        /* 获取websokect服务器地址 */
        getWSDomain:  function (projectName, pathName) {
            projectName = projectName || 'monitor';
            pathName = pathName || 'websocket';
            var host = window.location.host;

            return 'ws://' + host + '/' + projectName + '/' + pathName;
        },
        
        /* 设置消息头 */
        setGDHSInfo: function(data){
        	this.setItem('gdhsInfo', data);
        },

        /* 获取消息头 */
        getGDHSInfo:  function () {
            return this.gdhsInfo ? (this.gdhsInfo || null) : null;
        },
        
        /* 获取资源文件域名 */
        getResourcePath: function(){
            return this.resourcePath ? this.resourcePath : '';
        },
        
        /* 获取公司理念 */
	   	getCompanyIdea: function(){
	   		return this.customerInfo ? (this.customerInfo.companyIdea || '') : '';
	   	},
	   	
	   	/* 获取登录页网址 */
	   	getLoginUrl: function(){
	   		return this.loginUrl;
	   	},
	   	
	   	/* 设置登录页网址 */
	   	setLoginUrl: function(str){
	   		this.setItem('loginUrl', str);
	   	}
    }
    
    window.LoginData = LoginData;
    
    /* 是否支持sessionStorage存储 */
    function isSupportStorage(type) {
        type = type || 1; //1:sessionStorage, 2:localStorage, 3:其它
        if(type == 1){
            return 'sessionStorage' in window;
        }else if(type == 2){
            return 'localStorage' in window;
        }
    }
    
    /* 信息存储在本地浏览器 */
    function setStorage(key, value, type) {
        type = type || 1; //1:sessionStorage, 2:localStorage, 3:其它
        
        var sStorage = null;        
        if(type == 1){
            sStorage = window.sessionStorage;
        }else if(type == 2){
            sStorage = window.localStorage;
        }
        
        if (isSupportStorage()) {
            if (sStorage.getItem(key)) {
                sStorage.removeItem(key);
            }

            value = JSONToString(value);
            sStorage.setItem(key, value);
        }
    }

    /* 信息存储在本地浏览器 */
    function getStorage(key, type) {
        type = type || 1; //1:sessionStorage, 2:localStorage, 3:其它
        
        var sStorage = null;        
        if(type == 1){
            sStorage = window.sessionStorage;
        }else if(type == 2){
            sStorage = window.localStorage;
        }
        
        if (isSupportStorage()) {
            if (!sStorage.getItem(key)) {
                return null;
            };

            return stringToJSON(sStorage.getItem(key));
        }
    }

    /* 删除本地数据库 */
    function removeStorage(key, type) {
        type = type || 1; //1:sessionStorage, 2:localStorage, 3:其它
        
        var sStorage = null;        
        if(type == 1){
            sStorage = window.sessionStorage;
        }else if(type == 2){
            sStorage = window.localStorage;
        }
        
        if (isSupportStorage()) {
            if (typeof key === 'string') {
                if (getStorage(key, type)) {
                    sStorage.removeItem(key);
                }
                return;
            };

            if (key instanceof Array) {
                for(var i=0; i< key.length; i++){
                    if (getStorage(key[i], type)) {
                        sStorage.removeItem(key[i]);
                    }
                }          
                return;
            };

            sStorage.clear();
        }
    }
    
    /* 字符串转JSON对象 */
    function stringToJSON(data){
    	try{
    		data = JSON.parse(data);
    	} catch(e){
    		data = data;
    	}
        return data;
    }
    
    /* JSON对象转字符串 */
    function JSONToString(data){
    	try{
    		data = JSON.stringify(data);
    	} catch(e){
    		data = data;
    	}
        
    	return data;
    };
    
    /* 某个值是否存在于数组中 */
    function inArray(value, arr){
    	for(var i = 0, len = arr.length; i < len; i++){
    		if(arr[i] === value){
    			return i;
    		}
    	}
    	return -1;
    }
    
})();