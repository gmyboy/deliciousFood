/* 静态配置对象 */
var	TopWindow = TopWindow || window, ProjectName = ProjectName || {}, URL = URL || {}, Constant = Constant || {}, Module = Module || {}, MenuNumber = MenuNumber || {}, MsgId = MsgId || {}, TdSerialType = TdSerialType || {}, TdSerialTag = TdSerialTag || {};

/* 是否启用调试模式 */
DEBUGGER = false;

/* 时间设置 */
CMD_RES_TIMEOUT = 35000;//远程指令请求响应超时
FUNCTIONCODE_RES_TIMEOUT = 20000;//功能码请求响应超时

/* 目标设备类型 */
TdSerialType.Controller = 0;
TdSerialType.Camera = 1;
TdSerialType.Audio = 2;
TdSerialType.Display = 3;
TdSerialType.GPS = 4;

/* 项目名 */
ProjectName.Main = 'Main';
ProjectName.Basic = 'Main';
ProjectName.Monitor = 'Monitor';
ProjectName.Hotline = 'Hotline';
ProjectName.Upkeep = 'Upkeep';

/* 目标设备请求tag */
TdSerialTag.RealTimeData = 1;//实时数据
TdSerialTag.InnerCall = 2;//内召
TdSerialTag.OuterCall = 3;//外召(上下召)
TdSerialTag.Terminal = 4;//端子
TdSerialTag.StatisticsData = 5;//统计数据
TdSerialTag.FunctionCode = 10;//功能码10+
TdSerialTag.FunctionCodeTerminal = 15;//功能码组端子参数

/* 登录 */
URL.Index = '/login.jsp';
URL.LogIn = '/login.jsp';
URL.LogOut = '/androidManager/loginAction!logout.do';

/* 首页 */
URL.Home = '/page/home.jsp';

/* 电梯维保信息 */
MenuNumber.UpkeepElevatorList = 1200;
MenuNumber.UpkeepElevatorImport = 1210;
MenuNumber.UpkeepElevatorEdit = 1220;
MenuNumber.UpkeepElevatorLogList = 1230;
MenuNumber.UpkeepElevatorLogListEdit = 1231;
MenuNumber.UpkeepElevatorLogListReturn = 1232;
MenuNumber.UpkeepElevatorExport = 1240;
MenuNumber.UpkeepElevatorBatchEdit = 1250;

URL.UpkeepElevatorList = '/upkeep/page/purpose/upkeepElevatorList.jsp?menuNO=1200';
URL.UpkeepElevatorEdit = '/upkeep/page/purpose/upkeepElevatorEdit.jsp?menuNO=1220';
URL.UpkeepElevatorLogList = '/upkeep/page/purpose/upkeepElevatorLogList.jsp?menuNO=1230';
URL.GetUpkeepInfo = '/upkeep/upkeepInfo/upkeepInfo!getUpkeepInfoList.do';
URL.SaveUpkeepInfo = '/upkeep/upkeepInfo/upkeepInfo!saveUpkeepInfo.do';
URL.GetUpkeepInfoById= '/upkeep/upkeepInfo/upkeepInfo!getUpkeepInfoListById.do';
URL.UpdateUpkeepInfo = '/upkeep/upkeepInfo/upkeepInfo!updateUpkeepInfo.do';
URL.ImportUpkeepInfo = '/upkeep/upkeepInfo/upkeepInfo!importUpkeepInfo.do';
URL.ExportUpkeeoInfo = '/baseinfo/elevator/elevator!exportUpkeepInfo.do';

URL.saveBatchUpkeepInfo = '/upkeep/upkeepInfo/upkeepInfo!saveBatchUpkeepInfo.do';


/* 永日 电梯维保信息  */
MenuNumber.UpkeepElevatorOfYongRiList = 1260;
MenuNumber.UpkeepElevatorOfYongRiView = 12601;


URL.UpkeepElevatorOfYongRiList = '/upkeep/page/purpose/upkeepElevatorOfYongRiList.jsp?menuNO=1260';
URL.UpkeepElevatorOfYongRiView = '/upkeep/page/purpose/upkeepElevatorOfYongRiView.jsp?menuNO=12601';

URL.GgetElevAllInfo = '/upkeep/upkeepInfo/upkeepInfo!getElevAllById.do';
URL.GetUpkeepOrderElevInfo = '/upkeep/upkeepInfo/upkeepInfo!getUpkeepOrderElev.do';
URL.GetMainTainElevInfo = '/upkeep/upkeepInfo/upkeepInfo!getMainTainElev.do';
URL.GetContractElevInfo = '/upkeep/upkeepInfo/upkeepInfo!getContractElev.do';

/* 救援中心 */
MenuNumber.RescueOfList = 10100;
URL.RescueOfList = '/rescue/page/rescue/rescueOfList.jsp?menuNO=10100';
URL.RescueTaskUnfinishList = '/rescue/rescueTask/rescueTask!dnss_taskUnfinishList.do';
URL.RescueRequestList = '/rescue/rescueRequest/rescueRequest!dnss_rescueRequestList.do';
URL.RescueTaskList = '/rescue/rescueTask/rescueTask!dnss_taskList.do';
URL.GetRescueTaskByNumber = '/rescue/rescueTask/rescueTask!dnss_getTaskByTaskNum.do';
URL.GetRescueTaskByElevId = '/rescue/rescueTask/rescueTask!dnss_getTaskByElevId.do';
URL.AddRescueTask= '/rescue/rescueTask/rescueTask!dnss_add.do';
URL.UpdateRescueTask= '/rescue/rescueTask/rescueTask!dnss_update.do';
URL.UpdateRescueTaskElev= '/rescue/rescueTask/rescueTask!dnss_changeElevOfTask.do';
URL.RescueLogList= '/rescue/rescueLog/rescueLog!dnss_findByTaskId.do';
URL.AddRescueLog= '/rescue/rescueLog/rescueLog!dnss_addTextInfo.do';
URL.RescueRelationLList = '/rescue/rescueTask/rescueTask!dnss_elevRelationList.do';
URL.GetCtrlEventById = "/monitor/data/ctrlEvent!getById.do";
URL.FinshRescueTask= '/rescue/rescueTask/rescueTask!dnss_finshTask.do';
URL.RescueElevList = '/rescue/page/rescue/rescueElevList.jsp';
URL.GetRescueCtrlEvent = '/rescue/rescueTask/rescueTask!dnss_getCtrlEvent.do';
URL.NoRescueTaskElevList = '/rescue/rescueTask/rescueTask!dnss_NoRescueTaskElevList.do';
URL.GetRescueStatistics = '/rescue/rescueTask/rescueTask!dnss_taskStatistics.do';
URL.GetRescueTaskByCallNum = '/rescue/rescueTask/rescueTask!dnss_getByCallNum.do';
URL.GetRescueFinshRole = '/rescue/rescueTask/rescueTask!dnss_getUserFinshRole.do';

/* 400电话 */
MenuNumber.CallRecordList = 10300;
MenuNumber.CallRecordBind = 10310;
MenuNumber.CallRecordSeparate = 10320;
URL.CallRecordJsp = '/rescue/page/rescue/callRecordList.jsp?menuNO=10300';
URL.CallRecordList = '/rescue/callRecord/callRecord!callRecordList.do';
URL.CallRecordBind = '/rescue/callRecord/callRecord!bind.do';
URL.CallRecordSeparate = '/rescue/callRecord/callRecord!separate.do';
URL.CallRecordSave = '/rescue/callRecord/callRecord!dnss_save.do';

MenuNumber.AgentInfoEdit = 10420;
MenuNumber.AgentInfoAdd = 10410;
URL.AgentInfoJsp = '/rescue/page/rescue/agentList.jsp?menuNO=10400';
URL.AgentInfoList = '/rescue/agentInfo/agentInfo!agentInfoList.do';
URL.AgentInfoEdit = '/rescue/agentInfo/agentInfo!setAgentInfo.do';
URL.AgentInfoById = '/rescue/agentInfo/agentInfo!getById.do';
URL.AgentInfoLogin = '/rescue/agentInfo/agentInfo!getAgentInfoByloginAccount.do';

/* 三级告警 */
URL.GetAlarmList = '/rescue/alarm/alarm!alarmList.do';
URL.GetAlarmLogList = '/rescue/alarmLog/alarmLog!alarmLogList.do';
URL.GetAlarmElev = '/rescue/alarm/alarm!dnss_getElevById.do';
URL.GetAlarmListExcel = '/monitor/data/ctrlEvent!exportCtrlEventAlarmList.do';
/*三级告警验收设置*/
URL.GetAlarmAcceptanceListJsp='/rescue/page/alarm/alarmAcceptanceList.jsp?menuNO=5960';
URL.GetAlarmAcceptanceList = '/rescue/alarm/alarm!alarmAcceptanceList.do';
URL.AddAlarmAcceptance='/rescue/alarm/alarm!addAlarmAcceptance.do';
URL.EditAlarmAcceptance='/rescue/alarm/alarm!addAlarmAcceptance.do';
URL.GetAlarmAcceptanceById='/rescue/alarm/alarm!getAlarmAcceptanceById.do';
URL.DelAlarmAcceptance='/rescue/alarm/alarm!delAlarmAcceptance.do'
MenuNumber.EditAlarmAcceptance=5961;
MenuNumber.AddAlarmAcceptance=5963;
MenuNumber.DelAlarmAcceptance=5962;
/* 电梯告警信息 */
MenuNumber.ElevAlarmInfo = 5822;
/* 告警日志 */
MenuNumber.ElevAlarmLog = 5821;
/* 实时故障监控-处理 */
MenuNumber.ElevAlarmOperate = 5823;

/* 电梯告警信息(历史) */
MenuNumber.ElevAlarmInfoHis = 6402;
/* 告警日志(历史) */
MenuNumber.ElevAlarmLogHis = 6401;
/* 实时故障监控-处理(历史) */
MenuNumber.ElevAlarmOperateHis = 6403;
/* 电梯告警信息(历史)导出Excel */
MenuNumber.ElevAlarmInfoHisExport = 6404;

/*实时故障监控*/
MenuNumber.FaultList = 5820;
URL.FaultList = '/monitor/page/data/faultList.jsp.jsp?menuNO=5820';
URL.GetFaultList = '/monitor/data/ctrlEvent!ctrlEventAlarmList.do';

/*历史故障查询*/
MenuNumber.FaultHisList = 5300;
URL.FaultHisList = '/monitor/page/data/ctrlEventList.jsp?menuNO=5300';
URL.GetFaultHisList = '/monitor/data/ctrlEvent!ctrlEventAlarmList.do';


/* 维保合同管理 */
MenuNumber.UpkeepContractList = 1110;
MenuNumber.CustomerReceivableList = 1120;
URL.UpkeepContractList = '/upkeep/page/contract/contractList.jsp?menuNO=1141&parentMenuNO=1110';
URL.CustomerReceivableList = '/upkeep/page/contract/customerReceivableList.jsp?menuNO=1120';

URL.GetContractList = '/upkeep/contract/contract!getContractList.do';
URL.GetContractNOList = '/upkeep/contract/contract!getContractNo.do';
//更改合同状态
URL.GetContractStatusById = '/upkeep/contract/contract!updateContractStatus.do';

URL.GetContractById = '/upkeep/contract/contract!getContractById.do';
URL.GetElevatorsByConId = '/upkeep/contract/contract!getElevatorsByConId.do';

MenuNumber.UnfiledContractAdd = 11410;
MenuNumber.UnfiledContractEdit = 11411;
//查看操作日志
MenuNumber.UnfiledContractSearch = 11412;
MenuNumber.ArchivingContractSearch = 11421;
MenuNumber.IneffectiveStatusSearch = 11511;
MenuNumber.EffectiveStatusSearch = 11520;
MenuNumber.WaitIssueRenewalSearch = 11531;
MenuNumber.IssueRenewalSearch = 11541;
MenuNumber.UnrecoveredExecutiveSearch = 11550;
/*已收回执*/
MenuNumber.ContractStatusOfRetrieve = 11552;
MenuNumber.RecoveredExecutiveSearch = 11561;
MenuNumber.TheLastFifteenDaysSearch = 11570;
MenuNumber.NotRenewedSuccessSearch = 11581;
MenuNumber.ExecutionCompletedSearch = 11590;
MenuNumber.RenewedSuccessSearch = 11640;
//查看关联电梯
MenuNumber.UnfiledContractAssociateElevator = 11413;
MenuNumber.ArchivingContractAssociateElevator = 11422;
MenuNumber.IneffectiveStatusAssociateElevator = 11512;
MenuNumber.EffectiveStatusAssociateElevator = 11521;
MenuNumber.WaitIssueRenewalAssociateElevator = 11532;
MenuNumber.IssueRenewalAssociateElevator = 11542;
MenuNumber.UnrecoveredExecutiveAssociateElevator = 11551;
MenuNumber.RecoveredExecutiveAssociateElevator = 11562;
MenuNumber.TheLastFifteenDaysAssociateElevator = 11571;
MenuNumber.NotRenewedSuccessAssociateElevator = 11582;
MenuNumber.ExecutionCompletedAssociateElevator = 11591;
MenuNumber.RenewedSuccessAssociateElevator = 11641;

MenuNumber.ArchivingContractAdd = 11420;
MenuNumber.ArchivingContractEdit = 11421;

MenuNumber.IneffectiveContractEdit = 11510;

MenuNumber.ContractIssue = 11530;
MenuNumber.ContractStatusOfTakeBack = 11540;
MenuNumber.RenewSuccess = 11560;
MenuNumber.ArchiveContract = 11580;
MenuNumber.RenewSuccessByFailure = 11583;



URL.UnfiledContractAdd = '/upkeep/page/contract/contractEdit.jsp?menuNO=11410';
URL.ArchivingContractAdd = '/upkeep/page/contract/contractEdit.jsp?menuNO=11420';
URL.UnfiledContractEdit = '/upkeep/page/contract/contractEdit.jsp?menuNO=11411';
URL.ArchivingContractEdit = '/upkeep/page/contract/contractEdit.jsp?menuNO=11421';

URL.AddContract = '/upkeep/contract/contract!addContract.do';
URL.EditContract = '/upkeep/contract/contract!updateContract.do';
URL.GetContractLog = '/upkeep/contract/contract!getContractLog.do';
URL.GetContractsByStatus = '/upkeep/contract/contract!getContractsByStatus.do';

//闪灯
URL.GetContractCount = '/upkeep/contract/contract!getContractCount.do';


/* 保养合同状态 */
MenuNumber.UnfiledContract = 1141;
MenuNumber.ArchivingContract = 1142;
URL.UnfiledContractList = '/upkeep/page/contract/contractList.jsp?menuNO=1141&parentMenuNO=1110';
URL.ArchivingContract = '/upkeep/page/contract/contractList.jsp?menuNO=1142&parentMenuNO=1110';

MenuNumber.IneffectiveStatus = 1151;
MenuNumber.EffectiveStatus = 1152;
MenuNumber.WaitIssueRenewal = 1153;
MenuNumber.IssueRenewal = 1154;
MenuNumber.UnrecoveredExecutive = 1155;
MenuNumber.RecoveredExecutive = 1156;
MenuNumber.TheLastFifteenDays = 1157;
MenuNumber.NotRenewedSuccess = 1158;
MenuNumber.ExecutionCompleted = 1159;
MenuNumber.RenewedSuccess = 1164;

URL.IneffectiveStatus = '/upkeep/page/contract/contractList.jsp?menuNO=1151&parentMenuNO=1110';

/* 电梯保养管理 */
/** 维保人员**/
URL.GetMaintainerGridList = '/upkeep/maintainer/maintainer!maintainerList.do';
URL.GetMaintainerGridListByAccount = '/upkeep/maintainer/maintainer!getMaintainerListByAccount.do';
MenuNumber.UpkeepSiteList = 1430;
MenuNumber.MaintenanceTeamList = 1440;
MenuNumber.BillChangeList = 1470;

MenuNumber.MaintainerList=1450;
MenuNumber.WorkingMaintainerList=1451;

MenuNumber.MaintainerAdd=14510;
MenuNumber.MaintainerAddLimits=145100;
MenuNumber.MaintainerInfoAddLimits=145101;
MenuNumber.MaintainerEdit=14511;
MenuNumber.MaintainerEditLimits=145110;
MenuNumber.MaintainerInfoEditLimits=145111;
MenuNumber.MaintainerDel=14512;
MenuNumber.MaintainerBindUser=14513;
MenuNumber.MaintainerRemoveBindUser=14514;
MenuNumber.ExportWorkingMaintainer=14520;
MenuNumber.ExportLeavingMaintainer=14530;

