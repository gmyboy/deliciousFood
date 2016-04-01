package com.app.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * 角色信息
 * @author aofl
 *
 */
@Entity
@Table(name="t_app_role")
public class Role extends BaseEntity{

	//角色名称
	private String roleName;
	
	//角色描述
	private String roleDescription;
	
	//角色对应用户数量
	private Integer roleAcountCount;
	
	//是否默认超级管理员
	private Integer isDefault;
	
	@Column(name = "role_name",length=100)
	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	@Column(name = "role_description",length=500)
	public String getRoleDescription() {
		return roleDescription;
	}

	public void setRoleDescription(String roleDescription) {
		this.roleDescription = roleDescription;
	}

	@Transient
	public Integer getRoleAcountCount() {
		return roleAcountCount;
	}

	public void setRoleAcountCount(Integer roleAcountCount) {
		this.roleAcountCount = roleAcountCount;
	}
	@Column(name = "is_default")
	public Integer getIsDefault() {
		return isDefault;
	}

	public void setIsDefault(Integer isDefault) {
		this.isDefault = isDefault;
	}
	
	
}
