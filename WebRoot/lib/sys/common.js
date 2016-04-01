var Common = Common || {}, Debug = Debug || {};

/* 是否启用调试模式 */
var DEBUGGER = false;

/* 控制台日志 */
Debug.log = function(msg) {
    var params = Common.getSearch();
    if (params && !params.debug && !DEBUGGER) {
        return;
    }

    if (window.console) {
        console.log(msg);
    }
};

/* 判断IE浏览器 */
Common.isIE = function() {
    if ( !! window.ActiveXObject || "ActiveXObject" in window) {
        return true;
    } else {
        return false;
    }
};

/* 跳转 */
Common.jump = function(url, target) {
    if (!url) {
        return;
    }

    if (target) {
        window.open(url, target);
    } else {
        location.href = url;
    }
};

/* 数组消重 */
Common.unique = function(arry) {
    var result = [],
        temp = {};
    for (var i = 0; i < arry.length; i++) {
        if (!temp[arry[i]]) {
            result.push(arry[i]);
            temp[arry[i]] = 1;
        }
    }
    return result;
};

/* input输入框只允许输入数字 */
Common.eventInputWriteNum = function(obj){
	/*var reg = /\D/;
	if(reg.test(obj.value)){
		msgDialog(Lang.onlyWriteNum)
		obj.value='';
	}*/
	var key = obj.which;
	if(key>=48&&key<=57){
		return true;
	}else{
		return false;
	}
}

/* treegrid重新统计total */
Common.showPagerNumb = function(rowNum){
	if (rowNum==0){
		 window.setTimeout(function(){
			 $(".pagination-info").text("显示0到0,共0记录");
		 },2);
	}
};

/* 生成随机数 */
Common.randomCode = function(type, num) {
    type = type || 1;
    num = num || 1;
    var letterAndNumberArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var randomCode = '';

    for (var i = 0; i < num; i++) {
        /* 数字随机 */
        if (type == 1) {
            randomCode += letterAndNumberArray[Common.selectFrom(0, 9)];
            continue;
        }
        /* 字母随机 */
        if (type == 2) {
            randomCode += letterAndNumberArray[Common.selectFrom(10, 35)];
            continue;
        }
        /* 3表示数据与字母随机 */
        if (type == 3) {
            randomCode += letterAndNumberArray[Common.selectFrom(0, 35)];
        }
    }

    return randomCode;
};

/* 指定范围的随机数 */
Common.selectFrom = function(lowerValue, upperValue) {
    var choices = upperValue - lowerValue + 1;
    return Math.floor(Math.random() * choices + lowerValue);
};

/******
获得?号后面的参数并以一组参数名与值的对象返回 
eg:?id=5&userName=lantis 返回{id:5, userName:'lantis'}
******/
Common.getSearch = function(str) {
    var vSearch = Common.getSearchStr(str);
    var param = {};

    if (vSearch) {
        var paramArray = vSearch.split('&');
        for (var i = 0; i < paramArray.length; i++) {
            param[paramArray[i].split('=')[0]] = Common.escapeValue(decodeURIComponent(paramArray[i].substr(paramArray[i].indexOf('=') + 1)));
        }
    }

    return param;
};

/* 获得?号后面的参数字符串  */
Common.getSearchStr = function(str) {
    if (str) {
        return str.substr(str.indexOf('?') + 1);
    }

    return location.search.substr(1);
};

/* 对象转成&key=value字符串 */
Common.paramToString = function(param) {
    if (!param) {
        return '';
    }

    var str = '';
    $.each(
        param,
        function(k, v) {
            str += '&' + k + '=' + v;
        }
    )

    return str;
};

/* 追加参数 */
Common.appedUrlParams = function(params, url) {
    if (!(params && url)) {
        return;
    }

    var urlParams = Common.getSearch(url);
    var paramsStr = '';
    params = $.extend(urlParams, params);
    paramsStr = Common.paramToString(params);
    paramsStr = paramsStr.substr(1);
    url = url.replace(url.substr(url.indexOf('?')), '');
    return url + '?' + paramsStr;
};

/* 换成特殊值 */
Common.escapeValue = function(str) {
    if (str == 'null') {
        return null;
    }
    if (str == 'undefined') {
        return undefined;
    }
    return str;
};

/* urlencode */
Common.urlencode = function(str) {
    str = (str + '').toString();

    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
};

/* 将null, 0, undefined的值替换成''-空字符串 */
Common.getNormalValue = function(value) {
    if (value) {
        return value;
    }

    return '';
};

/* 通过GET获取参数值转换成数字类型 */
Common.stringToNumber = function(string) {
    var num = string * 1;

    if (isNaN(num)) {
        return 0;
    }

    return num;
};


/* 截取采集设备码 */
Common.formatRegCode = function(regCode){
	if(!regCode){
		return '';
	}
	regCode = regCode.substr(9);
	
	var newRegCode = regCode.substr(regCode.length-9);

	if(newRegCode=="000000000"){
		regCode = regCode.substring(0, regCode.length-9);
	}else{
		regCode = regCode.substring(0, 16);
	}
	
	return regCode;
}

/* 字符串转JSON对象 */
Common.stringToJSON = function(data) {
    try {
        data = JSON.parse(data);
    } catch (e) {
        data = data;
    }
    return data;
};

/* JSON对象转字符串 */
Common.JSONToString = function(data) {
    try {
        data = JSON.stringify(data);
    } catch (e) {
        data = data;
    }

    return data;
};

/* 数字转16进制 */
Common.dec2hex = function(num) {
    return Number(num).toString(16);
};

/* 数字转字符串ascii */
Common.dec2string = function(num) {
    return Common.hex2String(Common.dec2hex(num));
};

/* 16进制转数字 */
Common.hex2dec = function(string) {
    if(string == ''){
        return '';
    }
    return parseInt(string, 16);
};

/* 16进制转字符串ascii */
Common.hex2string = function(str) {
    var val = "";
    var arr = str.split(",");
    if (arr.length == 0) {
        return str;
    }
    for (var i = 0; i < arr.length; i++) {
        val += arr[i].fromCharCode(i);
    }
    return val;
};

/* 字符串ascii转16进制 */
Common.string2hex = function(str) {
    var byteCount = 0;
    for (i = 0; i < str.length; i++) {
        byteCount = str.charCodeAt(i);
        if (byteCount.length == 1) {
            byteCount = "0" + byteCount;
        }
        byteCount += byteCount.toString(16).toUpperCase();
    }
    return byteCount;
};

/* 字符串ascii转10进制 */
Common.string2dec = function(str) {
    return Common.hex2dec(Common.string2hex(str));
};

/* 字符补零 */
Common.fillZero = function(str, len) {
    if (!str) {
        return;
    }
    if (!len) {
        return str;
    }
    var strLen = str.length;
    if (strLen < len * 2) {
        for (var i = 0; i < len * 2 - strLen; i++) {
            str = '0' + str;
        }
    }
    return str;
};

/*****
根据参数创建隐藏域字段
fields:需要创建的字段名称及值的一组对象
parentElement:需要添加到的父级元素，默认值：ID为'J_PostForm'的元素
eg:Common.addHiddenField({'companyID': 28, 'userName':'lantis'}, $('#J_PostForm'))
则会在页面ID为'J_PostForm'的元素里创建两个隐藏域:
<input type="hidden" name="companyID" id="companyID" value="28" />
<input type="hidden" name="userName" id="userName" value="lantis" />
*****/
Common.addHiddenField = function(fields, parentElement) {
    if (!fields) {
        return;
    }

    parentElement = parentElement || $('#J_PostForm');
    var i = 0,
        length = fields.length,
        hiddenFieldsName = Common.getHiddenFields(parentElement);

    for (var key in fields) {
        if ($.inArray(key, hiddenFieldsName) == -1) {
            $('<input type="hidden" name="' + key + '" id="' + key + '" value="' + fields[key] + '" />').appendTo(parentElement);
        } else {
            $('#' + key).val(fields[key]);
        }
    }
};

/* 获取某个元素下所有隐藏域的name并以数组返回 */
Common.getHiddenFields = function(parentElement) {
    parentElement = parentElement || $(document.body);
    var hiddenFields = parentElement.find('input[type="hidden"]'),
        length = hiddenFields.length,
        i = 0,
        result = [];

    if (!length) {
        return result;
    }

    for (; i < length; i++) {
        result.push($(hiddenFields[i]).attr('name'));
    }

    return result;
};

/* 根据参数删除隐藏域字段 */
Common.removeHiddenField = function(fields, parentElement) {
    if (!fields) {
        return;
    }

    parentElement = parentElement || $('#J_PostForm');
    var i = 0,
        length = fields.length,
        hiddenFieldsName = Common.getHiddenFields(parentElement);

    for (var key in fields) {
        if ($.inArray(key, hiddenFieldsName) != -1) {
            $('#' + key).remove();
        }
    }
};

/* 添加loadingBox */
Common.addLoadingBox = function(message, parentElement) {
    message = message || Lang.loading;
    parentElement = parentElement || $(document.body);
    var $loadingBox = $('<div class="loading-box"><div class="loading-mask"></div><div class="loading">' + message + '</div></div>');
    parentElement.append($loadingBox);
    return $loadingBox;
};

/* 移除loadingBox */
Common.removeLoadingBox = function(target) {
    target.fadeOut(500, function() {
        target.remove();
    })
};

/* 全屏 */
Common.launchFullScreen = function(element) {
    if (element.requestFullScreen) {
        element.requestFullScreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
    }
};

/* 将数组里的值全部转成数字类型 */
Common.stringToNumberInArray = function(array) {
    var result = [],
        i = 0,
        len = array.length;

    if (len == 0) return result;

    for (; i < len; i++) {
        result.push(array[i] * 1);
    }

    return result;
};

/* 重复执行函数setIntervalTimeout */
Common.addInterval = function(fun, time, params) {
    return setTimeout(function() {
        fun(params);
        setTimeout(arguments.callee, time);
    }, time);
};
Common.delInterval = function(id) {
    clearTimeout(id);
};

/* 重复执行函数setInterval */
Common.setInterval = function(fun, time, params) {
    return setInterval(function() {
        fun(params);
    }, time);
};
Common.clearInterval = function(id) {
    clearInterval(id);
};

/* 间隔执行函数setTimeout */
Common.addTimeout = function(fun, time, params) {
    return setTimeout(function() {
        fun(params);
    }, time);
};
Common.delTimeout = function(id) {
    clearTimeout(id);
};

/* 获取去掉..的URL，用于需要加绝对路径的URL,例如：http://xxx.com/../upkeep/xxx */
Common.getUrlOfTrimPoint = function(url) {
    return url.replace('\.\.', '');
};

/* 拼接URL地址 */
Common.pieceUrl = function(url, domain) {
//    if (!url) {
//        return;
//    }
//
//    if (domain) {
//        url = domain + url;
//    }
//
//    var hasParam = url.indexOf('?') != -1;
//
//    url += (hasParam ? '&' : '?') + 'sid=' + loginData.getSID();

    return url;
};

/* 将字符串转成小写，不同单词间用-替换 */
Common.getTransformClassName = function(str) {
    if (!str) {
        return '';
    }

    return str.replace(/([A-Z])/g, '-$1').toLowerCase().substr(1);
};

/* 联系人/手机拼凑,主要用于datagrid中formatter格式化字段 */
Common.pieceContacts = function(value) {
    if (!value) {
        return false;
    }

    var html,
        splitCode = '<em class="split">/</em>',
        firstValue = '',
        secondValue = '';

    html = '<ul class="list-unstyled">';

    for (var i = 0; i < arguments.length; i++) {
        firstValue = arguments[i][0] ? arguments[i][0] : '';
        secondValue = arguments[i][1] ? arguments[i][1] : '';
        if (!(firstValue || secondValue)) {
            continue;
        }

        firstValue = firstValue ? firstValue : '-';
        secondValue = secondValue ? secondValue : '-';

        html += '<li class="contacts-list-item">';
        html += '<span class="contacts-name">' + firstValue + splitCode + '</span>';
        html += '<span class="contacts-tel">' + secondValue + '</span>';
        html += '</li>';
    }

    html += '</ul>';

    return html;
};

/* 判断对象里的值是否全部为空 */
Common.isEmptyByObjectValue = function(obj) {
    if (!obj && typeof obj != 'object') {
        return false;
    }

    var result = true;
    for (var i in obj) {
        if (obj[i] != '') {
            result = false;
            break;
        }
    }
    return result;
};

/* 处理errorCode */
Common.errorHandler = function(code) {
    if (code === '404') {
        alert('请求的地址未找到！');
    } else if (code === '500') {
        alert('服务器错误！');
    } else if (code === 'noSession') {
        alert('未登录或登录超时，请重新登录！');
    } else if (code === 'noSecurity') {
        alert('没有权限！');
    }
};

/* 判断一个URL是否和当前域相同 */
Common.isSameDomain = function(url) {
    var protocol = 'http://';
    hasProtocol = url.indexOf(protocol) != -1;

    if (!hasProtocol) {
        return true;
    }

    var isExist = url.indexOf(location.host) != -1;
    if (isExist) {
        return true;
    }

    return false;
};

/* 同域同步请求，成功返回包含fields字段的数据 */
Common.getDataByfields = function(url, postData, fields) {
    postData = postData ? $.extend(postData, {
        'sid': window.loginData ? loginData.getSID() : ''
    }) : postData;

    var result = null;
    var setting = {
        url: url,
        data: postData,
        type: 'POST',
        dataType: 'json',
        async: false,
        success: function(data) {
            if (!data) {
                return;
            }

            data = Common.stringToJSON(data);

            if (data.errorCode) {
                Common.errorHandler(data.errorCode);
                return;
            }

            if (fields == null) {
                result = data;
                return;
            }

            if ($.isArray(fields)) {
                for (var i = 0; i < fields.length; i++) {
                    result[fields[i]] = data[fields[i]];
                }
                return;
            }

            result = data[fields];
        },
        error: function() {

        }
    };

    $.ajax(setting);

    return result;
};