URL.UpkeepSiteList = '/upkeep/page/maintenance/upkeepSiteList.jsp?menuNO=1430';
URL.MaintainerAdd = '/upkeep/maintainer/maintainer!saveMaintainer.do';
URL.MaintainerEdit = '/upkeep/maintainer/maintainer!updateMaintainer.do';
URL.MaintainerDel = '/upkeep/maintainer/maintainer!deleteMaintainer.do';
URL.ExportMaintainer = '/upkeep/maintainer/maintainer!exportMaintainer.do';
URL.MaintenanceTeamList = '/upkeep/page/maintenance/maintenanceTeamList.jsp?menuNO=1440';

URL.MaintainerList = '/upkeep/page/maintenance/maintainerList.jsp?menuNO=1451&parentMenuNO=1450';
URL.WorkingMaintainerList = '/upkeep/page/maintenance/maintainerList.jsp?menuNO=1451&parentMenuNO=1450';

URL.BillChangeList = '/upkeep/page/maintenance/billChangeList.jsp?menuNO=1470';
URL.GetMaintainerInfo = '/upkeep/maintainer/maintainer!getMaintainerById.do';
URL.GetMaintainerBindUser='/upkeep/maintainer/maintainer!getMaintainrBindUser.do';
URL.UpdateMaintainerBindUser='/upkeep/maintainer/maintainer!updateMaintainrBindUser.do';
URL.UpdateMaintainerRemoveBindUser='/upkeep/maintainer/maintainer!updateMaintainrRemoveBindUser.do';
/* 保养单管理 */
MenuNumber.MaintenanceBillList=1460;
MenuNumber.MaintenanceOfGenerated=14601;
MenuNumber.MaintenanceOfNotRenewed=14602;
MenuNumber.MaintenanceOfWaitFollowUp=14603;
MenuNumber.MaintenanceOfNotReceiving=14606;
MenuNumber.WaitOfSure=14609;
MenuNumber.WaitOfSend=14610;
MenuNumber.WaitOfAccepted=14611;
MenuNumber.NotAcceptdWithinTwentyFourHours=14612;
MenuNumber.WaitOfSignIn=14613;
MenuNumber.WaitOfSignOut=14614;
MenuNumber.NotperformedOfOutdate=14615;
MenuNumber.WaitOfCheck=14616;
MenuNumber.WaitOfCheckViewScore=146162;
MenuNumber.CheckOfComplete=14617;
MenuNumber.MaintenanceOfWaitHandle=14618;
MenuNumber.MaintenanceOfHandleComplete=14619;
/*24小时内未接受*/
MenuNumber.NotAcceptdWithinTwentyFourHoursReEdit=146120;
MenuNumber.NotperformedOfOutdateReSend=146150;
URL.getMaintainerByOrderId = '/upkeep/order/upkeepOrder!getMaintainerByOrderId.do';
URL.getOrderById = '/upkeep/order/upkeepOrder!getOrderElevById.do';
URL.updateOrderByProcess = '/upkeep/order/upkeepOrder!updateOrderByProcess.do';
URL.NotAcceptdWithinTwentyFourHoursReEdit = '/upkeep/page/maintenance/maintenanceBillList.jsp?menuNO=14612&parentMenuNO=14603';


URL.MaintenanceBillList = '/upkeep/page/maintenance/maintenanceBillList.jsp?menuNO=1460';
URL.MaintenanceOfGenerated = '/upkeep/page/maintenance/maintenanceBillList.jsp?menuNO=14609&parentMenuNO=14601';
URL.MaintenanceOfNotRenewed = '/upkeep/page/maintenance/notRenewedlList.jsp?menuNO=14602';
URL.MaintenanceOfWaitFollowUp = '/upkeep/page/maintenance/maintenanceBillWaitFollowUpList.jsp?menuNO=14603';
URL.MaintenanceOfNotReceiving = '/upkeep/page/maintenance/maintainerBillStatusList.jsp?menuNO=14606';
URL.MaintenanceOfNotPerformed = '/upkeep/page/maintenance/maintainerBillStatusList.jsp?menuNO=14607';
URL.MaintenanceOfChangeRequest = '/upkeep/page/maintenance/maintainerBillStatusList.jsp?menuNO=14608';
URL.WaitOfSure = '/upkeep/page/maintenance/maintenanceBillList.jsp?menuNO=14609';
URL.WaitOfSend = '/upkeep/page/maintenance/maintenanceBillList.jsp?menuNO=14610';
URL.WaitOfAccepted = '/upkeep/page/maintenance/maintenanceBillList.jsp?menuNO=14611';
URL.NotAcceptdWithinTwentyFourHours = '/upkeep/page/maintenance/maintenanceBillList.jsp?menuNO=14612&parentMenuNO=14603';
URL.WaitOfSignIn = '/upkeep/page/maintenance/maintenanceBillList.jsp?menuNO=14613';
URL.WaitOfSignOut = '/upkeep/page/maintenance/maintenanceBillList.jsp?menuNO=14614';
URL.NotperformedOfOutdate = '/upkeep/page/maintenance/maintenanceBillList.jsp?menuNO=14615&parentMenuNO=14603';
URL.WaitOfCheck = '/upkeep/page/maintenance/maintenanceBillWaitFollowUpList.jsp?menuNO=14616';
URL.CheckOfComplete = '/upkeep/page/maintenance/maintenanceBillWaitFollowUpList.jsp?menuNO=14617';
URL.MaintenanceOfWaitHandle = '/upkeep/page/maintenance/maintainerBillChangeList.jsp?menuNO=14618&parentMenuNO=14604';
URL.MaintenanceOfHandleComplete = '/upkeep/page/maintenance/maintainerBillChangeList.jsp?menuNO=14619';

URL.GetOrderList = '/upkeep/order/upkeepOrder!getOrderList.do';
URL.GetNotProcessOrder = '/upkeep/order/upkeepOrder!getNotProcessOrder.do';
URL.GetChangeOrder = '/upkeep/order/upkeepOrder!getChangeOrder.do';
URL.NotRenewedMaintenanceBill = '/upkeep/order/upkeepOrder!getNotSignContractElevs.do';

URL.GetDetailOrderList = '/upkeep/order/upkeepOrder!getDetailOrderList.do';

URL.GetElevFormContractList = '/upkeep/order/upkeepOrder!getElevFormContract.do';
URL.GetMaintenanceBillCounts = '/upkeep/order/upkeepOrder!getOrderCount.do';
URL.GetUpkeepOrderPictureList = '/upkeep/order/upkeepOrder!getPictureList.do';

MenuNumber.MaintenanceBillOfAdd=146010;
MenuNumber.MaintenanceBillOfImport=146011;
MenuNumber.MaintenanceBillOfExport=146012;
MenuNumber.MaintenanceBillOfEdit=146013;
MenuNumber.MaintenanceBillOfDel=146014;
MenuNumber.MaintenanceBillOfOneTouch=146015;
MenuNumber.MaintenanceBillOfOneTouchByNext=146016;
MenuNumber.MaintenanceBillOfBatchConfirmation=146017;


/*续签失败添加的保养单列表*/
MenuNumber.MaintenanceBillByFailureContract=14620;
URL.getOrderByFailureContract = '/upkeep/order/upkeepOrder!getOrderByFailureContract.do';

/*续签失败添加保养单*/
MenuNumber.MaintenanceBillByFailureContractOfAdd=146200;
/*续签失败修改保养单*/
MenuNumber.MaintenanceBillByFailureContractOfEdit=146201;
/*续签失败删除保养单*/
MenuNumber.MaintenanceBillByFailureContractOfDel=146202;

/*续签合同失败添加保养单*/
URL.AddMaintenanceBillByFailureContract = '/upkeep/order/upkeepOrder!addOrderByFailureContract.do';

URL.MaintenanceBillByFailureContract = '/upkeep/page/maintenance/maintenanceBillList.jsp?menuNO=14620&parentMenuNO=1460';




URL.AddMaintenanceBill = '/upkeep/order/upkeepOrder!addOrder.do';
URL.ImportMaintenanceBill = '/upkeep/order/upkeepOrder!importOrderUpdate.do';
URL.ExportMaintenanceBill = '/upkeep/order/upkeepOrder!exportOrder.do';
URL.EditMaintenanceBill = '/upkeep/order/upkeepOrder!updateOrder.do';
URL.DelMaintenanceBill = '/upkeep/order/upkeepOrder!deleteOrder.do';
URL.MaintenanceBillOfOneTouch = '/upkeep/order/upkeepOrder!oneTouchGenerateOrder.do';
URL.MaintenanceBillOfBatchConfirmation = '/upkeep/order/upkeepOrder!updateOrderByBatchConfirmation.do';

MenuNumber.MaintenanceBillOfAcceptReEdit=146110;
MenuNumber.MaintenanceBillOfAccept=146111;


MenuNumber.MaintenanceBillOfConfirm=146090;
MenuNumber.MaintenanceBillOfConfirmEdit=146091;
MenuNumber.MaintenanceBillOfReEdit=146101;
MenuNumber.MaintenanceBillOfSend=146102;

URL.SendMaintenanceBill = '/upkeep/order/upkeepOrder!updateOrderStatus.do';
URL.ChangeRequestMaintenanceBill = '/upkeep/order/upkeepOrder!orderChangeRequest.do';
URL.GetChangeOrderById = '/upkeep/order/upkeepOrder!getChangeOrderById.do';
URL.setChangeBillOrder = '/upkeep/order/upkeepOrder!orderChangeProcess.do';

MenuNumber.MaintenanceOfWaitCheckedExport=146160;
MenuNumber.MaintenanceOfWaitCheckedScore=146161;

URL.GetMaintenanceBillScoreInfo = '/upkeep/order/upkeepOrder!getScoreInfo.do';
URL.SetMaintenanceBillScore = '/upkeep/order/upkeepOrder!updateScoreInfo.do';

MenuNumber.MaintenanceOfCheckedExport=146170;
MenuNumber.MaintenanceOfCheckedViewScore=146171;
MenuNumber.MaintenanceOfProcessView=146172;

MenuNumber.MaintenanceOfHandleChangeRequest=146180;

/**物业单位人员**/

MenuNumber.PropertyPersonAdd=1710;
MenuNumber.PropertyPersonAddLimits=17100;
MenuNumber.PropertyPersonAddInfoLimits=17101;
MenuNumber.PropertyPersonEdit=1701;
MenuNumber.PropertyPersonEditLimits=17010;
MenuNumber.PropertyPersonEditInfoLimits=17011;
MenuNumber.PropertyPersonDel=1702;
MenuNumber.PropertyPersonExport=1720;

URL.PropertyPersonList = '/upkeep/page/maintenance/propertyPersonList.jsp?menuNO=1700';
URL.GetPropertyPersonList = '/upkeep/property/person!getPropertyPersonList.do';
URL.PropertyPersonAdd = '/upkeep/property/person!savePropertyPerson.do';
URL.PropertyPersonEdit = '/upkeep/property/person!updatePropertyPerson.do';
URL.GetPropertyPersonInfo = '/upkeep/property/person!getPropertyPersonById.do';
URL.DelPropertyPerson = '/upkeep/property/person!deletePropertyPerson.do';
URL.ExportPropertyPerson = '/upkeep/property/person!exportPropertyPerson.do';

/* 电梯维修管理  困人急修 */
MenuNumber.TrapsPeopleMaintainList = 1510;
MenuNumber.TrapsPeopleMaintainAdd = 15110;
MenuNumber.TrapsPeopleMaintainEdit = 15111;
MenuNumber.TrapsPeopleMaintainListOfWaitting = 1511;
MenuNumber.TrapsPeopleMaintainListOfCompleted = 1512;
MenuNumber.TrapsPeopleMaintainListOfViewProcess = 15120;

URL.TrapsPeopleMaintainListOfCompleted = '/upkeep/page/repair/trapsPeopleMaintainList.jsp?menuNO=1512';

URL.TrapsPeopleMaintainList = '/upkeep/page/repair/trapsPeopleMaintainList.jsp?menuNO=1511&parentMenuNO=1510';
URL.PopupTrapsPeopleMaintainEdit = '/upkeep/page/repair/popupTrapsPeopleMaintainEdit.jsp';
URL.TrapsPeopleMaintainAdd = '/upkeep/page/repair/trapsPeopleMaintainEdit.jsp?menuNO=15111';
URL.TrapsPeopleMaintainEdit = '/upkeep/page/repair/trapsPeopleMaintainEdit.jsp?menuNO=15111';
URL.GetTrappedPeopleList = '/upkeep/traps/trapsPeopleMaintain!list.do';

/* 查看困人急修单的可视化过程 */
URL.TrapsPeopleMaintainListOfViewProcess = '/upkeep/page/repair/trapsPeopleMaintainProcessView.jsp?menuNO=15120';

URL.GetTrapsVisualProcessList='/upkeep/visual/visualProcess!getTrapsVisuaProList.do';
URL.GetNonTrapsVisualProcessList='/upkeep/visual/visualProcess!getNonTrapsVisuaProList.do';
URL.GetPlanVisualProcessList='/upkeep/visual/visualProcess!getPlanVisuaProList.do';
URL.GetMainBillVisualList='/upkeep/order/upkeepOrder!getVisualList.do';

/* 获取困人急修列表 */
URL.GetTrapsPeopleById = '/upkeep/traps/trapsPeopleMaintain!getByElevId.do';
//URL.GetTrapsPeopleById = '/upkeep/traps/trapsPeopleMaintain!getById.do';
URL.GetTrapsPeopleByElevId = '/upkeep/traps/trapsPeopleMaintain!getTrapsListByElevId.do';
URL.GetSelectedPeopleByTrapsId = '/upkeep/traps/trapsPeopleMaintain!getMaintainerBytrapsId.do';
URL.GetMaintainerListByUpkeepCompanyId= '/upkeep/maintainer/maintainer!getMaintainerListByCompany.do';
URL.AddTrapsPeopleMaintain = '/upkeep/traps/trapsPeopleMaintain!add.do';
URL.EditTrapsPeopleMaintain = '/upkeep/traps/trapsPeopleMaintain!edit.do';
URL.GetTrapsCounts = '/upkeep/traps/trapsPeopleMaintain!getTrapsCounts.do';

/* 非困人急修 */
MenuNumber.NonTrapsMonadMaintainList = 1520;
MenuNumber.NonTrapsMonadMaintainPopUp = 1529;
URL.NonTrapsMonadList = '/upkeep/page/repair/nonTrapsMonadMaintainList.jsp?menuNO=1521&parentMenuNO=1520';
URL.NonTrapsPeopleList = '/upkeep/page/repair/nonTrapsPeopleMaintainList.jsp?menuNO=1521&parentMenuNO=1520';
/*1小时跟踪*/
URL.PeopleNonTrapsListPage = '/upkeep/page/repair/nonTrapsPeopleMaintainList.jsp?menuNO=1525&parentMenuNO=1520';
URL.PeopleNonTrapsByOneHourTrack = '/upkeep/nontraps/nonTrapsPeopleMaintain!updateTrackTime.do';
URL.MonadLNonTrapsist = '/upkeep/nontraps/nonTrapsPeopleMaintain!list.do';
URL.PeopleNonTrapsList = '/upkeep/nontraps/nonTrapsPeopleMaintain!maintainerList.do';
URL.NonTrapsFaultList = '/upkeep/page/repair/nonTrapsFaultList.jsp?menuNO=1550&parentMenuNO=1520';
URL.GetNonTrapsFaultinfo = '/upkeep/nontraps/nonTrapsPeopleMaintain!getNonTrapsFaultinfo.do';
URL.WaittingAddNonTrapsEvent='/upkeep/nontraps/nonTrapsPeopleMaintain!dnss_addNonTrapsEvent.do';

URL.GetNontrapsPeopleById = '/upkeep/nontraps/nonTrapsPeopleMaintain!getByElevId.do';
//URL.GetNontrapsPeopleById = '/upkeep/nontraps/nonTrapsPeopleMaintain!getById.do';
URL.GetSelectedPeopleByNontrapsId = '/upkeep/nontraps/nonTrapsPeopleMaintain!getMaintainerByNontrapsId.do';
URL.GetNonTrapsCounts = '/upkeep/nontraps/nonTrapsPeopleMaintain!getNonTrapsCounts.do';
URL.GetNonTrapsListByElevId = '/upkeep/nontraps/nonTrapsPeopleMaintain!getNonTrapsListByElevId.do';
URL.GetNonTrapsFaultList='/upkeep/nontraps/nonTrapsPeopleMaintain!getNonTrapsFaultList.do'
/** APP 测试 **/
//URL.WaittingAddNonTrapsPeopleMaintain='/upkeep/nontraps/nonTrapsPeopleMaintain!appModifyJUnit.do';
MenuNumber.NonTrapsFaultList=1550;

