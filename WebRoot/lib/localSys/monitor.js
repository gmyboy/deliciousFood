var Monitor = Monitor || {};

/* 将事件类型转换成文字 */
Monitor.getTransformEventCode = function (num, type) {
    /*
        type: 'name' 表示显示事件名称
        type: 'desc' 表示显示事件描述
    */
    
    type = type || 'name';
    
    //电话呼救
    if (num == 0x01) {
        return (type == 'name') ? Lang.callForHelp : Lang.callForHelp;
    }
    //手动呼救
    if (num == 0x02) {
        return (type == 'name') ? Lang.handForHelp : Lang.handForHelp;
    }
    //自动呼救
    if (num == 0x03) {
        return (type == 'name') ? Lang.autoForHelp : Lang.eventTrappedPeople;
    }
    //机房刷卡
    if (num == 0x04) {
        return (type == 'name') ? Lang.creditCardOfRoom : Lang.creditCardOfRoom;
    }
    //轿顶刷卡
    if (num == 0x05) {
        return (type == 'name') ? Lang.creditCardOfTop : Lang.creditCardOfTop;
    }
    //综合故障
    if (num == 0x06) {
        return (type == 'name') ? Lang.integratedFault : Lang.eventEmergency;
    }
    //检修状态
    if (num == 0x07) {
        return (type == 'name') ? Lang.stateOfRepair : Lang.stateOfRepair;
    }
    //电梯停电
    if (num == 0x08) {
        return (type == 'name') ? Lang.elevatorPowerOutage : Lang.elevatorPowerOutage;
    }
    //电话告警
    if (num == 0x09) {
        return (type == 'name') ? Lang.telAlarm : Lang.telAlarm;
    }
    
    //电话告警
    if (num == 11) {
        return (type == 'name') ? Lang.communicationError : Lang.communicationError;
    }

    return num;
}

/* 将故障是否处理转换成文字 */
Monitor.getTransformReleaseFlag = function (num, eventCode) {
    num = Common.stringToNumber(num);
    /*
    if (eventCode == 4 || eventCode == 5 || eventCode == 7) {
        return '<span class="tag tag-default">' + Lang.doNotNeedHandled + '</span>';
    }
    */
    switch (num) {
        case 0:
            return '<span class="tag tag-danger">' + Lang.releaseFlagFalse + '</span>';
            break;
        case 1:
            return '<span class="tag tag-blue-green">' + Lang.releaseFlagTrue + '</span>';
            break;
        default:
            return num;
    }
}

/* 从CMD报文中获取值 */
Monitor.getValueByCMDTransferData = function(data){
    if(!data){
        return '';
    }
    
    var otherLength = 12 * 2;
    return data.substring(otherLength, data.length);
}
