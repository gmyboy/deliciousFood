package com.app.action;

import java.io.File;
import java.util.Date;

import org.apache.log4j.Logger;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;
import com.app.bean.Grid;
import com.app.bean.Json;
import com.app.bean.PageInfoBean;
import com.app.model.User;
import com.app.service.LogService;
import com.app.service.UserService;
import com.app.util.FileTool;

/**
 * 用户
 * @author aofl
 *
 */
@Namespace("/androidManager")
@Action("/userAction")
@Results({@Result(name = "success", location = "/success.jsp"),
		@Result(name = "error", location = "/login.jsp"),
		@Result(name = "index", location = "/index.jsp")})
public class UserAction extends BaseAction{
	
	private static final long serialVersionUID = 1L;
	
	private Logger logger = Logger.getLogger(UserAction.class);
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private LogService logService;
		
    private String userName;
    private String password;
    private String fullName;
    private File headImage;
	private String roleIds;
	
	private String oldPwd;
	private String newPwd;
	private User user;

	/**
	 * 查询用户信息列表
	 * @return
	 */
	public String userList(){
		Grid grid = new Grid();
		try {
			PageInfoBean pfb = new PageInfoBean(page,rows);
			pfb.setSortName(sort);
			pfb.setSortOrder(order);
			User userCur = (User) getSession().getAttribute("user");
			grid = userService.getUserList(user==null?new User():user, pfb,userCur.getChannelNo()==null?"":userCur.getChannelNo());
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("查询用户列表失败",e);
		}
		writeJson(grid);
		return null;
	}
	
	/**
	 * 根据Id查询用户信息
	 * @return
	 */
	public String getById(){
		Json json = new Json();
		try {
			User user = userService.getById(id);
			json.setSuccess(1);
			json.setObj(user);
			json.setMsg("操作成功！");
			writeJson(user);
		} catch (Exception e) {
			e.printStackTrace();
			json.setSuccess(0);
			json.setMsg("查询用户信息失败！");
			writeJson(json);
		}
		return null;
	}
	
	/**
	 * 新增用户信息
	 * @return
	 */
	public String add(){
		Json json = new Json();
		try {
			User user = new User();
			user.setUserName(userName);
			user.setFullName(fullName);
			user.setPassword(password);
			user.saveSession((User) getSession().getAttribute("user"));
			userService.saveOrUpdate(user);
			userService.saveUserRole(roleIds, user.getId());
			//写入操作日志
			logService.saveOperationLog((User) getSession().getAttribute("user"), "新增用户:"+user.getUserName());
			json.setSuccess(1);
			json.setObj(user);
			json.setMsg("操作成功！");
			writeJson(json);
		} catch (Exception e) {
			e.printStackTrace();
			json.setSuccess(0);
			json.setMsg("保存用户信息失败！");
			writeJson(json);
		}
		return null;
	}
	
	/**
	 * 更新用户信息
	 * @return
	 */
	public String update(){
		Json json = new Json();
		try {
			User user = userService.getById(id);
			if(user == null){
				json.setMsg("操作失败，数据不存在或已删除！");
				json.setSuccess(0);
			}else{
				//存储头像
				if(headImage!=null){
//					String diskPath=PropertiesUtils.getProperties().getProperty("diskPath");
//					String headPath=PropertiesUtils.getProperties().getProperty("uploadPath");
//					String imageUrl=PropertiesUtils.getProperties().getProperty("imageFolder");
					String  headPicName=new Date().getTime()+".jpg";
					String  diskHeadUpload="";
					String  HeadUpload= "";
					String  headUploadUrl = diskHeadUpload+headPicName;//上传的路径
					FileTool.newFolder(diskHeadUpload);
					FileTool.uploadFileToLocale(headImage, headUploadUrl);
					user.setHeadImageUrl(HeadUpload);
				}
				user.setFullName(fullName);
				if(null != password) {
					user.setPassword(password);
				}
				user.updateSession((User) getSession().getAttribute("user"));
				userService.saveOrUpdate(user);
				userService.saveUserRole(roleIds, user.getId());
				//写入操作日志
				logService.saveOperationLog((User) getSession().getAttribute("user"), "更新用户:"+user.getUserName());
				json.setSuccess(1);
				json.setObj(user);
				json.setMsg("操作成功！");
			}
			writeJson(json);
		} catch (Exception e) {
			e.printStackTrace();
			json.setSuccess(0);
			json.setMsg("更新用户信息失败！");
			writeJson(json);
		}
		return null;
	}

	
	/**
	 * 删除用户信息
	 * @return
	 */
	public String delete(){
		Json json = new Json();
		try {
			userService.deleteUser(id);
			json.setSuccess(1);
			json.setMsg("删除成功！");
			writeJson(json);
		} catch (Exception e) {
			e.printStackTrace();
			json.setSuccess(0);
			json.setMsg("删除失败！");
			writeJson(json);
		}
		return null;
	}
	
	/**
	 * 修改密码
	 * @return
	 */
	public String dnss_updatePwd(){
		Json json = new Json();
		try {
			User curUser = (User) getSession().getAttribute("user");
			User user = userService.getUser(curUser.getUserName());
			if(user.getPassword().equals(oldPwd)){
				user.setPassword(newPwd);
				userService.saveOrUpdate(user);
				json.setSuccess(1);
				json.setMsg("修改密码成功！");
			}else{
				json.setSuccess(0);
				json.setMsg("原密码错误！");
			}
			writeJson(json);
		} catch (Exception e) {
			e.printStackTrace();
			json.setSuccess(0);
			json.setMsg("修改密码失败,请联系系统管理员！");
			writeJson(json);
		}
		return null;
	}
	
	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public File getHeadImage() {
		return headImage;
	}

	public void setHeadImage(File headImage) {
		this.headImage = headImage;
	}

	public String getRoleIds() {
		return roleIds;
	}

	public void setRoleIds(String roleIds) {
		this.roleIds = roleIds;
	}

	public String getOldPwd() {
		return oldPwd;
	}

	public void setOldPwd(String oldPwd) {
		this.oldPwd = oldPwd;
	}

	public String getNewPwd() {
		return newPwd;
	}

	public void setNewPwd(String newPwd) {
		this.newPwd = newPwd;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
}