/* 同域异步请求，成功后执行callback函数 */
Common.sameDomainRequest = function(url, postData, callback) {
    var setting = {
        url: url,
        data: postData,
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            if (!data) {
                callback(data);
                return;
            }

            data = Common.stringToJSON(data);

            if (data.errorCode) {
                Common.errorHandler(data.errorCode);
                return;
            }

            callback(data);
        }
    };

    $.ajax(setting);
};

/* 跨域请求，成功后执行callback函数 */
Common.crossDomainRequest = function(url, postData, callback) {
    var setting = {
        url: url,
        data: postData,
        type: 'GET',
        dataType: 'jsonp',
        jsonp: 'callback',
        jsonpCallback: 'jsonpCallback',
        success: function(data) {
            if (!data) {
                callback(data);
                return;
            }

            data = Common.stringToJSON(data);

            if (data.errorCode) {
                Common.errorHandler(data.errorCode);
                return;
            }

            callback(data);
        }
    };

    $.ajax(setting);
};

/****** 
根据某个字段获取值
url:请求的地址
postData:接受的参数
processResult:如果为null、字符串、数组类型，则返回需要返回的字段名称，默认值:null，返回所有字段数据，单个字段可使用字符串作为参数，多个可使用数组作为参数，如果为function类型则异步请求成功执行回调函数
 ******/
Common.getDataByAjax = function(url, postData, processResult) {
    if (!url) {
        return null;
    }

    url = Common.pieceUrl(url);

    var dataType = typeof processResult;

    if (dataType == 'string' || processResult == null || $.isArray(processResult)) {
        return Common.getDataByfields(url, postData, processResult);
    }

    if (dataType == 'function' && !Common.isSameDomain(url)) {
        return Common.crossDomainRequest(url, postData, processResult);
    }

    return Common.sameDomainRequest(url, postData, processResult);

};

/* 
请求Action并跳转 
一键生成保养单
一键发送
强制签出
*/
Common.queryAction = function(queryURL, parms, jumpURL) {
    if (!queryURL) {
        return false;
    }

    Common.getDataByAjax(queryURL, parms, callback);

    function callback(data) {
        Common.requestCode(data, function() {
            if (!jumpURL) return;

            switch (data['RetCode']) {
                case 0:
                    break;
                case 1:
                    if (typeof callback == 'function') callback();
                    location.href = jumpURL;
                    break;
            }
        });
    }
};

/******
取一组对象里的不重复的值并以数组类型返回
data:JSON数据源
field:需要操作的字段名称
******/
Common.getItemsToArray = function(data, field) {
    if (!data) {
        return false;
    }

    var temp = {},
        result = [];

    $.each(
        data,
        function(index, value) {
            if (!temp[value[field]]) {
                result.push(value[field]);
                temp[value[field]] = 1;
            }
        }
    )

    return result;
};

/****** 
时间格式化函数
dateTime:字符串
format:需要返回的格式有('y-m-d', 'y-m-d h:m:s', 'y-m-d h:m', 'y/m/d', 'y/m/d h:m:s', 'y/m/d h:m')，默认值为：y-m-d h:m:s
******/
Common.getTransformTime = function(dateTime, format) {
    if (!dateTime) {
        return '';
    }
    var date = 0;

    if (typeof dateTime == 'string' && dateTime.indexOf('Date') != -1) {
        date = new Date(parseInt(dateTime.replace("/Date(", "").replace(")/", ""), 10));
    } else {
        date = new Date(dateTime);
    }

    if (date < 0) {
        return '';
    }

    var year = date.getFullYear(),
        month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1,
        day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
        hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
        min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
        sec = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

    var formatObject = ['y-m-d', 'y-m-d h:m:s', 'y-m-d h:m', 'y/m/d', 'y/m/d h:m:s', 'y/m/d h:m','y-m','y/m','y'],
        i = 0,
        length = formatObject.length,
        index = 1;

    if ($.inArray(format, formatObject) != -1) {
        index = $.inArray(format, formatObject);
    }

    switch (index) {
        case 0:
            return year + '-' + month + '-' + day;
            break;
        case 1:
            return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
            break;
        case 2:
            return year + '-' + month + '-' + day + ' ' + hour + ':' + min;
            break;
        case 3:
            return year + '/' + month + '/' + day;
            break;
        case 4:
            return year + '/' + month + '/' + day + ' ' + hour + ':' + min + ':' + sec;
            break;
        case 5:
            return year + '/' + month + '/' + day + ' ' + hour + ':' + min;
            break;
        case 6:
        	return year + '-' + month;
        	break;
        case 7:
        	return year + '/' + month;
        	break;
        case 8:
        	return year;
    }
};

/* 填充数据到元素
   data:数据源
   specialItems:要通过转换的对象数组：[{'feildName': 'installDate', 'functionName': Common.getTransformTime, 'param': 'y-m-d'}, , ,]
 */
Common.fillValueToElement = function(data, specialItems, parentElement) {
    if (!data) {
        return;
    }

    parentElement = parentElement || $(document.body);
    var $element = null;
    var $tagName = '';

    $.each(
        data,
        function(name, value) {
            $element = parentElement.find('#' + name);

            if ($element.length == 0) {
                return true;
            }

            $tagName = $element[0].tagName;
            $tagType = $element[0].type;
            value = getSpecialItemsResult(name, value);

            if ($tagName == 'INPUT') {
                if ($tagType != 'file') {
                    $element.val(value);
                }

                return true;
            }

            if ($tagName == 'SPAN' || $tagName == 'DIV') {
                $element.html(value);
                $element.attr('title', $element.text());
                return true;
            }

            if ($tagName == 'TEXTAREA') {
                $element.val(value);
                return true;
            }

            if ($tagName == 'SELECT') {
                $element.val(value);
                return true;
            }

        }
    );

    /* 针对需要转换的项的特殊处理 */
    function getSpecialItemsResult(name, value) {
        if (!specialItems) {
            return value;
        }

        $.each(
            specialItems,
            function(index, obj) {
                var feildName = obj['feildName'];
                if (name == feildName) {
                    var functionName = obj['functionName'];
                    var param = obj['param'];

                    if (param) {
                        value = functionName(value, param);
                        return false;
                    }

                    value = functionName(value);
                }
            }
        );

        return value;
    }
};

/* 对语言包里的变量进行处理 */
Common.getTextOfFormatter = function(langName, obj) {
    var str = langName ? Lang[langName] : '';

    if (!(str && obj)) {
        return '';
    }
    var reg = /\{(\$[0-9]+)\}/g,
        resultArray = str.match(reg);

    if (!resultArray) {
        return str;
    }

    $.each(
        resultArray,
        function(index, value) {
            $n = value.replace(reg, '$1');
            str = str.replace(value, obj[$n]);
        }
    );
    return str;
};

/* datagrid */
Common.datagrid = function(settingNew, element) {
    element = element || $('#J_DataGrid');
    var setting = {
        border: false,
        rownumbers: true,
        fit: true,
        fitColumns: true,
        singleSelect: true,
        striped: true,
        view: emptyView,
        pagination: true,
        pageNumber: 1,
        pageSize: 20,
        onLoadError: Common.dataGridError
    };

    var opts = $.extend(true, {}, setting, settingNew);
    
    opts.url = Common.pieceUrl(opts.url);

   

    element.datagrid(opts);

    //创建自定义显示列
    if(opts.showColumns){
    	Common.buildCustomColumnBar(opts.columns[0], element,opts.showColumnsStr);
    }
    
    /* 解决浏览器缩放datagrid不会自动适应宽度的BUG */
    $(window).resize(function() {
        if (element.length > 0) {
            element.datagrid('resize', {
                width: $('#J_BoxBody').width() - 20
            });
        }
    });
    
};
/*根据自定义列的checkbox来显示或者隐藏所对应的列*/
function showColumnsByCustomerColumnBar(columnsBar,element)
{
	columnsBar.find('.checkbox[name="field"]').each(function(i,v){
		var functionName = '';
		if(v.checked){
			functionName = 'showColumn';
			//checkedNum ++;
		}else{
			functionName = 'hideColumn';
			//checkedNum --;
		}
		element.datagrid(functionName, this.value);
	});
}


/* 创建自定义显示列 */
Common.buildCustomColumnBar = function(cols, element,showColumnsStr){
	var $datagridParent = element.parents('#J_DataGridBox');
	if($datagridParent.find('.show-columns-bar').length > 0){
		/*$datagridParent.find('.show-columns-bar').contents().unbind("click");
		$datagridParent.find('.show-columns-bar').remove();*/
		$datagridParent.find('.show-columns-bar').find('.checkbox[name="field"]').each(function(i,v){
			var functionName = '';
			if(v.checked){
				functionName = 'showColumn';
				checkedNum ++;
			}else{
				functionName = 'hideColumn';
				checkedNum --;
			}
			
			element.datagrid(functionName, this.value);
		});
		showColumnsByCustomerColumnBar($datagridParent.find('.show-columns-bar'),element);
		return;
	}
	var $box = $('<div class="show-columns-bar"><i class="icon-red icon-list" data-show-columns-icon="true"></i><div class="show-columns-box hidden" data-show-columns-box="true"><ul class="form-multiple-list"></ul></div></div>');
	var checked = 'checked';
	var colsNum = cols.length;
	var checkedNum = colsNum;
	var colsHTML = [];//['<li class="form-multiple-item form-multiple-item-all-select"><label class="form-multiple-label text-overflow"><input id="showColumnSelectAll" class="checkbox" type="checkbox" value="showColumnSelectAll" name="showColumnSelectAll"><span class="checkbox-text">全选/全不选</span></label></li>'];
	
	$datagridParent.css('position', 'relative');
	
	$.each(
		cols,
		function(i, v){
			if(v.checkbox){
				return true;
			}
			if(v.hidden){
				checkedNum --;
			}
			if(showColumnsStr)
			{
				if(showColumnsStr.indexOf(v.field) > -1)
				{
					checked = 'checked';
				}
				else
				{
					checked = '';
				}
			}
			else
			{
				checked = v.hidden ? '' : 'checked';
			}
			colsHTML.push('<li class="form-multiple-item"><label class="form-multiple-label text-overflow" title="'+v.field+'"><input id="'+v.field+'" class="checkbox" type="checkbox" value="'+v.field+'" name="field" '+checked+'><span class="checkbox-text">'+v.title+'</span></label></li>');
		}
	);
	
	$box.find('.form-multiple-list').html(colsHTML.join('\n'));
	$box.appendTo($datagridParent);
	
	//打开关闭事件
	var $icon = $box.find('.icon-red');
	$icon.click(function(event){
		var $colBox = $box.find('.show-columns-box');
		if($colBox.hasClass('hidden')){
			$colBox.removeClass('hidden');
		}else{
			$colBox.addClass('hidden');
		}
	});
	
	//根据flag判断全选是否默全勾选
	var $selectAll = $('#showColumnSelectAll');
	if(checkedNum === colsNum){
		$selectAll.prop('checked', true);
	}
	$selectAll.click(function(e){
		var functionName = '';
		var $checkboxs = $box.find('.checkbox[name="field"]');
		if(this.checked){
			$checkboxs.prop('checked', true);
			functionName = 'showColumn';
		}else{
			$checkboxs.prop('checked', false);
			functionName = 'hideColumn';
		}
		
		$.each($checkboxs, function(i, v){
			element.datagrid(functionName, v.value);
		});
		
	});
	
	//checked事件
	$box.find('.checkbox[name="field"]').click(function(e){
		var functionName = '';
		if(this.checked){
			functionName = 'showColumn';
			checkedNum ++;
		}else{
			functionName = 'hideColumn';
			checkedNum --;
		}
		
		if(checkedNum === colsNum){
			$selectAll.prop('checked', true);
		}else{
			$selectAll.prop('checked', false);
		}
		element.datagrid(functionName, this.value);
	});
	if(showColumnsStr)
	{
		showColumnsByCustomerColumnBar($box,element);
	}
};
/* 获取自定义选项列的值 */
Common.getSelectItemForCustomColumnBar = function(element){
	element = element || $('#J_DataGridBox');
	var cols = [];
	$.each(element.find('.show-columns-bar [name="field"]:checked'), function(i, v){
		cols.push($(v).val());
	});
	return cols.join(',');
};

/* 获取dadagrid 中的 sortName和sortOrder */
Common.getDatagridSort = function(element) {
    element = element || $('#J_DataGridBox');

    var sortElement = element.find('.datagrid-sort-desc, .datagrid-sort-asc');
    var sortName = sortElement.parent().attr('field');
    var classStr = sortElement.attr('class') + " ";

    classStr = classStr.substring(classStr.indexOf('datagrid-sort-') + 14);
    classStr = classStr.substring(0, classStr.indexOf(" "));

    return {
        sortName: sortName,
        sortOrder: classStr
    };
};

/* treegrid */
Common.treegrid = function(settingNew, element) {
    element = element || $('#J_DataGrid');
    var setting = {
        border: false,
        rownumbers: true,
        fit: true,
        fitColumns: true,
        view: emptyTreeView,
        pagination: true,
        pageNumber: 1,
        pageSize: 30,
        onLoadError: Common.dataGridError
    };

    var opts = $.extend(true, {}, setting, settingNew);

    opts.url = Common.pieceUrl(opts.url);

    element.treegrid(opts);
};

/*js实现倒计时关闭弹出框*/
Common.setCountdownPrompt = function(s, element, callback) {
    var selfFun = arguments.callee;
    element.html('<span data-time="true" class="text text-left text-danger">' + s + '</span> 秒后，自动关闭.');
    setTimeout(function() {
        if (s <= 1) {
            if (callback && typeof callback === 'function') {
                callback();
            }
            return;
        }
        if (element.find('[data-time="true"]').length > 0) {
            element.find('[data-time="true"]').html(s);
        }
        selfFun(s - 1, element, callback);
    }, 1000);
};

