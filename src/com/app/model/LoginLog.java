package com.app.model;

import java.io.Serializable;

/**
 * 用户登陆日志
 * @author aofl
 *
 */
public class LoginLog extends BaseMongoEntity implements Serializable{

	private static final long serialVersionUID = 1L;
	
	/**
	 * 登录用户名称
	 */
	private String fullName;
	
	/**
	 * 登录用户账号
	 */
	private String userName;
	
	/**
	 * 登录用户ip
	 */
	private String ip;
	
	/**
	 * 登录用户ip所在地
	 */
	private String address;
	
	/**
	 * 操作类型1.登录0.注销
	 */
	private String type;
	
	public String getIp() {
		return this.ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	public String getType() {
		return this.type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
}
