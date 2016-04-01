var Common = Common || {};

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

/* 特殊※字符替换成换行符 */
Common.characterReplaceBR = function (str) {
    var element = '<hr class="line" />',
        reg = new RegExp(Constant.SpecialCode, 'g');

    return str.replace(reg, element);
}

/* 将0,1布尔转换成是否 */
Common.getTransformBooleam = function (num) {
    num = Common.stringToNumber(num);
    switch (num) {
    case 0:
        return Lang.no;
        break;
    case 1:
        return Lang.yes;
        break;
    default:
        return num;
    }
}

/* 将电梯技监状态转换成文字 */
Common.getTransformSuperviseStatus = function (num) {
    num = Common.stringToNumber(num);
    switch (num) {
    case 1:
        return '<span class="tag tag-blue-green">' + Lang.superviseStatusNormal + '</span>';
        break;
    case 2:
        return '<span class="tag tag-primary">' + Lang.superviseStatusTakePaymentNotice + '</span>';
        break;
    case 3:
        return '<span class="tag tag-warning">' + Lang.superviseStatusTakePayment + '</span>';
        break;
    case 4:
        return '<span class="tag tag-danger">' + Lang.superviseStatusReservation + '</span>';
        break;
    default:
        return num;
    }
}

/* 将电梯状态转换成文字 */
Common.getTransformElevatorStatus = function (num) {
    num = Common.stringToNumber(num);
    switch (num) {
        case 1://在线
            return '<span class="tag tag-success" data-class="tag tag-success">' + Lang.elevatorStatusOfOnline + '</span>';
            break;
        case 2://离线
            return '<span class="tag tag-default" data-class="tag tag-default">' + Lang.elevatorStatusOfOffline + '</span>';
            break;
        case 3://故障
            return '<span class="tag tag-danger" data-class="tag tag-danger">' + Lang.elevatorStatusOfFault + '</span>';
            break;
        default:
            return '<span class="tag tag-primary" data-class="tag tag-primary">' + num + '</span>';
    }
}

/* 将电梯使用状态转换成文字 */
Common.getTransformElevUsageState = function(num){
	num = Common.stringToNumber(num);
	switch(num){
		case 0 :
			return Lang.elevatorStatusOfNormal;
			break;
		case 1 :
			return Lang.elevStop;
			break;
		case 2 :
			return Lang.elevLongStop;
			break;
		case 3 :
			return Lang.elevDemolition;
			break;
		default :
			return num;
	}
}

/* 将电梯类型转换成文字 */
Common.getTransformElevatorType = function (num) {
    num = Common.stringToNumber(num);
    switch (num) {
    case 1:
        return Lang.verticalElevator;
        break;
    case 2:
        return Lang.staircaseElevator;
        break;
    default:
        return '';
    }
}

/*  将楼盘类型(使用场合)转换成文字
0.待定
1.办公综合楼宇
2.工厂企业楼宇
3.机关单位楼宇
4.政府部门楼宇
5.住宅小区楼宇
6.商住综合楼宇
10.重点宾馆酒店
11.重点公共场馆
12.重点场所车站
13.重点场所机场
14.重点场所商场
15.重点学院校园
16.重点场所医院
17.重点娱乐场所
99.其他场所楼宇
*/
Common.getTransformBuildingType = function (num) {
num = Common.stringToNumber(num);
switch (num) {
    case 0://待定
        return Lang.usageSite0;
        break;
    case 1://办公综合楼宇
        return Lang.usageSite1;
        break;
    case 2://工厂企业楼宇
        return Lang.usageSite2;
        break;
    case 3://机关单位楼宇
        return Lang.usageSite3;
        break;
    case 4://政府部门楼宇
        return Lang.usageSite4;
        break;
    case 5://住宅小区楼宇
        return Lang.usageSite5;
        break;
    case 6://商住综合楼宇
        return Lang.usageSite6;
        break;
    case 10://重点宾馆酒店
        return Lang.usageSite10;
        break;
    case 11://重点公共场馆
        return Lang.usageSite11;
        break;
    case 12://重点场所车站
        return Lang.usageSite12;
        break;
    case 13://重点场所机场
        return Lang.usageSite3;
        break;
    case 14://重点场所商场
        return Lang.usageSite14;
        break;
    case 15://重点学院校园
        return Lang.usageSite15;
        break;
    case 16://重点场所医院
        return Lang.usageSite16;
        break;
    case 17://重点娱乐场所
        return Lang.usageSite17;
        break;
    case 98://研发调试
        return Lang.usageSite98;
        break;
    case 99://其他场所楼宇
        return Lang.usageSite99;
        break;
    default:
        return '';
}
}