/* autocomplete */
Common.autocomplete = function(settingNew, element, callback) {
    if (!element) {
        return;
    }

    var forceMatching = (settingNew.forceMatching || settingNew.forceMatching == 0 || settingNew.forceMatching == false) ? settingNew.forceMatching : true;
    settingNew.forceMatching = forceMatching;
    var name = element.attr('data-autocomplete-name');
    var elementLen = $('[name=' + name + ']').length == 0 ? '' : $('[name=' + name + ']').length;
    var $hiddenFeild = element.parent().find('[name="' + name + '"]');

    /* 如果强制匹配，重设一些元素 */
    if (forceMatching) {
        if ($hiddenFeild.length == 0) {
            $hiddenFeild = $('<input type="text" class="input-text opacity input-autocomplete" name="' + name + '" id="' + name + elementLen + '" value="" />');
            //var $icon = $('<span class="sbox sbox-autocomplete"><i class="s s-down"></i></span>');
            //$icon.insertAfter(element);
            $hiddenFeild.insertAfter(element);
        }
        //加图标
        if (!element.prop('disabled') && !element.prop('readonly')) {
            element.addClass('input-icon-auto');
        }
    }

    var setting = {
        dataType: "json",
        minChars: 0,
        width: 250,
        matchContains: "word",
        autoFill: false,
        max: 10,
        extraParams: {
            page: 1,
            rows: 10,
            sid: loginData.getSID()
        }
    };

    var opts = $.extend(true, {}, setting, settingNew);

    element.autocomplete(opts.url, opts).result(function(event, data, formatted) {
        $hiddenFeild.val(data.id);
        $hiddenFeild.parent().find('.validate-text').hide();

        if (callback && typeof callback === 'function') {
            callback(event, data, formatted);
        }

    }).keyup(function(e) {
    	//屏蔽这几个按键的keyup事件
    	if(inKeycodes(e.which)){
    		return;
    	};
        if (!forceMatching) {
            return;
        }
        $hiddenFeild.val("");

    }).blur(function(e) {
        if (!forceMatching) {
            return;
        }
        var $parentBox = element.parents('.f-fix');
        var $msgBox = $parentBox.find('.validate-text');
        if ($.trim(element.val()) === '') {
        	$hiddenFeild.val('');
        	$msgBox.hide();
            return;
        }
        if($hiddenFeild.val() === '') {
            if ($msgBox.length > 0) {
                $msgBox.show();
            } else {
                $('<label class="validate-text error" for="elevId">' + Lang.autoCompleteValidate + '</label>').appendTo($parentBox);
            }
        }else{
        	$msgBox.hide();
        }
    });
    
    function inKeycodes(keycode){
    	var keycodes = [9, 13, 27, 38, 40];//tab, enter, esc, up, down这五个键
    	return $.inArray(keycode, keycodes) !== -1;
    }
};

/******
根据ID删除对应记录，并重载数据
url:需要请求的地址
idName:需要删除的ID字段名
ids:需要删除的ID，删除多个ID需要以,号分割
obj: datagrid绑定的元素
******/
Common.removeItem = function(url, idName, ids, obj, type) {
    var url = url,
        postData = {};

    postData[idName] = ids;
    obj = obj || $('#J_DataGrid');

    confirmDialog(Lang.msgDoYouWantToDelete, Lang.alertTitlePrompt, function() {
        Common.getDataByAjax(url, postData, function(res) {
            if (res.success) {
                msgDialog(res.msg, Lang.alertTitlePrompt, 'success', function() {
                    if (type == "datagrid") {
                        obj.datagrid('reload');
                    } else {
                        obj.treegrid('reload');
                    }
                });
            } else {
                simpleDialog(res.msg);
            }
        });
    });

};



/* 删除操作 */
Common.remove = function(url, idsName, element, type) {
    element = element || $("#J_DataGrid");
    type = type || 'datagrid';

    var row = element.datagrid("getSelected");
    if (!row) {
        msgDialog(Lang.msgPleaseSelectDataFirst, Lang.alertTitlePrompt, 'warning');
        return false;
    }

    var id = row[idsName];
    Common.removeItem(url, idsName, id, element, type);
};


//修改操作
Common.edit = function(url, idsName, element, target) {
	Debug.log(element);
    target = target || '_self';
    if (!idsName) {
    	  
        window.open(url, target);
        return;
    }

    element = element || $("#J_DataGrid");
    isParams = url.indexOf('?') != -1;

    if (!isParams) {
        url += '?';
    } else {
        url += '&';
    }

    var row = element.datagrid("getSelected");

    if (!row) {
        msgDialog(Lang.msgPleaseSelectDataFirst, Lang.alertTitlePrompt, 'warning');
        return false;
    }

    if ($.isArray(idsName)) {
        var i = 0,
            length = idsName.length,
            split = '&';
        for (; i < length; i++) {
            split = (i == 0) ? '' : '&';
            if (idsName[i].indexOf('&') != -1) {
                url += idsName[i];
            } else {
                url += split + idsName[i] + '=' + row[idsName[i]];
            }
        }
    } else {
        if (idsName.indexOf('&') != -1) {
            url += idsName;
        } else {
            url += idsName + '=' + row[idsName];
        }
    }

    //location.href = url;
 
    window.open(url, target);
};

/* 地址字段拼凑,主要用于datagrid中formatter格式化字段 */
Common.pieceAddress = function(value) {
    if (!value) {
        return false;
    }

    var html,
        province = value.province,
        city = value.city,
        area = value.area,
        address = value.address,
        splitCode = ', ';

    html = '<address class="address">';
    html += province ? '<span class="province first">' + province + (city ? splitCode : '') + '</span>' : '';
    html += city ? '<span class="city">' + city + (area ? splitCode : '') + '</span>' : '';
    html += area ? '<span class="area">' + area + (address ? splitCode : '') + '</span>' : '';
    html += address ? '<p class="address">' + address + '</p>' : '';
    html += '</address>';

    return html;
};

/* 电话字段拼凑,主要用于datagrid中formatter格式化字段 */
Common.pieceTel = function(value) {
    if (!value) {
        return false;
    }

    var html,
        i = 0,
        length = value.length;

    html = '<ul class="list-unstyled">';

    for (; i < length; i++) {
        if (value[i]) {
            html += '<li class="tel-list-item">' + value[i] + '</li>';
        }
    }

    html += '</ul>';

    return html;
};

/* 操作栏拼凑,主要用于datagrid中formatter格式化字段 */
Common.pieceWorks = function(value) {
    if (!value) {
        return false;
    }

    var html,
        i = 0,
        length = arguments.length;
    html = '<div class="list-center">';
    html += '<ul class="works-list list-inline">';
    for (; i < length; i++) {
        if (value[i]) {
            html += '<li class="works-list-item"><a class="edit-link" data-url="' + arguments[i][1] + '"><i class="icon-blue icon-' + arguments[i][0] + '"></i></a></li>';
        }
    }
    html += '</ul>';
    html += '</div>';

    return html;
};

/* 联系人/手机拼凑,主要用于datagrid中formatter格式化字段 */
Common.pieceContacts = function(value) {
    if (!value) {
        return false;
    }

    var html,
        splitCode = '<em class="split">/</em>',
        firstValue = '',
        secondValue = '';

    html = '<ul class="list-unstyled">';

    for (var i = 0; i < arguments.length; i++) {
        firstValue = arguments[i][0] ? arguments[i][0] : '';
        secondValue = arguments[i][1] ? arguments[i][1] : '';
        if (!(firstValue || secondValue)) {
            continue;
        }

        firstValue = firstValue ? firstValue : '-';
        secondValue = secondValue ? secondValue : '-';

        html += '<li class="contacts-list-item">';
        html += '<span class="contacts-name">' + firstValue + splitCode + '</span>';
        html += '<span class="contacts-tel">' + secondValue + '</span>';
        html += '</li>';
    }

    html += '</ul>';

    return html;
};

/*******
setSelectByList生成下拉选项
data:json数据
fieldsd:可以是字符串也可以是数组，如果是字符串则select的文字与值一样，如果是数组则按第一个是文本，第二个是值，第三个以后的是自定义data值
selectedID:当前选中的值ID
element:需要将生成的DOM插入的对象
 ******/
Common.setSelectByList = function(data, fields, selectedID, element, isRequired, groupObj) {
    if (!(data || element)) {
        return false;
    }

    var setCheked,
        defaultOption = '<option value="">' + Lang.pleaseSelect + '</option>',
        dataFields = '',
        html = '';

    element = element || $('#setSelectByList');

    if (!isRequired) {
        html = defaultOption;
    }

    if (typeof isRequired == 'string') {
        html = isRequired;
    }

    if (groupObj) {
        creatOptionGroup();
    } else {
        creatOptios();
    }

    function creatOptios(v) {
        $.each(
            data,
            function(index, value) {
                if (v && value[groupObj['field']] != v) {
                    return true;
                }

                if ($.isArray(fields)) {
                    var i = 2,
                        length = fields.length;
                    dataFields = '';
                    for (; i < length; i++) {
                        dataFields += ' data-' + fields[i] + '="' + value[fields[i]] + '"';
                    }

                    setCheked = value[fields[0]] == selectedID ? ' selected="selected"' : '';
                    html += '<option value="' + value[fields[0]] + '"' + dataFields + setCheked + '>' + value[fields[1]] + '</option>';
                } else {
                    setCheked = value[fields] == selectedID ? ' selected="selected"' : '';
                    html += '<option value="' + value[fields] + '"' + setCheked + '>' + value[fields] + '</option>';
                }
            }
        )
    }

    function creatOptionGroup() {
        if (!groupObj) {
            return;
        }

        if (typeof groupObj['values'] == 'string') {
            html += '<optgroup label="' + groupObj['values'] + '">';
            creatOptios();
            html += '</optgroup>';
        }

        if ($.isArray(groupObj['values'])) {
            $.each(
                groupObj['values'],
                function(i, v) {
                    html += '<optgroup label="' + v + '">';
                    creatOptios(v);
                    html += '</optgroup>';
                }
            )
        }
    }

    element.html('');
    $(html).appendTo(element);

    //如果传过来的值为数据则按顺序设置当前项
    if ($.isArray(selectedID)) {
        element.each(function(index) {
            $(this).val(selectedID[index]);
        })
    }

};

/* 
设置checkbox列表
data:必填，数据源
fields:必填,需要显示的字段，数组类型，[0]是value, [1]是text, [2]是分类字段
element:选填，需要追加添加到的元素对象，默认值：ID为J_CreatItems的元素
ids:选填，已有的值ids，数组类型
isDefault: 选填，如果为true则表示要根据isDefault的值是否禁用.
transformFunction: 选填，如果存在，则将fields[2]进行转换
 */
Common.setCheckboxByList = function(data, fields, element, ids, isDefault, transformFunction) {
    Common.bulidSelectForms('checkbox', data, fields, element, ids, isDefault, transformFunction);
};

Common.setRadioByList = function(data, fields, element, ids, isDefault, transformFunction) {
    Common.bulidSelectForms('radio', data, fields, element, ids, isDefault, transformFunction);
};

/* 生成checkbox或radios */
Common.bulidSelectForms = function(type, data, fields, element, ids, isDefault, transformFunction) {
    if (!data) {
        return;
    }

    type = type || 'checkbox';

    element = element || $('#setCheckboxByList');
    isDefault = isDefault || false;

    var html = '',
        fieldValue = fields[0],
        fieldText = fields[1],
        fieldCategories = fields[2],
        categoriesArray = getCategoriesArray(),
        postFields = null;

    if (categoriesArray) {
        $.each(
            categoriesArray,
            function(index, value) {
                groupHTML(value);
            }
        )
    } else {
        groupHTML();
    }

    $(html).appendTo(element);

    if (postFields) {
        Common.addHiddenField(postFields, element);
    }

    function groupHTML(value) {
        html += '<div class="form-multiple">';
        html += headerHTML(value);
        html += '	<div class="form-multiple-body">';
        html += '		<ul class="form-multiple-list form-multiple-grid">';
        html += listHTML(value);
        html += '		</ul>';
        html += '	</div>';
        html += '</div>';
    }

    function headerHTML(title) {
        if (!title) {
            return '';
        }
        title = transformFunction ? transformFunction(title) : title;
        var headerHTML = '';
        headerHTML += '<div class="form-multiple-heading">';
        headerHTML += '	<h3 class="form-multiple-title">' + title + '</h3>';
        headerHTML += '</div>';

        return headerHTML;
    }

    function listHTML(categorieName) {
        var listHTML = '',
            checked = '',
            disabled = '';
        $.each(
            data,
            function(index, value) {
                checked = $.inArray(value[fields[0]], ids) != -1 ? ' checked="checked"' : '';
                disabled = getDisabled(value, checked);
                if (value[fieldCategories] != categorieName) {
                    return true;
                }
                if(!value[fields[3]]){
                	value[fields[3]] = '无';
                }
                listHTML += '<li class="form-multiple-item"><label for="' + fields[1] + value[fields[0]] + '" class="form-multiple-label text-overflow" title="' + value[fields[1]] + '"><input type="' + type + '" class="' + type + '" id="' + fields[1] + value[fields[0]] + '" name="' + fields[0] + '" value="' + value[fields[0]] + '"' + checked + disabled + ' /><span class="checkbox-text">' + value[fields[1]] + '</span><br/><span style="color:#999">['+ value[fields[3]] +']</span></label></li>';
            }
        )
        return listHTML;
    }

    function getCategoriesArray() {
        if (!fieldCategories) {
            return false;
        }
        return Common.getItemsToArray(data, fieldCategories);
    }

    function getDisabled(value, checked) {
        if (!(isDefault && value['isDefault'] && checked)) {
            return '';
        }

        postFields = postFields || {};
        postFields[fields[0]] = value[fields[0]];

        return ' disabled="disabled"';
    }
};

