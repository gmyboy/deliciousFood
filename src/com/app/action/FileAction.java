package com.app.action;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;
import com.app.bean.Json;
import com.app.bean.LoginResult;
import com.app.model.LoginLog;
import com.app.model.Menu;
import com.app.model.Role;
import com.app.model.Upgrade;
import com.app.model.User;
import com.app.service.FileService;
import com.app.service.LogService;
import com.app.service.UserService;
import com.app.service.RoleService;
import com.app.util.DateUtil;
import com.app.util.FileTool;
import com.app.util.MD5Util;
import com.app.util.PropertiesUtils;
/**
 * 文件
 * @author l2045
 *
 */
@Namespace("/androidManager")
@Action("/fileAction")
public class FileAction extends BaseAction {
	
	private Logger logger = Logger.getLogger(FileAction.class);

	private static final long serialVersionUID = 1L;

	@Autowired
	private FileService fileService;
	
	@Autowired
	private LogService logService;
	
	private String name;
	private String password;
	
	// android文件
	private File androidfile;
	// android文件名称
	private String androidfileFileName;

	public String uploadImg(){
		Json json = new Json();
		Upgrade upgrade = new Upgrade();
		// 磁盘根目录
		String diskPath = PropertiesUtils.getProperties().getProperty("diskPath");
		// 外网访问地址
		String extranetDomain = PropertiesUtils.getProperties().getProperty("extranet_domain");
		// 文件存放路径
		String path = "/" + DateUtil.dateToString(new Date(), "yyyy") + "/" + DateUtil.dateToString(new Date(), "MM") + '/' + DateUtil.dateToString(new Date(), "dd") + "/";
		try {
			// 如果文件夹不存在则创建
			FileTool.newFolder(diskPath + path);
			
			FileTool.uploadFileToLocale(androidfile, diskPath + path + androidfileFileName);
			String message = "";
			if (0 == 0) {
				message = "暂存成功！";
			} else {
				message = "提交审核成功！";
			}
			json.setSuccess(1);
			json.setMsg(message);
			writeJson(json);
		} catch (Exception e) {
			logger.error("保存广告失败", e);
			e.printStackTrace();
			json.setSuccess(0);
			json.setMsg("保存广告内容失败！");
			writeJson(json);
		}
		return null;
		
		/*Json json = new Json();
		try {
			json.setSuccess(1);
			json.setMsg("文件上传成功！");
		} catch (Exception e) {
			e.printStackTrace();
			json.setSuccess(0);
			json.setMsg("文件上传异常");
			writeJson(json);
		}
		writeJson(json);
		return null;*/
	}

	/**
	 * 登出
	 * 
	 * @return
	 */
	public String logout(){
		Json json = new Json();
		try {
			json.setSuccess(1);
			json.setMsg("登出成功！" + name + password);
		} catch (Exception e) {
			e.printStackTrace();
			json.setSuccess(0);
			json.setMsg("登出异常");
			writeJson(json);
		}
		writeJson(json);
		return null;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public File getAndroidfile() {
		return androidfile;
	}

	public void setAndroidfile(File androidfile) {
		this.androidfile = androidfile;
	}

	public String getAndroidfileFileName() {
		return androidfileFileName;
	}

	public void setAndroidfileFileName(String androidfileFileName) {
		this.androidfileFileName = androidfileFileName;
	}
	
	
}