MenuNumber.NonTrapsPeopleMaintainOfWaittingAdd = 15211;
MenuNumber.NonTrapsPeopleMaintainOfWaittingEdit = 15210;

URL.NonTrapsPeopleMaintainOfWaittingAdd = '/upkeep/page/repair/nonTrapsPeopleMaintainEdit.jsp?menuNO=15211';
URL.NonTrapsPeopleMaintainOfWaittingEdit = '/upkeep/page/repair/nonTrapsPeopleMaintainEdit.jsp?menuNO=15210';

URL.WaittingAddNonTrapsPeopleMaintain = '/upkeep/nontraps/nonTrapsPeopleMaintain!add.do';
URL.WaittingEditTrapsPeopleMaintain = '/upkeep/nontraps/nonTrapsPeopleMaintain!edit.do';

MenuNumber.NonTrapsPeopleMaintainListOfWaitting = 1521;
MenuNumber.NonTrapsPeopleMaintainListOfFiveMinutesNotAccepted = 1523;
MenuNumber.NonTrapsPeopleMaintainListOfThirtyMinutesNotCheckOut = 1524;
MenuNumber.NonTrapsPeopleMaintainListOfOneHourNotCheckOut = 1525;
/*1小时跟踪*/
MenuNumber.NonTrapsPeopleMaintainListOfOneHourTrack = 15250;
MenuNumber.NonTrapsPeopleMaintainListOfTwoHoursNotCheckIn = 1526;
MenuNumber.NonTrapsPeopleMaintainListOfChecking = 1527;
MenuNumber.NonTrapsPeopleMaintainListOfCompleted = 1528;



URL.NonTrapsPeopleMaintainListOfChecking = '/upkeep/page/repair/nonTrapsPeopleMaintainList.jsp?menuNO=1527&parentMenuNO=1520';
URL.NonTrapsPeopleMaintainListOfCompleted = '/upkeep/page/repair/nonTrapsPeopleMaintainList.jsp?menuNO=1528&parentMenuNO=1520';

URL.NonTrapsPeopleMaintainListOfChecking = '/upkeep/page/repair/nonTrapsMonadMaintainList.jsp?menuNO=1527&parentMenuNO=1520';
URL.NonTrapsPeopleMaintainListOfCompleted = '/upkeep/page/repair/nonTrapsMonadMaintainList.jsp?menuNO=1528&parentMenuNO=1520';



MenuNumber.NonTrapsOfReturnScore = 15270;
MenuNumber.NonTrapsOfScoreView = 15280;
MenuNumber.NonTrapsOfProcessView = 15281;

URL.GetNonTrapsScoreInfo = '/upkeep/nontraps/nonTrapsPeopleMaintain!gradeList.do';
URL.SetReturnScoreOfNonTraps = '/upkeep/nontraps/nonTrapsPeopleMaintain!grade.do';


/** 计划维护单 **/
MenuNumber.PlanMaintainList = 1530;
MenuNumber.PlanMaintainUndefined = 1531;
MenuNumber.PlanMaintainPending = 1532;
MenuNumber.PlanMaintainWaitCheck = 1533;
MenuNumber.PlanMaintainChecked = 1534;
MenuNumber.PlanMaintainNotAccepted = 1535;
MenuNumber.PlanMaintainTwoHoursCheckedOut = 1536;
MenuNumber.PlanMaintainOverdueCheckOut = 1537;
MenuNumber.PlanMaintainFollowUp = 1538;
/*2小时跟踪--编辑*/
MenuNumber.PlanMaintainTwoHoursTrackEdit = 15360;
/*2小时跟踪--列表*/
URL.PlanMaintainTwoHoursTrackList = '/upkeep/page/repair/planPeopleList.jsp?menuNO=1536&parentMenuNO=1530';
URL.EditPlanMaintainTwoHoursTrack = '/upkeep/plan/planMaintain!updateTrackTime.do';
/*过时未完成--强制签出*/
MenuNumber.PlanMaintainByForced = 15370;
URL.UpdatePlanMaintainByForced = '/upkeep/plan/planMaintain!updatePlanMaintainByForced.do';

URL.PlanMaintainList = '/upkeep/page/repair/planMaintainList.jsp?menuNO=1530';
URL.PlanMaintainUndefined = '/upkeep/page/repair/planMaintainList.jsp?menuNO=1531&parentMenuNO=1530';
URL.PlanMaintainPending = '/upkeep/page/repair/planMaintainList.jsp?menuNO=1532&parentMenuNO=1530';
URL.PlanMaintainWaitCheck = '/upkeep/page/repair/planMaintainList.jsp?menuNO=1533&parentMenuNO=1530';
URL.PlanMaintainChecked = '/upkeep/page/repair/planMaintainList.jsp?menuNO=1534&parentMenuNO=1530';
URL.PlanMaintainNotAccepted = '/upkeep/page/repair/planPeopleList.jsp?menuNO=1535';
URL.PlanMaintainTwoHoursCheckedOut = '/upkeep/page/repair/planPeopleList.jsp?menuNO=1536';
URL.PlanMaintainOverdueCheckOut = '/upkeep/page/repair/planPeopleList.jsp?menuNO=1537';
URL.PlanMaintainFollowUp = '/upkeep/page/repair/planMaintainList.jsp?menuNO=1538&parentMenuNO=1530';

URL.GetplanMaintainList='/upkeep/plan/planMaintain!planMaintainList.do';//展示列表 (按单据状态)
URL.GetMaintainerList='/upkeep/plan/planMaintain!maintainerList.do';	//展示列表(按维修人员)
URL.GetplanListByElevId='/upkeep/plan/planMaintain!getplanListByElevId.do' ; //查找电梯是否存在
//URL.GetplanListById='/upkeep/plan/planMaintain!getById.do' ; //编辑页面展示计划单
URL.GetplanListById='/upkeep/plan/planMaintain!getByElevId.do' ; //编辑页面展示计划单
URL.GetMaintainerByplanId='/upkeep/maintainer/maintainer!getMaintainerListByCompany.do';	//编辑页面展示维修人员
URL.GetplanMaintainerById='/upkeep/plan/planMaintain!getMaintainerByplanId.do';	//已选中维修人员
URL.AddplanMaintain='/upkeep/plan/planMaintain!add.do';	//添加计划维护单
URL.EditplanMaintain='/upkeep/plan/planMaintain!edit.do';		//编辑提交
URL.GetplanCounts='/upkeep/plan/planMaintain!getplanCounts.do';	//获取闪灯
URL.SetPlanGrade='/upkeep/plan/planMaintain!grade.do'; //评分提交
URL.GetPlanGradeList='/upkeep/plan/planMaintain!gradeList.do'; //评分展示
URL.DelPlanMaintain='/upkeep/plan/planMaintain!delPlanMaintain.do';

MenuNumber.PlanMaintainUndefinedEdit = 15312;
MenuNumber.PlanMaintainPendingEdit = 15322;

MenuNumber.PlanMaintainFllowUpAdd = 15380;
MenuNumber.PlanMaintainFllowUpEdit = 15381;
MenuNumber.PlanMaintainFllowUpDel = 15382;

URL.PlanMaintainUndefinedEdit = '/upkeep/page/repair/planMaintainEdit.jsp?menuNO=15312';
URL.PlanMaintainPendingEdit = '/upkeep/page/repair/planMaintainEdit.jsp?menuNO=15322';

URL.PlanMaintainFllowUpAdd = '/upkeep/page/repair/planMaintainEdit.jsp?menuNO=15380';
URL.PlanMaintainFllowUpEdit = '/upkeep/page/repair/planMaintainEdit.jsp?menuNO=15381';

MenuNumber.PlanMaintainReturnScore = 15330;
MenuNumber.PlanMaintainViewScore = 15340;
MenuNumber.PlanMaintainProcessView = 15341;



URL.RepairChangeList = '/upkeep/page/repair/repairChangeList.jsp?menuNO=1540';
MenuNumber.RepairChangeList = 1540;

/* 电梯配件管理  */
MenuNumber.ElevatorPartsList = 1300;
URL.ElevatorPartsList = '/upkeep/page/parts/elevatorPartsList.jsp?menuNO=1300';

/* 电梯年检管理 */
URL.YearInspectionList = '/upkeep/page/inspection/yearInspectionList.jsp?menuNO=1910&parentMenuNO=1900';
URL.YearInspectionList2 = '/upkeep/page/inspection/yearInspectionList.jsp?menuNO=1920&parentMenuNO=1900';
URL.YearInspectionList3 = '/upkeep/page/inspection/yearInspectionList.jsp?menuNO=1930&parentMenuNO=1900';
URL.YearInspectionList4 = '/upkeep/page/inspection/yearInspectionList.jsp?menuNO=1940&parentMenuNO=1900';
URL.YearInspectionList5 = '/upkeep/page/inspection/yearInspectionList.jsp?menuNO=1950&parentMenuNO=1900';
URL.YearInspectionList6 = '/upkeep/page/inspection/yearInspectionList.jsp?menuNO=1960&parentMenuNO=1900';
URL.YearInspectionList7 = '/upkeep/page/inspection/yearInspectionList.jsp?menuNO=1970&parentMenuNO=1900';
URL.YearInspectionList8 = '/upkeep/page/inspection/yearInspectionList.jsp?menuNO=1980&parentMenuNO=1900';
URL.YearInspectionList9 = '/upkeep/page/inspection/yearInspectionList.jsp?menuNO=1990&parentMenuNO=1900';
URL.YearInspectionList14 = '/upkeep/page/inspection/yearInspectionList.jsp?menuNO=19100&parentMenuNO=1900';

URL.YearInspectionEdit = '/upkeep/page/inspection/yearInspectionEdit.jsp?menuNO=1901';
URL.YearInspectionLogList = '/upkeep/page/inspection/yearInspectionLogList.jsp?menuNO=1902';
URL.GetYearInspectionList ='/upkeep/inspection/inspection!inspectionList.do';
URL.YearInspectionRecordEdit = '/upkeep/page/inspection/YearInspectionRecordEdit.jsp?menuNO=1904';
URL.EditYearInspection ='/upkeep/inspection/inspection!checkIn.do';
URL.GETInspectionInfo = '/upkeep/inspection/inspection!getInspectionInfo.do';
URL.GetYearInspectionLogList ='/upkeep/inspection/inspection!inspectionLogList.do';
URL.ImportInspection = '/upkeep/inspection/inspection!importInspection.do';
URL.SaveInsoectionRecordStatus = '/upkeep/inspection/inspection!saveRecordStatus.do';
URL.GetInspectionProcessList = '/upkeep/inspection/inspection!getInspectionProcessList.do';
URL.GetInspectionCount = '/upkeep/inspection/inspection!getCountForAllStates.do';
URL.ExportInspection='/upkeep/inspection/inspection!exportInspection.do';
URL.ExportSpecialCheckInspection = '/upkeep/inspection/inspection!exportSpecialCheckInspection.do';
URL.UpdateInspectionLog = '/upkeep/inspection/inspection!updateInspectionLog.do';

MenuNumber.YearInspectionList = 1900;
/* 待取缴费通知单 */
MenuNumber.EditYearInspection = 1911;
MenuNumber.YearInspectionLogList = 1912;
MenuNumber.YearInspectionLogView = 1915;
MenuNumber.YearInspectionBatchImport = 1913;
MenuNumber.YearInspectionRecordEdit = 1914;
/* 21天未取缴费单 */
MenuNumber.EditYearInspection2 = 1921;
MenuNumber.YearInspectionLogList2 = 1922;
MenuNumber.YearInspectionBatchImport2 = 1923;
MenuNumber.YearInspectionRecordEdit2 = 1924;
MenuNumber.YearInspectionLogView2 = 1925;

/* 待取用户缴费单*/
MenuNumber.EditYearInspection3 = 1931;
MenuNumber.YearInspectionLogList3 = 1932;
MenuNumber.YearInspectionBatchImport3 = 1933;
MenuNumber.YearInspectionRecordEdit3 = 1934;
MenuNumber.YearInspectionLogView3 = 1935;

/* 12天未预约技监 */
MenuNumber.EditYearInspection4 = 1941;
MenuNumber.YearInspectionLogList4 = 1942;
MenuNumber.YearInspectionBatchImport4 = 1943;
MenuNumber.YearInspectionRecordEdit4 = 1944;
MenuNumber.YearInspectionLogView4 = 1945;

/* 带预约技监 */
MenuNumber.EditYearInspection5 = 1951;
MenuNumber.YearInspectionLogList5 = 1952;
MenuNumber.YearInspectionBatchImport5 = 1953;
MenuNumber.YearInspectionRecordEdit5 = 1954;
MenuNumber.YearInspectionLogView5 = 1955;

/* 技监未完成 */
MenuNumber.EditYearInspection6 = 1961;
MenuNumber.YearInspectionLogList6 = 1962;
MenuNumber.YearInspectionBatchImport6 = 1963;
MenuNumber.YearInspectionRecordEdit6 = 1964;
MenuNumber.YearInspectionLogView6 = 1965;
MenuNumber.YearInspectionRecordBatchEdit6 = 1966;

/* 质监完成 */
MenuNumber.EditYearInspection7 = 1971;
MenuNumber.YearInspectionLogList7 = 1972;
MenuNumber.YearInspectionBatchImport7 = 1973;
MenuNumber.YearInspectionRecordEdit7 = 1974;
MenuNumber.YearInspectionLogView7 = 1975;
MenuNumber.YearInspectionRecordBatchEdit7 = 1976;

/* 技监正常 */
MenuNumber.EditYearInspection8 = 1981;
MenuNumber.YearInspectionLogList8 = 1982;
MenuNumber.YearInspectionBatchImport8 = 1983;
MenuNumber.YearInspectionRecordExport8 = 1984;
MenuNumber.YearInspectionLogView8 = 1985;
MenuNumber.YearInspectionRecordBatchEdit8 = 1986;
MenuNumber.YearInspectionExportSpecialCheck = 1987;
MenuNumber.YearInspectionLogEdit8 = 1988;
MenuNumber.YearInspectionLogReturn8 = 1989;



/* 技监超期 */
MenuNumber.EditYearInspection9 = 1991;
MenuNumber.YearInspectionLogList9 = 1992;
MenuNumber.YearInspectionBatchImport9 = 1993;
MenuNumber.YearInspectionRecordExport9 = 1994;
MenuNumber.YearInspectionLogView9 = 1995;
MenuNumber.YearInspectionRecordBatchEdit9 = 1996;
MenuNumber.YearInspectionLogEdit9 = 1998;
MenuNumber.YearInspectionLogReturn9 = 1999;

/*技监提醒*/
MenuNumber.EditYearInspection14	= 19101;
MenuNumber.YearInspectionLogList14 = 19102;
MenuNumber.YearInspectionBatchImport14 = 19103;
MenuNumber.YearInspectionRecordExport14 = 19104;
MenuNumber.YearInspectionLogView14 = 19105;
MenuNumber.YearInspectionRecordBatchEdit14 = 19106;
MenuNumber.YearInspectionLogEdit14 = 19108;
MenuNumber.YearInspectionLogReturn14 = 19109;


MenuNumber.waitingTakeNotice = 1910;
MenuNumber.waitingTakeNoticeAfter21Days = 1920;
MenuNumber.waitingTakePayment = 1930;
MenuNumber.waitingSuperviseAfter12Days = 1940;
MenuNumber.waitingSupervise = 1950;
MenuNumber.notFinishedInspection = 1960;
MenuNumber.finishedInspection = 1970;
MenuNumber.inspectionNormal = 1980;
MenuNumber.inspectionOverTime = 1990;
MenuNumber.inspectionRemind = 19100;



URL.SaveBatchEditYearInspection = '/upkeep/inspection/inspection!saveBatchInspection.do';

/* 维保数量统计 */
MenuNumber.UpkeepCountList = 2200;
MenuNumber.UpkeepCountExport = 2210;
MenuNumber.UpkeepCountRefresh = 2211;
MenuNumber.UpkeepCountExport = 2212;

URL.UpkeepCountList = '/upkeep/page/maintenance/upkeepCount.jsp?menuNO=2200';
URL.GetUpkeepCountList = '/upkeep/upkeepCount/upkeepCount!getUpkeepCountList.do';
URL.UpkeepCountRefresh = '/upkeep/upkeepCount/upkeepCount!dnss_refreshUpkeepCount.do';
URL.ExportUpkeepCount = '/upkeep/upkeepCount/upkeepCount!exportUpkeepCount.do';


/* 故障统计(按单位统计) */
MenuNumber.FaultStatisticsByCompany = 9310;
/* 故障统计(按时间统计) */
MenuNumber.FaultStatisticsByTime = 9320;
/* 故障统计(按电梯统计) */
MenuNumber.FaultStatisticsByElevator = 9330;
/* 故障统计(按故障代码统计) */
MenuNumber.FaultStatisticsByEventCode = 9340;
/* 故障统计(按地区统计) */
MenuNumber.FaultStatisticsByArea = 9350;