/* 将使用状态转换成文字 */
Common.getElevUsageState = function (num) {
    num = Common.stringToNumber(num);
    switch (num) {
    case 0:
        return '<span class="tag tag-blue-green">' + Lang.elevNormal + '</span>';
        break;
    case 1:
        return '<span class="tag tag-primary">' + Lang.elevStop + '</span>';
        break;
    case 2:
        return '<span class="tag tag-purple">' + Lang.elevLongStop + '</span>';
        break;
    case 3:
        return '<span class="tag tag-primary">' + Lang.elevDemolition + '</span>';
        break;
    default:
        return num;
    }
}
/* 将年检状态转换成文字 */
Common.getYearStatus = function (num) {
    num = Common.stringToNumber(num);
    switch (num) {
    case 1:
        return '<span class="tag tag-blue-green ">' + Lang.normalTime + '</span>';
        break;
    case 2:
        return '<span class="tag tag-danger">' + Lang.extendedTime + '</span>';
        break;
    case 3:
        return '<span class="tag tag-warning">' + Lang.extendedWarning + '</span>';
        break;
    default:
    	return '<span class="tag tag-blue-green">' + Lang.normalTime + '</span>';
    }
}
/* 格式化额定载重 */
Common.getLoadWeightTransForm = function (value) {
	if(value){
		return '<span>'+value+'</span><span class="unit">kg</span>';        	
	}else{
		return '';
	}
}
/* 格式化额定速度 */
Common.getSpeedTransForm = function (value) {
	if(value){
		return '<span>'+value+'</span><span class="unit">m/s</span>';        	
	}else{
		return '';
	}
}

/* 将年检记录状态转换成文字 */
Common.getYearRecordStatus = function (num) {
    num = Common.stringToNumber(num);
    switch (num) {
    case 1:
        return '<span class="tag tag-primary year-inspection-status">' + Lang.autoNew + '</span>';
        break;
    case 2:
        return '<span class="tag tag-brown year-inspection-status">' + Lang.pendingAdmission + '</span>';
        break;
    case 3:
        return '<span class="tag tag-warning year-inspection-status">' + Lang.waitingBilling + '</span>';
        break;
    case 4:
        return '<span class="tag tag-info year-inspection-status">' + Lang.technicalPendingAppointment + '</span>';
        break;
    case 5:
        return '<span class="tag tag-success year-inspection-status">' + Lang.supervisionComplete + '</span>';
        break;
    default:
    	return '<span class="tag tag-success year-inspection-status">' + Lang.supervisionComplete + '</span>';
    }
}

