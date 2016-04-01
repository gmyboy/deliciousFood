package com.app.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "t_app_user_role", schema = "")
public class UserRole extends BaseEntity {

	private static final long serialVersionUID = 1L;
	
	/**
	 * 用户id
	 */
	private String userId;
	
	/**
	 * 角色id
	 */
	private String roleId;
	

	@Column(name = "user_id", length = 36)
	public String getUserId() {
		return userId;
	}


	public void setUserId(String userId) {
		this.userId = userId;
	}

	@Column(name = "role_id", length = 36)
	public String getRoleId() {
		return roleId;
	}


	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}
	
}
