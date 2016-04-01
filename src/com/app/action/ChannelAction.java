package com.app.action;

import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSONObject;
import com.app.bean.Grid;
import com.app.bean.Json;
import com.app.bean.PageInfoBean;
import com.app.model.Channel;
import com.app.model.Query;
import com.app.model.Role;
import com.app.model.Terminal;
import com.app.model.User;
import com.app.service.ChannelService;
import com.app.service.LogService;
import com.app.service.QueryService;
import com.app.service.RoleService;
import com.app.service.TerminalService;
import com.app.service.UserService;

/**
 * 渠道
 * 
 * @author aofl
 * 
 */
@Namespace("/androidManager")
@Action("/channelAction")
@Results(@Result(name = "error", location = "/login.jsp"))
public class ChannelAction extends BaseAction {

	private static final long serialVersionUID = 1L;
	private Logger logger = Logger.getLogger(ChannelAction.class);

	@Autowired
	private ChannelService channelService;

	@Autowired
	private TerminalService terminalService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private RoleService roleService;
	
	@Autowired
	private LogService logService;
	
	@Autowired
	private QueryService queryService;
	
	// 公司名称
	private String companyName;
	// 地址
	private String address;
	// 电话
	private String phone;
	// 联系人
	private String contact;
	//渠道号
	private String channelNo;
	
	private String tmIds;
	
    private String userName;
    
    private String password;
    
    private String fullName;
    
    private String roleName;
    
    private String roleDescription;
    
    private Integer status;
    
    private Terminal ter;
    
    private String roleIds;
    
	public String channelList() {
		Grid grid = new Grid();
		try {
			PageInfoBean pfb = new PageInfoBean(page, rows);
			pfb.setSortName(sort);
			pfb.setSortOrder(order);
			User user = (User) getSession().getAttribute("user");
			grid = channelService.getChannerList(user.getChannelNo(),companyName, address, contact, phone,status, pfb);
		} catch (Exception e) {
			logger.error("获取数据列表异常", e);
			e.printStackTrace();
		}
		writeJson(grid);
		return null;
	}

	/**
	 * 根据Id查询渠道信息
	 * 
	 * @return
	 */
	public String getById() {
		Json json = new Json();
		try {
			Channel channel = channelService.getById(id);
//			channel.setQuery(queryService.getQueryByCompanyId(id));
			json.setSuccess(1);
			json.setObj(channel);
			json.setMsg("操作成功！");
			writeJson(channel);
		} catch (Exception e) {
			logger.error("获取渠道信息异常", e);
			e.printStackTrace();
			json.setSuccess(0);
			json.setMsg("查询渠道信息失败！");
			writeJson(json);
		}
		return null;
	}

	/**
	 * 新增
	 * 
	 * @return
	 */
	public String add() {
		Json json = new Json();
		try {
			Channel channelOld = channelService.getByNo(channelNo);
			if(null!=channelOld){
				json.setSuccess(0);
				json.setMsg("渠道号已经存在，请重新输入！");
				writeJson(json);
				return null;
			}
			Channel channel = new Channel();
			channel.setCompanyName(companyName);
			channel.setAddress(address);
			channel.setPhone(phone);
			channel.setContact(contact);
			channel.setChannelNo(channelNo);
			channel.setStatus(1);
			User user = (User) getSession().getAttribute("user");
			if (null != user) {
				channel.setCreater(user.getUserName() + "[" + user.getFullName() + "]");
				channel.setCreateTime(new Date());
				channel.setLastUpdater(user.getUserName() + "[" + user.getFullName() + "]");
				channel.setLastUpdateTime(new Date());
			}
			channelService.saveOrUpdate(channel);
			//保存角色信息
//			Role role = new Role();
//			role.setRoleName(roleName.trim());
//			role.setRoleDescription(roleDescription);
//			role.saveSession((User) getSession().getAttribute("user"));
//			role.setChannelNo(channel.getChannelNo());
//			roleService.saveOrUpdate(role);
			//保存用户信息
			User user1 = new User();
			user1.setUserName(userName);
			user1.setFullName(fullName);
			user1.setPassword(password);
			user1.saveSession((User) getSession().getAttribute("user"));
			user1.setChannelNo(channel.getChannelNo());
			user1.setCompanyName(channel.getCompanyName());
			userService.saveOrUpdate(user1);
			//更新渠道信息表
			channel.setUserId(user1.getId());
			channel.setRoleId(roleIds);
			channelService.saveOrUpdate(channel);
			//保存用户角色关系表
			userService.saveUserRole(roleIds, user1.getId());
			//写入操作日志
			logService.saveOperationLog((User) getSession().getAttribute("user"), "新增渠道:"+channel.getCompanyName());
			json.setSuccess(1);
			json.setObj(channel);
			json.setMsg("操作成功！");
			writeJson(json);
		} catch (Exception e) {
			logger.error("新增渠道信息异常", e);
			e.printStackTrace();
			json.setSuccess(0);
			json.setMsg("保存渠道信息失败！");
			writeJson(json);
		}
		return null;
	}

