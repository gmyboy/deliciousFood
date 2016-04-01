package com.app.service;

import java.util.List;
import com.app.model.Role;
import com.app.model.User;
import com.app.bean.Grid;
import com.app.bean.Json;
import com.app.bean.PageInfoBean;

public interface RoleService {

	/**
	 * 保存角色
	 * @param role
	 */
	public void saveOrUpdate(Role role);
	
	/**
	 * 根据ID查询角色信息
	 */
	public Role getById(String id);
	
	/**
	 * 删除角色
	 */
	public void deleteRole(Role role);
	
	/**
	 * 根据条件查询角色列表
	 * @return
	 */
	public Grid roleList(Role role,PageInfoBean pfb,String channelNo);
	
	/**
	 * 根据角色名称查询角色列表
	 */
	public List<Role> findRoleByRoleName(String roleName);
	
	/**
	 * 根据用户Id得到对应角色
	 * @param userId
	 * @return
	 */
	public List<Role> findbyUserId(String userId);

	/**
	 * 修改用户角色对应关系
	 * @param userId
	 * @param roleIds
	 * @return
	 */
	public Json updateUserRole(String userId, String roleIds);
	
	
	/**
	 * 更新角色菜单对应关系
	 * @param roleId
	 * @param menuNOs
	 * @return
	 */
	public Json updateRoleMenu(String roleId,String menuNOs);
	
	/**
	 * 获取用户对应角色列表
	 * @param userId
	 * @return
	 */
	public List<Role> getRoleListByUserId(String userId);
}