/* 二维码管理 */
MenuNumber.QRcodeList = 1600;
URL.QRcodeList = '/baseinfo/page/qrcode/qrcodeList.jsp?menuNO=2750';
URL.GetQRcodeList = '/baseinfo/qrcode/qrcode!qrcodeList.do';
URL.GetNotUseQrcodeList = '/baseinfo/qrcode/qrcode!getNotUseQrcodeList.do';
/* 批量添加二维码 */
MenuNumber.AddBatchQrcode = 1610;
URL.AddBatchQrcode = '/baseinfo/qrcode/qrcode!addBatchQrcode.do';

MenuNumber.qrcodeNotUseList = 1602;
URL.qrcodeNotUseList = '/baseinfo/page/qrcode/qrcodeNotUseList.jsp?menuNO=1602&parentMenuNO=1600';


/* 用户管理 */
URL.UserList = '/sys/page/user/userList.jsp?menuNO=4300';
URL.UserAdd = '/sys/page/user/userEdit.jsp?menuNO=4301';
URL.UserEdit = '/sys/page/user/userEdit.jsp?menuNO=4302';
URL.UserRoleEdit = '/sys/page/user/userRoleEdit.jsp?menuNO=4303';
URL.GetUserList = '/sys/user/user!userList.do';
URL.GetAllUserList = '/sys/user/user!userAllList.do';
URL.GetUserSelect = '/sys/user/user!getUserSelect.do';
URL.GetUserById = '/sys/user/user!getById.do';
URL.AddUser = '/sys/user/user!save.do';
URL.EditUser = '/sys/user/user!update.do';
URL.EditUserRole = '/sys/user/user!grantUserRole.do';
URL.DelUser = '/sys/user/user!delete.do';
URL.SetPassword = '/sys/user/user!doNotNeedSecurity_updateCurrentPwd.do';
URL.ExportUser = '/sys/user/user!exportUserExcel.do';
URL.GetUserRoleList = '/sys/user/user!userRoleList.do';
URL.GetUserYrRoleList='/sys/user/user!userYrRoleList.do';
MenuNumber.UserList = 4300;
MenuNumber.UserAdd = 4301;
MenuNumber.UserEdit = 4302;
MenuNumber.UserRoleEdit = 4303;
MenuNumber.UserDel = 4308;
MenuNumber.ExportUser = 4305;


/* 角色管理 */
URL.RoleList = '/sys/page/role/roleList.jsp?menuNO=4200';
URL.RoleAdd = '/sys/page/role/roleEdit.jsp?menuNO=4201';
URL.RoleEdit = '/sys/page/role/roleEdit.jsp?menuNO=4202';
URL.RoleMenuEdit = '/sys/page/role/roleMenuEdit.jsp?menuNO=4203';
URL.GetRoleListByUserId = '/sys/role/role!getRoleListByUserId.do';
URL.GetRoleList = '/sys/role/role!roleList.do';
URL.GetRoleById = '/sys/role/role!getById.do';
URL.AddRole = '/sys/role/role!save.do';
URL.EditRole = '/sys/role/role!update.do';
URL.DelRole = '/sys/role/role!delete.do';

URL.EditRoleMenu = '/sys/role/role!grantRoleMenu.do';
URL.YrRoleList = '/sys/page/role/yrRoleList.jsp?menuNO=4250';
URL.GetYrRoleList='/sys/role/role!yrRoleList.do';
URL.EditYrRoleMenu = '/sys/role/role!yrGrantRoleMenu.do';
MenuNumber.RoleList = 4200;
MenuNumber.RoleAdd = 4201;
MenuNumber.RoleEdit = 4202;
MenuNumber.RoleMenuEdit = 4203;
MenuNumber.RoleDel = 4208;
MenuNumber.RoleUser=4204;
MenuNumber.YrRoleMenuEdit = 4251;
MenuNumber.YrRoleUser=4252
/* 菜单管理 */
URL.MenuList = '/sys/page/menu/menuList.jsp?menuNO=5200';
URL.MenuAdd = '/sys/page/menu/menuEdit.jsp?menuNO=5201';
URL.MenuEdit = '/sys/page/menu/menuEdit.jsp?menuNO=5202';
URL.GetMenuList = '/sys/menu/menu!menuList.do';
URL.GetMenuTree = '/sys/menu/menu!getMenuTree.do';
URL.AddMenu = '/sys/menu/menu!save.do';
URL.EditMenu = '/sys/menu/menu!update.do';
URL.DelMenu = '/sys/menu/menu!delete.do';

/* 接警号码设置 */
MenuNumber.WarningNumberSettingList = 5300;
MenuNumber.WarningNumberSettingAdd = 5310;
MenuNumber.WarningNumberSettingEdit = 5320;
MenuNumber.WarningNumberSettingDel = 5330;
URL.WarningNumberSettingList = '/monitor/page/control/warningNumberSettingList.jsp?menuNO=5300';
URL.WarningNumberSettingAdd = '/monitor/page/control/warningNumberSettingEdit.jsp?menuNO=5310';
URL.WarningNumberSettingEdit = '/monitor/page/control/warningNumberSettingEdit.jsp?menuNO=5320';

URL.GetWarningCalledList = '/monitor/control/warningCalled!warningCalledList.do';

URL.GetWarningCalledByElevId = '/monitor/control/warningCalled!getByElevId.do';




/* 保养项管理 */
URL.UpkeepItemList = '/baseinfo/page/upkeep/upkeepItemList.jsp?menuNO=2100';
URL.UpkeepItemAdd = '/baseinfo/page/upkeep/upkeepItemEdit.jsp?menuNO=2101';
URL.UpkeepItemEdit = '/baseinfo/page/upkeep/upkeepItemEdit.jsp?menuNO=2102';
URL.GetUpkeepItemList = '/baseinfo/upkeep/upkeepItem!upkeepItemList.do';
URL.GetUpkeepItemListByUpkeepTypeId= '/baseinfo/upkeep/upkeepItem!findItemListByType.do';
URL.GetUpkeepItemById = '/baseinfo/upkeep/upkeepItem!getById.do';
URL.AddUpkeepItem = '/baseinfo/upkeep/upkeepItem!save.do';
URL.EditUpkeepItem = '/baseinfo/upkeep/upkeepItem!update.do';
URL.DelUpkeepItem = '/baseinfo/upkeep/upkeepItem!delete.do';

MenuNumber.UpkeepItemList = 2100;
MenuNumber.UpkeepItemAdd = 2101;
MenuNumber.UpkeepItemEdit = 2102;
MenuNumber.UpkeepItemDel = 2108;

/* 保养类型管理 */
URL.UpkeepTypeList = '/baseinfo/page/upkeep/upkeepTypeList.jsp?menuNO=2110';
URL.UpkeepTypeAdd = '/baseinfo/page/upkeep/upkeepTypeEdit.jsp?menuNO=2111';
URL.UpkeepTypeEdit = '/baseinfo/page/upkeep/upkeepTypeEdit.jsp?menuNO=2112';
URL.UpkeepTypeItemEdit = '/baseinfo/page/upkeep/upkeepTypeItemEdit.jsp?menuNO=2113';
URL.GetUpkeepTypeList = '/baseinfo/upkeep/upkeepType!upkeepTypeList.do';
URL.GetUpkeepTypeListByElevId = '/baseinfo/upkeep/upkeepType!getUpkeepTypeListByElevId.do';
URL.GetUpkeepTypeById = '/baseinfo/upkeep/upkeepType!getById.do';
URL.AddUpkeepType = '/baseinfo/upkeep/upkeepType!save.do';
URL.EditUpkeepType = '/baseinfo/upkeep/upkeepType!update.do';
URL.EditUpkeepTypeItem = '/baseinfo/upkeep/upkeepType!grantTypeItem.do';
URL.DelUpkeepType = '/baseinfo/upkeep/upkeepType!delete.do';

MenuNumber.UpkeepTypeList = 2110;
MenuNumber.UpkeepTypeAdd = 2111;
MenuNumber.UpkeepTypeEdit = 2112;
MenuNumber.UpkeepTypeItemEdit = 2113;
MenuNumber.UpkeepTypeDel = 2118;

/* 电梯管理 */
URL.GetSeniorSearchElevList = '/baseinfo/elevator/elevator!seniorSearchElevList.do';
URL.GetSeniorSearchElevUpkeepList = '/baseinfo/elevator/elevator!seniorSearchElevUpkeepList.do';


URL.GetElevatorList = '/baseinfo/elevator/elevator!elevList.do';
URL.GetElevRegisterCodeList = '/baseinfo/elevator/elevator!elevRegisterCodeList.do';
URL.GetElevatorMinList = '/baseinfo/elevator/elevator!elevMinList.do';
URL.GetElevatorById = '/baseinfo/elevator/elevator!getById.do';
URL.GetElevatorAllById = '/baseinfo/elevator/elevator!getAllById.do';
URL.GetRelationById = '/baseinfo/elevator/elevator!getRelationById.do';
URL.GETElevListByIds ='/baseinfo/elevator/elevator!getElevListByIds.do';
URL.GetElevInstallById = '/baseinfo/elevator/elevator!getElevInstallById.do';
URL.GetElevFactoryById = '/baseinfo/elevator/elevator!getElevFactoryById.do';
URL.GetElevUpkeepById = '/baseinfo/elevator/elevator!getElevUpKeepById.do';
URL.GetElevatorFloorControl='/baseinfo/floor/compare!getFloorList.do';
URL.GetDisplayFloorMap = '/baseinfo/floor/compare!getDisplayFloorMap.do';
URL.GetSynchronizationFloor = '/monitor/data/realTimeData!initCtrlTypeFlooar.do';
URL.GetElevatorUniqueOutfactoryNo= '/baseinfo/elevator/elevator!getfactoryNoUnique.do';
URL.ImportElevator = '/baseinfo/elevator/elevator!importElevator.do';
URL.ImportElevator2 = '/baseinfo/elevator/elevator!importElevator2.do';
URL.UpdateElevStatus = '/baseinfo/elevator/elevator!getDeviceStatusByElevIds.do';
URL.CheckRegisterCode = '/baseinfo/elevator/elevator!getBycheckRegisterCode.do';
URL.GetElevRegisterCodeListByRole = '/baseinfo/elevator/elevator!getElevRegisterCodeList.do';

MenuNumber.ElevatorList = 2350;
MenuNumber.ElevatorView = 2351;
MenuNumber.ExportElevator = 2352;	
MenuNumber.ElevatorAdd = 2353;
MenuNumber.ElevatorEdit = 2354;	
MenuNumber.ElevatorMessageDel = 2355;	
MenuNumber.ElevatorUnwrap = 2356;
MenuNumber.ElevatorViewUpkeepInfo = 2357;
MenuNumber.ElevatorNetworking = 2358;
MenuNumber.ElevatorBrokenNetworking = 2359;
MenuNumber.ElevatorNetworkingRecord = 23510;



//维保公司查询电梯信息的相关菜单
MenuNumber.ElevatorList_uc = 2360;
MenuNumber.ElevatorView_uc = 2361;
MenuNumber.ExportElevator_uc = 2362;	
MenuNumber.ElevatorAdd_uc = 2363;
MenuNumber.ElevatorEdit_uc = 2364;	
MenuNumber.ElevatorMessageDel_uc = 2365;	
MenuNumber.ElevatorUnwrap_uc = 2366;
MenuNumber.ElevatorViewUpkeepInfo_uc = 2367;
MenuNumber.ElevatorNetworking_uc = 2368;
MenuNumber.ElevatorBrokenNetworking_uc = 2369;
MenuNumber.ElevatorNetworkingRecord_uc = 23610;


URL.ElevatorList = '/baseinfo/page/elevator/elevatorList.jsp?menuNO=2350';
URL.ElevatorView = '/baseinfo/page/elevator/elevatorView.jsp?menuNO=2351';
URL.ElevatorAdd = '/baseinfo/page/elevator/elevatorEdit.jsp?menuNO=2353';
URL.ElevatorEdit = '/baseinfo/page/elevator/elevatorEdit.jsp?menuNO=2354';

URL.ElevatorList_uc = '/baseinfo/page/elevator/elevatorList.jsp?menuNO=2360';
URL.ElevatorView_uc = '/baseinfo/page/elevator/elevatorView.jsp?menuNO=2361';
URL.ElevatorAdd_uc = '/baseinfo/page/elevator/elevatorEdit.jsp?menuNO=2363';
URL.ElevatorEdit_uc = '/baseinfo/page/elevator/elevatorEdit.jsp?menuNO=2364';


URL.AddElevator = '/baseinfo/elevator/elevator!setElevAllInfo.do';
URL.EditElevator = '/baseinfo/elevator/elevator!setElevAllInfo.do';
URL.ExportElevator = '/baseinfo/elevator/elevator!exportElevatorExcel.do';
URL.ElevatorNetwork = '/baseinfo/elevator/elevator!updateNetworkStatus.do';
URL.ElevatorNetworkRecord = '/baseinfo/elevator/elevator!getNetworkRecord.do';

URL.ElevatorOutFactoryList = '/baseinfo/page/elevator/elevatorOutFactoryList.jsp?menuNO=2310';
URL.SavedElevatorOutFactoryList = '/baseinfo/page/elevator/elevatorOutFactoryList.jsp?menuNO=23101&parentMenuNO=2310';
URL.NotSavedElevatorOutFactoryList = '/baseinfo/page/elevator/elevatorOutFactoryList.jsp?menuNO=23102&parentMenuNO=2310';

URL.ElevatorOutFactoryAdd = '/baseinfo/page/elevator/elevatorOutFactoryEdd.jsp?menuNO=2311';
URL.ElevatorOutFactoryEdit = '/baseinfo/page/elevator/elevatorOutFactoryEdit.jsp?menuNO=2312';
URL.ElevatorFloorControl = '/baseinfo/page/elevator/ElevatorFloorControl.jsp?menuNO=2319';

URL.ElevatorOutFactoryInstallEdit = '/baseinfo/page/elevator/elevatorInstallEdit.jsp?menuNO=2313';
URL.GetElevatorListByOutFactory = '/baseinfo/elevator/elevator!elevByFactoryList.do';
URL.EditElevatorOutFactory = '/baseinfo/elevator/elevator!setOutFactoryInfo.do';

URL.GetNotSavedFactoryCount = '/baseinfo/elevator/elevator!getNotSavedFactoryCount.do';
URL.GetNotSavedInstallCount = '/baseinfo/elevator/elevator!getNotSavedInstallCount.do';
URL.GetNotSavedUpkeepCount = '/baseinfo/elevator/elevator!getNotSavedUpkeepCount.do';
URL.GetNotAllocateUpkeepComapnyElev = '/baseinfo/elevator/elevator!getNotAllocateUpkeepComapnyElev.do';

URL.AddElevatorOutFactory = '/baseinfo/elevator/elevator!setOutFactoryInfo.do';
URL.DelElevator = '/baseinfo/elevator/elevator!delete.do';
URL.DelElevFloor = '/baseinfo/floor/compare!doNotNeedSecurity_delete.do';
URL.SaveOrUpdateFloors = '/baseinfo/floor/compare!saveOrUpdateFloors.do';
/*
 * 解绑维保单位
 * @author zenggang 2015年9月12日12:58:19
 * */
URL.UnwrapElevator = '/baseinfo/elevator/elevator!unwrapElevator.do';

URL.ElevatorInstallList = '/baseinfo/page/elevator/elevatorInstallList.jsp?menuNO=2320';
URL.SavedElevatorInstallList = '/baseinfo/page/elevator/elevatorInstallList.jsp?menuNO=23201&parentMenuNO=2320';
URL.NotSavedElevatorInstallList = '/baseinfo/page/elevator/elevatorInstallList.jsp?menuNO=23202&parentMenuNO=2320';

URL.ElevatorInstallEdit = '/baseinfo/page/elevator/elevatorInstallEdit.jsp?menuNO=2321';
URL.GetElevatorListByInstall = '/baseinfo/elevator/elevator!elevByInstallList.do';
URL.EditElevatorInstall = '/baseinfo/elevator/elevator!setInstallInfo.do';


