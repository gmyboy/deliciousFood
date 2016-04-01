var Upkeep = Upkeep || {};


/* 将困人急修单状态转换成文字 */
Upkeep.getTransformTrappedPeopleStatus = function(num){
	num = Common.stringToNumber(num);
	switch(num){
		case 1 :
			return '<span class="tag tag-pink">' + Lang.statusOfAccepted + '</span>';
			break;
		case 2 :
			return '<span class="tag tag-primary">' + Lang.statusOfProcessing + '</span>';
			break;
		case 3 :
			return '<span class="tag tag-success">' + Lang.statusOfCompleted + '</span>';
			break;
		default :
			return num;
	}
}

/* 将电梯维保信息中 -- 维保状态转换成文字 */
Upkeep.getTransFormUpkeepInfoStatus = function(num){
	num = Common.stringToNumber(num);
	switch(num){
		case 1 :
			return '<span class="tag tag-success">' + Lang.contractStatusOfNormal + '</span>';
			break;
		case 2 :
			return '<span class="tag tag-warning">' + Lang.extendScale + '</span>';
			break;
		case 3 :
			return '<span class="tag tag-danger">' + Lang.neverUpkeep + '</span>';
		default :
			return '';
	}
}

/* 将非困人急修单状态转换成文字 */
Upkeep.getNontransformEmergencyRepairsStatus = function(num){
	num = Common.stringToNumber(num);
	switch(num){
		case 1 :
			return '<span class="tag tag-pink">' + Lang.statusOfAccepted + '</span>';
			break;
		case 2 :
			return '<span class="tag tag-primary">' + Lang.statusOfHavaAccepted + '</span>';
			break;
		case 3 :
			return '<span class="tag tag-warning">' + Lang.statusOfChecking + '</span>';
			break;
		case 4 :
			return '<span class="tag tag-success">' + Lang.repairsStateCheckComplete + '</span>';
			break;
		default :
			return num;
	}
}


/* 将计划维修单救援状态转换成文字 */
Upkeep.getPlanTransformRepairsStatus = function(num){
	num = Common.stringToNumber(num);
	switch(num){
		case -1 :
			return '<span class="tag tag-danger">' + Lang.notSubmit + '</span>';
			break;
		case 0 :
			return '<span class="tag tag-red">' + Lang.statusOfUnSend + '</span>';
			break;
		case 1 :
			return '<span class="tag tag-pink">' + Lang.statusOfAccepted + '</span>';
			break;
		case 2 :
			return '<span class="tag tag-blue-green">' + Lang.statusOfProcessing + '</span>';
			break;
		case 3 :
			return '<span class="tag tag-warning">' + Lang.statusOfChecking + '</span>';
			break;
		case 4 :
			return '<span class="tag tag-success">' + Lang.statusOfCheckCompleted + '</span>';
			break;
		default :
			return num;
	}
}
/* 将计划维修单派工人员接受状态转换成文字 */
Upkeep.getPlanTransformAcceptStatus = function(num){
	num = Common.stringToNumber(num);
	switch(num){
		case 1 :
			return '<span class="tag tag-pink">' + Lang.statusOfAccepted + '</span>';
			break;
		case 2 :
			return '<span class="tag tag-blue-green">' + Lang.statusOfHavaAccepted + '</span>';
			break;
		case 3 :
			return '<span class="tag tag-purple">' + Lang.pepoleStatusOfSignIn + '</span>';
			break;
		case 4 :
			return '<span class="tag tag-success">' + Lang.pepoleStatusOfSignOff + '</span>';
			break;
		default :
			return num;
	}
}
/* 将非困人急修单对应派工人员状态转换成文字 */
Upkeep.getNontransformAcceptStatus = function(num){
	num = Common.stringToNumber(num);
	switch(num){
		case 1 :
			return '<span class="tag tag-pink">' + Lang.statusOfAccepted + '</span>';
			break;
		case 2 :
			return '<span class="tag tag-warning">' + Lang.statusOfProcessing + '</span>';
			break;
		case 3 :
			return '<span class="tag tag-primary">' + Lang.pepoleStatusOfSignIn + '</span>';
			break;
		case 4 :
			return '<span class="tag tag-success">' + Lang.pepoleStatusOfSignOff + '</span>';
			break;
		default :
			return num;
	}
}

