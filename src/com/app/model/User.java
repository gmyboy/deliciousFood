package com.app.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * 用户信息
 * @author aofl
 *
 */
@Entity
@Table(name="t_app_user")
public class User extends BaseEntity {

	//登陆账号
	private String userName;
	
	//密码
	private String password;
	
	//员工名称
	private String fullName;
	
	//角色名称
	private String roleName;
	
	//用户头像地址
	private String  headImageUrl;
		
	@Column(name = "user_name",length=100)
	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	@Column(name = "password",length=100)
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Column(name = "full_name",length=100)
	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	@Transient
	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	@Column(name = "head_image_url",length=500)
	public String getHeadImageUrl() {
		return headImageUrl;
	}

	public void setHeadImageUrl(String headImageUrl) {
		this.headImageUrl = headImageUrl;
	}
}