URL.ElevatorUpkeepList = '/baseinfo/page/elevator/elevatorUpkeepList.jsp?menuNO=2330';
URL.SavedElevatorUpkeepList = '/baseinfo/page/elevator/elevatorUpkeepList.jsp?menuNO=23301&parentMenuNO=2330';
URL.NotSavedElevatorUpkeepList = '/baseinfo/page/elevator/elevatorUpkeepList.jsp?menuNO=23302&parentMenuNO=2330';
URL.ElevatorUpkeepEdit = '/baseinfo/page/elevator/elevatorUpkeepEdit.jsp?menuNO=2332';
URL.GetElevatorListByUpkeep = '/baseinfo/elevator/elevator!elevByUpkeepList.do';
URL.EditElevatorUpkeep = '/baseinfo/elevator/elevator!setUpkeepInfo.do';
URL.EditElevatorBatchUpkeep = '/baseinfo/elevator/elevator!setUpkeepBatchInfo.do';



URL.ElevatorPartitionList = '/baseinfo/page/elevator/elevatorPartitionList.jsp?menuNO=2340';
URL.EditElevatorPartition = '/baseinfo/elevator/elevator!updateUpkeepCompany.do';

URL.GetElevatorMonitorList = '/baseinfo/elevator/elevator!elevMonitorList.do';
URL.GetElevatorMonitorListOfMyFavorite = '/baseinfo/elevator/elevator!elevMonitorByFavoriteList.do';
URL.GetElevatorMonitorListOfVideo = '/baseinfo/elevator/elevator!elevMonitorByVideoList.do';
URL.AddElevatorMonitorOfMyFavorite = '/baseinfo/elevator/elevator!doNotNeedSecurity_favorite.do';
URL.CancelElevatorMonitorOfMyFavorite = '/baseinfo/elevator/elevator!doNotNeedSecurity_deleteFavorite.do';

/**电梯配件管理*/
URL.PartNameIdList="/baseinfo/elevator/elevator!getElevatorPartsNameList.do";
URL.GetElevatorPartsList="/baseinfo/elevator/elevator!getElevatorPartsList.do";
URL.AddElevatorParts="/baseinfo/elevator/elevator!setPartsInfo.do";
URL.GetElevatorParts="/baseinfo/elevator/elevator!getPartsInfo.do";
URL.DelElevatorParts = '/baseinfo/elevator/elevator!doNotNeedSecurity_deleteParts.do';

MenuNumber.ElevatorOutFactoryList = 2310;
MenuNumber.ElevatorOutFactoryAdd = 2311;
MenuNumber.ElevatorOutFactoryEdit = 2312;
MenuNumber.ElevatorPartsEdit = 2314;
MenuNumber.ElevatorViewPartsAdd = 2315;
MenuNumber.ElevatorViewPartsEdit = 2316;
MenuNumber.ElevatorViewPartsDel = 2317;
MenuNumber.ElevatorDel = 2318;
MenuNumber.ElevatorFloorControl = 2319;
MenuNumber.ElevatorOutFactoryImport = 23195;
MenuNumber.ElevatorOutFactoryImport2 = 23196;
MenuNumber.ElevatorOutFactoryAddSubmit = 23111;

MenuNumber.ElevatorInstallList = 2320;
MenuNumber.ElevatorInstallEdit = 2321;

MenuNumber.ElevatorUpkeepList = 2330;
MenuNumber.ElevatorUpkeepEdit = 2331;
MenuNumber.NotSavedElevatorUpkeepEdit = 2333;
MenuNumber.NotSavedElevatorUpkeepEditSubmit = 23331;
MenuNumber.SavedElevatorUpkeepList = 23301;
MenuNumber.UnSavedElevatorUpkeepList = 23302;


MenuNumber.ElevatorPartitionList = 2340;
MenuNumber.ElevatorPartitionEdit = 2341;



/**电梯出厂信息**/
MenuNumber.SavedElevatorOutFactoryList = 23101;

/**未提交的出厂信息**/
MenuNumber.NotSavedElevatorOutFactoryList = 23102;
MenuNumber.NotSavedElevatorOutFactoryEdit = 231022;
MenuNumber.NotSavedElevatorOutFactoryEditSubmit = 2310221;
MenuNumber.NotSavedElevatorDel = 231023;

/**电梯安装信息**/
MenuNumber.SavedElevatorInstallList = 23201;
/**未提交的出厂信息**/
MenuNumber.NotSavedElevatorInstallList = 23202;
MenuNumber.NotSavedElevatorInstallEdit = 2322;
MenuNumber.NotSavedElevatorInstallEditSubmit = 23221;



/* 批量编辑维保信息 */
MenuNumber.ElevatorUpkeepBatchEdit = 2380;
MenuNumber.ElevatorUpkeepBatchView = 2381;
MenuNumber.ElevatorUpkeepBatchAllocation = 2382;
MenuNumber.ElevatorUpkeepBatchAllocation2 = 2383;
MenuNumber.ElevatorUpkeepBatchModifyEdit = 2390;

URL.ElevatorUpkeepBatchEdit = '/baseinfo/page/elevator/elevatorUpkeepBatchEdit.jsp?menuNO=2380';
URL.BatchEditElevatorUpkeep = '/baseinfo/elevator/elevator!setUpkeepBatchInfo.do';

//电梯分配给单位
URL.ElevatorAllocationList = '/baseinfo/page/elevator/elevatorAllocationList.jsp?menuNO=2370';
URL.ElevatorAllocationEdit = '/baseinfo/page/elevator/elevatorAllocationEdit.jsp?menuNO=2371';

URL.GETElevatorAllocationList = '/baseinfo/elevator/elevator!elevList.do';
URL.EditElevatorAllocation = '/baseinfo/elevator/elevAllocation!elevAllocation.do';
URL.GetCompanyListByAllocation = '/baseinfo/elevator/elevAllocation!getCompanyListByAllocation.do';
MenuNumber.ElevatorAllocationList = 2370;
MenuNumber.EditElevatorAllocation = 2371;
MenuNumber.ViewElevatorAllocation = 2372;


URL.GetHandleCompanyRecordList = '/baseinfo/company/companyRecord!recordList.do';

/* 楼盘管理 */
URL.BuildingList = '/baseinfo/page/building/buildingList.jsp?menuNO=2650';
URL.BuildingAdd = '/baseinfo/page/building/buildingEdit.jsp?menuNO=2651';
URL.BuildingEdit = '/baseinfo/page/building/buildingEdit.jsp?menuNO=2652';
URL.BuildingLinkElev = '/baseinfo/page/building/buildingLinkElevator.jsp?menuNo=2654';
URL.GetBuildingList = '/baseinfo/building/building!buildingList.do';
URL.GetBuildingById = '/baseinfo/building/building!getById.do';
URL.AddBuilding = '/baseinfo/building/building!save.do';
URL.EditBuilding = '/baseinfo/building/building!update.do';
URL.DelBuilding = '/baseinfo/building/building!delete.do';
URL.LinkElevBuilding = '/baseinfo/building/building!linkElevator.do';
URL.GetBuildingByIdElev = '/baseinfo/building/building!getBuildingByIdElev.do';
URL.getBuilding = '/baseinfo/building/building!getBuilding.do';

MenuNumber.BuildingList = 2650;
MenuNumber.BuildingAdd = 2651;
MenuNumber.BuildingEdit = 2652;
MenuNumber.BuildingView = 2653;
MenuNumber.BuildingDel = 2658;
MenuNumber.BuildingLinkElev = 2654;


/* 安装维保公司管理 */
URL.CompanyList = '/baseinfo/page/company/companyList.jsp?menuNO=2410';
URL.InstallCompanyList = '/baseinfo/page/company/companyList.jsp?menuNO=2440';
URL.UpkeepCompanyList = '/baseinfo/page/company/companyList.jsp?menuNO=2430';
URL.OwnerCompanyList = '/baseinfo/page/company/companyList.jsp?menuNO=2460';
URL.PropertyCompanyList = '/baseinfo/page/company/companyList.jsp?menuNO=2450';
URL.CountyCompanyList = '/baseinfo/page/company/companyList.jsp?menuNO=9190';
URL.CustomerCompanyList = '/baseinfo/page/company/companyList.jsp?menuNO=2410';
URL.CompanyAdd = '/baseinfo/page/company/companyEdit.jsp?menuNO=2411';
URL.CompanyEdit = '/baseinfo/page/company/companyEdit.jsp?menuNO=2412';
URL.CompanyStationList = '/baseinfo/page/station/stationList.jsp?menuNO=2413';
URL.GetCompanyList = '/baseinfo/company/company!companyList.do';//安装公司
URL.CompanyListByTree = '/baseinfo/company/company!companyListByTree.do';//加载树形
URL.GetUpKeepCompanyList = '/baseinfo/company/company!companyList.do';//维保公司
URL.GetChildCompanyList = '/baseinfo/page/company/companyList.jsp?menuNO=2470';//下级单位
URL.GetDistributorList = '/baseinfo/page/company/companyList.jsp?menuNO=2480';//经销商

URL.GetParentCompanyList = '/baseinfo/company/company!parentCompanyList.do';
URL.GetCompanyById = '/baseinfo/company/company!getCompany.do';
URL.AddCompany = '/baseinfo/company/company!saveCompany.do';
URL.EditCompany = '/baseinfo/company/company!updateCompany.do';
URL.EditCompanyRelation = '/baseinfo/company/company!updateCompanyRelation.do';
URL.FindCompanyListByRelation = '/baseinfo/company/company!getCompanyListByRelation.do';
URL.DelCompany = '/baseinfo/company/company!deleteCompany.do';
URL.FindCompanyByCurrentUser = '/baseinfo/company/company!findCompanyByCurrentUser.do';
URL.GetCompanyByYrId = '/baseinfo/company/company!getCompanyYr.do';
URL.GetSubCompanyList = '/baseinfo/company/company!getSubCompanyList.do'
URL.GetCompanyIncludeElev='/baseinfo/company/company!getCompanyIncludeElev.do';
URL.DistributionElevatorByCompany = '/baseinfo/elevator/elevator!distributionElevatorByCompany.do';


URL.InstallCompanyAdd='/baseinfo/page/company/companyEdit.jsp?menuNO=2441&type=1';
URL.UpkeepCompanyAdd='/baseinfo/page/company/companyEdit.jsp?menuNO=2431&type=2';
URL.PropertyCompanyAdd='/baseinfo/page/company/companyEdit.jsp?menuNO=2451&type=3';
URL.OwnerCompanyAdd='/baseinfo/page/company/companyEdit.jsp?menuNO=2461&type=4';
URL.CustomerCompanyAdd='/baseinfo/page/company/companyEdit.jsp?menuNO=2411&type=5';
/**
 * 使用单位
 */
MenuNumber.CompanyList = 2410;
MenuNumber.CompanyStationList = 2413;
MenuNumber.CompanyAdd = 2411;
MenuNumber.CompanyAddLimits = 24110;
MenuNumber.CompanyEdit = 2412;
MenuNumber.CompanyEditLimits = 24120;
MenuNumber.CompanyView = 2414;
MenuNumber.CompanyDel = 2418;
MenuNumber.CompanyDistributionElev = 2415;
/**
 * 维保单位
 */
MenuNumber.CompanyUpkeepList = 2430;
MenuNumber.CompanyUpkeepAdd = 2431;
MenuNumber.CompanyUpkeepAddLimits = 24310;
MenuNumber.CompanyUpkeepEdit = 2432;
MenuNumber.CompanyUpkeepEditLimits = 24320;
MenuNumber.CompanyUpkeepDel = 2433;
MenuNumber.CompanyUpkeepView = 2434;
MenuNumber.CompanyUpkeepDistributionElev = 2435;

/**
 * 安装单位
 */
MenuNumber.CompanyManList = 2440;
MenuNumber.CompanyManAdd = 2441;
MenuNumber.CompanyManAddLimits = 24410;
MenuNumber.CompanyManEdit = 2442;
MenuNumber.CompanyManEditLimits = 24420;
MenuNumber.CompanyManDel = 2443;
MenuNumber.CompanyManView = 2444;

MenuNumber.CompanyManDistributionElev = 2445;

MenuNumber.CompanyUpkeepAddOneKeyReport = 243101;
MenuNumber.CompanyUpkeepEditOneKeyReport = 243201;

/**
 * 物业单位
 */
MenuNumber.CompanyWList = 2450;
MenuNumber.CompanyWAdd = 2451;
MenuNumber.CompanyWAddLimits = 24510;
MenuNumber.CompanyWEdit = 2452;
MenuNumber.CompanyWEditLimits = 24520;
MenuNumber.CompanyWDel = 2453;
MenuNumber.CompanyWView = 2454;
MenuNumber.CompanyWDistributionElev = 2455;


/**
 * 产权单位
 */
MenuNumber.CompanyCList = 2460;
MenuNumber.CompanyCAdd = 2461;
MenuNumber.CompanyCAddLimits = 24610;
MenuNumber.CompanyCEdit = 2462;
MenuNumber.CompanyCEditLimits = 24620;
MenuNumber.CompanyCDel = 2463;
MenuNumber.CompanyCView = 2464;
MenuNumber.CompanyCDistributionElev = 2465;


/**
 * 下级单位
 */
MenuNumber.ChildCompanyList = 2470;
MenuNumber.ChildCompanyAdd = 2471;
MenuNumber.ChildCompanyAddLimits = 24710;
MenuNumber.ChildCompanyEdit = 2472;
MenuNumber.ChildCompanyEditLimits = 24720;
MenuNumber.ChildCompanyDel = 2473;
MenuNumber.ChildCompanyView = 2474;
MenuNumber.ChildCompanyDistributionElev = 2475;
/**
 * 经销商
 */
MenuNumber.DistributorList = 2480;
MenuNumber.DistributorAdd = 2481;
MenuNumber.DistributorAddLimits = 24810;
MenuNumber.DistributorEdit = 2482;
MenuNumber.DistributorEditLimits = 24820;
MenuNumber.DistributorDel = 2483;
MenuNumber.DistributorView = 2484;
MenuNumber.DistributorDistributionElev = 2485;

/**
 * 县区监控单位
 */
MenuNumber.CompanyXList = 9190;
MenuNumber.CompanyXAdd = 9191;
MenuNumber.CompanyXAddLimits = 9196;
MenuNumber.CompanyXEdit = 9192;
MenuNumber.CompanyXEditLimits = 9197;
MenuNumber.CompanyXDel = 9193;
MenuNumber.CompanyXView = 9194;
MenuNumber.CompanyXDistributionElev = 9195;

/**
 * 单位层级关系
 */
MenuNumber.EditCompanyRelation = 92001;

/* 站点管理 */
URL.StationList = '/upkeep/page/maintenance/stationList.jsp?menuNO=1430';
/*URL.StationAdd = '/baseinfo/page/station/stationEdit.jsp?menuNO=2421';
URL.StationEdit = '/baseinfo/page/station/stationEdit.jsp?menuNO=2422';*/
URL.GetStationList = '/upkeep/upkeep/station!stationList.do';
URL.GetStationById = '/upkeep/upkeep/station!getById.do';
URL.AddStation = '/upkeep/upkeep/station!saveStation.do';
URL.EditStation = '/upkeep/upkeep/station!updateStation.do';
URL.GetStationByCompanyId = '/upkeep/upkeep/station!getStation.do';
URL.DelStation = '/upkeep/upkeep/station!deleteStation.do';
URL.GetStationSelectByList='/upkeep/upkeep/station!getStationByList.do';

URL.ImportStation = '/upkeep/upkeep/station!importStation.do';


MenuNumber.StationList = 1430;
MenuNumber.StationAdd = 1431;
MenuNumber.StationEdit = 1432;
MenuNumber.StationView = 1433;
MenuNumber.StationDel = 1434;
MenuNumber.StationImport = 1435;

URL.StationView = '/upkeep/page/maintenance/stationView.jsp?menuNO=1430';

URL.GetStationDetail = '/upkeep/upkeep/station!getStationDetail.do';

/*	维保班组 */
MenuNumber.MaintenanceGroupList = 1440;
MenuNumber.MaintenanceGroupAdd = 1441;
MenuNumber.MaintenanceGroupEdit = 1443;
MenuNumber.MaintenanceGroupView = 1444;
MenuNumber.MaintenanceGroupDel = 1445;
MenuNumber.MaintenanceGroupImport = 1442;

URL.MaintenanceGroupList = '/upkeep/page/maintenance/maintenanceGroupList.jsp?menuNO=1440';
URL.GetMaintenanceGroupList = '/upkeep/maintenance/group!MaintenanceGroupList.do';
URL.AddMaintenanceGroup = '/upkeep/maintenance/group!save.do';
URL.EditMaintenanceGroup = '/upkeep/maintenance/group!update.do';
URL.GetMaintenanceGroupById = '/upkeep/maintenance/group!getById.do';
URL.DelMaintenanceGroup = '/upkeep/maintenance/group!delete.do';
URL.ImportMaintenanceGroup = '/upkeep/maintenance/group!importGroup.do';
URL.GetGroupByStationId = '/upkeep/maintenance/group!getGroupByStationId.do';