/**** 
创建树形结构多选列表
如角色对应的菜单选择时的多选树形菜单
****/
Common.setCheckboxTreeByList = function(data, fields, element, ids, disabled) {
    if (!data) {
        return;
    }

    element = element || $('#setCheckboxTreeByList');
    disabled = disabled ? ' disabled="disabled"' : '';

    var html = '';

    headerHTML();
    listHTML();
    footerHTML();

    $(html).appendTo(element);

    function headerHTML() {
        html += '<div class="form-multiple">';
        html += '<div class="form-multiple-body">';
    }

    function listHTML() {
        creatList(data, 0);
    }

    function footerHTML() {
        html += '</div></div>';
    }

    function creatList(data, i) {
        var hiddenCss = i != 0 ? ' hidden' : '',
            selected = '',
            plusMinus = ' ';

        html += '<ul class="form-multiple-list form-multiple-tree' + hiddenCss + '">';

        if (!data || data.length == 0) {
            return;
        }
        
        var isSuperAdmin = true;
//        if(loginData.getUser().id == "1"){
//        	isSuperAdmin = true;
//        }
        

        $.each(
            data,
            function(index, value) {
                plusMinus = value['children'].length > 0 ? '+' : ' ';

                selected = $.inArray(value[fields[0]], ids) != -1 ? ' checked="checked"' : '';

                html += '<li class="form-multiple-item">';

                html += '<label for="' + fields[1] + value[fields[0]] + '" class="form-multiple-label text-overflow" title="' + value[fields[1]] + '">' +
                    '<span class="plus-minus">' + plusMinus + '</span>' +
                    '<input type="checkbox" class="checkbox" id="' + fields[1] + value[fields[0]] + '" name="' + fields[0] + '" value="' + value[fields[0]] + '"' + selected + disabled + ' />';
                    
                
                if(isSuperAdmin && value[fields[2]]){
                	html +='<span class="checkbox-text">' + value[fields[1]]+' <span style="color:#999">['+ value[fields[2]]+']</span> '+ '</span></label>';
                }else{
                	html +='<span class="checkbox-text">' + value[fields[1]] + '</span></label>';
                }

                if (value['children'].length > 0) {
                    creatList(value['children'], 1);
                }

                html += '</li>';
            }
        )

        html += '</ul>';

    };

};

/* 根据字段获取消重值 */
Common.getValuesArrayByFeild = function(field, data) {
    var result = [];

    $.each(
        data,
        function(index, value) {
            if ($.inArray(value[field], result) != -1) {
                return true;
            }
            result.push(value[field]);
        }
    );

    return result;
};


/* 发送心跳包 */
Common.sendHeartbeatPackets = function(o, serverName) {
    o = o || ws;
    if (!o || o.readyState !== 1) {
        Debug.log('没有websokect对象, 停止发心跳！');
        return null;
    }

    serverName = serverName || 'app';
    var fun = arguments.callee;
    var params = {
        "msgType": 'SERVER_HEARTBEAT_REQ'
    };

    params = Common.getFullData(params);
    params = JSON.stringify(params);

    o.send(params);
    Debug.log('向' + serverName + '服务器发送心跳包：' + params);

    return setTimeout(function() {
        fun(o, serverName)
    }, 25000);
};

/* 上传图片 */
Common.setImagePreview = function(fileId, imgId) {
	var docObj=document.getElementById(fileId);
	var imgObjPreview=document.getElementById(imgId);
	
	if(docObj.files &&docObj.files[0]){
		//火狐下，直接设img属性
		imgObjPreview.style.display = 'block';
		imgObjPreview.style.width = '150px';
		imgObjPreview.style.height = '180px';
		//imgObjPreview.src = docObj.files[0].getAsDataURL();
	
		//火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
		imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);
	}else{
		//IE下，使用滤镜
		docObj.select();
		var imgSrc = document.selection.createRange().text;
		var localImagId = document.getElementById("localImag");
		
		//必须设置初始大小
		localImagId.style.width = "150px";
		localImagId.style.height = "180px";
		
		//图片异常的捕捉，防止用户修改后缀来伪造图片
		try{
			localImagId.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
			localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
		}
		catch(e)
		{
			alert("您上传的图片格式不正确，请重新选择!");
			return false;
		}
		
		imgObjPreview.style.display = 'none';
		document.selection.empty();
	}
};

/* 根据msgType组装完整的JSON (子系统内部通信协议用)*/
Common.getFullData = function(data) {
	var params = data;
	if(window.loginData){
    	params = $.extend({}, loginData.getGDHSInfo(), data, {
    		'sid': loginData.getSID()
    	});
    }

    if (params.securityCode && params.from && params.from.search(/wsclient/) === -1) {
        params.from = 'wsclient_' + params.securityCode + '_' + params.from;
    }

    return params;
};

/* 组装rdtsWS地址 */
Common.getRDTSWSDomain = function(host, port) {
    return 'ws://' + host + ':' + port;
};

/* 从CMD报文中获取值 */
Common.getValueByCMDTransferData = function(data) {
    if (!data) {
        return '';
    }

    var otherLength = 12 * 2;
    return data.substring(otherLength, data.length);
};

