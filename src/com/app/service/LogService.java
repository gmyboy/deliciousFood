package com.app.service;

import com.app.bean.Grid;
import com.app.bean.PageInfoBean;
import com.app.model.User;

public interface LogService {
	
	/**
	 * 插入用户登录日志
	 * @return
	 */
	public void saveLoginLog(User user,String ip,String type);
	
	
	/**
	 * 查询用户登录日志
	 * @param user
	 * @param page
	 * @param rows
	 * @param sortName
	 * @param sortOrder
	 * @return
	 */
	public Grid getLoginLogList(String userName,String fullName,String startTime,String endTime,String channelNo,PageInfoBean pageInfoBean);
	
	
	/**
	 * 插入用户操作日志
	 * @return
	 */
	public void saveOperationLog(User user,String opName);
	
	
	/**
	 * 查询用户操作日志
	 * @param userName
	 * @param fullName
	 * @param page
	 * @param rows
	 * @param sortName
	 * @param sortOrder
	 * @return
	 */
	public Grid getOperationLogList(String userName,String fullName,String startTime,String endTime,String channelNo,PageInfoBean pageInfoBean);
	
	
	/**
	 * 插入设备访问日志
	 * @return
	 */
	public void saveDeviceAccessLog(Integer terminalId,String interfaceName,String opName,String result);
	
	
	/**
	 * 查询设备日志
	 * @param startTime
	 * @param endTime
	 * @param page
	 * @param rows
	 * @param sortName
	 * @param sortOrder
	 * @return
	 */
	public Grid getDeviceAccessLogList(String startTime,String endTime,String channelNo,PageInfoBean pageInfoBean);
	
	
	/**
	 * 插入升级结果日志
	 * @return
	 */
	public void saveUpgradeResultLog(Integer terminalId,String upgradeId,String upgradeResult,String errorLog);
	
	
	/**
	 * 查询升级结果日志
	 * @param startTime
	 * @param endTime
	 * @param page
	 * @param rows
	 * @param sortName
	 * @param sortOrder
	 * @return
	 */
	public Grid getUpgradeResultLog(String startTime,String endTime,String channelNo,PageInfoBean pageInfoBean);
}
