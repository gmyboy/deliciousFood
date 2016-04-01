(function() {
	var MsgId = MsgId || {}
	/* 实时数据消息ID */
	MsgId.RunData = 0x0065;
	MsgId.Event = 0x0061;
	MsgId.VideoHeader = 0x0071;
	MsgId.VideoFlow = 0x0072;
	MsgId.AudioHeader = 0x0081;
	MsgId.AudioFlow = 0x0083;
	
    /* 协议类 */
    function Protocol(protocols) {
        if (!hasProtocals()) {
            return;
        }
        this.protocols = protocols || PROTOCOLS;
        this.Map = new Map(this.protocols);
    };
    Protocol.prototype = {
        constructor: Protocol,
        getCtrlTypeVersion: function(ctrlType){
            return this.Map.getValueByKeyValue('ctrlTypeVersion', 'ctrlType', ctrlType);
        },
        getCtrlTypeDescribe: function(ctrlType){
            return this.Map.getValueByKeyValue('describe', 'ctrlType', ctrlType);
        },
        getProductFactory: function(ctrlType){
            return this.Map.getValueByKeyValue('productFactory', 'ctrlType', ctrlType);
        },
        getProtocolTags: function(ctrlType) {
            var ctrlDataProtocolTags = this.Map.getValueByKeyValue('ctrlDataProtocolTags', 'ctrlType', ctrlType);
            if(!isArray(ctrlDataProtocolTags)){
                return ctrlDataProtocolTags;
            }
            return ctrlDataProtocolTags.sort(function(a, b) { return a.value - b.value || ctrlDataProtocolTags.indexOf(a) - ctrlDataProtocolTags.indexOf(b); });
        },
        getTagName: function(ctrlType, tagValue) {
            var protocolTags = this.getProtocolTags(ctrlType);
            return this.Map.getValueByKeyValue('name', 'value', tagValue, protocolTags);
        },
        getSamplingPeriod: function(ctrlType, tagValue) {
            var protocolTags = this.getProtocolTags(ctrlType);
            return this.Map.getValueByKeyValue('samplingPeriod', 'value', tagValue, protocolTags);
        },
        getTagDescribe: function(ctrlType, tagValue) {
            var protocolTags = this.getProtocolTags(ctrlType);
            return this.Map.getValueByKeyValue('describe', 'value', tagValue, protocolTags);
        },
        getProtocolValue: function(ctrlType, tagValue) {
            var protocolTags = this.getProtocolTags(ctrlType);
            var protocolValue = this.Map.getValueByKeyValue('ctrlDataProtocolValues', 'value', tagValue, protocolTags);

            if(!isArray(protocolValue)){
                return protocolValue;
            }
            
            return protocolValue.sort(function(a, b) { return a.seq - b.seq || protocolValue.indexOf(a) - protocolValue.indexOf(b); });
        },
        getTagValues: function(ctrlType) {
            var protocolTags = this.getProtocolTags(ctrlType);
            return this.Map.getValuesByKey('value', protocolTags);
        }
    };
    window.Protocol = Protocol;


    /* 数据源类 */
    function DataSource(dataSource) {
        this.dataSource = null;
        this.realTimeDataArray = null;
        //this.base64 = new Base64();

        if (dataSource) {
            this.init(dataSource);
        }
    };
    DataSource.prototype = {
        constructor: DataSource,
        init: function(data) {
            this.addData(data);
        },
        addData: function(data) {
            if (!data.transferData) {
                return;
            }

            //var realTimeData = '00-2B-00-65-00-00-00-34-50-39-4B-4D-4C-31-41-4A-32-5A-48-41-38-4A-49-01-02-00-10-00-00-00-01-00-32-06-40-06-40-03-E8-13-88-00-3C';
            //var realTimeData = this.base64.decodeHex(data.transferData);
            //this.realTimeDataArray = realTimeData.split('-');

            this.realTimeDataArray = splitStr(data.transferData, 2);
            this.dataSource = data;
        },
        getObj: function() {
            /* 设备运行数据 */
            if (this.getMsgId() == MsgId.RunData) {
                return {
                    'dataLength': this.getDataLength(),
                    'msgId': this.getMsgId(),
                    'protocolVersion': this.getProtocolVersion(),
                    'encryptedVersion': this.getEncryptedVersion(),
                    'securityCodes': this.getSecurityCodes(),
                    'targetDeviceId': this.getTargetDeviceId(23, 24),
                    'tagValue': this.getTagValue(),
                    'getRunDataLength': this.getRunDataLength(),
                    'runDatas': this.getRunDataArray(),
                    'realTimeDataArray': this.getData()
                };
            }

            /* 设备事件数据 */
            if (this.getMsgId() == MsgId.Event) {
                return {
                    'dataLength': this.getDataLength(),
                    'msgId': this.getMsgId(),
                    'protocolVersion': this.getProtocolVersion(),
                    'encryptedVersion': this.getEncryptedVersion(),
                    'targetDeviceId': this.getTargetDeviceId(7, 8),
                    'eventId': this.getEventId(),
                    'eventStauts': this.getEventStatus()
                };
            }

        },
        getData: function() {
            return this.realTimeDataArray;
        },
        getDataLength: function() {
            var result = this.getPartDataArray(0, 2);
            return result ? parseFormat(result.join(''), 1) : 0;
        },
        getMsgId: function() {
            var result = this.getPartDataArray(2, 4);
            return result ? parseFormat(result.join(''), 1) : 0;
        },
        getProtocolVersion: function() {
            var result = this.getPartDataArray(4, 5);
            return result ? parseFormat(result.join(''), 1) : 0;
        },
        getEncryptedVersion: function() {
            var result = this.getPartDataArray(5, 6);
            return result ? parseFormat(result.join(''), 1) : 0;
        },
        getKeepField: function() {
            var result = this.getPartDataArray(6, 7);
            return result ? parseFormat(result.join(''), 1) : 0;
        },
        getTargetDeviceId: function(start, end) {
            if (this.dataSource.tdSerial) {
                return this.dataSource.tdSerial;
            }

            var result = this.getPartDataArray(start, end);
            return result ? parseFormat(result.join(''), 1) : 0;
        },

        /* 安全码 */
        getSecurityCodes: function() {
            return this.getPartDataArray(7, 23);
        },
        /* 目标设备编号 */
        getTdSerial: function(){
            var result = this.getPartDataArray(23, 24);
            return result ? parseFormat(result.join(''), 1) : 0;
        },
        getTagValue: function() {
            var result = this.getPartDataArray(24, 25);
            return result ? parseFormat(result.join(''), 1) : 0;
        },
        getRunDataLength: function() {
            var result = this.getPartDataArray(25, 27);
            return result ? parseFormat(result.join(''), 1) : 0;
        },
        getRunDataArray: function() {
            return this.getPartDataArray(27, 27 + this.getRunDataLength());
        },
        getPartDataArray: function(index, length) {
            return this.realTimeDataArray ? this.realTimeDataArray.slice(index, length) : null;
        },

        /* 设备事件消息 */
        getEventId: function() {
            return this.getPartDataArray(8, 9) * 1;
        },
        getEventStatus: function() {
            return this.getPartDataArray(9, 10) * 1;
        }

    };
    window.DataSource = DataSource;

    /* 实时数据解析类 */
    function DataParsing(obj) {
        //this.parsedData = [];
        this.parsedData = {};
        this.currentTagValue = 0;
        this.protocol = new Protocol();
        this.base64 = new Base64();
        this.init(obj);
    };

    DataParsing.prototype = {
        constructor: DataParsing,

        /* 初始化函数 */
        init: function(obj) {
            this.addData(obj);
        },

        /* 造数据格式 */
        buildDataFormat: function(id, ctrlType) {
            if (!id || !ctrlType) {
                return;
            }

            var _this = this;
            if (_this.parsedData[id]) {
                return;
            }

            _this.parsedData[id] = {};
            var tagsValue = _this.protocol.getTagValues(ctrlType);
            each(
                tagsValue,
                function(i, v) {
                    _this.parsedData[id][v] = [];
                }
            )
        },

        /**
         * 向对象追加实时数据
         * @input 实时数据源、协议类型组成的Obj:{'id': getID(), dataSource': {...}, 'ctrlType': 1}
         **/
        addData: function(obj) {
            if (!obj) {
                return;
            }

            var _this = this;
            var id = obj.id;
            var data = obj.dataSource;
            var dataSource = null;
            var ctrlType = obj.ctrlType;

            if (isObject(data)) {
                dataSource = (new DataSource(data)).getObj();
                
                this.currentTagValue = dataSource.tagValue;
                //Debug.log('透传数据初步解析：', dataSource);
                _this.buildDataFormat(id, ctrlType);
                if (!dataSource.runDatas.length) {
                    //Debug.log('运行数据为空，已返回，请检查getRunDataLength', '');
                    return;
                }
                _this.parseData(dataSource.runDatas, id, ctrlType, dataSource.tagValue);
                //Debug.log('根据协议解析：', _this.parsedData);
                return;
            }

            if (isArray(data)) {
                each(
                    data,
                    function(i, o) {
                        dataSource = (new DataSource(o)).getObj();
                        _this.buildDataFormat(id, ctrlType);
                        if (!dataSource.runDatas.length) {
                            //Debug.log('运行数据为空，已返回，请检查getRunDataLength', '');
                            return;
                        }
                        _this.parseData(dataSource.runDatas, id, ctrlType, dataSource.tagValue);
                        //Debug.log('根据协议解析：', _this.parsedData);
                    }
                );
            }
        },
        /**
         * 获取解析后实时数据队列中的第一个数据
         * @input 唯一ID
         * @return 数组对象
         **/
        getFirstData: function(id, tagValue) {
        	var data = this.getDataByIdAndTagValue(id, tagValue);
        	
        	if(data && (data instanceof Array)){
        		return data.shift();
        	}
        	
        	return null;
        },

        /**
         * 获取解析后实时数据队列中的所有数据
         * @input 唯一ID
         * @return 数组对象
         **/
        getItemAll: function(id) {
            return this.parsedData[id];
        },

        getAllData: function() {
            return this.parsedData;
        },
        /**
         * 根据ID获取实时数据
         * @input 唯一ID
         * @return 对象
         **/
        getDataByIdAndTagValue: function(id, tagValue) {
            return this.parsedData[id][tagValue];
        },
        /**
         * 根据ID、协议类型、实时数据解析数据添加到队列里
         * @input 唯一ID, 实时数据, 协议类型
         **/
        parseData: function(data, id, ctrlType, tagValue) {
            var _this = this;

            var protocolContent = _this.protocol.getProtocolValue(ctrlType, tagValue);
            if (!protocolContent) {
                return;
            }

            var tagList = _this.getDataByIdAndTagValue(id, tagValue);
            tagList.push(getProtocolsArray(data));

            function getProtocolsArray(d) {
                var list = [];
                var byte = '';
                var bit = '';
                
                each(
                    protocolContent,
                    function(i, o) {
                    	byte = d.slice(o.byteIndex, (o.byteIndex + o.length));
                    	bit = o.lengthUnit == 2 ? parseToBits(d)[o.byteIndex] : '';
                    	if (o.endian == 2) {
                    		byte.reverse();
                        }
                    	
                        list.push({
                        	'name': trim(o.name),
                        	'functionCode': trim(o.functionCode),
                        	'lengthUnit': o.lengthUnit,
                        	'length': o.length,
                        	'byteIndex': o.byteIndex,
                        	'bitIndex': o.bitIndex,
                        	'bit': bit,
                        	'byte': byte,
                        	'endian': o.endian,
                        	'transferDataType': o.transferDataType,
                        	'transferMethod': o.transferMethod,
                        	'transferContent': o.transferContent ? _this.base64.decode(o.transferContent) : null,
                    		'value': _this.getValue(o, d),
                            'escapeValue': _this.getEscapeValue(o, d),
                            'unit': trim(o.valueUnit)
                        });
                    }
                );
                
                return list;
            }
        },
        /**
         * 根据转值类型转换后的值，转义方式与转义内容获取最终要显示的值
         * @input 转值类型转换后的值，转义方式，转义内容
         * @return 最终显示在页面的值
         **/
        getTransferContent: function(value, transferMethod, transferContent) {
            /*  transferMethod 转义方式
            1: 不转换
            2: 精度转换
            3: 值枚举
            4: 范围枚举
            5: 日期
            6: 将数字补零后拆分为两位数一组并取值枚举后合并为最终的值
            */
            transferContent = transferContent ? this.base64.decode(transferContent) : null;

            if (transferMethod == 1) {
                return value;
            }

            if (transferMethod == 2) {
                var floatStr = transferContent + '',
                    indexof = floatStr.indexOf('.'),
                    str = floatStr.substr(indexof+1),
                    len = str.length;
                
                return (value * transferContent).toFixed(len);
            }

            if (transferMethod == 3) {
                transferContent = isString(transferContent) ? JSON.parse(transferContent) : transferContent;
                return transferContent ? transferContent[value] : '';
            }

            if (transferMethod == 4) {
                transferContent = isString(transferContent) ? JSON.parse(transferContent) : transferContent;
                var fValue = '';

                each(
                    transferContent,
                    function(i, o) {
                        if (value >= o.minValue && value <= o.MaxValue) {
                            fValue = o.value;
                            return false;
                        }
                    }
                );

                return fValue;
            }

            if (transferMethod == 5) {
                return formatDate(value);
            }
            
            
            if (transferMethod == 6){
                value = fillZero(value + '', 4);
                if(!value){
                	Debug.log('value值不存在：');
                	return;
                }
                var valueSplit = [value.substring(0, 2), value.substring(2, 4)];
                transferContent = isString(transferContent) ? JSON.parse(transferContent) : transferContent;
                return transferContent ? transferContent[valueSplit[0]] + transferContent[valueSplit[1]] : '';
            }

            return value;
        },
        /**
         * 根据协议获取原始值
         * @input 协议对象，实时数据源
         * @return 原始值
         **/
        getOriginalValue: function(row, data) {

            var byteIndex = row.byteIndex,
                bitIndex = row.bitIndex,
                length = row.length,
                lengthUnit = row.lengthUnit,
                endian = row.endian;
            /*	lengthUnit 长度单位
            1: 字节
            2: bit位
            */
            lengthUnit = lengthUnit || 1;
            if (lengthUnit == 1) {
                var result = data.slice(byteIndex, (byteIndex + length));

                //如果小端则翻转
                if (endian == 2) {
                    result.reverse();
                }
                
                //如果为plc小端
                if(endian == 4){
                	result = [result[2], result[3], result[0], result[1]];
                }
                
                return result.join('');
            }

            if (lengthUnit == 2) {
                var str = parseToBits(data)[byteIndex];

                if (!str) {
                    return '';
                }
                return str.substr(str.length - bitIndex - length, length);
            }

            return '';
        },
        
        /**
         * 获取转义后的值
         * @input 一行协议数据, 实时数据源 '00-01-01-00-00-00-00-00-AF-0A-BE-01-11-00-10-10'
         * @return 转换后的值
         **/
        getEscapeValue: function(row, data) {
            var originalValue = this.getOriginalValue(row, data);
            return parseFormat(originalValue, row.transferDataType);
        },
        /**
         * 获取最终显示值
         * @input 一行协议数据, 实时数据源 '00-01-01-00-00-00-00-00-AF-0A-BE-01-11-00-10-10'
         * @return 转换后的值
         **/
        getValue: function(row, data) {
            var escapeValue = this.getEscapeValue(row, data);
            return this.getTransferContent(escapeValue, row.transferMethod, row.transferContent);
        },
        getCurrentTagValue: function() {
            return this.currentTagValue;
        },
        /* 内召 */
        getInnerData: function(data) {
            if(!data || data.length == 0){
                return;
            }
            
            var floors = [];

            for (var i = 0; i < data.length; i++) {               
                var v = data[i].value;
                
                var tobit = fillZero(v.toString(2)+'', 8).split('').reverse(); //翻转
                
                for (var j = 0; j < tobit.length; j++) {
                    if (tobit[j] == 1) {
                        floors.push((j + tobit.length * i) + 1);
                    }
                }
            }
            return floors;
        },
        /* 外召（上下召）*/
        getOuterData: function(data) {
            if(!data || data.length == 0){
                return;
            }
            
            var floorsUp = [],
                floorsDown = [];

            var getGroup = function(str) {
                var newArray = [];

                for (var i = 0; i < str.length / 2; i++) {
                    newArray.push(str.substring(i * 2, i * 2 + 2));
                }
                return newArray;
            }
            
            for (var i = 0; i < data.length; i++) {
                var v = data[i].value;
                var tobit = fillZero(Number(v).toString(2)+'', 8).split('').reverse().join(''); //翻转
                
                tobit = getGroup(tobit);
                for (var j = 0; j < tobit.length; j++) {
                    if (tobit[j][0] == 1) {
                        floorsUp.push((j + tobit.length * i) + 1);
                    }
                    if (tobit[j][1] == 1) {
                        floorsDown.push((j + tobit.length * i) + 1);
                    }
                }
            }
            return {
                'callUp': floorsUp,
                'callDown': floorsDown
            };
        }
    }
    window.DataParsing = DataParsing;

    /* 地图类 */
    function Map(obj) {
        this.obj = obj;
    };
    Map.prototype = {
        constructor: Map,
        getValueByKey: function(key, obj) {
            obj = obj || this.obj;
            if (!obj) {
                return null;
            }
            return obj[key];
        },
        getValueByKeyValue: function(key, key1, value1, obj) {
            obj = obj || this.obj;
            if (!obj) {
                return null;
            }
            var result = null;

            each(
                obj,
                function(i, o) {
                    if (o[key1] == value1) {
                        result = o[key];
                        return false;
                    }
                }
            );

            return result;
        },
        getValuesByKey: function(key, obj) {
            obj = obj || this.obj;
            if (!obj) {
                return null;
            }
            var result = [];
            var _this = this;
            each(
                obj,
                function(i, o) {
                    result.push(_this.getValueByKey(key, o));
                }
            );

            return result;
        },
        getValuesByKeyValue: function(key, key1, value1, obj) {
            obj = obj || this.obj;
            if (!obj) {
                return null;
            }
            var result = [];
            var _this = this;
            each(
                obj,
                function(i, o) {
                    result.push(_this.getValueByKeyValue(key, key1, value1, o));
                }
            );

            return result;
        }
    };

    /**
     * 转有符号十进制
     * @input 原始值
     * @return 有符号的十进制值
     **/
    function toMinusDecimal(data) {
        var firstBit = data.substr(0, 1);
        if (firstBit == "0") {
            return "+" + parseInt(data.substr(1, data.length - 1), 2).toString();
        }
        var secondBit = data.substr(1, data.length - 1).split('');
        for (var i = 0; i < secondBit.length; i++) {
            if (secondBit[i] == '1') secondBit[i] = '0';
            else secondBit[i] = '1';
        }

        var jinwei = false;
        for (var i = secondBit.length - 1; i > 0; i--) {
            if (i == secondBit.length - 1) {
                if (secondBit[i] == '1') {
                    jinwei = true;
                    secondBit[i] = '0';
                } else {
                    secondBit[i] = '1';
                    break;
                }
            } else if (jinwei) {
                if (secondBit[i] == '1') {
                    jinwei = true;
                    secondBit[i] = '0';
                } else {
                    secondBit[i] = '1';
                    break;
                }
            }

        }

        return "-" + parseInt(secondBit.join(''), 2).toString();
    };

    /**
     * 16制作转字符串
     * @input 原始值
     * @return 字符串
     **/
    function hexToString(str) {
        var val = "";
        if (!str) {
            return val;
        }
        var arr = splitStr(str, 2);
        for (var i = 0; i < arr.length; i++) {
            val += String.fromCharCode(parseInt(to8Bit(arr[i]), 2));
        }

        return val;
    };

    /**
     * 转成8位的二进制
     * @input 二进制
     * @return 8位的二进制
     **/
    function to8Bit(s) {
        var bitStr = parseInt(s, 16).toString(2);

        while (bitStr.length < 8) {
            bitStr = "0" + bitStr;
        }

        return bitStr;
    };

    function each(obj, callback) {
        if (isArray(obj)) {
            for (var i = 0; i < obj.length; i++) {
                callback(i, obj[i]);
            }
            return;
        }

        if (isObject(obj)) {
            for (var i in obj) {
                callback(i, obj[i]);
            }
            return;
        }
    };

    function isArray(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    };

    function isObject(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    };

    function isString(obj) {
        return Object.prototype.toString.call(obj) === '[object String]';
    };

    /**
     * 将实时数据转成字节数组
     * @input 实时数据源
     * @return 实时数据源数组
     **/
    function parseToBytes(data) {
        return data.split('-');
    };

    /**
     * 将实时数据转成bit位数组
     * @input 实时数据源
     * @return 实时数据源转成bit位的数组
     **/
    function parseToBits(data) {
        var byteLength = data.length;
        var bitArray = [];

        if (byteLength == 0) {
            return;
        }

        for (var i = 0; i < byteLength; i++) {
            bitArray.push(to8Bit(data[i]));
        }

        return bitArray;
    };

    /**
     * 解析格式
     * @input 原始值，转值类型
     * @return 转换后的值
     **/
    function parseFormat(value, parseType) {
        /*	parseType 转值类型
        1: 无符号十进制
        2: 有符号十进制
        3: 二进制
        4: 字符串
        5: ASC码
        6: BCD码
        7: 单精度浮点数
        */
    	if(value == ''){
    		Debug.log('对应的字节未找到！');
    		return '';
    	}
    	
        if (parseType == 1) {
            return parseInt(value, 16);
        }
        if (parseType == 2) {
            return toMinusDecimal(value);
        }
        if (parseType == 3) {
            return value;
        }
        if (parseType == 4) {
            return hexToString(value);
        }
        if (parseType == 5) {
            return value;
        }
        if (parseType == 7) {
        	var bits = '';
        	var bytes = splitStr(value, 2);
        	for(var i=0, len=bytes.length; i<len; i++){
        		bits += to8Bit(bytes[i]);
        	}
        	
            return toFloatValue(bits);
        }

        return value;
    };
    
    /*2进制转单精度浮点数*/
    function toFloatValue(data) {
    	if(data != null && data != ""){
    		var dataVal = data;
    		var len = dataVal.length;
    		if(len == 32){
    			var firstBit = data.substr(0, 1);
    			var numBit = data.split('');
    				var values = 0;
    				var mi = 1;
    				for (var i = 8; i > 0; i--) {
    						values = values + numBit[i] * mi;
    						mi = mi * 2;
    					}
    				var yiwei = values - 127;
    				var arr = new Array();
    				if(yiwei > 0){
    					if(yiwei > 23){
    						//补全尾数,没有小数
    						for(var k = 0;k < yiwei - 23 ; k++){
    							numBit[k + 32] = 0;
    						}
    						//整数部分
        					arr[0]=1;
        					for(var j = 0;j < yiwei;j++){
        						arr[j + 1]=numBit[j + 9];
        					}
        					var theInt = arr.join("");
        					if (firstBit == "0") {
        						return parseInt(theInt, 2);
                			}else{
                				return parseInt("-" + parseInt(theInt, 2).toString());
                			}
    					}else{
    						//整数部分
        					arr[0]=1;
        					for(var j = 0;j < yiwei;j++){
        						arr[j+1]=numBit[j+9];
        					}
        					var theInt = arr.join("");
        					var theIntValue = parseInt(theInt, 2);
        					//小数部分
        					var deciVal = 0;
        					var deci = 0.5;
            				for (var n = 9 + yiwei; n < 32; n++) {
            					deciVal = deciVal + numBit[n] * deci;
            					deci = deci * 0.5;
            				}
            				var result = theIntValue + deciVal;
            				//保留6位小数
            				if (firstBit == "0") {
        						return result.toFixed(6);
                			}else{
                				return parseInt("-" + result.toFixed(6).toString());
                			}
    					}
    				}else{
    					var arrFu = new Array();
    					var arrTemp = new Array();
    					for(var m = 0; m < 127 - values; m++){
    						arrFu[m] = 0;
    					}
    					var chazhi = 127 - values;
    					arrFu[chazhi] = 1;
    					for(var j = 1;j < 24;j++){
    						arrFu[j + chazhi]=numBit[j+8];
    					}
    					//小数部分
    					var deciVal = 0;
    					var deci = 0.5;
        				for (var n =1; n < arrFu.length; n++) {
        					deciVal = deciVal + arrFu[n] * deci;
        					deci = deci * 0.5;
        				}
        				 if(yiwei < 0){
        					//保留6位小数
             				if (firstBit == "0") {
         						return deciVal.toFixed(6);
                 			}else{
                 				return parseInt("-" + deciVal.toFixed(6).toString());
                 			}
        				 }else{
        					 deciVal = deciVal + 1;
        					//保留6位小数
             				if (firstBit == "0") {
         						return deciVal.toFixed(6);
                 			}else{
                 				return parseInt("-" + deciVal.toFixed(6).toString());
                 			}
        				 }
    				}
    			}else{
    				return "";
    			}
    		}else{
				return "";
			}
        };

    function formatDate(now) {
        var beijingTime = 8 * 60 * 60,
            date = new Date((now - beijingTime) * 1000),
            year = date.getFullYear(),
            month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1,
            day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
            hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
            minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
            seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

        return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
    };

    function splitStr(str, num) {
        if (!str) {
            return null;
        }
        num = num || 1;

        if (num == 1) {
            return str.split('');
        }

        var result = [];
        var i = 0;

        while (i < str.length) {
            result.push(str.substring(i, i + num));
            i += num;
        }

        return result;
    };

    /* 判断是否有协议 */
    function hasProtocals() {
        if (!window.PROTOCOLS) {
            Debug.log('没有找到协议文件或协议内容为空!');
            return false;
        }
        return true;
    }
    
    /* 字符补零 */
    function fillZero(str, len){
        if(!str){
            return;
        }
        if(!len){
            return str;
        }
        var strLen = str.length;
        if(strLen < len){
            for(var i=0; i < len - strLen; i++){
                str = '0' + str;
            }
        }
        return str;
    }
    
    /* 去空格 */
    function trim(str){
    	if(typeof str !== 'string'){
    		return;
    	}
    	
    	return str.replace(/(^\s*)|(\s*$)/g, '');
    }
})();