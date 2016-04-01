var Rescue = Rescue || {};

/* 将告警信息通知状态转换成文字 */
Rescue.getAlarmMessageStatus = function (num,messageStatusStr) {
	num = Common.stringToNumber(num);
	if(num==1){
        return '<span class="tag tag-danger">' + messageStatusStr + '</span>';
	}else if(num==2||num==3||num==4){
        return '<span class="tag tag-blue-green">' + messageStatusStr + '</span>';
	}else{
		return messageStatusStr;
	}
}

/* 将告警状态转换成文字 */
Rescue.getAlarmLevelStatus = function (num,statusStr) {
	num = Common.stringToNumber(num);
	if(num==1||num==3||num==5){
        return '<span class="tag tag-warning">' + statusStr + '</span>';
	}else if(num==2||num==4||num==6){
        return '<span class="tag tag-blue-green">' + statusStr + '</span>';
	}else if(num==9){
        return '<span class="tag tag-danger">' + statusStr + '</span>';
	}else{
		return statusStr;
	}
}

/* 将救援任务类型转换为文字 */
Rescue.getRescueTaskTypeName = function (num) {
	if(!num){
		return num;
	}
	num = Common.stringToNumber(num);
	if(num==1){
		return Lang.RescueNoPeople;
	}
	if(num==2){
		return Lang.RescueGoElev;
	}
	if(num==3){
		return Lang.RescueTest;
	}
	if(num==4){
		return Lang.RescueVideoError;
	}
	if(num==5){
		return Lang.RescueByMistake;
	}
	if(num==6){
		return Lang.RescueTrappedPeople;
	}
	if(num==7){
		return Lang.RescueOpenDoorSlowly;
	}
	if(num==8){
		return Lang.RescueWarning;
	}
	if(num==9){
		return Lang.RescueOther;
	}
	return num;
}

Rescue.getAgentInfoStatus = function (num) {
	num = Common.stringToNumber(num);
	if(num==0){
        return '<span class="tag tag-danger">' + Lang.agentStop + '</span>';
	}else if(num==1){
        return '<span class="tag tag-blue-green">' + Lang.agentBegin + '</span>';
	}else{
		return messageStatusStr;
	}
}