/* 将维保人员类别转换成文字 */
Common.maintainerType = function (num) {
    num = Common.stringToNumber(num);
    switch (num) {
    case 1:
        return Lang.informationManagementPersonnel;
        break;
    case 2:
        return Lang.maintenancePersonnel;
        break;
    default:
    	return ' ';
    }
}
/* 将保养单状态转换成文字 */
Common.maintenanceBillStatus = function (num){
	num = Common.stringToNumber(num);
    switch (num) {
    case 1:
        return '<span class="tag tag-pink">' + Lang.waitSure + '</span>';
        break;
    case 2:
        return '<span class="tag tag-primary">' + Lang.waitSend + '</span>';
        break;
    case 3:
        return '<span class="tag tag-info">' + Lang.waitAccepted + '</span>';
        break;
    case 4:
        return '<span class="tag tag-purple">' + Lang.waitSignIn + '</span>';
        break;
    case 5:
        return '<span class="tag tag-brown">' + Lang.waitSignOut + '</span>';
        break;
    case 6:
        return '<span class="tag tag-green">' + Lang.waitCheck + '</span>';
        break;
    case 7:
        return '<span class="tag tag-success">' + Lang.checkComplete + '</span>';
        break;
    default:
    	return ' ';
    }
}
/* 将变更保养单状态转换成文字 */
Common.getFormatterChangeStatus = function (num){
	num = Common.stringToNumber(num);
    switch (num) {
    case 1:
        return '<span class="tag tag-danger">' + Lang.changeApply + '</span>';
        break;
    case 2:
        return '<span class="tag tag-success">' + Lang.changeSuccess + '</span>';
        break;
    case 3:
        return '<span class="tag tag-Fail">' + Lang.changeFail + '</span>';
        break;    
    default:
    	return ' ';
    }
}
/* 将保养单申请变更状态转换成文字 */
Common.maintenanceBillChangeStatus = function (num){
	num = Common.stringToNumber(num);
    switch (num) {
    case 1:
        return '<span class="tag tag-pink">' + Lang.pepoleStatusOfChange + '</span>';
        break;
    case 2:
        return '<span class="tag tag-primary">' + Lang.changeStatusCompleted + '</span>';
        break;
    default:
    	return ' ';
    }
}
/* 将故障状态转换成文字 */
Common.getTransformFaultStatus = function (num) {
    num = Common.stringToNumber(num);
    switch (num) {
    case 1:
        return '<span class="tag tag-success">' + Lang.elevatorStatusOfNormal + '</span>';
        break;
    case 2:
        return '<span class="tag tag-danger">' + Lang.elevatorStatusOfFault + '</span>';
        break;
    default:
        return ' ';
    }
}

/* 将检修状态转换成文字 */
Common.getTransformUpkeepStatus = function (num) {
    num = Common.stringToNumber(num);
    switch (num) {
    case 1:
    	return '<span class="tag tag-success">' + Lang.elevatorStatusOfNormal + '</span>';
        break;
    case 2:
        return '<span class="tag tag-warning">' + Lang.maintenanceStatus + '</span>';
        break;
    default:
        return '';
    }
}

/* 将设备状态转换成文字 */
Common.getTransformDeviceStatus = function (num) {
    num = Common.stringToNumber(num);
    switch (num) {
    case 1:
        return '<span class="tag tag-blue-green">' + Lang.elevatorStatusOfOnline + '</span>';
        break;
    case 2:
        return '<span class="tag tag-default">' + Lang.elevatorStatusOfOffline + '</span>';
        break;
    default:
        return '';
    }
}



/* 将物业人员类型转换成文字 */
Common.getTransformPersonType = function (num) {
    num = Common.stringToNumber(num);
    switch (num) {
    case 1:
        return Lang.personInCharge;
        break;
    case 2:
        return Lang.elevatorDrivers;
        break;
    default:
        return '';
    }
}

/* 将救援状态转换成文字 */
Common.getTransformRescueState = function (num) {
    num = Common.stringToNumber(num);
    switch (num) {
    case 0:
        return '<span class="tag tag-danger">' + Lang.notComplete + '</span>';
        break;
    case 1:
        return '<span class="tag tag-success">' + Lang.achieveEffective + '</span>';
        break;
    case 2:
        return '<span class="tag tag-primary">' + Lang.completeInvalid + '</span>';
        break;
    default:
        return '';
    }
}

