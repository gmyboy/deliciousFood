package com.app.action;

import java.util.ArrayList;
import java.util.List;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;
import com.app.bean.Grid;
import com.app.bean.Json;
import com.app.bean.PageInfoBean;
import com.app.model.Menu;
import com.app.model.Role;
import com.app.model.User;
import com.app.service.LogService;
import com.app.service.RoleService;
import com.app.service.UserService;

/**
 * 角色action
 * @author aofl
 *
 */
@Namespace("/androidManager")
@Action("roleAction")
public class RoleAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	private Logger logger = Logger.getLogger(RoleAction.class);
	
	private String roleName;
	private String roleDescription;
	private String menuNOs;
	private String userId;
	private String isDefault;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private RoleService roleService;
	
	@Autowired
	private LogService logService;

	/**
	 * 获取角色列表
	 */
	public void roleList(){
		Grid grid = new Grid();
		try{
			Role role = new Role();
			role.setRoleName(roleName);
			role.setRoleDescription(roleDescription);
			PageInfoBean pfb = new PageInfoBean(page, rows);
			pfb.setSortName(sort);
			pfb.setSortOrder(order);
			User user = (User) getSession().getAttribute("user");
			grid = roleService.roleList(role,pfb,user.getChannelNo()==null?"":user.getChannelNo());
		}catch(Exception e){
			logger.error("获取数据列表异常", e);
		}
		writeJson(grid);
	}
	
	/**
	 * 新建一角色
	 */
	public String save() {
		Json json = new Json();
		try{
			List<Role> roleList = roleService.findRoleByRoleName(roleName);
			if(null!=roleList && roleList.size()>0){
				json.setMsg("该角色名已存在，请换一个角色名");
			}else{
				Role role = new Role();
				role.setRoleName(roleName.trim());
				role.setRoleDescription(roleDescription);
				role.saveSession((User) getSession().getAttribute("user"));
				roleService.saveOrUpdate(role);
				//写入操作日志
				logService.saveOperationLog((User) getSession().getAttribute("user"), "新增角色:"+role.getRoleName());
				json.setMsg("操作成功");
				json.setSuccess(1);
			}
		}catch(Exception e){
			logger.error("操作异常", e);
			json.setMsg("操作异常");
			json.setSuccess(0);
		}
		writeJson(json);
		return null;
	}

	/**
	 * 更新一个角色.
	 */
	public String update() {
		Json json = new Json();
		try{
			Role role = roleService.getById(id);
			if(role == null){
				json.setMsg("操作失败，数据不存在或已删除");
				json.setSuccess(0);
			}else{
				role.setRoleName(roleName);
				role.setRoleDescription(roleDescription);
				role.updateSession((User) getSession().getAttribute("user"));
				roleService.saveOrUpdate(role);
				//写入操作日志
				logService.saveOperationLog((User) getSession().getAttribute("user"), "更新角色:"+role.getRoleName());
				json.setMsg("操作成功");
				json.setSuccess(1);
			}
		}catch(Exception e){
			logger.error("操作异常", e);
			json.setMsg("操作异常");
			json.setSuccess(0);
		}
		writeJson(json);
		return null;
	}
	
	
	/**
	 * 对角色分配菜单
	 */
	public void grantRoleMenu(){
		Json json = new Json();
		try{
			if(StringUtils.isNotBlank(menuNOs)){
				roleService.updateRoleMenu(id, menuNOs);
				//写入操作日志
				logService.saveOperationLog((User) getSession().getAttribute("user"), "对角色分配菜单");
				json.setMsg("操作成功");
				json.setSuccess(1);
			}else{
				json.setMsg("没有勾选菜单！");
				json.setSuccess(0);
			}
		}catch(Exception e){
			logger.error("操作异常", e);
			json.setMsg("操作异常");
			json.setSuccess(0);
		}
		writeJson(json);
	}
	
	/**
	 * 根据Id获得一个角色
	 */
	public String getById() {
		Json json = new Json();
		try {
			Role role = roleService.getById(id);
			writeJson(role);
		} catch (Exception e) {
			logger.error("操作异常", e);
			json.setMsg("操作异常");
			json.setSuccess(0);
			writeJson(json);
		}
		return null;
	}
	
	/**
	 * 删除一个角色.
	 */
	public String delete() {
		Json json = new Json();
		try {
			id=this.getRequest().getParameter("id");
			if (StringUtils.isNotBlank(id)) {
				Grid grid = userService.userRoleList(id,new PageInfoBean(1,1));
				if(null!=grid.getRows()&&grid.getRows().size()>0){
					json.setSuccess(0);
					json.setMsg("该角色存在用户,不能删除！");
					writeJson(json);
					return null;
				}
				Role role = roleService.getById(id);
				roleService.deleteRole(role);
				json.setSuccess(1);
				json.setMsg("删除成功！");
			}
		} catch (Exception e) {
			logger.error("操作异常", e);
			json.setMsg("操作异常");
			json.setSuccess(0);
		}
		writeJson(json);
		return null;
	}
	
	
	/**
	 * 获取角色对应用户列表
	 */
	public void userRoleList(){
		Grid grid = new Grid();
		try{
			grid = userService.userRoleList(id,new PageInfoBean(page,rows));
		}catch(Exception e){
			logger.error("获取数据列表异常", e);
		}
		writeJson(grid);
	}

	
	/**
	 * 获取菜单树形结构
	 */
	public void getMenuTree(){
		Grid grid = new Grid();
		try{
			List<Menu> menuList = new ArrayList<Menu>();
			User user = (User) getSession().getAttribute("user");
			//查询角色
			List<Role> roleList = roleService.findbyUserId(user.getId());
			menuList  = userService.getMenuTree(roleList);
			grid.setRows(menuList);
			grid.setTotal((long) menuList.size());
		}catch(Exception e){
			logger.error("操作异常", e);
		}
		writeJson(grid);
	}
	
	
	/**
	 * 获取菜单列表
	 */
	public void menuList(){
		Grid grid = new Grid();
		try{
			List<Menu> menuList = new ArrayList<Menu>();
			Role role = roleService.getById(id);
			List<Role> roleList = new ArrayList<Role>();
			if(null!=role){
				roleList.add(role);
			}
			menuList = userService.findMenuListByRoleList(roleList);
			grid.setRows(menuList);
			grid.setTotal((long) menuList.size());
		}catch(Exception e){
			logger.error("操作异常", e);
		}
		writeJson(grid);
	}

	/**
	 * 获取菜单列表
	 */
	public void getRoleListByUserId(){
		Grid grid = new Grid();
		try{
			List<Role> list = roleService.getRoleListByUserId(userId);
			grid.setRows(list);
			grid.setTotal((long) list.size());
		}catch(Exception e){
			logger.error("操作异常", e);
		}
		writeJson(grid);
	}

	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	public String getRoleDescription() {
		return roleDescription;
	}
	public void setRoleDescription(String roleDescription) {
		this.roleDescription = roleDescription;
	}
	public String getMenuNOs() {
		return menuNOs;
	}
	public void setMenuNOs(String menuNOs) {
		this.menuNOs = menuNOs;
	}
	public String getIsDefault() {
		return isDefault;
	}
	public void setIsDefault(String isDefault) {
		this.isDefault = isDefault;
	}
}