/* 将计划维修单状态转换成文字 */
Upkeep.getTransformRepairsStatus = function(num){
	num = Common.stringToNumber(num);
	switch(num){
		case 1 :
			return '<span class="tag tag-blue-green">' + Lang.statusOfUnSend + '</span>';
			break;
		case 2 :
			return '<span class="tag tag-primary">' + Lang.statusOfSend + '</span>';
			break;
		case 3 :
			return '<span class="tag tag-purple">' + Lang.statusOfSignIn + '</span>';
			break;
		case 4 :
			return '<span class="tag tag-pink">' + Lang.statusOfSignOff + '</span>';
			break;
		case 5 :
		    return '<span class="tag tag-defalut">' + Lang.repairsStateCheckComplete + '</span>';
			break;
		default :
			return num;
	}
}

/* 将计划维修单对应的派工人员状态转换成文字 */
Upkeep.getTransformRepairsEmployeeStatus = function(num){
	num = Common.stringToNumber(num);
	switch(num){
		case 1 :
			return '<span class="tag tag-blue-green">' + Lang.statusOfNew + '</span>';
			break;
		case 2 :
			return '<span class="tag tag-primary">' + Lang.statusOfSend + '</span>';
			break;
		case 3 :
			return '<span class="tag tag-pink">' + Lang.statusOfAccepted + '</span>';
			break;
		case 4 :
			return '<span class="tag tag-warning">' + Lang.statusOfChange + '</span>';
			break;
		case 5 :
			return '<span class="tag tag-purple">' + Lang.statusOfSignIn + '</span>';
			break;
		case 6 :
			return '<span class="tag tag-pink">' + Lang.statusOfSignOff + '</span>';
			break;
		case 7 :
			return '<span class="tag tag-brown">' + Lang.statusOfCheck + '</span>';
			break;
		case 8 :
			return '<span class="tag tag-success">' + Lang.statusOfChangeCompleted + '</span>';
			break;
		default :
			return num;
	}
}

/* 将合同来源转换成文字 */
Upkeep.getTransformContractSource = function(num){
	num = Common.stringToNumber(num);
	switch(num){
		case 1 :
			return Lang.contractsManually;
			break;
		case 2 :
			return Lang.contractsAreTriggered;
			break;
		case 3 :
			return Lang.partsAreTriggered;
			break;
		default :
			return num;
	}
}

/* 将部件采购状态转换成文字 */
Upkeep.getTransformProcuringPartStatus = function(num){
	num = Common.stringToNumber(num);
	switch(num){
		case 1 :
			return '<span class="tag tag-primary">' + Lang.statusOfNewAndNotCompleted + '</span>';
			break;
		case 2 :
			return '<span class="tag tag-success">' + Lang.statusOfCompleted + '</span>';
			break;
		case 3 :
			return '<span class="tag tag-default">' + Lang.statusOfCancelOrder + '</span>';
			break;
		default :
			return num;
	}
}

/* 将保养计划单状态转换成文字 */
Upkeep.getTransformUpkeepStatus = function(num){
	num = Common.stringToNumber(num);
	switch(num){
		case 1 :
			return '<span class="tag tag-blue-green">' + Lang.statusOfNew + '</span>';
			break;
		case 2 :
			return '<span class="tag tag-primary">' + Lang.statusOfSend + '</span>';
			break;
		case 3 :
			return '<span class="tag tag-success">' + Lang.statusOfSignIn + '</span>';
			break;
		case 4 :
			return '<span class="tag tag-info">' + Lang.statusOfSignOff + '</span>';
			break;
		case 5 :
			return '<span class="tag tag-default">' + Lang.repairsStateCheckComplete + '</span>';
			break;
		default :
			return num;
	}
}

