package com.app.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.app.bean.Grid;
import com.app.bean.PageInfoBean;
import com.app.dao.SuperBaseDao;
import com.app.model.Menu;
import com.app.model.User;
import com.app.model.Role;
import com.app.model.UserRole;
import com.app.service.UserService;
import com.app.bean.ConstantValue;
import com.app.service.RoleService;
import com.app.util.BeanUtils;

@Service
public class UserServiceImpl implements UserService{
	
	private Logger logger = Logger.getLogger(getClass());

	@Autowired
	private SuperBaseDao superBaseDao;
	
	@Autowired
	private SuperBaseDao<User> userDao;
	
	@Autowired
	private SuperBaseDao<Role> roleDao;
	
	@Autowired
	private RoleService roleService;
	
	@Override
	public User getUser(String userName) {
		return (User) superBaseDao.getByHql("from User where userName='"+userName+"'");
	}
	
	
	@Override
	public Grid getUserList(User user, PageInfoBean pfb,String channelNo) {
		Grid grid = new Grid();
		String hql = "from User u";
//		,UserRole ur,Role r where u.id = ur.userId and r.id = ur.roleId
		String countHql = "select count(1) from User u";
//		,UserRole ur,Role r where u.id = ur.userId and r.id = ur.roleId
		Map<String,Object> params = new HashMap<String,Object>();
		
		String whereHql = " where 1=1 ";
		
		//渠道号
		if(StringUtils.isNotBlank(channelNo)&&!channelNo.equals("0")){
			whereHql += " and u.channelNo =:channelNo";
			params.put("channelNo",channelNo);
		}
		
		//排序
		String orderhql = "";
		if(StringUtils.isNotBlank(pfb.getSortName())&&StringUtils.isNotBlank(pfb.getSortOrder())){
			orderhql += " order by u."+pfb.getSortName()+" "+pfb.getSortOrder();
		}
		
		whereHql+=" and u.id <> '0'";
		
		List<User> list = superBaseDao.find(hql+whereHql+orderhql,params,pfb.getPage(),pfb.getRows());
		Long total = superBaseDao.count(countHql+whereHql+orderhql,params);
		
		List<User> listNew = new ArrayList<User>();
		
		for (int i = 0; i < list.size(); i++) {
			User u=list.get(i);
			String hqlstr="select r from User u,UserRole ur,Role r where u.id=ur.userId and ur.roleId=r.id and u.id='"+u.getId()+"'";
			Role r=(Role) superBaseDao.getByHql(hqlstr);
			u.setRoleName(null==r?null:r.getRoleName());
			listNew.add(u);
		}
				
//		for(Object[] objs:list){
//			User u = new User();
//			for(int i=0;i<objs.length;i++){
//				Object obj = objs[i];
//				if(obj instanceof User){
//					u = (User) obj;
//				}
//				if(obj instanceof Role){
//					Role r = (Role) obj;
//					u.setRoleName(r.getRoleName());
//				}
//			}
//			listNew.add(u);
//		}
		
		grid.setRows(listNew);
		grid.setTotal(total);
		return grid;
	}

	

	/**
	 * 获取菜单树
	 */
	@Override
	public List<Menu> getMenuTree(List<Role> roleList) {
		List<Menu> menuTree = new ArrayList<Menu>();
		
		String roleIds = "";
		for (int i = 0; i < roleList.size(); i++) {
			roleIds = roleIds + "'" + roleList.get(i).getId() + "'";
			if (i != roleList.size() - 1) {
				roleIds += ",";
			}
		}
		//取得一级菜单
		String hql = "select t from Menu t ,RoleMenu rm where t.menuNO = rm.menuNO and t.visable = 1 and rm.roleId in ("
				+ roleIds
				+ ") "
				+ " and t.parentMenuNO = 0 order by t.seqNum asc";
		List<Menu> list = superBaseDao.find(hql);

		
		//得到所有有权限的菜单
		String hqlAll = "select t from Menu t,RoleMenu rm where t.menuNO = rm.menuNO and t.visable = 1 and rm.roleId in ("
				+ roleIds
				+ ")  order by t.seqNum asc";
		List<Menu> listAll = superBaseDao.find(hqlAll);
		
		for(Menu obj:list){
			Menu menu = new Menu();
			BeanUtils.copyNotNullProperties(obj, menu);
			recursionMenu(menu,menu.getMenuNO(),listAll);
			menu.deleteBaseInfo();
			menu.removeInfo();
			menuTree.add(menu);
		}
		return menuTree;
	}
	