	/**
	 * 更新
	 * 
	 * @return
	 */
	public String update() {
		Json json = new Json();
		try {
			Channel channel = channelService.getById(id);
			if (channel == null) {
				json.setMsg("操作失败，数据不存在或已删除！");
				json.setSuccess(0);
			} else {
				if(null==channel.getChannelNo()||!channel.getChannelNo().equals(channelNo)){
					Channel channelOld = channelService.getByNo(channelNo);
					if(null!=channelOld){
						json.setSuccess(0);
						json.setMsg("渠道号已经存在，请重新输入！");
						writeJson(json);
						return null;
					}
				}
				channel.setCompanyName(companyName);
				channel.setAddress(address);
				channel.setPhone(phone);
				channel.setContact(contact);
				channel.setChannelNo(channelNo);
				User user = (User) getSession().getAttribute("user");
				if (null != user) {
					channel.setLastUpdater(user.getUserName() + "[" + user.getFullName() + "]");
					channel.setLastUpdateTime(new Date());
				}
				channelService.saveOrUpdate(channel);
				//更新角色信息
//				Role role = roleService.getById(channel.getRoleId());
//				role.setRoleName(roleName.trim());
//				role.setRoleDescription(roleDescription);
//				role.updateSession((User) getSession().getAttribute("user"));
//				role.setChannelNo(channel.getChannelNo());
//				roleService.saveOrUpdate(role);
				//更新用户信息
				User user1 = userService.getById(StringUtils.isNotBlank(channel.getUserId())?channel.getUserId():"-1");
				if(null==user1){
					user1 = new User();
					user1.saveSession((User) getSession().getAttribute("user"));
				}else{
					user1.updateSession((User) getSession().getAttribute("user"));
				}
				user1.setUserName(userName);
				user1.setFullName(fullName);
				if(StringUtils.isNotBlank(password)){
					user1.setPassword(password);
				}
				user1.setChannelNo(channel.getChannelNo());
				user1.setCompanyName(channel.getCompanyName());
				userService.saveOrUpdate(user1);
				//更新渠道信息表
				channel.setUserId(user1.getId());
				channel.setRoleId(roleIds);
				channelService.saveOrUpdate(channel);
				//保存用户角色关系表
				userService.saveUserRole(roleIds, user1.getId());
				//写入操作日志
				logService.saveOperationLog((User) getSession().getAttribute("user"), "更新渠道:"+channel.getCompanyName());
				json.setSuccess(1);
				json.setObj(channel);
				json.setMsg("操作成功！");
			}
			writeJson(json);
		} catch (Exception e) {
			logger.error("修改渠道信息异常", e);
			e.printStackTrace();
			json.setSuccess(0);
			json.setMsg("更新渠道信息失败！");
			writeJson(json);
		}
		return null;
	}
	
