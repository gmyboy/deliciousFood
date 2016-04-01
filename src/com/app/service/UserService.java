package com.app.service;

import java.util.List;
import com.app.bean.Grid;
import com.app.bean.LoginResult;
import com.app.bean.PageInfoBean;
import com.app.model.User;
import com.app.model.Role;
import com.app.model.Menu;

public interface UserService {
	
	/**
	 * 根据登录账号查询用户信息
	 * @param userName
	 * @return
	 */
	public User getUser(String userName);
	
	
	/**
	 * 根据权限查询菜单树
	 * @param loginResult
	 * @param roleList
	 */
	public List<Menu> getMenuTree(List<Role> roleList);
	
	
	/**
	 * 根据权限获取菜单列表
	 * @param roleList
	 */
	public List<Menu> findMenuListByRoleList(List<Role> roleList);
	
	
	/**
	 * 查询用户信息列表
	 * @param user
	 * @param pfb
	 * @return
	 */
	public Grid getUserList(User user,PageInfoBean pfb,String channelNo);
	
	/**
	 * 初始化超级管理员
	 */
	public void initSuperAdmin();
	
	/**
	 * 根据用户Id查询用户信息
	 * @param Id
	 * @return
	 */
	public User getById(String id);
	
	/**
	 * 保存/更新用户
	 */
	public void saveOrUpdate(User user);
	
	/**
	 * 保存用户角色关系
	 */
	public void saveUserRole(String roles,String userId);
	
	/**
	 * 删除用户信息
	 */
	public void deleteUser(String id);
	
	/**
	 * 根据角色查询用户信息列表
	 * @return
	 */
	public Grid userRoleList(String roleId,PageInfoBean pfb);
}