URL.MaintenanceGroupView = '/upkeep/page/maintenance/maintenanceGroupView.jsp?menuNO=1444';
URL.GetMaintenanceGroupDetail = '/upkeep/maintenance/group!getMaintenanceGroupDetail.do';


/* 设备管理 */
URL.DeviceList = '/baseinfo/page/device/deviceList.jsp?menuNO=2700';
URL.DeviceElevatorEdit = '/baseinfo/page/device/TargetDeviceElevatorEdit.jsp?menuNO=2702';
URL.DeviceCompanyEdit = '/baseinfo/page/device/TargetDeviceCompanyEdit.jsp?menuNO=2703';
URL.GetTargetDeviceList = '/baseinfo/device/targetDevice!targetDeviceList.do';
URL.GetTargetDeviceById = '/baseinfo/device/targetDevice!getById.do';
URL.GetTargetDeviceListByCollectIds = '/baseinfo/device/targetDevice!getTargetDeviceListById.do';
URL.EditDevice = '/baseinfo/device/targetDevice!updateDeviceName.do';
URL.EditDeviceElevator = '/baseinfo/device/targetDevice!saveElevDevice.do';
URL.EditDeviceCompany = '/baseinfo/device/targetDevice!updateDeviceCompany.do';
URL.RemoveDeviceElevator = '/baseinfo/device/targetDevice!removeElevDevice.do';
URL.GetDeviceByElevator = '/baseinfo/device/targetDevice!getCollectDeviceByElevator.do';
//查看设备绑定记录的Action地址(lzh添加)
URL.GetDeviceBindRecord='/baseinfo/device/targetDevice!dnss_getBindDeviceRecord.do';
//查看设备绑定记录列表的Action地址(lzh添加)
URL.GetDeviceBindRecordList='/baseinfo/device/targetDevice!getBindDeviceRecordList.do';


MenuNumber.DeviceBindRecord=2709;
MenuNumber.DeviceList = 2700;
MenuNumber.DeviceElevatorEdit = 2702;
MenuNumber.DeviceCompanyEdit = 2703;
MenuNumber.DeviceNameEdit = 2704;
MenuNumber.DeviceElevatorRemove = 2705;
MenuNumber.DeviceNetworking = 2706;
MenuNumber.DeviceOffNet = 2707;
MenuNumber.DeviceElevatorOfUpdateControllerProtocol = 2708;

/* 制造厂商管理 */
URL.ManufacturerList = '/baseinfo/page/manufacturer/manufacturerList.jsp?menuNO=2800';
URL.ManufacturerAdd = '/baseinfo/page/manufacturer/manufacturerEdit.jsp?menuNO=2801';
URL.ManufacturerEdit = '/baseinfo/page/manufacturer/manufacturerEdit.jsp?menuNO=2802';
URL.GetManufacturerList = '/baseinfo/company/manufacturer!manufacturerList.do';
URL.GetManufacturerById = '/baseinfo/company/manufacturer!getById.do';
URL.AddManufacturer = '/baseinfo/company/manufacturer!saveManufacturer.do';
URL.EditManufacturer = '/baseinfo/company/manufacturer!updateManufacturer.do';
URL.DelManufacturer = '/baseinfo/company/manufacturer!deleteManufacturer.do';

MenuNumber.ManufacturerList = 2800;
MenuNumber.ManufacturerAdd = 2801;
MenuNumber.ManufacturerEdit = 2802;
MenuNumber.ManufacturerDel = 2808;

/* 故障代码级别管理 */
URL.FailureLevelList = '/baseinfo/page/failureLevel/failureLevelList.jsp?menuNO=2900';
URL.FailureLevelAdd = '/baseinfo/page/failureLevel/failureLevelEdit.jsp?menuNO=2901';
URL.FailureLevelEdit = '/baseinfo/page/failureLevel/failureLevelEdit.jsp?menuNO=2902';
URL.GetFailureLevelList = '/baseinfo/fault/failureLevel!failureLevelList.do';
URL.GetFailureLevelById = '/baseinfo/fault/failureLevel!getById.do';
URL.AddFailureLevel = '/baseinfo/fault/failureLevel!saveFailureLevel.do';
URL.EditFailureLevel = '/baseinfo/fault/failureLevel!updateFailureLevel.do';
URL.DelFailureLevel = '/baseinfo/fault/failureLevel!deleteFailureLevel.do';

URL.GetFailureLevelMeth = '/baseinfo/fault/failureLevel!getFailMethByLevelId.do';
//URL.FailureLevelMethEdit='/monitor/data/ctrlEvent!doNotNeedSessionAndSecurity_testCtrlEvent.do';
URL.FailureLevelMethEdit = '/baseinfo/fault/failureLevel!updateFailureLevelMethold.do';
MenuNumber.FailureLevelList = 2900;
MenuNumber.FailureLevelAdd = 2901;
MenuNumber.FailureLevelEdit = 2902;
MenuNumber.FailureLevelMeth = 2903;
MenuNumber.FailureLevelDel = 2908;

/* 故障代码管理 */
URL.FailureCodeList = '/baseinfo/page/failureCode/failureCodeList.jsp?menuNO=2950';
URL.FailureCodeAdd = '/baseinfo/page/failureCode/failureCodeEdit.jsp?menuNO=2951';
URL.FailureCodeEdit = '/baseinfo/page/failureCode/failureCodeEdit.jsp?menuNO=2952';
URL.GetFailureCodeList = '/baseinfo/fault/failureCode!failureCodeList.do';
URL.GetFailureCodeById = '/baseinfo/fault/failureCode!getById.do';
URL.AddFailureCode = '/baseinfo/fault/failureCode!saveFailureCode.do';
URL.EditFailureCode = '/baseinfo/fault/failureCode!updateFailureCode.do';
URL.DelFailureCode = '/baseinfo/fault/failureCode!deleteFailureCode.do';
URL.GetCodeByCtrlType = '/baseinfo/fault/failureCode!getCodeByCtrlType.do';
URL.getCodeByCtrlTypeElevId = '/baseinfo/fault/failureCode!getCodeByCtrlTypeElevId.do';
URL.GetCodeByCtrlTypeName = '/baseinfo/fault/failureCode!getCodeByCtrlTypeName.do';
URL.EditFailureBatchCode='/baseinfo/fault/failureCode!updateFailureBatchCode.do';

URL.GetCtrlTypeList = '/monitor/data/ctrlType!getCtrlTypeList.do';
URL.ChangeCtrlType = '/monitor/data/ctrlType!changeCtrlType.do';

MenuNumber.FailureCodeList = 2950;
MenuNumber.FailureCodeAdd = 2951;
MenuNumber.FailureCodeEdit = 2952;
MenuNumber.FailureCodeBatchEdit = 2953;
MenuNumber.FailureCodeDel = 2958;

/* 故障联系人管理 */

MenuNumber.FailureLinkmanList = 6200;
MenuNumber.FailureLinkmanAdd = 6201;
MenuNumber.FailureLinkmanAddLimits = 62010;
MenuNumber.FailureLinkmanEdit = 6202;
MenuNumber.FailureLinkmanEditLimits = 62020;
MenuNumber.FailureLinkmanLinkElevator = 6203;
MenuNumber.FailureLinkmanDelete = 6208;
MenuNumber.FailureLinkmanImport = 6204;

URL.FailureLinkmanList = '/monitor/page/failure/failureLinkmanList.jsp?menuNO=6200';
URL.FailureLinkmanAdd = '/monitor/failure/failureLinkman!save.do';
URL.FailureLinkmanEdit = '/monitor/failure/failureLinkman!update.do';
URL.FailureLinkmanLinkElevator = '/monitor/failure/failureLinkman!relationElevators.do'; 
URL.FailureLinkmanImport = '/monitor/failure/failureLinkman!importLinkman.do';

URL.GETFailureLinkmanList = '/monitor/failure/failureLinkman!linkmanList.do';
//URL.AddFailureLinkman = '/monitor/failure/failureLinkman!save.do';
//URL.EditFailureLinkman = '/monitor/failure/failureLinkman!update.do';
URL.GETFailureLinkmanInfo = '/monitor/failure/failureLinkman!getById.do';
URL.ViewFailureLinkman = '/monitor/failure/failureLinkman!getById.do';
URL.GetElevListByFailureLinkman = '/monitor/failure/failureLinkman!getElevListById.do';
URL.DeleteFailureLinkman = '/monitor/failure/failureLinkman!delete.do';

/* 短信预览管理 */
MenuNumber.MessagePreviewList = 6300;
URL.MessagePreviewList = '/monitor/page/failure/messagePreviewList.jsp?menuNO=6300';

URL.GetSmsTemplateList='/baseinfo/smsTemplate/smsTemplate!getSmsTemplateList.do';
URL.EditSmsTemplate='/baseinfo/smsTemplate/smsTemplate!updateSmsTemplate.do';

MenuNumber.MessagePreviewView = 6310;
MenuNumber.MessageSetMessageDefault = 6320;

/* 常量 */
Constant.SpecialCode = '※';

/* 实时数据消息ID */
MsgId.RunData = 0x0065;
MsgId.Event = 0x0061;
MsgId.VideoHeader = 0x0071;
MsgId.VideoFlow = 0x0072;
MsgId.AudioHeader = 0x0081;
MsgId.AudioFlow = 0x0083;

/* 实时故障监测 */
MenuNumber.MonitorListOfFault = 5800;
MenuNumber.MonitorListOfFaultEnter = 5810;
URL.MonitorListOfFault = '/monitor/page/monitor/monitorListOfFault.jsp?menuNO=5800';

MenuNumber.MonitorListOfMaintain = 5900;
MenuNumber.MonitorListOfEnter = 5910;
URL.MonitorListOfMaintain = '/monitor/page/monitor/monitorListOfMaintain.jsp?menuNO=5900';

/* 实时数据监控 */
URL.MonitorListOfMap = '/monitor/page/monitor/monitorListOfMap.jsp?menuNO=5100';
URL.MonitorList = '/monitor/page/monitor/monitorListOfRealtimeData.jsp?menuNO=5200';
URL.MonitorListOfVideo = '/monitor/page/monitor/monitorListOfVideo.jsp?menuNO=5500';
URL.MonitorOfMyFavorite = '/monitor/page/monitor/monitorListOfMyFavorite.jsp?menuNO=5600';
URL.MonitorOfDetails = '/monitor/page/monitor/monitorOfDetails.jsp?menuNO=5210';
URL.MonitorOfMyVoice = '/monitor/page/monitor/monitorOfVoice.jsp?menuNO=5700';

URL.MonitorOfTerminals = '/monitor/page/monitor/monitorOfTerminals.jsp?menuNO=5211';
URL.MonitorOfFunctionCodes = '/monitor/page/monitor/monitorOfFunctionCodes.jsp?menuNO=5212';
URL.MonitorOfVideo = '/monitor/page/monitor/monitorOfVideo.jsp?menuNO=5213';
URL.MonitorOfEvents = '/monitor/page/monitor/monitorOfEvents.jsp?menuNO=5214';
URL.MonitorOfInfos = '/monitor/page/monitor/monitorOfInfos.jsp?menuNO=5215';

URL.MonitorOfDeviceSignal = '/monitor/data/realTimeData!getDeviceSignal.do';
URL.GetElevCount = '/monitor/map/map!getElevCount.do';
URL.GetElevByArea = '/monitor/map/map!getElevByArea.do';

URL.SpecialFunction = '/monitor/page/control/specialFunction.jsp?menuNO=5231';
MenuNumber.SpecialFunction = 5231;

MenuNumber.SyncFloors = 5232;

MenuNumber.CtrlType = 5233;

MenuNumber.CapsulesVideo = 5213;

/* 电梯信息列表 */
MenuNumber.MonitorListOfElevator = 5950;
MenuNumber.ExportMonitorListOfElevator = 5951;
MenuNumber.MonitorListOfElevatorOfEnter = 59500;
URL.MonitorListOfElevator = '/monitor/page/monitor/monitorListOfElevator.jsp?menuNO=5950';
URL.ExportMonitorListOfElevator = '/baseinfo/elevator/elevator!exportMonitorElevList.do';

/* 实时视频下载、查看帮助 */
URL.MedioOcxOldVersion='http://www.dataserver.cn/mms/VideoOcx/MediaOcx.cab#version=1,0,0,19';
URL.MediaOcx='http://www.dataserver.cn/mms/VideoOcx/MediaOcx.msi ';
URL.AudioOcxVersion='http://www.dataserver.cn/mms/VideoOcx/MediaOcx.cab#version=1,0,0,13';

URL.WebsocketSwf='/sys/flash/WebSocketMain.swf';

URL.VideoDownloadHelp='/monitor/page/monitor/videoDownloadHelp.jsp';

/**模板下载地址**/
URL.StationTemplateDownload = '/upkeep/excel/stationTemplate.xls';
URL.UpkeepOrderTemplateDownload = '/upkeep/excel/upkeepOrderTemplate.xls';
URL.GroupTemplateDownload = '/upkeep/excel/groupTemplate.xls';
URL.YearInspectionTemplateDownload = '/upkeep/excel/yearInspectionTemplate1.xls';
URL.YearInspectionTemplate2Download = '/upkeep/excel/yearInspectionTemplate2.xls';
URL.UpkeepInfoTemplateDownload ='/upkeep/excel/upkeepInfoTemplate.xls';
URL.FailureLinkmanTemplateDownload = '/monitor/excel/failureLinkmanTemplate.xls';
URL.ElevatorTemplateDownload = '/baseinfo/excel/elevatorTemplate.xls';


/**监控管理*/
URL.GetMonitorListOfVideo = '/baseinfo/elevator/elevator!elevMonitorByVideoList.do';
URL.GetVoiceMonitorList = '/baseinfo/elevator/elevator!voiceMonitorList.do';
URL.AccpetVoiceMonitor = '/baseinfo/elevator/elevator!accpet.do';
URL.GetFailCodeMonitorList = '/monitor/monitor/query!failCodeMonitorList.do';
URL.GetMaintainMonitorList = '/monitor/monitor/query!maintainMonitorList.do';


MenuNumber.MonitorOfTerminals = 5211;
MenuNumber.MonitorOfFunctionCodes = 5212;
MenuNumber.MonitorOfVideo = 5213;
MenuNumber.MonitorOfEvents = 5214;
MenuNumber.MonitorOfInfos = 5215;
MenuNumber.MonitorOfFunctionInput = 5216;

MenuNumber.Maintenance = 5217;
MenuNumber.FailurCode = 5218;
MenuNumber.OverLoad = 5219;
MenuNumber.FullLoad = 5220;
MenuNumber.Fire = 5221;
MenuNumber.Locklift = 5222;
MenuNumber.DoorPositions = 5223;
MenuNumber.FailureTrapped = 5224;
MenuNumber.Communicate = 5225;
MenuNumber.ControllerPassword = 5226;
MenuNumber.Power = 5227;
MenuNumber.HasPeople = 5228;
MenuNumber.Overspeeds = 5229;
MenuNumber.Voice = 5230;
MenuNumber.Floor = 2231;
MenuNumber.Direction = 2232;
MenuNumber.Door = 2233;
MenuNumber.ReportTime = 2234;
MenuNumber.InternetType = 2235;
MenuNumber.SignalStrength = 2236;
MenuNumber.Run = 5227;
MenuNumber.MonitorOfVoice = 5710;

MenuNumber.SeniorFunction = 5234;

/* 故障列表 */
URL.CtrlEventList = '/monitor/page/data/ctrlEventList.jsp?menuNO=5300';
URL.getCtrlEventList = '/monitor/data/ctrlEvent!ctrlEventList.do';
URL.ExportEvent = '/monitor/data/ctrlEvent!exportEventExcel.do';

/* 导出 excel */
MenuNumber.ExportEvent =6101;
/* 处理 */
MenuNumber.HandleEventOperate = 6102;

MenuNumber.ExportElevEvent =52141;

/* 救援单位管理 */
URL.RescueUnitList = '/monitor/page/control/rescueUnitList.jsp?menuNO=5400';
URL.RescueUnitAdd = '/monitor/page/control/rescueUnitEdit.jsp?menuNO=5401';
URL.RescueUnitEdit = '/monitor/page/control/rescueUnitEdit.jsp?menuNO=5402';
URL.GetRescueUnitList = '/monitor/control/rescueUnit!rescueUnitList.do';
//URL.GetRescueUnitById = '/monitor/control/rescueUnit!getById.do';
URL.GetRescueUnitByElevId = '/monitor/control/rescueUnit!getByElevId.do';

MenuNumber.RescueUnitList = 5400;
MenuNumber.RescueUnitAdd = 5401;
MenuNumber.RescueUnitEdit = 5402;