	/**
	 * 递归计算菜单
	 * @param curMenu
	 * @param parentMenuNo
	 * @param allList
	 */
	public void recursionMenu(Menu curMenu,Integer parentMenuNo,List<Menu> allList){
		List<Menu> menus = new ArrayList<>();
		for(Menu obj : allList){
			Menu childrenMenu = new Menu();
			BeanUtils.copyNotNullProperties(obj, childrenMenu);
			if(parentMenuNo.equals(childrenMenu.getParentMenuNO())){
				childrenMenu.deleteBaseInfo();
				childrenMenu.removeInfo();
				menus.add(childrenMenu);
				recursionMenu(childrenMenu,childrenMenu.getMenuNO(),allList);
			}
		}
		curMenu.setChildren(menus);
	}
	
	@Override
	public void initSuperAdmin() {
		logger.info("初始化超级管理员-开始");
		try {
			String userId = ConstantValue.SUPER_USER_ID;
			User user = userDao.getById(User.class, userId);
			if(user == null){
				user = new User();
				user.setId(userId);
				user.setUserName("superadmin");
				user.setPassword(ConstantValue.SUPER_PASSWORD);
				user.setFullName("超级管理员");
				user.setStatus(1);
				user.setCreater("SYS");
				user.setCreateTime(new Date());
				user.setLastUpdater("SYS");
				user.setLastUpdateTime(new Date());
				user.setChannelNo(ConstantValue.SUPER_ChANNEL_NO);
				userDao.save(user);
			}
			
			String roleId = ConstantValue.SUPER_ROLE_ID;
			Role role = roleDao.getById(Role.class, roleId);
			if(role == null){
				role = new Role();
				role.setId(roleId);
				role.setChannelNo(ConstantValue.SUPER_ChANNEL_NO);
				role.setRoleName("超级管理员");
				role.setRoleDescription("系统默认的超级管理员，具备所有权限。");
				role.setStatus(1);
				role.setCreater("SYS");
				role.setCreateTime(new Date());
				role.setLastUpdater("SYS");
				role.setLastUpdateTime(new Date());
				role.setIsDefault(1);
				roleDao.save(role);
			}
			
			//分配超级管理员角色
			roleService.updateUserRole(userId, roleId);
			
			//对超级管理授于全部权限
			String hql = "from Menu t where 1=1";
			List<Menu> menuList = superBaseDao.find(hql);
			
			StringBuffer menuNOs = new StringBuffer();
			for(Menu menu : menuList){
				menuNOs.append(menu.getMenuNO()+",");
			}
			roleService.updateRoleMenu(roleId,menuNOs.toString());
			logger.info("初始化超级管理员-成功");
		} catch (Exception e) {
			logger.error("初始化超级管理员-失败",e);
			e.printStackTrace();
		}
	}



	@Override
	public List<Menu> findMenuListByRoleList(List<Role> roleList) {
		String roleIds = "";
		for (int i = 0; i < roleList.size(); i++) {
			roleIds = roleIds + "'" + roleList.get(i).getId() + "'";
			if (i != roleList.size() - 1) {
				roleIds += ",";
			}
		}
		//得到所有有权限的菜单
		String hqlAll = "select t from Menu t,RoleMenu rm where t.menuNO = rm.menuNO and t.visable = 1 and rm.roleId in ("
				+ roleIds
				+ ")  order by t.seqNum asc";
		List<Menu> listAll = superBaseDao.find(hqlAll);
		for(Menu menu:listAll){
			menu.deleteBaseInfo();
			menu.removeInfo();
			menu.setChildren(null);
		}
		return listAll;
	}


	@Override
	public User getById(String id) {
		return userDao.getById(User.class, id);
	}


	@Override
	public void saveOrUpdate(User user) {
		userDao.saveOrUpdate(user);
	}

	@Override
	public void deleteUser(String id) {
		User user = userDao.getById(User.class, id);
		userDao.delete(user);
	}


	@Override
	public Grid userRoleList(String roleId,PageInfoBean pfb) {
		Grid grid = new Grid();
		String hql = "select u from User u,UserRole ur where u.id = ur.userId and ur.roleId =:roleId";
		String countHql = "select count(1) from User u,UserRole ur where u.id = ur.userId and ur.roleId =:roleId";
		Map<String,Object> params = new HashMap<String,Object>();
		params.put("roleId",roleId);
		List<User> list = superBaseDao.find(hql, params,pfb.getPage(),pfb.getRows());
		Long total = superBaseDao.count(countHql, params);
		grid.setRows(list);
		grid.setTotal(total);
		return grid;
	}


	@Override
	public void saveUserRole(String roles, String userId) {
		//删除用户对应角色
		String deleteHql = "delete from UserRole where userId = '"+userId+"'";
		superBaseDao.executeHql(deleteHql);
		//保存用户角色关系
		String[] roleId = roles.split(",");
		for(int i=0;i<roleId.length;i++){
			UserRole ur = new UserRole();
			ur.setUserId(userId);
			ur.setRoleId(roleId[i]);
			superBaseDao.save(ur);
		}
	}
}
