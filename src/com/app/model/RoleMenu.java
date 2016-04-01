package com.app.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;


/**
 * 角色对应菜单
 * @author aofl
 *
 */
@Entity
@Table(name="t_app_role_menu")
public class RoleMenu extends BaseEntity {
	
	private static final long serialVersionUID = 1L;

	/**
	 * 菜单编号
	 */
	private Integer menuNO;
	
	private String roleId;

	@Column(name = "menu_no")
	public Integer getMenuNO() {
		return menuNO;
	}

	public void setMenuNO(Integer menuNO) {
		this.menuNO = menuNO;
	}

	@Column(name = "role_id",length = 50)
	public String getRoleId() {
		return roleId;
	}

	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}
}