(function($, window) {
    /* TAB选项卡 */
    $.fn.tabbox = function(opts) {
        var settings = {
            eventType: 1, //触发事件类型，1为click, 2为hover
            defaultActive: '', //默认激活的id,如果为all则为第一个选项卡打开，内容全部打开,如果为数字的话，则打开对应的索引，索引从0开始
            onChange: function(targetContentId, targetLink, targetContent) {} //点击后的回调函数，第一个参数为当前显示的content元素的ID，第二个参数为当前点击的link元素，第三个参数为当前显示的content元素
        };

        var options = $.extend(settings, opts);

        return this.each(function() {
            var $this = $(this);
            var $links = $this.find('[data-tab-link]');
            var $contents = $this.find('[data-tab-content]');
            var event = (options.eventType == 1 || !options.eventType) ? 'click' : 'mouseover';

            //绑定事件
            $links.bind(event, function(e) {
                var index = $links.index($(this));
                var tagName = $(this).tagName;
                var id = (tagName !== 'A') ? $(this).find('a').attr('href') : $(this).attr('href');

                $links.removeClass('selected');
                $(this).addClass('selected');

                if (options.defaultActive === 'all' && index == 0) {
                    $contents.removeClass('hidden');
                } else {
                    $contents.addClass('hidden');
                    $(id).removeClass('hidden');
                }

                if (typeof options.eventCallback == 'function') {
                    options.eventCallback(id.replace('#', ''), $(this), $(id));
                }
                
                if (typeof options.onChange == 'function') {
                    options.onChange(id.replace('#', ''), $(this), $(id));
                }

                e.preventDefault();
            });

            //触发第一个元素的事件
            var index = 0;
            if (typeof options.defaultActive === 'number') {
                index = options.defaultActive;
            } else if (options.defaultActive && options.defaultActive !== 'all') {
                index = $contents.index($('#' + options.defaultActive));
            }

            var $firstLink = $links.eq(index);
            if (options.eventType == 1 || !options.eventType) {
                $firstLink.click();
            } else {
                $firstLink.mouseover();
            }
        });
    }
    
    /* 按钮切换SwitchButton */
    function SwitchButton(opts) {
        this.options = $.extend({}, this.defaults, opts);
        this.checked = this.options.checked;
        this.disabled = this.options.disabled;
        this.readonly = this.options.readonly;
        this.value = this.options.value;
        
        this.switchButton = this.build();
        
        this.bindEvents();
    }
    
    SwitchButton.prototype = {
        constructor: SwitchButton,
        
        //默认值
        defaults:{
            width: 60,
            height: 26,
            handleWidth: 24,
            checked: true,
            disabled: false,
            readonly: false,
            reversed: false,
            onText: 'ON',
            offText: 'OFF',
            handleText: '',
            value: 1,
            onChange: function(){}
        },
        
        //创建switchButton
        build: function(){
            var switchButton = $('<span class="switchbutton"></span>'),
                switchButtonInner = $('<span class="switchbutton-inner"></span>'),
                switchButtonOn = $('<span class="switchbutton-on">'+this.options.onText+'</span>'),
                switchButtonOff = $('<span class="switchbutton-off">'+this.options.offText+'</span>'),
                switchButtonHandle = $('<span class="switchbutton-handle"></span>'),
                switchButtonCheckbox = $('<input type="checkbox" class="switchbutton-value" value="'+this.options.value+'">');
            
            switchButton.css({
                width: this.options.width + 'px',
                height: this.options.height + 'px'
            });
            
            switchButtonInner.css({
                width: (this.options.width * 2 - this.options.handleWidth) + 'px',
                lineHeight: this.options.height + 'px',
                marginLeft: (!this.options.checked ? -(this.options.width - this.options.handleWidth) : 0) + 'px'
            });
            
            switchButtonOn.css({
                width: this.options.width - (this.options.handleWidth/2) + 'px',
                textIndent: -(this.options.handleWidth/2) + 'px'
            });
            
            switchButtonOff.css({
                width: this.options.width - (this.options.handleWidth/2) + 'px',
                textIndent: (this.options.handleWidth/2) + 'px'
            });
            
            switchButtonHandle.css({
                width: this.options.handleWidth + 'px',
                height: this.options.height + 'px',
                marginLeft: -(this.options.handleWidth/2) + 'px'
            });
            
            switchButtonCheckbox.prop('checked', this.options.checked);
            switchButtonCheckbox.prop('disabled', this.options.disabled);
            switchButtonCheckbox.prop('readonly', this.options.readonly);
            
            this.switchButtonInner = switchButtonInner;
            this.switchButtonCheckbox = switchButtonCheckbox;
            
            switchButtonOn.appendTo(switchButtonInner);
            switchButtonHandle.appendTo(switchButtonInner);
            switchButtonOff.appendTo(switchButtonInner);
            switchButtonCheckbox.appendTo(switchButtonInner);    
            switchButton.append(switchButtonInner);
            
            return switchButton;
        },
        
        //绑定事件
        bindEvents: function(){
            var _this = this;
            this.switchButton.click(function(e){
                
                if(_this.checked){
                    _this.checkHandler();
                }else{
                    _this.uncheckHandler();
                }
                
                if(typeof _this.options.onChange === 'function'){
                    _this.options.onChange(_this.checked);
                }
            });
        },
        
        //选中handler
        checkHandler: function(){
            this.switchButtonInner.animate({marginLeft: -(this.options.width - this.options.handleWidth) + "px"});
            this.checked = false;
        },
        
        //取消选中handler
        uncheckHandler: function(){
            this.switchButtonInner.animate({marginLeft: "0px"});
            this.checked = true;
        },
        
        //设置按钮切换的值
        setValue: function(value){
            this.value = value;
            this.switchButtonCheckbox.val(value);
        },
        
        //选中
        check: function(){
            this.checked = false;
            this.switchButton.click();
        },
        
        //取消选中
        uncheck: function(){
            this.checked = true;
            this.switchButton.click();
        },
        
        //设置为只读
        readonly: function(bool){
            this.switchButtonValue.prop('readonly', bool);
        },
        
        //设置为禁用
        disable: function(){
            this.switchButtonValue.prop('disabled', true);
        },
        
        //设置为启用
        enable: function(){
            this.switchButtonValue.prop('disabled', false);
        },
        
        //返回创建的switchbutton对象(jquery对象)
        getSwitchButton: function(){
            return this.switchButton;
        }
    }
    
    window.SwitchButton = SwitchButton;
    
    /* 创建标签形式的已选择值（用于新增修改页面的电梯选择，派工人员选择等）*/
    function TagUI(opts) {
        this.options = $.extend(true, {}, {
            selectedElement: $('#J_SelectedList'),
            placeholderMsg: '请在右边列表中选择电梯',
            idField: 'id',
            fieldName: 'id',
            groupField: '', //分组字段
            singleSelect: true,
            isSubmitDisabledItem: false,   //禁用数值时，是否提交。默认是false不提交
            showField: {
                text: '', //tag显示文字的字段名，可以是字符串也可以是数组['factoryNO', 'aliasOfAddress']
                title: '' //tag鼠标移上去title显示文字的字段名，可以是字符串也可以是数组
            },
            initIdField: '',
            initShowField: {
                text: '',
                title: ''
            },
            removeTagCallback: null
        }, opts);

        this.data = {}; //数据存储
        this.initSelectedArray = [];
        this.selectedArray = [];
        this.selectedJSONArray = []; //以JSON形式储存已选择项的信息{id:1, disabled: true, isInit: true, groupName:'xxx' }
        this.groupDoms = {}; //装载分组DOM

        this.tagMsg = null;
        this.hiddenInputText = null;
        this.tagsBox = null;

        this.init();
    }

    TagUI.prototype = {
        constructor: TagUI,

        init: function() {
            this._buildPlaceholderMsg();
            this._buildFieldText();
        },

        resetOptions: function(opts) {
            this.options = $.extend(this.options, opts);
        },

        addTag: function(data, isInit, disabled) {
            /* 消重 */
            if ($.inArray(data[this.options.idField], this.getSelectedIdsArray()) != -1) {
                return;
            }

            var _this = this,
                fieldValue = data[this.options.idField],
                title = this.options.showField.title,
                text = this.options.showField.text,
                cssName = 'blue-green',
                isRemove = true,
                groupName = data[this.options.groupField];

            if (isInit) {
                fieldValue = data[this.options.initIdField || this.options.idField];
                title = this.options.initShowField.title || this.options.showField.title;
                text = this.options.initShowField.text || this.options.showField.text;
            }

            if (disabled) {
                cssName = 'default';
                isRemove = false;
            }

            var getFieldValue = function(idField, data) {
                if (typeof idField === 'string') {
                    return data[idField];
                }
                if (idField instanceof Array) {
                    var value = '';
                    var split = ' | ';
                    $.each(
                        idField,
                        function(i, v) {
                            var currentValue = (data[v] || data[v] == 0) ? data[v] : '';
                            value += (i != 0 && currentValue != '' ? split : '') + currentValue;
                        }
                    );
                    return value;
                }
            };

            /* 单选时先删除所有，再追加新的 */
            if (this.options.singleSelect) {
                this.removeTag(this.getSelectedIdsArray());
            }
            
            this.selectedJSONArray.push({
                'fieldValue': fieldValue,
                'isInit': isInit,
                'disabled': disabled,
                'groupName': groupName ? groupName : '未知'
            });

            var removeHTML = isRemove ? '<i title="' + Lang.remove + '" class="icon icon-ui icon-close J_CloseTag"></i>' : '';
            var $tagHTML = $('<span title="' + getFieldValue(title, data) + '" class="tag tag-' + cssName + '" data-id="' + fieldValue + '" data-own-group="'+groupName+'">' + getFieldValue(text, data) + removeHTML + '</span>');
            var $groupBox = null;
            
            /* 绑定移除事件 */
            $tagHTML.find('.J_CloseTag').click(function() {
                var id = $(this).parents('.tag').attr('data-id');
                _this.removeTag(id);

                /* 删除完毕后回调 */
                if (_this.options.removeTagCallback) {
                    _this.options.removeTagCallback(data);
                }
            });
            
            this.hiddenInputText.val(this.getSelectedAvailableIdsString());

            /* 隐藏消息提示 */
            this.tagMsg.addClass('hidden');
            this.options.selectedElement.find('.validate-text').remove();
        	
            var $tagsBox = this._buildTagsBox();
            var num = 0;
            
            //不用分组的情况
        	if(!this.options.groupField){        		
        		var $tagsBoxDOM = this.options.selectedElement.find('.selected-tags');
        		$tagsBox = $tagsBoxDOM.length > 0 ? $tagsBoxDOM : $tagsBox;
        		$tagsBox.append($tagHTML);
        		this.options.selectedElement.append($tagsBox);
        		return;
        	}
        	
        	//分组的情况
        	if(this.groupDoms[groupName]){
            	this.groupDoms[groupName].find('.selected-tags').append($tagHTML);
            	
            	num = this.groupDoms[groupName].data('num') + 1;
            	this.groupDoms[groupName].find('[data-num="true"]').text(num);
            	this.groupDoms[groupName].data('num', num);
            }else{
            	$tagsBox.append($tagHTML);
            	$groupBox = this._getGroupBox(groupName);
            	$groupBox.append($tagsBox);
            	this.options.selectedElement.append($groupBox);
            	this.groupDoms[groupName] = $groupBox;
            	
            	num = 1;
            	this.groupDoms[groupName].find('[data-num="true"]').text(num);	
            	this.groupDoms[groupName].data('num', num);
            }           
        },
        
        /* 删除当前事件 */
        removeTag: function(ids) {
            var _this = this;

            if (typeof ids === 'string' || typeof ids === 'number') {
                ids = [ids];
            }

            $.each(
                ids,
                function(i, v) {
                    /* 过滤不能删除的ID */
                    if (_this._getDisabledValueByID(v)) {
                        return true;
                    }
                    var $current = _this.options.selectedElement.find('.tag[data-id="' + v + '"]');
                    var $currentDom = _this.groupDoms[$current.attr('data-own-group')];
                    var num = 0;
                    if($currentDom){
                    	num = $currentDom.data('num') - 1;
                    	$currentDom.data('num', num);
                    	$currentDom.find('[data-num="true"]').text(num);
                    	if($currentDom.data('num') <= 0){
                    		delete _this.groupDoms[$current.attr('data-own-group')];
                    		$currentDom.remove();
                    	}
                    }
                    $current.remove();
                    _this._removeItemForArray(v);
                    _this.hiddenInputText.val(_this.getSelectedAvailableIdsString());
                }
            );

            /* 显示消息提示 */
            if (this.selectedJSONArray.length === 0) {
                this.tagMsg.removeClass('hidden');
            }

        },
        
        /* 清空所有事件 */
        removeAllTags: function(groupName){
        	var ids = groupName ? this.getIdsByGroupName(groupName) : this.getSelectedIdsArray(); 
        	this.removeTag(ids);
        },

        getSelectedAvailableIdsString: function() {
            return this.getSelectedAvailableIdsArray().join(',');
        },

        getSelectedAvailableIdsArray: function() {
            var arr = [];
            var _this = this;
            $.each(
                this.selectedJSONArray,
                function(i, v) {
                    if (v.disabled && !_this.options.isSubmitDisabledItem) {
                    	return true;
                    }
                    arr.push(v.fieldValue);
                }
            )
            return arr;
        },

        getSelectedIdsString: function() {
            return this.getSelectedIdsArray().join(',');
        },

        getSelectedIdsArray: function() {
            var arr = [];
            $.each(
                this.selectedJSONArray,
                function(i, v) {
                    arr.push(v.fieldValue);
                }
            )
            return arr;
        },
        
        getIdsByGroupName: function(groupName){
        	if(!groupName){
        		return;
        	}
        	
        	var arr = [];
            var _this = this;
            $.each(
                this.selectedJSONArray,
                function(i, v) {
                    if (v.groupName !== groupName) {
                    	return true;
                    }
                    arr.push(v.fieldValue);
                }
            )
            return arr;
        },

        getInitSelectedIdsString: function() {
            return this.getInitSelectedIdsArray.join(',');
        },

        getInitSelectedIdsArray: function() {
            var arr = [];
            $.each(
                this.selectedJSONArray,
                function(i, v) {
                    if (v.isInit) {
                        arr.push(v.fieldValue);
                    }
                }
            )
            return arr;
        },

        _buildPlaceholderMsg: function() {
            var isHidden = this.initSelectedArray.length === 0 ? '' : ' hidden';
            this.tagMsg = $('<span id="J_TagMessage" class="text-muted' + isHidden + '">' + this.options.placeholderMsg + '</span>');
            this.options.selectedElement.append(this.tagMsg);
        },

        _buildFieldText: function() {
            this.hiddenInputText = $('<input type="text" name="' + (this.options.fieldName || this.options.idField) + '" value="" class="opacity ' + this.options.idField + '" id="J_TagHiddenField">');
            this.options.selectedElement.append(this.hiddenInputText);
        },

        _buildTagsBox: function() {
            return  $('<span class="selected-tags"></span>');
        },
        
        _getGroupBox: function(name) {
        	var _this = this;
        	name = name ? name : '未知';
        	var title = this.options.groupTitleTemplate ? this._formatGroupTitle(this.options.groupTitleTemplate, name) : name;
        	var $box = $('<fieldset class="fieldset" data-group-name="'+name+'"><legend class="legend">'+title+'<span class="num">(<em data-num="true">0</em>)</span> <a href="javascript:;" style="margin-left:10px;" data-clear="true">清空</a></legend></fieldset>')
        	
        	$box.find('[data-clear="true"]').click(function(e){
        		_this.removeAllTags(name);
        	});
        		
        	return $box;
        },
        
        _formatGroupTitle: function(template, name){
        	var str = template.replace(/\{\*(.+)\*\}/g, name); //示例： 小区：{*groupField*}
        	return str;
        },

        _inJSONArray: function(value) {
            var index = -1,
                _this = this;
            $.each(
                this.selectedJSONArray,
                function(i, v) {
                    if (v.fieldValue == value) {
                        index = i;
                        return false;
                    }
                }
            );
            return index;
        },

        _getIsInitValueByID: function(id) {
            return this._getfieldValueByID(id, 'isInit');
        },

        _getDisabledValueByID: function(id) {
            return this._getfieldValueByID(id, 'disabled');
        },
        _getSelectedRowByID: function(id) {
            return this._getfieldValueByID(id);
        },
        _getfieldValueByID: function(value, fieldName) {
            var fidldValue = '';

            $.each(
                this.selectedJSONArray,
                function(i, v) {
                    if (v.fieldValue == value) {
                        if (fieldName) {
                            fidldValue = v[fieldName];
                        } else {
                            fidldValue = v;
                        }
                        return false;
                    }
                }
            );
            return fidldValue;
        },

        _removeItemForArray: function(value) {
            if (value === '未知') {
                this.selectedJSONArray = [];
                return;
            }

            if (typeof value === 'string' || typeof value === 'number') {
                value = [value];
            }

            var _this = this;
            $.each(
                value,
                function(i, v) {
                    var index = _this._inJSONArray(v);
                    if (index == -1) {
                        return true;
                    }
                    _this.selectedJSONArray.splice(index, 1);
                }
            );
        }

    }
    window.TagUI = TagUI;


    /* 页面布局构造函数 */
    function LayoutSize() {
        this.init();
        //this.bindEvents();
        this.initNumber = 0;
        this.firstAutoHeight = 0;
        this.lastAutoHeight = 0;
    }

    LayoutSize.prototype = {
        constructor: LayoutSize,
        init: function() {
            this.initNumber++;
            this.resetSize();
            this.setColLeftHeight();

            if ($('[data-rule="resize"]').length > 0) {
                if ($('[data-rule="resize"]').attr('data-set-height') == 'true') {
                    this.setResizeHeight(true);
                } else {
                    this.setResizeHeight();
                }
            } else if ($('[data-rule="resizeSimple"]').length > 0) {
                this.setResizeSimpleHeight();
            }

            if ($('[data-rule="resizeDatagrid"]').length > 0) {
                this.setResizeDatagridHeight();
            }
        },

        bindEvents: function() {
            var resizeTimer = null;
            var _this = this;
            $(window).resize(function(e) {
                if (resizeTimer) {
                    clearTimeout(resizeTimer);
                }
                resizeTimer = setTimeout(function() {
                    _this.init();
                }, 500);
            });
        },

        resetSize: function() {
            this.winWidth = $(window).outerWidth(true);
            this.winHeight = $.browser.msie && $.browser.version <= 8 ? $(window).outerHeight(true) - 4 : $(window).outerHeight(true);
            this.headerHeight = $('#J_Header').length !== 0 ? $('#J_Header').outerHeight(true) : 0;
            this.footerHeight = $('#J_Footer').length !== 0 ? $('#J_Footer').outerHeight(true) : 0;
            this.mainHeight = $('#J_Main').length !== 0 ? $('#J_Main').outerHeight(true) : 0;
            this.colLeftHeight = $('#J_ColLeft').length !== 0 ? $('#J_ColLeft').outerHeight(true) : 0;
            this.colMainHeight = $('#J_ColMain').length !== 0 ? $('#J_ColMain').outerHeight(true) : 0;
        },

        getViewMainHeigth: function() {
            return this.winHeight - this.headerHeight - this.footerHeight - this.getPadding(document.body) * 2;
        },
        getShellHeight: function() {
            return this.getHeight('#J_Shell');
        },
        getCategoriesHeight: function() {
            return this.getHeight('#J_Categories');
        },
        getSearchFormHeight: function() {
            return this.getHeight('#J_SearchForm');
        },
        getToolBarHeight: function() {
            return this.getHeight('#J_ToolBar');
        },
        getBoxHeadingHeight: function() {
            return this.getHeight('#J_BoxHeading');
        },
        getBoxFooterHeight: function() {
            return this.getHeight('#J_BoxFooter');
        },
        getAutoMainHeight: function() {
            var h = Math.max(this.colLeftHeight, this.colMainHeight, this.getViewMainHeigth());

            //记录第一次的自动高
            if (this.initNumber == 1) {
                this.firstAutoHeight = h;
            }

            //记录最后一次的自动高
            else {
                this.lastAutoHeight = h;
            }

            return h;
        },
        getResizeHeight: function() {
            return this.getAutoMainHeight() - this.getShellHeight() - this.getCategoriesHeight() - this.getBoxHeadingHeight() - this.getSearchFormHeight() - this.getToolBarHeight() - this.getBoxFooterHeight() - this.getBorder('#J_Box') * 2 - this.getPadding('#J_BoxBody') * 2;
        },
        getResizeSimpleHeight: function() {
            return this.getAutoMainHeight() - this.getShellHeight() - this.getBoxHeadingHeight() - this.getBoxFooterHeight() - this.getBorder('#J_Box') * 2 - this.getPadding('#J_BoxBody') * 2;
        },
        getResizeDatagridHeight: function() {
            return this.getAutoMainHeight() - this.getShellHeight() - this.getHeight('#J_BlockHeading') - this.getHeight('#J_SearchForm') - this.getBorder('#J_BoxLayout') * 2 - 2;
        },
        getColLeftHeight: function() {
            return this.getAutoMainHeight() - this.getMargin('#J_ColLeft') - this.getPadding('#J_ColLeft');
        },
        getPartOfResizeHeight: function(self, parent, elements) {
            var getElementsHeight = function(e) {
                if (!e) {
                    return 0;
                }

                var h = 0;
                if (e instanceof Array) {
                    $.each(
                        e,
                        function(i, v) {
                            h += v.outerHeight(true);
                        }
                    );
                } else {
                    return e.outerHeight(true);
                }
                return h;
            }

            if ((getElementsHeight(elements) + self.height()) > this.getResizeHeight() - this.getShellHeight() - this.getBoxFooterHeight()) {
                this.init();
                return self.height();
            }

            return this.getAutoMainHeight() - this.getShellHeight() - this.getBoxFooterHeight() - this.getBorder(parent) * 2 - this.getMargin(parent) - this.getHeight(parent.find('.block-heading')) - this.getPadding(parent.find('.block-body')) * 2 - getElementsHeight(elements);
        },
        setResizeHeight: function(height) {
            if (height) {
                $('[data-rule="resize"]').css('height', this.getResizeHeight() + 'px');
                return;
            }
            $('[data-rule="resize"]').css('min-height', this.getResizeHeight() + 'px');
        },
        setResizeSimpleHeight: function() {
            $('[data-rule="resizeSimple"]').css('min-height', this.getResizeSimpleHeight() + 'px');
        },
        setResizeDatagridHeight: function() {
            $('[data-rule="resizeDatagrid"]').css('min-height', this.getResizeDatagridHeight() + 'px');
        },
        setColLeftHeight: function() {
            $('#J_ColLeft').css('min-height', this.getColLeftHeight() + 'px');
        },
        setColLeftHeightByColMain: function() {
            this.colMainHeight = $('#J_ColMain').outerHeight(true);
            $('#J_ColLeft').css('min-height', (this.colMainHeight - 2) + 'px');
        },
        setPartOfResizeHeight: function(self, parent, elements) {
            self = self ? self : $('[data-rule="partOfResize"]');
            self.css('min-height', this.getPartOfResizeHeight(self, parent, elements) + 'px');
        },
        getBorder: function(element) {
            if (!element || $(element).length == 0) {
                return 0;
            }
            return $(element).css('border-top-width').replace(/px/g, '') * 1;
        },
        getPadding: function(element) {
            if (!element || $(element).length == 0) {
                return 0;
            }
            return $(element).css('padding-top').replace(/px/g, '') * 1;
        },
        getMargin: function(element) {
            if (!element || $(element).length == 0) {
                return 0;
            }
            var marginBottom = $(element).css('margin-bottom');
            if (marginBottom == 'auto') {
                return 0;
            }
            return marginBottom.replace(/px/g, '') * 1;
        },
        getHeight: function(element) {
            if (!element || $(element).length == 0) {
                return 0;
            }
            return $(element).outerHeight(true);
        }
    }
    window.LayoutSize = LayoutSize;

    /* 文本输入框UI */
    function InputUI($e, opts) {
        this.options = $.extend({}, InputUI.prototype.defaults, opts);
        this.elements = $e || $('.input-text[data-input-ui!="false"]');
        this.init();
    }

    InputUI.prototype = {
        constructor: InputUI,

        defaults: {
            placeholder: true,
            clearButton: true,
            inputWrapElement: $('<span class="input-ui-box"></span>'),
            placeholderElement: $('<span class="placeholder-text"></span>'),
            clearButtonElement: $('')
        },

//        <span class="icon icon-clear">×</span>
        
        init: function() {
            this.setUI();
        },

        /* 增加placehoder */
        addPlaceholder: function() {
            this.elements.each(function(index, element) {
                if ($(this).parent().find('.placeholder-text').length) {
                    $(this).parent().find('.placeholder-text').show();
                    return;
                }
                var $placeholder = $('<span class="placeholder-text"></span>'),
                    $this = $(this);

                $placeholder.text($this.attr('placeholder'));
                $placeholder.click(function() {
                    $this.focus();
                });

                if ($(this).val()) {
                    $placeholder.hide();
                }

                $placeholder.appendTo($this.parent());
            });
        },

        /* 删除placehoder */
        removePlaceholder: function() {
            this.elements.each(function(index, element) {
                $(this).parent().find('.placeholder-text').hide();
            });
        },

        /* 清除输入框文本的按钮 */
        addClearValue: function($e) {
            var _this = this;
            if ($e.parent().find('.icon-clear').length) {
//                $e.parent().find('.icon-clear').show();
                return;
            }
            var $clearValue = $('>'),
//            <span class="icon icon-clear">×</span
                $getInputWidth = $e.outerWidth(),
                isSupportPlaceholder = InputUI.isSupportPlaceholder();

            $clearValue.css('left', ($getInputWidth - 25) + 'px');
            $clearValue.appendTo($e.parent());

            $clearValue.click(function() {
                $e.val('').focus();
                $(this).hide();
                if (!isSupportPlaceholder) {
                    _this.addPlaceholder($e);
                }
            })
        },

        /* 移除清除输入框文本的按钮 */
        removeClearValue: function($e) {
            $e.parent().find('.icon-clear').hide();
        },

        /* 设置清除输入框中的值的button */
        setClearValueButton: function() {
            var _this = this;
            this.elements.keyup(function() {
                var $this = $(this);
                if ($this.val()) {
                    _this.addClearValue($this);
                } else {
                    _this.removeClearValue($this);
                }
            }).blur(function() {
                var $this = $(this);
                if ($this.val()) {
                    _this.addClearValue($this);
                }
            }).focus(function() {
                var $this = $(this);
                if ($this.val()) {
                    _this.addClearValue($this);
                }
            })
        },
        /* 设置placeholder */
        setPlaceholder: function(v) {
            var text = $(v).attr('placeholder');
            $(v).after(this.options.placeholderElement.clone().text(text));
        },

        /* 设置清除按钮 */
        setClearButton: function(v) {
            var $e = $(v);
            var $added = this.options.clearButtonElement.clone();
            var value = $e.val();

            $added.addClass('hidden');

            $e.after($added);

            $added.click(function(e) {
                $(this).parent('.input-ui-box').find('input').val('').focus();
            })
        },

        /* 设置包裹元素（input父级） */
        setInputWrap: function(v) {
            var $e = $(v);
            var $added = this.options.inputWrapElement.clone();

            $e.wrap($added);
        },

        /* 绑定事件 */
        bindEvents: function(v) {
            var $e = $(v);
            var $eParent = $e.parent('.input-ui-box');
            var $clearButton = $eParent.find('.icon');
            var $placeholder = $eParent.find('.placeholder-text');
            var handler = function(value) {
                if (value !== '') {
                    $placeholder.addClass('hidden');
                    $clearButton.removeClass('hidden');
                } else {
                    $placeholder.removeClass('hidden');
                    $clearButton.addClass('hidden');
                }
            };

            if ($e.val() !== '') {
                $placeholder.addClass('hidden');
                $clearButton.removeClass('hidden');
            }

            $e.keyup(function() {
                handler($(this).val());
            })
                .blur(function() {
                    handler($(this).val());
                })
                .focus(function() {
                    handler($(this).val());
                });
        },

        /* 设置UI */
        setUI: function(element) {
            var _this = this;
            var isDisabled = false;
            $.each(
                element || _this.elements,
                function(i, v) {
                    isDisabled = $(v).prop('disabled') || $(v).prop('readonly');
                    _this.setInputWrap(v);
                    if (_this.options.placeholder && !InputUI.isSupportPlaceholder()) {
                        _this.setPlaceholder(v);
                    }

                    if (!isDisabled && _this.options.clearButton) {
                        _this.setClearButton(v);
                    }

                    _this.bindEvents(v);
                }
            );

        }
    }
    /* 是否支持HTML5属性placeholder */
    InputUI.isSupportPlaceholder = function() {
        return 'placeholder' in document.createElement('input');
    }
    window.InputUI = InputUI;

    /* Dialog对话框 */
    function Dialog(option) {
        this._option = $.extend(true, {
            showMask: true, //是否显示遮罩
            title: "&nbsp;", //对话框标题
            content: "&nbsp;", //对话框内容
            tips: '&nbsp;', //小提示信息，显示在按钮左边
            width: "auto", //宽
            height: "auto", //高
            mediaBox: false, //视频对话框，用于dialog-body样式 
            autoOpen: false, //是否初始化后自动打开
            buttons: [], //按钮,[{text:"确定", click:function(){}, styleName:'btn-default'}]
            onClose: function() {}, //关闭时的回调

            drag: true, //是否可拖动

            isForm: false, //是否创建表单
            formID: '', //表单ID
            elements: null, //表单参数
            grid: false, //是否横着排

            isLoad: false, //是否load
            loadWrapper: null, //load进来的元素的包裹元素: $('<form id="xxxx" action="xxxx.do" method="post"></form>')
            url: '', //如果有url则load进来
            params: null, //参数
            onloadsuccess: function(target){}//load回调
        }, option);
        if (this._option.showMask) {
            this._masker = this.__getMasker().appendTo("body");
        }
        this._dialog = this.__buildDialog();

        if (this._option.drag) {

            this.__bindEventOfDrag();
        }

        if (this._option.autoOpen) {
            this.open();
        }
    };
    Dialog.prototype = {
        constructor: Dialog,
        defaults: {
            minHeight: 25, //窗口内容最小高度
            minWidth: 300, //窗口内容最小宽度
            space: 100 //窗口距离屏幕边缘边距
        },
        __buildDialog: function() {
            var jqWin = $(window),
                scrW = window.innerWidth || jqWin.width(),
                scrH = window.innerHeight || jqWin.height(),
                dlg = this.__getDialog(),
                header = this.__getHeader(this._option.title),
                closer = this.__getCloser(),
                con = this.__getContenter(),
                body = $("body").append(con),
                tips = this.__getFooterTips(this._option.tips),
                footer = this.__getFooter(),
                defs = Dialog.prototype.defaults,
                space = defs.space,
                minW = defs.minWidth,
                minH = defs.minHeight,
                conW,
                conH,
                scroll = body[0].getBoundingClientRect(),
                buttons = this._option.buttons,
                buttonLength = buttons.length,
                w = this._option.width,
                h = this._option.height,
                dlgW = w,
                dlgH = h;


            conW = Math.max(minW, typeof w === 'string' ? minW : w);
            conW = Math.min(conW, scrW - space * 2);
            conH = Math.max(minH, typeof h === 'string' ? minH : h);
            conH = Math.min(conH, scrH - header.outerHeight() - footer.outerHeight() - space * 2);

            con.width(conW).height(conH);

            dlg.hide();

            dlg.append(header.append(closer)).append(con);

            if (buttonLength) {
                dlg.append(footer.append(tips).append(this.__getButtonPanel(buttons)));
            }

            dlg.appendTo(body);

            dlg.append($('<iframe style="width:100%;height:100%;position:absolute;top:0;z-index:-1;border:0;" frameborder="0"></iframe>'));

            if (w === 'auto') {
                con.width('auto');
            }
            if (h === 'auto') {
                con.height('auto');
            }

            dlgW = dlg.outerWidth();
            dlgH = dlg.outerHeight();
            dlg.css({
                left: Math.floor((scrW) / 2 - (dlgW / 2)),
                top: Math.floor((scrH) / 2 - (dlgH / 2))
                //marginLeft: -(Math.floor(dlgW / 2)),
                //marginTop: -(Math.floor(dlgH / 2))
            });
            
            /* 解决浏览器缩放dialog会自动适应宽度 */
            $(window).resize(function() {
            	dlgW = dlg.outerWidth();
                dlgH = dlg.outerHeight();
                var winWidth = $(window).width();
                var winHeight = $(window).height();
            	dlg.css({
                     left: Math.floor((winWidth) / 2 - (dlgW / 2)),
                     top: Math.floor((winHeight) / 2 - (dlgH / 2))
                 });
            });

            dlg.css('z-index', this.__getZIndex(2));
            return dlg;
        },
        __getDialog: function() {
            return $("<div class='dialog'></div>");
        },
        __getContenter: function() {
            var html = this._option.content;

            //加载表单或str 
            if (this._option.isForm === true) {
                var formUI = new FormUI({
                    formID: this._option.formID,
                    action: this._option.action,
                    elements: this._option.elements,
                    grid: this._option.grid
                });
                html = formUI.getStrForm();
            }

            var dialogbodycss = this._option.mediaBox ? 'dialog-body-media' : '';
            
            if (html instanceof jQuery) {
            	var $body = $('<div class="dialog-body '+dialogbodycss+'"></div>');
                html.appendTo($body);

                return $body;
            }

            return $('<div class="dialog-body '+dialogbodycss+'">' + html + '</div>');
        },
        __getHeader: function(title) {
            return $("<div class='dialog-heading'></div>").append("<h3 class='dialog-title'>" + title + "</h3>");
        },
        __getCloser: function() {
        	var _this = this;
            return $("<span href='javascript:;' class='dialog-close'>x</span>").click(function(){
            	_this.close();
            });
        },
        __getMasker: function() {
            var mask = $("<div class='mask'></div>");
            mask.css('z-index', this.__getZIndex(1));
            mask.hide();
            if ($.browser.msie && $.browser.version.indexOf("6") === 0) {
                var rect = document.body.getBoundingClientRect();
                mask.css({
                    height: rect.bottom - rect.top
                });
            }
            return mask;
        },
        __getButtonPanel: function(buttons) {
            var panel = $("<div data-dialog-buttons='true' class='dialog-actions'></div>"),
                i = 0,
                l = buttons.length;
            for (; i < l; i++) {
                panel.append(this.__getButton(buttons[i]));
            }
            return panel;
        },
        __getButton: function(button) {
            return $("<button type='button' class='btn btn-middle " + button.styleName + "'><span><span>" + button.text + "</span></span></button>").click($.proxy(function(f, e) {
                if (typeof f === "function") {
                    f(this, e);
                }
            }, this, button.click));
        },
        __getFooter: function() {
            return $('<div class="dialog-footer"></div>');
        },
        __getFooterTips: function(tips) {
            return $('<div class="dialog-tips"></div>').html(tips);
        },
        __setLoadData: function() {
            //load页面
        	var loadWrapper = this._dialog.find('.dialog-body');
        	if(this._option.loadWrapper){
        		loadWrapper = this._option.loadWrapper;
        		this._dialog.find('.dialog-body').append(this._option.loadWrapper);
        	}
            if (this._option.isLoad === true && this._option.url) {
                var mask = $('<div class="loadingbox"><i class="icon icon-loading"></i>Loading, please wait…</div>');
                var _this = this;
                mask.appendTo(loadWrapper);
                loadWrapper.load(this._option.url, this._option.params, function(data) {
                	mask.hide();
                    if (data) {
                    	if(typeof _this._option.onloadsuccess === 'function'){
                    		_this._option.onloadsuccess(loadWrapper.contents());
                    	}
                    }
                })
            }
        },
        __getZIndex: function(type) {
            /*
             * 1: mask, 2: dialog;
             */
            type = type || 2;

            var zIndexs = [996];

            $('.dialog').each(function(i, o) {
                zIndexs.push($(o).css('z-index') * 1);
            });

            zIndexs.sort(function(a, b) {
                return b - a;
            });

            if (type === 1) {
                return zIndexs[0] + 1;
            }

            return zIndexs[0] + 2;
        },
        __bindEventOfDrag: function() {
            var M = false;
            var F = true;
            var Rx, Ry;
            var b = this._dialog;
            var t = b.find('.dialog-heading');

            t.css('cursor', 'move')
                .mousedown(function(event) {
                    $(document.body).addClass('disabled-select');
                    $(document.body).bind('selectstart', function() {
                        return false;
                    });
                    if ($(event.target).hasClass('dialog-close')) {
                        M = false;
                        return false;
                    }

                    Rx = event.pageX - (b.css("left").replace('px', '') * 1);
                    Ry = event.pageY - (b.css("top").replace('px', '') * 1);
                    M = true;
                    //b.css("position", "absolute").fadeTo(20, 0.9);

                })
                .mouseup(function(event) {
                    $(document.body).removeClass('disabled-select');
                    $(document.body).unbind('selectstart');
                    M = false;
                    //b.fadeTo(20, 1);
                });

            $(document).mousemove(function(event) {
                var x = event.pageX - Rx;
                var y = event.pageY - Ry;
                var xMin = 0;
                var yMin = 0;
                var xMax = $(window).width() - b.width();
                var yMax = $(window).height() - b.height();

                if (event.pageX <= 0 || event.pageY <= 0 || event.pageX >= $(window).width() || event.pageY > $(window).height()) {
                    F = false;
                    M = false;
                } else {
                    F = true;
                }
                
                if (M && F) {
                    if (x <= xMin) {
                        x = 0;
                    } else if (x >= xMax) {
                        x = xMax;
                    }

                    if (y <= yMin) {
                        y = 0;
                    } else if (y >= yMax) {
                        y = yMax;
                    }

                    b.css({
                        top: y,
                        left: x
                    });
                }
            }).mouseup(function(event){
                if(event.pageX != Rx || event.pageY != Ry){
                    M = false;
                }
            });
        },
        open: function() {
            if (this._option.showMask) {
                this._masker.show();
            }
            this._dialog.show();
            this._dialog.attr("tabindex", -1).focus(); //获得焦点

            if (this._option.isLoad === true) {
                this.__setLoadData();
            }
        },
        hide: function() {
        	if (this._option.showMask) {        		
        		this._masker.hide();
        	}
            this._dialog.hide();
        },
        //关闭窗口
        close: function() {
            var close = this._option.onClose(this);
            if (typeof close === "boolean" && !close) {
                return;
            }
            this.remove();
        },
        remove: function(){
        	if (this._option.buttons.length) {
                this._dialog.find("[data-dialog-buttons]").contents().unbind("click");
            }
            this._dialog.find(".dialog-close").unbind("click");
            this._dialog.remove();
            if (this._option.showMask) {
                this._masker.remove();
            }
        },
        getDialogElement: function() {
            return this._dialog;
        }
    };
    window.Dialog = Dialog;


    /* 打开一个简单对话框 */
    function simpleDialog(content, title) {
        var dialog = new Dialog({
            width: 200,
            title: title || "温馨提示",
            content: content,
            buttons: [{
                text: "确定",
                click: function(d) {
                    d.close();
                }
            }]
        });

        dialog.open();
    }
    window.simpleDialog = simpleDialog;

    /* 打开一个消息对话框 */
    function msgDialog(content, title, iconClass, callback) {
        var dialog = new Dialog({
            width: 200,
            title: title || "温馨提示",
            content: (iconClass ? '<i class="icon icon-' + iconClass + '"></i>' : '') + content
        });

        dialog.open();

        window.setTimeout(function() {
            dialog.close();
            if (typeof callback == 'function') {
                callback();
            }
        }, 1500);
    }
    window.msgDialog = msgDialog;

    /* 打开一个确认对话框 */
    function confirmDialog(content, title, callback) {
        var dialog = new Dialog({
            width: 200,
            title: title || "温馨提示",
            content: content,
            buttons: [{
                text: "确定",
                styleName: 'btn-success',
                click: function(d) {
                    if (callback && typeof callback == 'function') {
                        callback(d);
                    }
                    d.close();
                }
            }, {
                text: "取消",
                click: function(d) {
                    d.close();
                }
            }]
        });

        dialog.open();
    }
    window.confirmDialog = confirmDialog;

    /* 消息提示框 */
    function Tips(opts) {
        this.options = $.extend(true, {
            title: "&nbsp;", //对话框标题
            content: "&nbsp;", //对话框内容
            width: "auto", //宽
            height: "auto", //高
            drag: true, //是否可拖动
            autoOpen: false, //是否初始化后自动打开
            buttons: [], //按钮,[{text:"确定", click:function(){}, styleName:'btn-default'}]
            onClose: function() {} //关闭时的回调
        }, opts);

        this.tips = this.__buildTips();

        if (this.options.drag) {
            this.__bindEventOfDrag();
        }

        if (this.options.autoOpen) {
            this.open();
        }
    }

    Tips.prototype = {
        constructor: Tips,
        __buildTips: function() {
            var $tipsBox = this.__getTipsBox();
            var $tips = this.__getTips();
            var $tipsTitle = this.__getTitle();
            var $tipsClose = this.__getCloser();
            var $tipsContent = this.__getContent();
            var $tipsFooter = this.__getFooter();

            for (var i = 0; i < this.options.buttons.length; i++) {
                $tipsFooter.append(this.__getButton(this.options.buttons[i]));
            }

            $tipsClose.prependTo($tipsTitle);
            $tipsTitle.appendTo($tips);
            $tipsContent.appendTo($tips);
            $tipsFooter.appendTo($tips);
            $tips.hide().appendTo($tipsBox);

            $tipsBox.appendTo($(document.body));

            return $tips;
        },
        __getTipsBox: function() {
            return $('<div class="tips-box" style="overflow:visible"></div>');
        },
        __getTips: function() {
            return $('<div class="tips"></div>');
        },
        __getTitle: function() {
            return $('<div class="tips-heading"><h2 class="tips-title">' + this.options.title + '</h2></div>');
        },
        __getContent: function() {
            return $('<div class="tips-content">' + this.options.content + '</div>');
        },
        __getFooter: function() {
            return $('<div class="tips-footer" data-dialog-buttons="true"></div>');
        },
        __getButton: function(button) {
            return $('<button class="btn btn-small btn-warning"><span><span>' + Lang.handle + '</span></span></button>').click($.proxy(function(f, e) {
                if (typeof f === "function") {
                    f(this, e);
                }
            }, this, button.click));
        },
        __getCloser: function() {
        	var _this = this;
            return $('<span href="javascript:;" class="tips-close">x</span>').click(function(){
            	_this.close();
            });
        },
        __bindEventOfDrag: function() {
            var M = false;
            var F = true;
            var Rx, Ry;
            var b = this.tips.parents('.tips-box');
            var t = b.find('.tips-heading');

            t.css('cursor', 'move')
                .mousedown(function(event) {
                    $(document.body).addClass('disabled-select');
                    $(document.body).bind('selectstart', function() {
                        return false;
                    });
                    if ($(event.target).hasClass('dialog-close')) {
                        M = false;
                        return false;
                    }

                    Rx = event.pageX - (b.css("left").replace('px', '') * 1);
                    Ry = event.pageY - (b.css("top").replace('px', '') * 1);
                    M = true;
                    //b.css("position", "absolute").fadeTo(20, 0.9);

                })
                .mouseup(function(event) {
                    $(document.body).removeClass('disabled-select');
                    $(document.body).unbind('selectstart');
                    M = false;
                    //b.fadeTo(20, 1);
                });

            $(document).mousemove(function(event) {
                var x = event.pageX - Rx;
                var y = event.pageY - Ry;
                var xMin = 0;
                var yMin = 0;
                var xMax = $(window).width() - b.width();
                var yMax = $(window).height() - b.height();

                if (event.pageX <= 0 || event.pageY <= 0 || event.pageX >= $(window).width() || event.pageY > $(window).height()) {
                    F = false;
                    M = false;
                } else {
                    F = true;
                }
                
                if (M && F) {
                    if (x <= xMin) {
                        x = 0;
                    } else if (x >= xMax) {
                        x = xMax;
                    }

                    if (y <= yMin) {
                        y = 0;
                    } else if (y >= yMax) {
                        y = yMax;
                    }

                    b.css({
                        top: y,
                        left: x
                    });
                }
            }).mouseup(function(event){
                if(event.pageX != Rx || event.pageY != Ry){
                    M = false;
                }
            });
        },
        open: function() {
            var tipsHeight = this.tips.outerHeight(true);
            this.tips.parents('.tips-box').height(tipsHeight);
            //this.tips.height(tipsHeight);
            this.tips.css({
                top: tipsHeight
            });
            this.tips.show();
            this.tips.animate({
                top: 0
            }, 800);
            this.tips.attr("tabindex", -1).focus(); //获得焦点
        },
        close: function() {
        	var close = this.options.onClose(this);
            var tipsHeight = this.tips.outerHeight(true);
			var $tipsbox = this.tips.parents('.tips-box');
			var tipsboxOverflow = $tipsbox.css('overflow');

            if (typeof close === "boolean" && !close) {
                return;
            }
            if (this.options.buttons.length) {
                this.tips.find("[data-tips-buttons]").contents().unbind("click");
            }
            this.tips.find(".tips-close").unbind("click");
			
			if(tipsboxOverflow == 'visible'){
				this.tips.fadeOut(800, $.proxy(function() {
					$tipsbox.remove();
				}, this));
				return;
			}
			
            this.tips.animate({
                top: tipsHeight
            }, 800, $.proxy(function() {
                $tipsbox.remove();
            }, this));
        }
    };
    window.Tips = Tips;

    /* 右下角的消息提示框 */
    function rightBottomTips(title, content, callback) {
        var tips = new Tips({
            title: title,
            content: content,
            width: 280,
            buttons: [{
                text: Lang.handle,
                click: callback,
                styleName: 'btn-warning'
            }]
        });
        tips.open();
        return tips;
    }
    window.rightBottomTips = rightBottomTips;

    /*********
      根据时间搓格式化时间日期
      时间格式化函数
      dateTime:字符串
      format:需要返回的格式有('y-m-d', 'y-m-d h:m:s', 'y-m-d h:m', 'y/m/d', 'y/m/d h:m:s', 'y/m/d h:m')，默认值为：y-m-d h:m:s
    *********/
    function getFormatTime(dateTime, format) {
        if (!dateTime) {
            return '';
        }
        var date = 0;

        if (typeof dateTime == 'string' && dateTime.indexOf('Date') != -1) {
            date = new Date(parseInt(dateTime.replace("/Date(", "").replace(")/", ""), 10));
        } else {
            date = new Date(dateTime);
        }

        if (date < 0) {
            return '';
        }

        var year = date.getFullYear(),
            month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1,
            day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
            hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
            min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
            sec = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

        var formatObject = ['y-m-d', 'y-m-d h:m:s', 'y-m-d h:m', 'y/m/d', 'y/m/d h:m:s', 'y/m/d h:m'],
            i = 0,
            length = formatObject.length,
            index = 1;

        if ($.inArray(format, formatObject) != -1) {
            index = $.inArray(format, formatObject);
        }

        switch (index) {
            case 0:
                return year + '-' + month + '-' + day;
                break;
            case 1:
                return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
                break;
            case 2:
                return year + '-' + month + '-' + day + ' ' + hour + ':' + min;
                break;
            case 3:
                return year + '/' + month + '/' + day;
                break;
            case 4:
                return year + '/' + month + '/' + day + ' ' + hour + ':' + min + ':' + sec;
                break;
            case 5:
                return year + '/' + month + '/' + day + ' ' + hour + ':' + min;
                break;
        }
    }
    window.getFormatTime = getFormatTime;

    //截取日期
    function getCuttingDate(dataTime) {
        if (!dataTime) {
            return '';
        }
        return dataTime.split(' ')[0];
    }
    window.getCuttingDate = getCuttingDate;

    /* 获取数量元素 
	num:数量
	menuNO:属性data-menu-number等于menuNO的元素
	cssName:数量的样式
	isFlashing:是否闪动
	*/
    function fillCountElement(num, menuNO, cssName, isFlashing) {
        cssName = cssName || 'tag-default';
        isFlashing = isFlashing || false;

        if (num == 0) {
            cssName = 'tag-default';
            isFlashing = false;
        }

        var $sup = $('<sup class="tag ' + cssName + '">' + num + '</sup>');
        var timeId = 0;
        var $element = null;
        
        if (menuNO instanceof jQuery) {
            $element = menuNO;
        } else {
            $element = $('[data-menu-number="' + menuNO + '"] a');
        }
        
        //赋值数量
        if($element.find('.tag').length > 0){
            $sup = $element.find('.tag');
            $sup.attr('class', 'tag ' + cssName).text(num);
        }else{
            $element.append($sup);
        }

        //闪动
        if (isFlashing) {
            timeId = setTimeout(function() {
                if ($sup.hasClass('invisible')) {
                    $sup.removeClass('invisible');
                } else {
                    $sup.addClass('invisible');
                }
                setTimeout(arguments.callee, 300);
            }, 300);
        }

        return timeId;
    }
    window.fillCountElement = fillCountElement;
    
    /* 模糊搜索和精确搜索切换 */
    function changeEventOfSwitchButton(opts)
    {
    	var _this = this;
    	var options = $.extend({}, this.defaults, opts);
    	btnId = options.btnId || "J_SearchSubmit";
    	//初始化重置按钮样式
    	$resetDiv = $("<div class='button-switch-reset'><div>");
    	$searchBtn = $("#"+btnId);
    	$parentDiv = $searchBtn.parent();
    	$parentForm = $searchBtn.closest("form");
    	$resetBtn = $parentDiv.find("button[type='reset']");
    	$moreSwitch = $parentDiv.find("span[class=switch-link]");
    	$resetDiv.append($resetBtn).append($moreSwitch.addClass("switch-left"));
    	
    	$blurSearch = $("<button type='submit' class='btn-back J_BlurSearch'><span><span>搜&nbsp;索</span></span></button>");
    	$accurateSearch = $("<button type='submit' class='btn-back J_AccurateSearch'><span><span>精确搜索</span></span></button>");
    	$iconBlurSwitch = $("<i class='icon icon-white icon-chevron-down J_IconBlurSwitch'></i>");
    	
    	$btnSwitchDiv = $("<div class = 'button-switch-item'></div>");
    	
    	$blurSearchDiv = $("<div class='button-item  J_BlurButton'></div>");	
    	$accurateSearchDiv = $("<div class='button-item button-item-top J_AccurateButton'></div>");
    	
    	$blurSearchDiv.append($blurSearch).append($iconBlurSwitch);
    	$accurateSearchDiv.addClass("hidden").append($accurateSearch);
    	$btnSwitchDiv.append($blurSearchDiv).append($accurateSearchDiv);
    	
    	$parentDiv.html("").append($btnSwitchDiv).append($resetDiv);
    	Common.addHiddenField({'isAccurate': 0},$parentForm);
    	
    	$iconBlurSwitch.click(function(){
    		if($(this).hasClass("icon-chevron-down"))
			{
    			$(this).removeClass("icon-chevron-down").addClass("icon-chevron-up");
    			$accurateSearchDiv.removeClass("hidden");
			}
    		else
			{
    			$(this).removeClass("icon-chevron-up").addClass("icon-chevron-down");
    			$accurateSearchDiv.addClass("hidden");
			}
    	});
    	
    	$accurateSearchDiv.click(function(){
    		//更换button和样式
    		var $button = $(this).find("button");
    		$(this).find("button").remove();
    		$(this).prepend($blurSearchDiv.find("button"));
    		$blurSearchDiv.find("button").remove();
    		$blurSearchDiv.prepend($button);
    		if($button.hasClass("J_BlurSearch"))
			{
    			Common.addHiddenField({'isAccurate': 0},$parentForm);
    			if(options.blurSearchEvent)
				{
    				options.blurSearchEvent();
				}
			}
    		else
			{
    			Common.addHiddenField({'isAccurate': 1},$parentForm);
    			if(options.accurateSearchEvent)
				{
    				options.accurateSearchEvent();
				}
			}
    		//收起选择框
    		$iconBlurSwitch.click();
    	});
    	
    }
    window.changeEventOfSwitchButton = changeEventOfSwitchButton;
    
    
    
    
    /* 更多筛选 */
    function bindEventOfMoreSwitch(openCallback, closeCallback) {
        $('[data-switch-title]').click(function() {
            var $targetElement = $('[data-switch-content="' + $(this).attr('data-switch-title') + '"]');
            var $this = $(this);
            if ($targetElement.hasClass('hidden')) {
                $targetElement.removeClass('hidden');
                $this.find('[data-switch-icon]').removeClass('s-down').addClass('s-up');

                if (typeof openCallback == 'function') {
                    openCallback();
                }
            } else {
                $targetElement.addClass('hidden');
                $this.find('[data-switch-icon]').removeClass('s-up').addClass('s-down');

                if (typeof closeCallback == 'function') {
                    closeCallback();
                }
            }


        });
    }
    window.bindEventOfMoreSwitch = bindEventOfMoreSwitch;


})(jQuery, window);