/* 远程指令 */
URL.GetCmdLibList = '/monitor/control/cmdLib!cmdLibList.do';


/* 自定义设置 */
URL.CustomSettingEdit = '/sys/page/setting/customSetEdit.jsp?menuNO=7100';
URL.GetCustomInfo = '/sys/user/user!getSetImgInfo.do';
URL.SetCustomInfo = '/sys/user/user!uploadImg.do';
URL.GetImgInfo = '/sys/user/user!getSetImgInfo.do';
URL.SetImgInfo = '/sys/user/user!uploadImg.do';
URL.HeadImage = '/lib/base/images/head.gif';
URL.UpdateCustomerCtrlType='/sys/user/user!dnss_updateCustomerCtrlType.do';

URL.GetPageTemplateList = '/sys/user/user!getPageTemplateList.do';
URL.GetPageStyleListByTemplate = '/sys/user/user!getPageStyleList.do';


/* APP管理 */
URL.QrCodeInit='/sys/qrcodeApk/qrcodeApk!qrcodeInit.do';  //初始化二维码
URL.GetUploadApk='/sys/qrcodeApk/qrcodeApk!addAppVersion.do'; //上传APK
URL.GetApkVersionInfo='/sys/qrcodeApk/qrcodeApk!getAppVersionList.do';//展示上传的历史记录
URL.GetApkVersionList='/sys/page/setting/appVersionList.jsp?menuNO=7600';
URL.GetApkVersionById='/sys/qrcodeApk/qrcodeApk!getByAppVersionId.do';	
URL.EditApkVersion='/sys/qrcodeApk/qrcodeApk!editAppVersion.do';
URL.OldAddApkVersion='/sys/qrcodeApk/qrcodeApk!addAppVersion.do';
URL.GetOldApkVersionInfo='/sys/qrcodeApk/qrcodeApk!getOldAppVersionList.do';
URL.GetReleaseApkVersionInfo='/sys/qrcodeApk/qrcodeApk!getAppVersionDeployList.do';
URL.GetAllCustomerInfo='/sys/qrcodeApk/qrcodeApk!getAllCustomer.do';
URL.GetAllEditCustomerInfo='/sys/qrcodeApk/qrcodeApk!getAllEditCustomer.do';
URL.GetAppNameInfo='/sys/qrcodeApk/qrcodeApk!getAppNameInfo.do';
URL.GetAppVersionInfo='/sys/qrcodeApk/qrcodeApk!getAppVersionInfo.do';
URL.AddReleaseAppVersion='/sys/qrcodeApk/qrcodeApk!addReleaseAppVersion.do'
URL.GetReleaseApkVersionList='/sys/page/setting/appVersionDeployList.jsp?menuNO=7650';
URL.GetAppVersionDeployId='/sys/qrcodeApk/qrcodeApk!getAppVersionDeployId.do';
URL.GetAppVersionSelectById='/sys/qrcodeApk/qrcodeApk!getAppVersionSelectById.do';
URL.UpdateReleaseAppVersion='/sys/qrcodeApk/qrcodeApk!updateReleaseAppVersion.do';	 
URL.DelReleaseAppVersion='/sys/qrcodeApk/qrcodeApk!deleteReleaseAppVersion.do';	
URL.GetQrCodeInfo='/upload/image/0000100014/QrCode.jpg';	//二维码展示路径
URL.GetDownLoadApk='/upload/app/0000100014/Maintenance.apk';	//二维码下载路径
URL.GetDownLoadUrl='/sys/qrcodeApk/qrcodeApk!getApkUrlImage.do';//请求获取二维码地址
URL.GetApkMaxVersion='/sys/qrcodeApk/qrcodeApk!getApkMaxVersion.do';
URL.DelApkVersion='/sys/qrcodeApk/qrcodeApk!deleteAppVersion.do';
MenuNumber.ApkManagerEdit=7601;
MenuNumber.ApkManagerOldAdd=7602;
MenuNumber.ApkManagerOldList=7603;
MenuNumber.ApkManagerDel = 7604;
MenuNumber.ApkManagerReleaseEdit=7651;
MenuNumber.ApkManagerReleaseShow=7652;
MenuNumber.ApkManagerReleaseDel=7653
MenuNumber.ApkManagerReleaseAdd=7654;

MenuNumber.CustomSettingEdit = 7100;

MenuNumber.HomeAppQRcode = 7500;

/*
 * 南宁_单位列表_质监局
 * @author zenggang 2015年8月17日10:25:28
 * */
URL.CompanyListByNN = '/baseinfo/page/company/companyList.jsp?menuNO=9115';
URL.UpkeepCompanyListByNN = '/baseinfo/page/company/companyList.jsp?menuNO=9115';

/*
 * 南宁_单位列表_广西特检院
 * @author zenggang 2015年8月17日10:25:28
 * */
URL.CompanyListByNN_TJY = '/baseinfo/page/company/companyList.jsp?menuNO=9139';
URL.UpkeepCompanyListByNN_TJY = '/baseinfo/page/company/companyList.jsp?menuNO=9139';

/*
 * 南宁_单位列表_房管局
 * @author zenggang 2015年8月19日16:55:31
 * */
URL.CompanyListByNN_FGJ = '/baseinfo/page/company/companyList.jsp?menuNO=9172';

/*
 * 维保单位列表_南宁_质监局
 * @author zenggang 2015年8月17日10:52:09
 * */
MenuNumber.CompanyUpkeepListByNN = 9115;
MenuNumber.CompanyUpkeepAddByNN = 9116;
MenuNumber.CompanyUpkeepAddByNNLimits = 91160;
MenuNumber.CompanyUpkeepEditByNN = 9117;
MenuNumber.CompanyUpkeepEditByNNLimits = 91170;
MenuNumber.CompanyUpkeepDelByNN = 9118;
MenuNumber.CompanyUpkeepViewByNN = 9119;

/*
 * 维保单位列表_南宁_广西特检院
 * @author zenggang 2015年8月19日09:39:57
 * */
MenuNumber.CompanyUpkeepListByNN_TJY = 9139;
MenuNumber.CompanyUpkeepAddByNN_TJY = 9155;
MenuNumber.CompanyUpkeepAddByNN_TJYLimits = 91550;
MenuNumber.CompanyUpkeepEditByNN_TJY = 9156;
MenuNumber.CompanyUpkeepEditByNN_TJYLimits = 91560;
MenuNumber.CompanyUpkeepDelByNN_TJY = 9157;
MenuNumber.CompanyUpkeepViewByNN_TJY = 9158;

/*
 * 维保单位列表_南宁_房管局
 * @author zenggang 2015年8月19日16:47:08
 * */
MenuNumber.CompanyUpkeepListByNN_FGJ = 9172;
MenuNumber.CompanyUpkeepAddByNN_FGJ = 9181;
MenuNumber.CompanyUpkeepAddByNN_FGJLimits = 91810;
MenuNumber.CompanyUpkeepEditByNN_FGJ = 9182;
MenuNumber.CompanyUpkeepEditByNN_FGJLimits = 91820;
MenuNumber.CompanyUpkeepDelByNN_FGJ = 9183;
MenuNumber.CompanyUpkeepViewByNN_FGJ = 9184;


/*
 * 年检信息管理_南宁_质监局
 * @author zenggang 2015年8月17日15:47:45
 * */
MenuNumber.inspectionNormalByNN = 9127;
MenuNumber.inspectionNormalByNNCQ = 9128;

/*
 * 年检信息管理_南宁_广西特检院
 * @author zenggang 2015年8月17日15:47:45
 * */
MenuNumber.inspectionNormalByNN_TJY = 9159;
MenuNumber.inspectionNormalByNNCQ_TJY = 9160;

URL.YearInspectionList10 = '/upkeep/page/inspection/yearInspectionList.jsp?menuNO=9127&parentMenuNO=9126';
URL.YearInspectionList11 = '/upkeep/page/inspection/yearInspectionList.jsp?menuNO=9128&parentMenuNO=9126';

URL.YearInspectionList12 = '/upkeep/page/inspection/yearInspectionList.jsp?menuNO=9159&parentMenuNO=9142';
URL.YearInspectionList13 = '/upkeep/page/inspection/yearInspectionList.jsp?menuNO=9160&parentMenuNO=9142';


/*
 * 年检信息管理_年检登记_南宁_质监局
 * @author zenggang 2015年8月18日17:20:22
 * */
MenuNumber.EditYearInspection10 = 9129;
MenuNumber.EditYearInspection11 = 9133;
MenuNumber.YearInspectionLogList10 = 9130;
MenuNumber.YearInspectionLogList11 = 9134;
MenuNumber.YearInspectionBatchImport10 = 9131;
MenuNumber.YearInspectionBatchImport11 = 9135;
MenuNumber.YearInspectionRecordExport10 = 9132;
MenuNumber.YearInspectionRecordExport11 = 9154;
MenuNumber.YearInspectionLogView10 = 9136;
MenuNumber.YearInspectionLogView11 = 9137;


/*
 * 年检信息管理_年检登记_南宁_广西特检院
 * @author zenggang 2015年8月19日11:40:59
 * */
MenuNumber.EditYearInspection12 = 9161;
MenuNumber.EditYearInspection13 = 9166;
MenuNumber.YearInspectionLogList12 = 9162;
MenuNumber.YearInspectionLogList13 = 9167;
MenuNumber.YearInspectionBatchImport12 = 9163;
MenuNumber.YearInspectionBatchImport13 = 9168;
MenuNumber.YearInspectionRecordExport12 = 9164;
MenuNumber.YearInspectionRecordExport13 = 9170;
MenuNumber.YearInspectionLogView12 = 9165;
MenuNumber.YearInspectionLogView13 = 9169;


/*
 * 维保人员管理_在职人员_南宁_广西特检院
 * @author zenggang 2015年8月19日11:40:59
 * */
MenuNumber.MaintainerAddByNN_TJY = 9146;
MenuNumber.MaintainerAddByNNLimits = 91460;
MenuNumber.MaintainerInfoAddByNNLimits = 91461;
MenuNumber.MaintainerEditByNN_TJY = 9147;
MenuNumber.MaintainerEditByNNLimits = 91470;
MenuNumber.MaintainerInfoEditByNNLimits = 91471;
MenuNumber.MaintainerDelByNN_TJY = 9148;

URL.WorkingMaintainerListByNN_TJY = '/upkeep/page/maintenance/maintainerList.jsp?menuNO=9144&parentMenuNO=9143';

/*
 * 基础数据_电梯信息查看_质监局
 * @author zenggang 2015年8月19日15:59:19
 * */
MenuNumber.ElevatorListByNN = 9107;
MenuNumber.ElevatorViewByNN = 9108;
MenuNumber.ExportElevatorByNN = 9109;
MenuNumber.ElevatorAddByNN = 9110;
MenuNumber.ElevatorEditByNN = 9111;
MenuNumber.ElevatorMessageDelByNN = 9112;
MenuNumber.ElevatorUnwrapByNN = 9203;
URL.ElevatorListByNN = '/baseinfo/page/elevator/elevatorList.jsp?menuNO=9107';
URL.ElevatorViewByNN = '/baseinfo/page/elevator/elevatorView.jsp?menuNO=9108';
URL.ElevatorAddByNN = '/baseinfo/page/elevator/elevatorEdit.jsp?menuNO=9110';
URL.ElevatorEditByNN = '/baseinfo/page/elevator/elevatorEdit.jsp?menuNO=9111';
URL.ExportElevatorByNN = '/baseinfo/elevator/elevator!exportElevatorExcel.do';

/*
 * 基础数据_电梯信息查看_广西特检院
 * @author zenggang 2015年8月19日15:59:19
 * */
MenuNumber.ElevatorListByNN_TJY = 9140;
MenuNumber.ElevatorViewByNN_TJY = 9149;
MenuNumber.ExportElevatorByNN_TJY = 9150;	
MenuNumber.ElevatorAddByNN_TJY = 9151;
MenuNumber.ElevatorEditByNN_TJY = 9152;
MenuNumber.ElevatorMessageDelByNN_TJY = 9153;
MenuNumber.ElevatorUnwrapByNN_TJY = 9202;
URL.ElevatorListByNN_TJY = '/baseinfo/page/elevator/elevatorList.jsp?menuNO=9140';
URL.ElevatorViewByNN_TJY = '/baseinfo/page/elevator/elevatorView.jsp?menuNO=9149';
URL.ElevatorAddByNN_TJY = '/baseinfo/page/elevator/elevatorEdit.jsp?menuNO=9151';
URL.ElevatorEditByNN_TJY = '/baseinfo/page/elevator/elevatorEdit.jsp?menuNO=9152';



/*
 * 基础数据_电梯信息查看_房管局
 * @author zenggang 2015年8月19日15:59:19
 * */
MenuNumber.ElevatorListByNN_FGJ = 9174;
MenuNumber.ElevatorViewByNN_FGJ = 9176;
MenuNumber.ExportElevatorByNN_FGJ = 9177;	
MenuNumber.ElevatorAddByNN_FGJ = 9178;
MenuNumber.ElevatorEditByNN_FGJ = 9179;
MenuNumber.ElevatorMessageDelByNN_FGJ = 9180;
MenuNumber.ElevatorUnwrapByNN_FGJ = 9201;
URL.ElevatorListByNN_FGJ = '/baseinfo/page/elevator/elevatorList.jsp?menuNO=9174';
URL.ElevatorViewByNN_FGJ = '/baseinfo/page/elevator/elevatorView.jsp?menuNO=9176';
URL.ElevatorAddByNN_FGJ = '/baseinfo/page/elevator/elevatorEdit.jsp?menuNO=9178';
URL.ElevatorEditByNN_FGJ = '/baseinfo/page/elevator/elevatorEdit.jsp?menuNO=9179';
/*
 * 基础数据_批量编辑维保信息_房管局
 * @author zenggang 2015年8月19日16:11:01
 * */
MenuNumber.ElevatorUpkeepBatchEditByNN_FGJ = 9175;


/*南宁*/
URL.ElevatorUpkeepListByNN = '/baseinfo/page/elevator/elevatorUpkeepList.jsp?menuNO=9122';
URL.ElevatorUpkeepListByNN_TJY = '/baseinfo/page/elevator/elevatorUpkeepList.jsp?menuNO=9122';

MenuNumber.CompanyDistributionElevByNN = 9204;
MenuNumber.CompanyDistributionElevByNN_TJY = 9205;
MenuNumber.CompanyDistributionElevByNN_FGJ = 9206;


/*
 * 基础数据_批量编辑维保信息_质监局
 * @author zenggang 2015年8月19日16:11:01
 * */
MenuNumber.ElevatorUpkeepBatchEditByNN = 9114;

/*
 * 基础数据_批量编辑维保信息_广西特检院
 * @author zenggang 2015年8月19日16:11:01
 * */
MenuNumber.ElevatorUpkeepBatchEditByNN_TJY = 9141;

/*
 * 基础数据_批量编辑维保信息_房管局
 * @author zenggang 2015年8月19日16:11:01
 * */
MenuNumber.BuildingListByNN_FGJ = 9171;
MenuNumber.BuildingAddByNN_FGJ = 9185;
MenuNumber.BuildingEditByNN_FGJ = 9186;
MenuNumber.BuildingViewByNN_FGJ = 9187;
MenuNumber.BuildingLinkElevByNN_FGJ = 9188;
MenuNumber.BuildingDelByNN_FGJ = 9189;

URL.BuildingListByNN_FGJ = '/baseinfo/page/building/buildingList.jsp?menuNO=9171';
URL.BuildingAddByNN_FGJ = '/baseinfo/page/building/buildingEdit.jsp?menuNO=9185';
URL.BuildingEditByNN_FGJ = '/baseinfo/page/building/buildingEdit.jsp?menuNO=9186';
URL.BuildingLinkElevByNN_FGJ = '/baseinfo/page/building/buildingLinkElevator.jsp?menuNo=2654';

/*
 * 南宁（维保信息管理_质监局）
 * @author zenggang 2015年8月17日14:15:40
 * */
MenuNumber.UpkeepElevatorListByNN = 9122;
MenuNumber.UpkeepElevatorImportByNN = 9123;
MenuNumber.UpkeepElevatorEditByNN = 9124;
MenuNumber.UpkeepElevatorLogListByNN = 9125;

MenuNumber.UpkeepElevatorBatchEditByNN = 91240;
MenuNumber.UpkeepElevatorExportNN = 91241;
URL.UpkeepElevatorListByNN = '/upkeep/page/purpose/upkeepElevatorList.jsp?menuNO=9122';

