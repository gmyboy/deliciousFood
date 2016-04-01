package com.app.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.app.dao.SuperBaseDao;
import com.app.model.Role;
import com.app.service.RoleService;
import com.app.bean.Grid;
import com.app.bean.Json;
import com.app.bean.PageInfoBean;
import com.app.model.User;
import com.app.model.UserRole;
import com.app.model.RoleMenu;

@Service
public class RoleServiceImpl implements RoleService{
	
	@Autowired
	private SuperBaseDao superBaseDao;
	
	@Autowired
	private SuperBaseDao<Role> roleDao;

	@Override
	public List<Role> findbyUserId(String userId) {
		
		List<Role> roleList = new ArrayList<Role>();
		String hql = "from Role r,UserRole t where r.id=t.roleId and t.userId =:userId";
		Map<String,Object> params = new HashMap<String,Object>();
		params.put("userId", userId);
		List<Object[]> list = superBaseDao.find(hql, params);
		for(Object[] objects : list){
			for(Object obj:objects){
				if(obj instanceof Role){
					Role role = (Role)obj;
					roleList.add(role);
				}
			}
		}
		return roleList;
	}
	
	/**
	 * 修改用户角色
	 */
	@Override
	public Json updateUserRole(String userId, String roleIds) {
		Json json = new Json();
		//删除以前的角色
		String hql = "delete from UserRole t where t.userId =:userId";
		Map<String,Object> params = new HashMap<String,Object>();
		params.put("userId", userId);
		superBaseDao.executeHql(hql,params);
		
		//添加新的角色
		if(StringUtils.isNotBlank(roleIds)) {
			String[] roleIdList = roleIds.split(",");
			for(String roleId:roleIdList){
				UserRole userRole = new UserRole();
				userRole.setUserId(userId);
				userRole.setRoleId(roleId);
				userRole.setStatus(1);
				userRole.setCreater("SYS");
				userRole.setCreateTime(new Date());
				userRole.setLastUpdateTime(new Date());
				superBaseDao.save(userRole);
			}
		}
		json.setSuccess(1);
		json.setMsg("操作成功");
		return json;
	}
	
	
	/**
	 * 对角色分配菜单
	 * @param userId
	 * @param roleId
	 * @return
	 */
	@Override
	public Json updateRoleMenu(String roleId,String menuNOs) {
		
		Json json = new Json();
		menuNOs = menuNOs.replaceAll("\r\n", "");
		String[] menuNOList = menuNOs.split(",");
		
		//找出原有的对应关系
		String hql = "from RoleMenu t where t.roleId =:roleId";
		Map<String,Object> params = new HashMap<String,Object>();
		params.put("roleId", roleId);
		List<RoleMenu> roleMenuList = superBaseDao.find(hql, params);

		if(roleMenuList == null || roleMenuList.size() == 0){
			for(String menuNO:menuNOList){
				RoleMenu roleMenu = new RoleMenu();
				roleMenu.setRoleId(roleId);
				roleMenu.setMenuNO(Integer.parseInt(menuNO));
				roleMenu.setStatus(1);
				roleMenu.setCreater("SYS");
				roleMenu.setCreateTime(new Date());
				roleMenu.setLastUpdater("SYS");
				roleMenu.setLastUpdateTime(new Date());
				superBaseDao.save(roleMenu);
			}
		}else{
			//找出新添加的关系
			for(String menuNO:menuNOList){
				boolean flag = true;
				for(RoleMenu roleMenu : roleMenuList){
					if(Integer.parseInt(menuNO) == roleMenu.getMenuNO()){
						flag = true;
						break;
					}else{
						flag = false;
					}
				}
				if(flag == false){
					RoleMenu roleMenu = new RoleMenu();
					roleMenu.setRoleId(roleId);
					roleMenu.setMenuNO(Integer.parseInt(menuNO));
					roleMenu.setStatus(1);
					roleMenu.setCreater("SYS");
					roleMenu.setCreateTime(new Date());
					roleMenu.setLastUpdater("SYS");
					roleMenu.setLastUpdateTime(new Date());
					superBaseDao.save(roleMenu);
				}
			}
			
			//找出被取消的关系
			for(RoleMenu roleMenu : roleMenuList){
				boolean flag = true;
				for(String menuNO:menuNOList){
					if(Integer.parseInt(menuNO) == roleMenu.getMenuNO()){
						flag = true;
						break;
					}else{
						flag = false;
					}
				}
				if(flag == false){
					superBaseDao.delete(roleMenu);
				}
			}
		}
		json.setSuccess(1);
		json.setMsg("操作成功");
		return json;
	}



	@Override
	public Grid roleList(Role role, PageInfoBean pfb,String getChannelNo) {
		Grid grid = new Grid();
		
		String hql = "from Role r";
		String countHql = "select count(1) from Role r";
		Map<String,Object> params = new HashMap<String,Object>();
		
		String whereHql = " where 1=1";
		
		//渠道号
		if(StringUtils.isNotBlank(getChannelNo)&&!getChannelNo.equals("0")){
			whereHql += " and r.getChannelNo =:getChannelNo";
			params.put("getChannelNo",getChannelNo);
		}

		//角色名称过滤
		String roleName = role.getRoleName();
		if(StringUtils.isNotBlank(roleName)){
			whereHql += " and r.roleName like :roleName";
			params.put("roleName","%"+roleName+"%");
		}
		//角色描述过滤
		String roleDescription = role.getRoleDescription();
		if(StringUtils.isNotBlank(roleDescription)){
			whereHql += " and r.roleDescription like :roleDescription";
			params.put("roleDescription","%"+roleDescription+"%");
		}
		
		whereHql += " and r.isDefault is null";
		
		String orderhql = "";
		if(StringUtils.isNotBlank(pfb.getSortName())&&StringUtils.isNotBlank(pfb.getSortOrder())){
			orderhql += " order by r."+pfb.getSortName()+" "+pfb.getSortOrder();
		}
		
		List<Role> list = superBaseDao.find(hql+whereHql+orderhql,params,pfb.getPage(),pfb.getRows());
		Long total = superBaseDao.count(countHql+whereHql+orderhql,params);
		
		List<Role> listNew=new ArrayList<Role>();
		
		for (int i = 0; i < list.size(); i++) {
			Role r=list.get(i);
			String hqlstr="select count(1) from UserRole ur where ur.roleId='"+r.getId()+"'";
			Long count=superBaseDao.count(hqlstr);
			r.setRoleAcountCount(Integer.valueOf(count.toString()));
			listNew.add(r);
		}
		
		grid.setRows(listNew);
		grid.setTotal(total);
		return grid;
	}
	
	@Override
	public List<Role> findRoleByRoleName(String roleName) {
		String hql=" from Role r where r.roleName =:roleName";
		Map<String,Object> params = new HashMap<String,Object>();
		params.put("roleName", roleName);
		return superBaseDao.find(hql, params);
	}

	@Override
	public void saveOrUpdate(Role role) {
		roleDao.saveOrUpdate(role);
	}

	@Override
	public Role getById(String id) {
		return (Role) roleDao.getById(Role.class, id);
	}

	@Override
	public void deleteRole(Role role) {
		roleDao.delete(role);
	}

	@Override
	public List<Role> getRoleListByUserId(String userId) {
		String hql = "select r from Role r,UserRole ur where r.id = ur.roleId and ur.userId =:userId";
		Map<String,Object> params = new HashMap<String,Object>();
		params.put("userId", userId);
		return superBaseDao.find(hql, params);
	}
}