(function (factory) {
	  if (typeof define === "function" && define.amd) {
	    define(["jquery", 'common'], factory);
	  } else {
	    factory(jQuery);
	  }
	}(function ($, udf) {
	  'use strict';

	  // 保存实例化对象的data键
	  var datakey = 'jquery-progressbar';
	  var defaults = {
	    url: 'xxxx.do', //请求地址
	    value: 0, //初始值
	    time: 5, // 以秒为单位的请求间隔时间
	    type: 'percent', //类型：percent百分比，timer:计时器
	    queryParams: {}, //请求参数
	    taskId: Common.randomCode(3, 35),
	    onsuccess: function(data){}, //异步加载成功
	    oncomplete: function (data) {}, //进度100%完成要干的事
	    onerror: function (data) {
	        
	    }
	  };

	  $.fn.progressbar = function (settings) {
	    var $this = this;
	    // 当前第1个参数为字符串
	    var run = $.type(settings) === 'string',
	      // 获取运行方法时的其他参数
	      args = [].slice.call(arguments, 1),
	      // 复制默认配置
	      options = $.extend({}, defaults),
	      // 运行实例化方法的元素
	      $element,
	      // 实例化对象
	      instance;

	    // 运行实例化方法，第1个字符不能是“_”
	    // 下划线开始的方法皆为私有方法
	    if (run && run[0] !== '_') {
	      if (!this.length) return;

	      // 只取集合中的第1个元素
	      $element = $(this[0]);

	      // 获取保存的实例化对象
	      instance = $element.data(datakey);

	      // 若未保存实例化对象，则先保存实例化对象
	      if (!instance) $element.data(datakey, instance = new ProgressBar($element[0], options).__init());

	      // 防止与静态方法重合，只运行原型上的方法
	      // 返回原型方法结果，否则返回undefined
	      return ProgressBar.prototype[settings] ? ProgressBar.prototype[settings].apply(instance, args) : udf;
	    }

	    // instantiation options
	    else if (!run) {
	      // 合并参数
	      options = $.extend(options, settings);
	    }

	    return this.each(function () {
	      var element = this,
	        instance = $(element).data(datakey);

	      // 如果没有保存实例
	      if (!instance) {
	        // 保存实例
	        $(element).data(datakey, instance = new ProgressBar(element, options).__init());
	      }
	    });
	  };

	  // 暴露插件的默认配置
	  $.fn.progressbar.defaults = defaults;

	  // 构造函数
	  function ProgressBar(element, options) {
	    this.$element = $(element);
	    this.options = options;
	    this.processed = 0;
	    this.total = 0;
	    this.progressBar = null;
	  }

	  // 原型方法，驼峰写法
	  ProgressBar.prototype = {
	    constructor: ProgressBar,

	    // 初始化
	    __init: function () {
	      this.progressBar = this.__getProgressBox();
	      
	      this.$element.append(this.progressBar);
	      
	      var _this = this;
	      var handler = function(){
	    	  if((_this.total !== 0) && (_this.processed === _this.total)){
		          //进度百分百后的回调函数
		          if(typeof _this.options.oncomplete === 'function'){
		            _this.options.oncomplete(_this.processed, _this.total);
		          }
		          
		          return;
		        }
		        
		        _this.__queryData();
		        
		        setTimeout(handler, _this.options.time * 1000);
	      }
	      
	      handler();
	      
	      return this;
	    },
	    
	    // 获取进度条
	    __getProgressBox: function(){
	      if(this.options.type === 'percent'){
	    	  return $('<div class="progress"><div class="progress-bar" style="width:'+this.options.value+'%">'+this.options.value+'%</div></div>');
	      }else if(this.options.type === 'timer'){
	    	  return $('<div class="progress"><div class="progress-bar" style="width:'+this.options.value+'%">'+this.options.value+'%</div></div>');
	      }
	    },
	    
	    //更新进度
	    updateProgress: function(processed, total){
	      this.processed = processed;
	      this.total = total;
	      
	      var _this = this;
	      var num = ((processed / total) * 100).toFixed(2);
	      var $progressBar = this.progressBar.find('.progress-bar');
	      $progressBar.text(num+'%').css('width', num+'%');
	    },

	    __queryData: function () {
	      var _this = this;
	      $.ajax({
	        url: _this.options.url,
	        data: $.extend({}, {taskId: _this.options.taskId}, _this.options.queryParams),
	        type: 'post',
	        cache: false,
	        dataType: 'json',
	        success: function (data) {
	        data = Common.stringToJSON(data);  
        	if (data) {
	            var flag = true;
	            if (typeof _this.options.onsuccess === 'function') {
	              flag = _this.options.onsuccess(data);
	            }

	            if(flag === false){
	              return;
	            }
	            
	            _this.updateProgress(data.processed, data.total);
	          }
	        },
	        error: function () {
	          
	        }
	      });
	    },

	    // 设置或获取选项
	    options: function (key, val) {
	      // get
	      if ($.type(key) === 'string' && val === udf) return this.options[key];

	      var map = {};
	      if ($.type(key) === 'object') map = key;
	      else map[key] = val;

	      this.options = $.extend(this.options, map);
	    }
	  };
	}));