/* 处理语音事件的操作按钮 */
Common.getVoiceEventHandlerButtons = function(id, isRelease, postUrl){
	postUrl = postUrl || URL.AccpetVoiceMonitor;
	var postData = {'id': id};
	var postCallback = function(dialog){
    	var $dlg = dialog.getDialogElement(),
	    		$msgObj = $dlg.find(".dialog-tips"),
	    		$msgBt =  $dlg.find(".btn-success"),
	    		href = location.href;
  		
  		 $msgObj.html('<span class="text text-left text-primary"><i class="icon icon-loading"></i>' + Lang.msgLoadingProcess + '</span>');
	         $msgBt.attr('disabled', true).addClass('disabled');
  	
	     	//请求而未被处理的语音请求列表
		 	Common.getDataByAjax(postUrl, postData, function(res){
  			if(res.success){
  				$msgObj.html('<span class="text text-left text-success">'+Lang.msgProcessSuccess+'</span>');
  				setTimeout(function(){
						dialog.close();
  		        	if(href.search('monitorOfVoice.jsp') != -1 || href.search('ctrlEventList.jsp') != -1){
  		        		$('#J_DataGrid').datagrid('reload');
  		        	}
					}, 1300);
				}else{
					$msgBt.attr('disabled', false).removeClass('disabled');
		    		$msgObj.html('<span class="text text-left text-danger">' + Lang.msgProcessError+'</span>');
				}	
			});
   	}
	var buttons = [{text:Lang.buttonCancel, click:function(e){e.close();}, styleName:'btn-default'}];
	
	if(!isRelease){
		buttons.unshift({text:Lang.sureOfAccepted, click: postCallback, styleName:'btn-success'});
	}
	
	return buttons;
}

/* 平台接入状态转换为彩色文字 0,接入平台，1或者null表示未接入平台*/
Common.platformStatus = function (num) {
	
	  if(undefined==num)
	  {
		     return '<span class="tag tag-default">' + Lang.accessNone+ '</span>';
	  }
     num = Common.stringToNumber(num);
    switch (num) {
    case 0:
        return  '<span class="tag tag-blue-green">' + Lang.accessSuccess+ '</span>'
        break;
    case 1:
        return   '<span class="tag tag-default">' + Lang.accessNone+ '</span>'
        break;
    default:
        return  '<span class="tag tag-default">'+Lang.accessNone+'</span>';
    }
}

/* 将设备状态转换成文字 */
Common.getPlatformName = function (num) {
	  if(undefined==num)
	  {
		     return '<span class="tag tag-default">' + Lang.noPlatform+ '</span>';
	  }
    num = Common.stringToNumber(num);
    switch (num) {
    case 0:
        return '<span class="tag tag-default">' + Lang.noPlatform+ '</span>';
        break;
    case 1:
        return '<span class="tag tag-blue-green">' + Lang.hangzhouPlatform+ '</span>';
        break;
    case 2:
        return '<span class="tag tag-danger">' + Lang.nanjingPlatform + '</span>';
        break;
    case 3:
        return '<span class="tag tag-purple">' + Lang.wuxiPlatform + '</span>';
        break;
    case 9:
        return '<span class="tag tag-primary">' + Lang.otherPlatform + '</span>';
        break;
    default:
        return '';
    }
}

/* 取消平台接入操作*/
Common.cancelPlatform = function(url, idsName, element, type) {
    element = element || $("#J_DataGrid");
    type = type || 'datagrid';

    var row = element.datagrid("getSelected");

    if (!row) {
        msgDialog(Lang.msgPleaseSelectDataFirst, Lang.alertTitlePrompt, 'warning');
        return false;
    }

    var id = row[idsName];
    Common.removePlatformItem(url, idsName, id, element, type);
};
//取消平台接入操作的具体实现
Common.removePlatformItem = function(url, idName, ids, obj, type) {
    var url = url,
        postData = {};

    postData[idName] = ids;
    obj = obj || $('#J_DataGrid');

    confirmDialog(Lang.msgDoYouWantToCancelPlatform, Lang.alertTitlePrompt, function() {
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