/* 南宁的电梯合同管理 */
URL.GetElevContractList = '/upkeep/contract/elevContract!getContractList.do';
URL.GetElevContractById = '/upkeep/contract/elevContract!getContractById.do';
URL.ElevContractList = '/upkeep/page/contract/elevContractList.jsp?menuNO=1143&parentMenuNO=1111';
URL.AddElevContract = '/upkeep/contract/elevContract!addContract.do';
URL.DelElevContract = '/upkeep/contract/elevContract!deleteContract.do';
URL.UpdateElevContract = '/upkeep/contract/elevContract!updateContract.do';
URL.ConfirmElevContract = '/upkeep/contract/elevContract!updateContractStatus.do';
URL.GetElevByRegisterCode = '/upkeep/contract/elevContract!getElevByRegisterCode.do';
URL.GetVoiceList = '/monitor/data/voice!getVoiceList.do';
URL.exportVoiceExcel = '/monitor/data/voice!exportExcel.do';
URL.ExportElevContract = '/upkeep/contract/elevContract!exportContract.do';


MenuNumber.DelElevContract = 11431;
MenuNumber.EditElevContract = 11432;
MenuNumber.ConfirmElevContract = 11433;
MenuNumber.ExportElevContract = 11434;

URL.getCtrlEventStatistical = '/monitor/data/ctrlEvent!getCtrlEventStatistical.do';
URL.getCtrlEventStatisticalList = '/monitor/data/ctrlEvent!getCtrlEventStatisticalList.do';



/* 用户登录日志 */
URL.getUserLogList = '/sys/userLog/userLog!userLogList.do';
/* 用户操作日志 */
URL.getUserOpLogList = '/sys/userOpLog/userOpLog!userOpLogList.do';

/* 状态提醒 */
MenuNumber.contractStatusRemind = 8100;
MenuNumber.trapsStatusRemind = 8200;
MenuNumber.nontrapsStatusRemind = 8300;
MenuNumber.yearInspectionStatusRemind = 8400;
MenuNumber.suspensionStatusRemind = 8500;
MenuNumber.elevAllCounts = 8510;
MenuNumber.elevOfflineCounts = 8520;
MenuNumber.elevFaultCounts = 8530;
MenuNumber.elevMaintainCounts = 8540;
MenuNumber.elevNormalCounts = 8550;

/* 媒体管理 */

/*媒体投放范围管理*/
MenuNumber.mediaRangeAdd=11110;//添加媒体投放范围
MenuNumber.mediaRangeEdit=11111;//编辑媒体投放范围
MenuNumber.mediaRangeDelete=11113;//删除当前选中媒体投放范围记录
MenuNumber.mediaRangeLook=11112;//查看
MenuNumber.mediaRangeApprove=11114;//审核媒体投放范围
URL.MediaRangeList='/media/mediaRange/mediaRange!mediaRangeList.do';
URL.AddMediaRange='/media/mediaRange/mediaRange!saveMediaRange.do';
URL.EditMediaRange='/media/mediaRange/mediaRange!updateMediaRange.do';
URL.DeleteMediaRange='/media/mediaRange/mediaRange!deleteMediaRange.do';
URL.GetMediaRangeByIdElev = '/media/mediaRange/mediaRange!getMediaRangeByIdElev.do';
URL.GetElevListByMediaRangeId='/media/mediaRange/mediaRange!getElevListByMediaRangeId.do';//查找当前投放范围记录的电梯列表
URL.GetElevListByLook='/media/mediaRange/mediaRange!getElevListByElevidAndAddress.do';//根据电梯工号或位置别名查找当前范围ID内的电梯列表
URL.ApproveMediaRange='/media/mediaRange/mediaRange!approveMediaRange.do';//审批媒体投放范围
URL.GetMediaRangeList = '/media/page/range/mediarangelist.jsp?menuNO=11100';//主要用作跳转地址

/*媒体素材管理*/
MenuNumber.MediaSourceMaterialList = 11200;
MenuNumber.MediaSourceMaterialAdd = 11250;
MenuNumber.MediaSourceMaterialEdit = 11210;
MenuNumber.MediaSourceMaterialApprove = 11240;
MenuNumber.MediaSourceMaterialView = 11220;
MenuNumber.MediaSourceMaterialDelete = 11230;
URL.MediaSourceMaterialList = '/media/page/media/mediaSourceMaterialList.jsp?menuNO=11200';
URL.GetMediaSourceMaterialList = '/media/sourceMaterial/sourceMaterial!SourceMaterialList.do';
URL.AddMediaSourceMaterial = '/media/sourceMaterial/sourceMaterial!add.do';
URL.UpdateMediaSourceMaterial = '/media/sourceMaterial/sourceMaterial!update.do';
URL.DeleteMediaSourceMaterial = '/media/sourceMaterial/sourceMaterial!delete.do';
URL.getMediaSourceMaterialById = '/media/sourceMaterial/sourceMaterial!getById.do';
URL.ApproveMediaSourceMaterial = '/media/sourceMaterial/sourceMaterial!approve.do';

/*媒体制作管理*/
MenuNumber.MediaInfoList = 11300;
MenuNumber.MediaInfoAdd =11350;
MenuNumber.MediaInfoEdit = 11310;
MenuNumber.MediaInfoApprove = 11340;
MenuNumber.MediaInfoView = 11320;
MenuNumber.MediaInfoDelete = 11330;
MenuNumber.MediaInfoPreview = 11360;
URL.MediaInfoList = '/media/page/media/mediaInfoList.jsp?menuNO=11300';
URL.GetMediaInfoList = '/media/advertising/advertising!advertisingList.do';
URL.AddMediaInfo = '/media/advertising/advertising!add.do';
URL.UpdateMediaInfo = '/media/advertising/advertising!update.do';
URL.ApproveMediaInfo = '/media/advertising/advertising!approve.do';
URL.DeleteMediaInfo = '/media/advertising/advertising!delete.do';
URL.getMediaInfoById = '/media/advertising/advertising!getAdvertisingById.do';
URL.GetAdvertisingDetailById = '/media/advertising/advertising!getAdvertisingDetailById.do';

/*播放列表管理*/
MenuNumber.PlayList = 11300;
MenuNumber.PlaylistAdd =11350;
MenuNumber.PlaylistEdit = 11310;
MenuNumber.PlaylistApprove = 11340;
MenuNumber.PlaylistView = 11320;
MenuNumber.PlaylistDelete = 11330;
MenuNumber.PlaylistPreview = 11360;
MenuNumber.PlaylistCopy = 11370;
URL.PlaylistList = '/media/page/media/playList.jsp?menuNO=11300';
URL.GetPlaylist = '/media/playlist/playlist!playList.do';
URL.AddPlaylist = '/media/playlist/playlist!add.do';
URL.UpdatePlaylist = '/media/playlist/playlist!update.do';
URL.ApprovePlaylist = '/media/playlist/playlist!approve.do';
URL.DeletePlaylist = '/media/playlist/playlist!delete.do';
URL.GetPlaylistById = '/media/playlist/playlist!getPlaylistById.do';
URL.GetPlaylistView = '/media/playlist/playlist!getPlaylistViewById.do';
URL.GetPlaylistAdvertisingById = '/media/playlist/playlist!getPlaylistAdvertisingById.do';
URL.GetUiPosition = '/media/playlist/playlist!getUiPosition.do';
URL.GetPlaylistDate = '/media/playlist/playlist!getPlaylistDate.do';

/*媒体投放管理*/
MenuNumber.MediaPublishList = 11400;
MenuNumber.MediaPublishAdd =11450;
MenuNumber.MediaPublishEdit = 11460;
MenuNumber.MediaPublishApprove = 11440;
MenuNumber.MediaPublishView = 11470;
MenuNumber.MediaPublishDelete = 11480;
MenuNumber.MediaWirelessIssued = 11490;
MenuNumber.ViewMediaWirelessIssued = 11491;
URL.MediaPublishList = '/media/page/media/mediaPublishList.jsp?menuNO=11400';
URL.GetMediaPublishList = '/media/mediaPublish/mediaPublish!mediaPublishList.do';
URL.UpdateMediaPublish = '/media/mediaPublish/mediaPublish!addOrUpdate.do';
URL.ApproveMediaPublish = '/media/mediaPublish/mediaPublish!approve.do';
URL.DeleteMediaPublish = '/media/mediaPublish/mediaPublish!delete.do';
URL.getMediaPublishById  = '/media/mediaPublish/mediaPublish!getMediaPublishById.do';
URL.mediaWirelessIssued  = '/media/mediaPublish/mediaPublish!wirelessIssued.do';
URL.excelWirelessIssued  = '/media/mediaPublish/mediaPublish!excelWirelessIssued.do';
URL.publishElevList  = '/media/mediaPublish/mediaPublish!publishElevList.do';

/*公告模板管理*/
MenuNumber.NoticeTemplateAdd=11501;
MenuNumber.NoticeTemplateEdit=11502;
MenuNumber.NoticeTemplateDelete=11504;
MenuNumber.NoticeTemplateView=11503;
URL.GetNoticeTemplateList='/media/page/media/noticeTemplateList.jsp?menuNO=11500';
URL.NoticeTemplateList='/media/noticeTemplate/noticeTemplate!noticeTemplateList.do';
URL.NoticeTemplateAdd='/media/noticeTemplate/noticeTemplate!noticeTemplateSave.do';
URL.NoticeTemplateEdit='/media/noticeTemplate/noticeTemplate!noticeTemplateUpdate.do';
URL.NoticeTemplateDelete='/media/noticeTemplate/noticeTemplate!noticeTemplateDelete.do';
URL.GetNoticeTemplateById='/media/noticeTemplate/noticeTemplate!getNoticeTemplateById.do';


/*媒体系统配置管理*/
MenuNumber.ScreenConfigAdd=11801;
MenuNumber.ScreenConfigEdit=11802;
MenuNumber.ScreenConfigDelete=11804;
MenuNumber.ScreenConfigView=11803;
MenuNumber.ScreenApprover=11805;
URL.GetScreenConfigList='/media/page/media/screenConfigList.jsp?menuNO=11800';
URL.ScreenConfigList='/media/screenConfig/screenConfig!screenConfigList.do';
URL.ScreenConfigAdd='/media/screenConfig/screenConfig!screenConfigSave.do';
URL.ScreenConfigEdit='/media/screenConfig/screenConfig!screenConfigUpdate.do';
URL.ScreenConfigDelete='/media/screenConfig/screenConfig!screenConfigDelete.do';
URL.GetScreenConfigById='/media/screenConfig/screenConfig!getscreenConfigById.do';
URL.ScreenConfigItemList='/media/screenConfig/screenConfig!screenConfigItemList.do';//显示配置管理具体列表
URL.GetConfigType='/media/screenConfig/screenConfig!dnss_screenConfigItemDetail.do';//显示配置名称详情

URL.SaveConfigType='/media/screenConfig/screenConfig!dnss_ScreenConfigAttributeSave.do';//显示配置名称详情

URL.FindApproverStatus='/media/screenConfig/screenConfig!findApproverStatus.do';
URL.FindAttributeType='/media/screenConfig/screenConfig!findAttributeType.do';
URL.FindFileType='/media/screenConfig/screenConfig!findFileType.do';
URL.FindGroupType='/media/screenConfig/screenConfig!findGroupType.do';
URL.FindScreenConfigItem='/media/screenConfig/screenConfig!findScreenConfigItem.do';
URL.SaveScreenConfigTemplate='/media/screenConfig/screenConfig!dnss_screenConfigTemplateSave.do';


URL.FindScreenConfigTemplateById='/media/screenConfig/screenConfig!findScreenConfigTemplateById.do';
URL.UpdateScreenConfigTemplate='/media/screenConfig/screenConfig!screenConfigTemplateUpdate.do';
URL.DeleteScreenConfigTemplate='/media/screenConfig/screenConfig!screenConfigTemplateDelete.do';
URL.ApproveScreenConfigTemplate='/media/screenConfig/screenConfig!screenConfigTemplateApprove.do';
URL.SaveCreenConfigUiArea='/media/screenConfig/screenConfig!dnss_screenConfigUiAreaSave.do';
URL.CancelUIBackgroundJpg='/media/screenConfig/screenConfig!dnss_cancelUIBackgroundJpg.do';

/*公告投放管理*/
MenuNumber.NoticePublishList = 11600;
MenuNumber.NoticePublishAdd =11620;
MenuNumber.NoticePublishEdit = 11630;
MenuNumber.NoticePublishApprove = 11610;
MenuNumber.NoticePublishView = 11660;
MenuNumber.NoticePublishDelete = 11650;
MenuNumber.NoticeWirelessIssued = 11670;
MenuNumber.ViewNoticeWirelessIssued = 11680;
URL.NoticePublishList = '/media/page/media/noticePublishList.jsp?menuNO=11600';
URL.GetNoticePublishList = '/media/noticePublish/noticePublish!noticePublishList.do';
URL.UpdateNoticePublish = '/media/noticePublish/noticePublish!addOrUpdate.do';
URL.ApproveNoticePublish = '/media/noticePublish/noticePublish!approve.do';
URL.DeleteNoticePublish = '/media/noticePublish/noticePublish!delete.do';
URL.getNoticePublishById  = '/media/noticePublish/noticePublish!getNoticePublishById.do';
URL.noticePublishElevList  = '/media/noticePublish/noticePublish!noticePublishElevList.do';
URL.noticeWirelessIssued  = '/media/noticePublish/noticePublish!wirelessIssued.do';

/*无线下发管理*/
MenuNumber.publishMediaList=11710;
MenuNumber.publishWordNotice=11720;
MenuNumber.publishScreenConfig=11730;
MenuNumber.wirelessIssuedExcel=11740;
URL.ElevMediaMainList = "/media/elevMedia/elevMedia!elevMediaMain.do";
URL.WirelessIssued = "/media/elevMedia/elevMedia!wirelessIssued.do";
URL.AddJob = "/media/elevMedia/elevMedia!addJob.do";
URL.GetPlayListFile = "/media/elevMedia/elevMedia!getPlayListFile.do";
URL.GetMediaLog = "/media/elevMedia/elevMedia!getMediaLog.do";
URL.wirelessIssuedExcel = "/media/elevMedia/elevMedia!excelWirelessIssued.do";

/*接入平台管理*/
MenuNumber.monitorPlatform=13004;
MenuNumber.platformAccess=13001;
MenuNumber.deleteElevPlatform=13002;
MenuNumber.batchElevPlatform=13003;
MenuNumber.lookElevPlatformMonitorUrl=13005;
MenuNumber.ExportPlatformUrl=13006;
URL.SelectPlatform="/baseinfo/elevator/elevator!dnss_saveElevPlatform.do";
URL.DeletePlatform="/baseinfo/elevator/elevator!dnss_deleteElevPlatform.do";
URL.BatchElevPlatformStatus='/baseinfo/elevator/elevator!dnss_batchElevPlatform.do';
URL.batchElevPlatformEdit="/baseinfo/page/platform/platformBatchEdit.jsp";
URL.GetElevPlatformList='/baseinfo/page/platform/platformList.jsp?menuNO=13000';
URL.elevatorRealTimeCall='/monitor/hangzhou/elevatorRealTimeCall.jsp';
URL.ExportPlatformMonitorUrl = '/baseinfo/elevator/elevator!exportPlatformMonitorUrl.do';

/*故障上报*/
URL.GetFailureReportList = '/monitor/failure/failureReport!failureReportList.do';
URL.GetLastReportData = '/monitor/failure/failureReport!getLastReportData.do';
MenuNumber.FailureRealTimeMonitor=13010;
MenuNumber.FailureManagement = 13008;
MenuNumber.failureManagementDetail=13009;
URL.GetFailureReportListJump='/monitor/page/monitor/failureReport.jsp?menuNO=13007';
URL.AddFailureReport='/monitor/failure/failureReport!addFailureReport.do';


/**困人统计**/
MenuNumber.tiringEvent = 10510;
MenuNumber.tiringStatisticsByMonth = 10520;
MenuNumber.tiringStatisticsByType = 10530;
MenuNumber.tiringStatisticsByReason = 10540;
URL.GetTiringStatisticsList = '/rescue/rescueTask/rescueTask!getTiringStatisticsList.do';
URL.ExportTiringStatisticsList = '/rescue/rescueTask/rescueTask!exportTiringStatisticsList.do';
URL.ExportTiringByTimeList = '/rescue/rescueTask/rescueTask!exportTiringByTimeList.do';
URL.ExportTiringByTypeList = '/rescue/rescueTask/rescueTask!exportTiringByTypeList.do';
URL.GetTiringByTimeList = '/rescue/rescueTask/rescueTask!getTiringByTimeList.do';
URL.getTiringByTypeList = '/rescue/rescueTask/rescueTask!getTiringByTypeList.do';
URL.getTiringByReasonList = '/rescue/rescueTask/rescueTask!getTiringByReasonList.do';