//兼容不支持原生JSON对象的浏览器
! function() {
    function f(t) {
        return 10 > t ? "0" + t : t
    }

    function this_value() {
        return this.valueOf()
    }

    function quote(t) {
        return rx_escapable.lastIndex = 0, rx_escapable.test(t) ? '"' + t.replace(rx_escapable, function(t) {
            var e = meta[t];
            return "string" == typeof e ? e : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + t + '"'
    }

    function str(t, e) {
        var r, n, f, o, i, u = gap,
            a = e[t];
        switch (a && "object" == typeof a && "function" == typeof a.toJSON && (a = a.toJSON(t)), "function" == typeof rep && (a = rep.call(e, t, a)), typeof a) {
            case "string":
                return quote(a);
            case "number":
                return isFinite(a) ? String(a) : "null";
            case "boolean":
            case "null":
                return String(a);
            case "object":
                if (!a) return "null";
                if (gap += indent, i = [], "[object Array]" === Object.prototype.toString.apply(a)) {
                    for (o = a.length, r = 0; o > r; r += 1) i[r] = str(r, a) || "null";
                    return f = 0 === i.length ? "[]" : gap ? "[\n" + gap + i.join(",\n" + gap) + "\n" + u + "]" : "[" + i.join(",") + "]", gap = u, f
                }
                if (rep && "object" == typeof rep)
                    for (o = rep.length, r = 0; o > r; r += 1) "string" == typeof rep[r] && (n = rep[r], f = str(n, a), f && i.push(quote(n) + (gap ? ": " : ":") + f));
                else
                    for (n in a) Object.prototype.hasOwnProperty.call(a, n) && (f = str(n, a), f && i.push(quote(n) + (gap ? ": " : ":") + f));
                return f = 0 === i.length ? "{}" : gap ? "{\n" + gap + i.join(",\n" + gap) + "\n" + u + "}" : "{" + i.join(",") + "}", gap = u, f
        }
    }
    if (!window.JSON) {
        window.JSON = {};
        var rx_one = /^[\],:{}\s]*$/,
            rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
            rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
            rx_four = /(?:^|:|,)(?:\s*\[)+/g,
            rx_escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        }, Boolean.prototype.toJSON = this_value, Number.prototype.toJSON = this_value, String.prototype.toJSON = this_value);
        var gap, indent, meta, rep;
        "function" != typeof JSON.stringify && (meta = {
            "\b": "\\b",
            "	": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        }, JSON.stringify = function(t, e, r) {
            var n;
            if (gap = "", indent = "", "number" == typeof r)
                for (n = 0; r > n; n += 1) indent += " ";
            else "string" == typeof r && (indent = r); if (rep = e, e && "function" != typeof e && ("object" != typeof e || "number" != typeof e.length)) throw new Error("JSON.stringify");
            return str("", {
                "": t
            })
        }), "function" != typeof JSON.parse && (JSON.parse = function(text, reviver) {
            function walk(t, e) {
                var r, n, f = t[e];
                if (f && "object" == typeof f)
                    for (r in f) Object.prototype.hasOwnProperty.call(f, r) && (n = walk(f, r), void 0 !== n ? f[r] = n : delete f[r]);
                return reviver.call(t, e, f)
            }
            var j;
            if (text = String(text), rx_dangerous.lastIndex = 0, rx_dangerous.test(text) && (text = text.replace(rx_dangerous, function(t) {
                return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
            })), rx_one.test(text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
                "": j
            }, "") : j;
            throw new SyntaxError("JSON.parse")
        })
    }
    
    
    Common.getChannelStatus = function(num){
    	num = Common.stringToNumber(num);
    	switch(num){
    		case 1 :
    			return '<span class="tag tag-success tag-width">启用</span>';
    			break;
    		case 0 :
    			return '<span class="tag tag-danger tag-width">停用</span>';    			
    			break;
    		default :
    			return num;
    	}
    }
    Common.getStrategyStatus = function(num){
    	num = Common.stringToNumber(num);
    	switch(num){
    		case 2 :
				return '<span class="tag tag-success tag-width">激活</span>';
				break;
    		case 1 :
    			return '<span class="tag tag-brown tag-width">暂停</span>';
    			break;
    		case 0 :
    			return '<span class="tag tag-danger tag-width">关闭</span>';    			
    			break;
    		default :
    			return num;
    	}
    }
    
    Common.getAdvertisingStatus = function(num){
    	num = Common.stringToNumber(num);
    	switch(num){
    		case 1 :
    			return '<span class="tag tag-success tag-width">正常</span>';
    			break;
    		case 0 :
    			return '<span class="tag tag-danger tag-width">停用</span>';    			
    			break;
    		default :
    			return num;
    	}
    }
    Common.getUpgradeStatus = function(num){
    	num = Common.stringToNumber(num);
    	switch(num){
    		case 3 :
    			return '<span class="tag tag-primary tag-width">停用</span>';
    			break;
    		case 4 :
    			return '<span class="tag tag-success tag-width">发布</span>';
    			break;
    		case 2 :
    			return '<span class="tag tag-success">审核通过</span>';
    			break;
    		case 1 :
    			return '<span class="tag tag-blue-green tag-width">审核中</span>';
    			break;
    		case 0 :
    			return '<span class="tag tag-brown tag-width">暂存</span>';    			
    			break;
    		case -1 :
				return '<span class="tag tag-danger tag-width">打回</span>';
				break;
    		default :
    			return num;
    	}
    }

}();