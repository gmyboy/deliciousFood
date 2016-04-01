package com.app.action;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.app.bean.Grid;
import com.app.bean.Json;
import com.app.bean.LoginResult;
import com.app.bean.PageInfoBean;
import com.app.model.LoginLog;
import com.app.model.Menu;
import com.app.model.Role;
import com.app.model.User;
import com.app.service.LogService;
import com.app.service.UserService;
import com.app.service.RoleService;
import com.app.util.PropertiesUtils;
/**
 * 日志
 * @author aofl
 *
 */
@Namespace("/androidManager")
@Action("/log")
@Results({ @Result(name = "success", location = "/success.jsp"), @Result(name = "error", location = "/login.jsp"), @Result(name = "index", location = "/index.jsp") })
public class LogAction extends BaseAction {
	
	private Logger logger = Logger.getLogger(LogAction.class);

	private static final long serialVersionUID = 1L;

	@Autowired
	private LogService logService;
		
	//登陆账号
	private String userName;
	//员工姓名
	private String fullName;
	//开始时间
	private String startTime;
	//结束时间
	private String endTime;
	
	/**
	 * 查询用户登录日志
	 * @return
	 */
	public String loginLogList(){
		Grid grid = new Grid();
		try {
			PageInfoBean pfb = new PageInfoBean(page,rows);
			pfb.setSortName(sort);
			pfb.setSortOrder(order);
			User user = (User) getSession().getAttribute("user");
			grid = logService.getLoginLogList(userName,fullName,startTime,endTime,user.getChannelNo()==null?"":user.getChannelNo(), pfb);
			writeJson(grid);
		} catch (Exception e) {
			String msg = "获取用户登陆日志列表失败，请检查系统是否运行正常";
			logger.error(msg, e);
			Json json = new Json();
			json.setMsg(msg);
			json.setSuccess(0);
			writeJson(json);
		}
		return null;
	}
	
	
	/**
	 * 查询用户操作日志
	 * @return
	 */
	public String operationLogList(){
		Grid grid = new Grid();
		try {
			PageInfoBean pfb = new PageInfoBean(page,rows);
			pfb.setSortName(sort);
			pfb.setSortOrder(order);
			User user = (User) getSession().getAttribute("user");
			grid = logService.getOperationLogList(userName,fullName,startTime,endTime,user.getChannelNo()==null?"":user.getChannelNo(), pfb);
			writeJson(grid);
		} catch (Exception e) {
			String msg = "获取用户操作日志列表失败，请检查系统是否运行正常";
			logger.error(msg, e);
			Json json = new Json();
			json.setMsg(msg);
			json.setSuccess(0);
			writeJson(json);
		}
		return null;
	}
	
	
	/**
	 * 查询设备访问日志
	 * @return
	 */
	public String deviceAccessLogList(){
		Grid grid = new Grid();
		try {
			PageInfoBean pfb = new PageInfoBean(page,rows);
			pfb.setSortName(sort);
			pfb.setSortOrder(order);
			User user = (User) getSession().getAttribute("user");
			grid = logService.getDeviceAccessLogList(startTime,endTime,user.getChannelNo()==null?"":user.getChannelNo(), pfb);
			writeJson(grid);
		} catch (Exception e) {
			String msg = "获取设备访问日志列表失败，请检查系统是否运行正常";
			logger.error(msg, e);
			Json json = new Json();
			json.setMsg(msg);
			json.setSuccess(0);
			writeJson(json);
		}
		return null;
	}
	
	/**
	 * 查询升级结果日志
	 * @return
	 */
	public String upgradeResultLogList(){
		Grid grid = new Grid();
		try {
			PageInfoBean pfb = new PageInfoBean(page,rows);
			pfb.setSortName(sort);
			pfb.setSortOrder(order);
			User user = (User) getSession().getAttribute("user");
			grid = logService.getUpgradeResultLog(startTime,endTime,user.getChannelNo()==null?"":user.getChannelNo(), pfb);
			writeJson(grid);
		} catch (Exception e) {
			String msg = "获取升级结果日志列表失败，请检查系统是否运行正常";
			logger.error(msg, e);
			Json json = new Json();
			json.setMsg(msg);
			json.setSuccess(0);
			writeJson(json);
		}
		return null;
	}
	
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	public String getStartTime() {
		return startTime;
	}
	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
}
