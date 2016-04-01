package com.app.bean;

import java.util.List;

import com.app.model.Menu;
import com.app.model.User;

/**
 * 登录接口返回结果
 * @Title: LoginResult.java 
 * @Package cn.inovance.iotas.common.other 
 * @Description: 
 * @author fb2112  
 * @date 2015-3-9 上午11:21:17 
 * @version V1.0
 */
public class LoginResult implements java.io.Serializable {

	/**
	 * session id
	 */
	private String sid;

	private User user;
		
	private List<Menu> menuTree;
	
	private List<Menu> menuList;
			
	private String resourcePath;
	/**用户自定义路径*/
	private String  customResourcePath;
	
	public String getSid() {
		return sid;
	}

	public void setSid(String sid) {
		this.sid = sid;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<Menu> getMenuTree() {
		return menuTree;
	}

	public void setMenuTree(List<Menu> menuTree) {
		this.menuTree = menuTree;
	}

	public List<Menu> getMenuList() {
		return menuList;
	}

	public void setMenuList(List<Menu> menuList) {
		this.menuList = menuList;
	}

	public String getResourcePath() {
		return resourcePath;
	}

	public void setResourcePath(String resourcePath) {
		this.resourcePath = resourcePath;
	}

	public String getCustomResourcePath() {
		return customResourcePath;
	}

	public void setCustomResourcePath(String customResourcePath) {
		this.customResourcePath = customResourcePath;
	}

	
	
	

}