	/**
	 *渠道绑定终端 
	 */
	public String bindTerminal(){
//		Json json = new Json();
//		try {
//			Channel channel = channelService.getById(id);
//			if (channel == null) {
//				json.setMsg("操作失败，数据不存在或已删除！");
//				json.setSuccess(0);
//			} else {
//				
//				//再次进入绑定时，将前面绑定的终端渠道号请空
//				terminalService.deleteTerChannel(channel.getId());
//				
//				//保存策略查询条件
//				String searchJson = "";
//				Query query=queryService.getQueryByCompanyId(channel.getId());
//				if(null==query){
//					query = new Query();
//				}
//				if(null!=ter){
//					searchJson = JSONObject.toJSONString(ter);
//					query.setSearchJson(searchJson);
//				}
//				query.setChannelId(channel.getId());
//				queryService.saveOrUpdate(query);
//				
//				//将查询条件ID放入渠道信息表
//				channel.setQueryId(query.getId());
//				channelService.saveOrUpdate(channel);
//				
//				//通过查询条件再次查询终端信息
//				terminalService.updateTerChannel(channel.getId(), channel.getCompanyName(), searchJson);
//				
//				//写入操作日志
//				logService.saveOperationLog((User) getSession().getAttribute("user"), "渠道:"+channel.getCompanyName()+"绑定终端");
//				json.setSuccess(1);
//				json.setObj(channel);
//				json.setMsg("操作成功！");
//			}
//			writeJson(json);
//		} catch (Exception e) {
//			logger.error("绑定终端信息异常", e);
//			e.printStackTrace();
//			json.setSuccess(0);
//			json.setMsg("绑定终端信息失败！");
//			writeJson(json);
//		}
		return null;
	}


	/**
	 * 
	 * 删除
	 */
	public String delete() {
		Json json = new Json();
		try {
			Channel channel = channelService.getById(id);
			if (channel == null) {
				json.setMsg("操作失败，数据不存在或已删除！");
				json.setSuccess(0);
			} else {
//				List<Terminal> tmList = terminalService.getTerminalListByChannelNo(channel.getChannelNo());
//				if (null != tmList && tmList.size() > 0) {
//					for (int i = 0; i < tmList.size(); i++) {
//						Terminal terminal = tmList.get(i);
//						terminal.setChannelNo("");
//						terminalService.saveTerminalInfo(terminal);
//					}
//				}
				channelService.delete(channel);
				json.setSuccess(1);
				json.setObj(channel);
				json.setMsg("操作成功！");
			}
			writeJson(json);
		} catch (Exception e) {
			logger.error("删除渠道信息异常", e);
			e.printStackTrace();
			json.setSuccess(0);
			json.setMsg("删除渠道信息失败！");
			writeJson(json);
		}
		return null;
	}

	/**
	 * 
	 * 停/启用
	 */
	public String updateStatus() {
		Json json = new Json();
		try {
			Channel channel = channelService.getById(id);
			String message = "";
			String opName = "";
			if (channel == null) {
				json.setMsg("操作失败，数据不存在或已删除！");
				json.setSuccess(0);
			} else {
				Integer status = channel.getStatus();
				if (status != null) {
					if (status == 0) {
						// 如果当前记录为停用状态，即点击后将其设置为启用状态
						channel.setStatus(1);
						message = "切换为启用状态成功！";
						opName = "启用";
					} else {
						// 如果当前记录为启用状态，即点击后将其设置为停用状态
						channel.setStatus(0);
						message = "切换为停用状态成功！";
						opName = "停用";
					}
				}
				channelService.saveOrUpdate(channel);
				//写入操作日志
				logService.saveOperationLog((User) getSession().getAttribute("user"), opName+"渠道:"+channel.getCompanyName());
				json.setSuccess(1);
				json.setObj(channel);
				json.setMsg(message);
			}
			writeJson(json);
		} catch (Exception e) {
			logger.error("修改停/启用状态异常", e);
			e.printStackTrace();
			json.setSuccess(0);
			json.setMsg("更新停/启用状态失败！");
			writeJson(json);
		}
		return null;
	}

	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getTmIds() {
		return tmIds;
	}
	public void setTmIds(String tmIds) {
		this.tmIds = tmIds;
	}
	
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public String getRoleDescription() {
		return roleDescription;
	}
	public void setRoleDescription(String roleDescription) {
		this.roleDescription = roleDescription;
	}

	public Terminal getTer() {
		return ter;
	}
	public void setTer(Terminal ter) {
		this.ter = ter;
	}

	public String getChannelNo() {
		return channelNo;
	}
	public void setChannelNo(String channelNo) {
		this.channelNo = channelNo;
	}

	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getRoleIds() {
		return roleIds;
	}

	public void setRoleIds(String roleIds) {
		this.roleIds = roleIds;
	}
	
}
