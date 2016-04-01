var Media = Media || {};

/* 将素材类型转换成文字 */
Media.getMediaSourceMaterialType = function (type) {
	if(!type){
		return '';
	}
	type = Common.stringToNumber(type);
	if(type==1){
		return Lang.video;
	}
	if(type==2){
		return Lang.audio;
	}
	if(type==3){
		return Lang.picture;
	}
}

/* 将审核状态转换成文字 */
Media.getMediaApproveStatus = function (status) {
	status = Common.stringToNumber(status);
	if(status==0){
        return '<span class="tag tag-brown">' + Lang.mediaApproveTemporary + '</span>';
	}else if(status==1){
        return '<span class="tag tag-blue-green">' + Lang.mediaApproveAudit + '</span>';
	}else if(status==2){
        return '<span class="tag tag-success">' + Lang.mediaApprovePass + '</span>';
	}else if(status==-1){
        return '<span class="tag tag-danger">' + Lang.mediaApproveRollBack + '</span>';
	}else{
		return '';
	}
}

/*将媒体类型转换为文字*/
Media.getMediaAdvertisingType = function (type){
	type = Common.stringToNumber(type);
	if(type==0){
		return Lang.mediaDefault;
	}
	if(type==1){
		return Lang.mediaPublicWelfare;
	}
	if(type==2){
		return Lang.mediaBusiness;
	}
}

/*将媒体投放状态转换为文字*/
Media.getMediaPublishStatus = function (status){
	status = Common.stringToNumber(status);
	if(status==1){
        return '<span class="tag tag-brown">' + Lang.noPublish + '</span>';
	}else if(status==2){
        return '<span class="tag tag-success">' + Lang.hasPublish + '</span>';
	}else if(status==3){
        return '<span class="tag tag-danger">' + Lang.hasStopPublish + '</span>';
	}else if(status==4){
        return '<span class="tag tag-purple">' + Lang.hasPublishOver + '</span>';
	}else{
		return '';
	}
}


/* 将采集设备状态转换成文字 */
Media.getTransformAcquisitionDeviceStatus = function(num){
	num = Common.stringToNumber(num);
	switch(num){
		case 1 :
			return '<span class="tag tag-success">' + Lang.acquisitionDeviceStatusOfOnline + '</span>';
			break;
		case 2 :
			return '<span class="tag tag-default">' + Lang.acquisitionDeviceStatusOfOffline + '</span>';
			break;
		default :
			return '';
	}
}

/* 将目标设备状态转换成文字 */
Media.getTransformTargetDeviceStatus = function(num){
	num = Common.stringToNumber(num);
	switch(num){
		case 1 :
			return '<span class="tag tag-success">' + Lang.targetDeviceStatusOfConnected + '</span>';
			break;
		case 2 :
			return '<span class="tag tag-default">' + Lang.targetDeviceStatusOfNotConnected + '</span>';
			break;
    case 3 :
			return '<span class="tag tag-default">' + Lang.targetDeviceStatusOfHavePassword + '</span>';
			break;     
		default :
			return '';
	}
}

/* 将文件大小转换为kb显示*/
Media.getMediaResourceLengthToKb=function(num){
	num=Common.stringToNumber(num);
	num=(num/1024).toFixed(2);
	return num;
}

/* 将目标设备状态转换成文字 */
Media.getWirelessIssuedStatus = function(num){
	num = Common.stringToNumber(num);
	if(num==0){
		return '<span class="tag tag-brown">' + Lang.wirelessNone + '</span>';
	}else if(num==-1){
		return '<span class="tag tag-danger">' + Lang.wireLessError + '</span>';
	}else if(num==5){
		return '<span class="tag tag-success">' + Lang.wirelessSuccess + '</span>';
	}else{
		return '<span class="tag tag-blue-green">' + Lang.wireLessLoading + '</span>';
	}
}

/* 将年检状态转换成文字 */
Media.getMediaStatus = function (num) {
    num = Common.stringToNumber(num);
    switch (num) {
    case 1:
        return '<span class="tag tag-blue-green ">' + Lang.normalTime + '</span>';
        break;
    case 3:
        return '<span class="tag tag-danger">' + Lang.extendedTime + '</span>';
        break;
    case 2:
        return '<span class="tag tag-warning">' + Lang.extendedWarning + '</span>';
        break;
    default:
    	return '<span class="tag tag-blue-green">' + Lang.normalTime + '</span>';
    }
}