/* 将保养计划单对应派工人员状态转换成文字 */
Upkeep.getTransformUpkeepEmployeeStatus = function(num){
	num = Common.stringToNumber(num);
	switch(num){
		case 1 :
			return '<span class="tag tag-blue-green">' + Lang.statusOfNew + '</span>';
			break;
		case 2 :
			return '<span class="tag tag-primary">' + Lang.statusOfSend + '</span>';
			break;
		case 3 :
			return '<span class="tag tag-pink">' + Lang.statusOfAccepted + '</span>';
			break;
		case 4 :
			return '<span class="tag tag-warning">' + Lang.statusOfChange + '</span>';
			break;
		case 5 :
			return '<span class="tag tag-pink">' + Lang.statusOfSignIn + '</span>';
			break;
		case 6 :
			return '<span class="tag tag-info">' + Lang.statusOfSignOff + '</span>';
			break;
		case 7 :
			return '<span class="tag tag-brown">' + Lang.statusOfChecked +'</span>';
			break;
		case 8 :
			return '<span class="tag tag-success">' + Lang.statusOfChangeCompleted + '</span>';
			break;
		default :
			return num;
	}
}

/* 将维修类型转换成文字 */
Upkeep.getTransformRepairType = function(num){
	num = Common.stringToNumber(num);
	switch(num){
		case 1 :
			return Lang.trappedPeopleName;
			break;
		case 2 :
			return Lang.emergencyRepairsName;
			break;
		case 3 :
			return Lang.repairsName;
			break;
		default :
			return num;
	}
}

/* 将合同状态转换成文字 */
Upkeep.getTransformContractStatus = function (num) {
    num = Common.stringToNumber(num);
    switch (num) {
    case -1:
        return '<span class="tag tag-blue-green">' + Lang.ineffectiveStatus + '</span>';
        break;
    case 1:
        return '<span class="tag tag-primary">' + Lang.effectiveStatus + '</span>';
        break;
    case 2:
        return '<span class="tag tag-purple">' + Lang.executionCompleted + '</span>';
        break;
    default:
        return num;
    }
}

/* 将续签合同状态转换成文字 */
Upkeep.getTransformRenewContractStatus = function (num) {
    num = Common.stringToNumber(num);
    switch (num) {
    case -1:
        return '<span class="tag tag-blue-green">' + Lang.waitIssueRenewal + '</span>';
        break;
    case 1:
        return '<span class="tag tag-primary">' + Lang.issueRenewal + '</span>';
        break;
    case 2:
        return '<span class="tag tag-purple">' + Lang.recoveredExecutive + '</span>';
        break;
    case 3:
        return '<span class="tag tag-red">' + Lang.renewFailed + '</span>';
        break;
    case 4:
        return '<span class="tag tag-primary">' + Lang.renewedSuccess + '</span>';
        break;
    case 5:
        return '<span class="tag tag-purple">' + Lang.contractArchive + '</span>';
        break;
    default:
        return " ";
    }
}

/* 将合同保养方式转换成文字 */
Upkeep.getTransformContractUpkeepType = function (num) {
    num = Common.stringToNumber(num);
    switch (num) {
    case 1:
        return Lang.packageOfAll;
        break;
    case 2:
        return Lang.packageOfHalf;
        break;
    case 3:
        return Lang.packageOfBig;
        break;
    case 4:
        return Lang.packageOfThree;
        break;
    default:
        return num;
    }
}

/* 电梯合同的状态，应用于【南宁电梯】系统 */
Upkeep.getEleContractStatus = function (num) {
    num = Common.stringToNumber(num);
    switch (num) {
    case 1:
    	return '<span class="tag tag-red">' + Lang.noConfirm + '</span>';
        break;
    case 2:
    	return '<span class="tag tag-blue-green">' + Lang.confirm + '</span>';
        break;
    default:
        return num;
    }
}

/* 将合同保养收款方式转换成文字 */
Upkeep.getTransformContractGatheringType = function (num) {
    num = Common.stringToNumber(num);
    switch (num) {
    case 1:
        return Lang.gatheringTypeOfMonth;
        break;
    case 2:
        return Lang.gatheringTypeOfQuarter;
        break;
    case 3:
        return Lang.gatheringTypeOfHalfYear;
        break;
    case 4:
        return Lang.gatheringTypeOfYear;
        break;
    default:
        return num;
    }
}