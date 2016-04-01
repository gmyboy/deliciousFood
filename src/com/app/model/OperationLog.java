package com.app.model;

import java.io.Serializable;

/**
 * 用户操作日志
 * @author aofl
 *
 */
public class OperationLog extends BaseMongoEntity implements Serializable{

	private static final long serialVersionUID = 1L;
	
	/**
	 * 操作用户名称
	 */
	private String fullName;
	
	/**
	 * 操作用户账号
	 */
	private String userName;
	
	/**
	 * 操作说明
	 */
	private String opName;
	
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
	public String getOpName() {
		return opName;
	}
	public void setOpName(String opName) {
		this.opName = opName;
	}
	
}
