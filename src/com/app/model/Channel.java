package com.app.model;


import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * 渠道管理
 * 
 * @author aofl
 * 
 */
@Entity
@Table(name = "t_app_channel_info")
public class Channel extends BaseEntity {

	// 地址
	private String address;

	// 电话
	private String phone;

	// 联系人
	private String contact;
	
	private String userId;
	
	private String roleId;
	
	private List<Terminal> tmList;
	
	private User user;
	
	private Role role;
	
	private String queryId;
		
	private Query query;

	@Column(name = "address", length = 200)
	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	@Column(name = "phone", length = 20)
	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	@Column(name = "contact", length = 100)
	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}
	
	@Column(name = "user_id", length = 32)
	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	@Column(name = "role_id", length = 32)
	public String getRoleId() {
		return roleId;
	}

	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}

	@Transient
	public List<Terminal> getTmList() {
		return tmList;
	}

	public void setTmList(List<Terminal> tmList) {
		this.tmList = tmList;
	}
	
	@Transient
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	@Transient
	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	@Transient
	public Query getQuery() {
		return query;
	}

	public void setQuery(Query query) {
		this.query = query;
	}

	@Column(name = "query_id", length = 32)
	public String getQueryId() {
		return queryId;
	}

	public void setQueryId(String queryId) {
		this.queryId = queryId;
	}
}
