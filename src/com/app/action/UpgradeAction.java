package com.app.action;

import java.io.File;
import java.util.Date;
import java.util.UUID;

import org.apache.log4j.Logger;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;

import com.app.bean.Grid;
import com.app.bean.Json;
import com.app.bean.PageInfoBean;
import com.app.model.Upgrade;
import com.app.model.User;
import com.app.service.UpgradeService;
import com.app.util.DateUtil;
import com.app.util.FileTool;
import com.app.util.MD5Util;
import com.app.util.PropertiesUtils;

/**
 * 广告内容
 * 
 * @author aofl
 * 
 */
@Namespace("/")
@Action("/upgrade")
public class UpgradeAction extends BaseAction {

	private static final long serialVersionUID = 1L;

	private Logger logger = Logger.getLogger(UpgradeAction.class);

	@Autowired
	private UpgradeService upgradeService;
	private Upgrade upgrade;
	// 型号
	private String model;
	// 商家
	private String merchants;
	// 版本号
	private String version;
	// 发布时间
	private Date releaseDate;
	// android文件
	private File androidfile;
	// android文件名称
	private String androidfileFileName;
	// android版本号
	private String androidVersion;
	// 升级标题
	private String title;
	// 升级内容
	private String content;
	// 审批人
	private String approver;
	// 审批意见
	private String approveContent;
	// 审批时间
	private Date approveTime;
	// 状态
	private int status;
	// utc
	private String utc;
	//升级模式(0：增加升级，1：完整升级)
	private Integer mode;
	//增加升级基本版本号
	private String increaseVersion;

	/**
	 * 查询软件升级包列表
	 * 
	 * @return
	 */
	public String upgradeList() {
		Grid grid = new Grid();
		try {
			PageInfoBean pfb = new PageInfoBean(page, rows);
			sortName = getRequest().getParameter("sortName");
			pfb.setSortName(sort);
			pfb.setSortOrder(order);
			if (null == upgrade) {
				upgrade = new Upgrade();
			}
			User user = (User) getSession().getAttribute("user");
			grid = upgradeService.upgradeList(upgrade, pfb, user.getChannelNo() == null ? "" : user.getChannelNo());
		} catch (Exception e) {
			e.printStackTrace();
		}
		writeJson(grid);
		return null;
	}

	/**
	 * 保存软件包内容
	 * 
	 * @return
	 */
	public String save() {
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
			// app
			upgrade.setAndroidVersion(androidVersion);// android版本号
			upgrade.setApprover(approver);// 审批人
			upgrade.setApproveContent(approveContent);// 审批意见
			upgrade.setApproveTime(approveTime);// 审批时间
			upgrade.setContent(content);// 升级内容
			upgrade.setTitle(title);// 升级标题
			upgrade.setMerchants(merchants);// 商家名称
			upgrade.setModel(model);// 类型
			upgrade.setVersion(version);// app版本号
			upgrade.setReleaseDate(releaseDate);// 发布时间
			upgrade.setMode(mode);//升级模式
			if(mode==0){
				upgrade.setIncreaseVersion(increaseVersion);
			}else{
				upgrade.setIncreaseVersion(null);
			}
			String appName = UUID.randomUUID().toString().replace("-", "") + androidfileFileName.substring(androidfileFileName.lastIndexOf("."), androidfileFileName.length());
			FileTool.uploadFileToLocale(androidfile, diskPath + path + appName);
			upgrade.setFileName(androidfileFileName);// android包名
			upgrade.setFileType(androidfileFileName.substring(androidfileFileName.lastIndexOf("."), androidfileFileName.length()));// 文件类型
			upgrade.setFilePath(path + appName);// 图片路径
			upgrade.setFileUrl(extranetDomain + "/androidManager/appInterface!dnss_download.do?upgradeId=" + upgrade.getId());// 文件路径
			// 生成文件MD5值
			String fileMd5 = MD5Util.md5(androidfile).toUpperCase();
			upgrade.setFileSize(androidfile.length()+"");
			upgrade.setMd5(fileMd5);
			upgrade.setStatus(status);
			upgrade.setUtc(utc);
			upgrade.setUtcNew(DateUtil.getDateUtc(utc));
			upgrade.saveSession((User) getSession().getAttribute("user"));
			upgradeService.save(upgrade);
			String message = "";
			if (status == 0) {
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
	}

	/**
	 * 更新广告内容
	 */
	public String update() {
		Json json = new Json();
		try {
			Upgrade upgrade = upgradeService.getById(id);
			// 磁盘根目录
			String diskPath = PropertiesUtils.getProperties().getProperty("diskPath");
			// 外网访问地址
			String extranetDomain = PropertiesUtils.getProperties().getProperty("extranet_domain") + "/upload";
			// 文件存放路径
			String path = "/" + DateUtil.dateToString(new Date(), "yyyy") + "/" + DateUtil.dateToString(new Date(), "MM") + '/' + DateUtil.dateToString(new Date(), "dd") + "/";

			FileTool.newFolder(diskPath + path);
			// app
			if (null != androidfile) {
				String appName = UUID.randomUUID().toString().replace("-", "") + androidfileFileName.substring(androidfileFileName.lastIndexOf("."), androidfileFileName.length());
				// 保存app文件
				FileTool.uploadFileToLocale(androidfile, diskPath + path + appName);
				upgrade.setFileType(androidfileFileName.substring(androidfileFileName.lastIndexOf("."), androidfileFileName.length()));
				upgrade.setFilePath(path + appName);
				upgrade.setFileName(androidfileFileName);
				// 生成文件MD5值
				String fileMd5 = MD5Util.md5(androidfile).toUpperCase();
				upgrade.setMd5(fileMd5);
				upgrade.setFileSize(androidfile.length()+"");
			}
			upgrade.setAndroidVersion(androidVersion);// android版本号
			upgrade.setContent(content);// 升级内容
			upgrade.setTitle(title);// 升级标题
			upgrade.setMerchants(merchants);// 商家名称
			upgrade.setModel(model);// 类型
			upgrade.setVersion(version);// app版本号
			upgrade.setReleaseDate(releaseDate);// 发布时间
			upgrade.setStatus(status);
			upgrade.setUtc(utc);
			upgrade.setUtcNew(DateUtil.getDateUtc(utc));
			upgrade.setMode(mode);//升级模式
			if(mode==0){
				upgrade.setIncreaseVersion(increaseVersion);
			}else{
				upgrade.setIncreaseVersion(null);
			}
			upgrade.updateSession((User) getSession().getAttribute("user"));
			upgradeService.save(upgrade);
			json.setSuccess(1);
			json.setMsg("保存软件包内容成功！");
			writeJson(json);
		} catch (Exception e) {
			logger.error("保存软件包失败", e);
			e.printStackTrace();
			json.setSuccess(0);
			json.setMsg("保存软件包内容失败！");
			writeJson(json);
		}
		return null;
	}

	/**
	 * 改变状态
	 */
	public String updateApprove() {
		Json json = new Json();
		try {
			Upgrade oldupgrade = upgradeService.getById(id);
			oldupgrade.setStatus(status);
			oldupgrade.setApproveContent(approveContent);
			oldupgrade.setApproveTime(new Date());
			User user = (User) getSession().getAttribute("user");
			oldupgrade.setApprover(user.getFullName());
			oldupgrade.updateSession(user);
			upgradeService.save(oldupgrade);
			json.setSuccess(1);
			json.setMsg("审批软件包内容成功！");
			writeJson(json);
		} catch (Exception e) {
			logger.error("审批软件包失败", e);
			e.printStackTrace();
			json.setSuccess(0);
			json.setMsg("审批软件包内容失败！");
			writeJson(json);
		}
		return null;
	}

	/**
	 * 改变状态
	 */
	public String updateStatus() {
		Json json = new Json();
		try {
			Upgrade oldupgrade = upgradeService.getById(id);
			String message = "更新成功！";
			if(status==3){
				message = "停用成功！";
			}else if(status == 4){
				message = "发布成功！";
				oldupgrade.setReleaseDate(new Date());
				if(oldupgrade.getMode()==1){
					upgradeService.updateUpgradeStatus(oldupgrade.getModel(),oldupgrade.getMode());
				}
			}
			oldupgrade.setStatus(status);
			oldupgrade.updateSession((User) getSession().getAttribute("user"));
			upgradeService.save(oldupgrade);
			json.setSuccess(1);
			json.setMsg(message);
			writeJson(json);
		} catch (Exception e) {
			logger.error("更新失败", e);
			e.printStackTrace();
			json.setSuccess(0);
			json.setMsg("更新失败！");
			writeJson(json);
		}
		return null;
	}

	/**
	 * 根据ID查询软件包内容信息
	 */
	public String getById() {
		Json json = new Json();
		try {
			Upgrade upgrade = upgradeService.getById(id);
			json.setSuccess(1);
			json.setObj(upgrade);
			json.setMsg("操作成功！");
			writeJson(upgrade);
		} catch (Exception e) {
			e.printStackTrace();
			json.setSuccess(0);
			json.setMsg("查询广告信息失败！");
			writeJson(json);
		}
		return null;
	}

	/**
	 * 根据ID删除软件包
	 */
	public String deleteUpgrade() {
		Json json = new Json();
		try {
			// 磁盘根目录
			String diskPath = PropertiesUtils.getProperties().getProperty("diskPath");
			Upgrade upgrade = upgradeService.getById(id);
			File file = new File(diskPath + upgrade.getFilePath());
			if (file.exists()) {
				file.delete();
			}
			upgradeService.deleteUpgrade(upgrade);
			json.setSuccess(1);
			json.setMsg("删除成功！");
			writeJson(json);
		} catch (Exception e) {
			e.printStackTrace();
			json.setSuccess(0);
			json.setMsg("删除信息失败！");
			writeJson(json);
		}
		return null;
	}

	public UpgradeService getUpgradeService() {
		return upgradeService;
	}

	public void setUpgradeService(UpgradeService upgradeService) {
		this.upgradeService = upgradeService;
	}

	public Upgrade getUpgrade() {
		return upgrade;
	}

	public void setUpgrade(Upgrade upgrade) {
		this.upgrade = upgrade;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public String getMerchants() {
		return merchants;
	}

	public void setMerchants(String merchants) {
		this.merchants = merchants;
	}

	public Date getReleaseDate() {
		return releaseDate;
	}

	public void setReleaseDate(Date releaseDate) {
		this.releaseDate = releaseDate;
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

	public String getAndroidVersion() {
		return androidVersion;
	}

	public void setAndroidVersion(String androidVersion) {
		this.androidVersion = androidVersion;
	}

	public String getApprover() {
		return approver;
	}

	public void setApprover(String approver) {
		this.approver = approver;
	}

	public String getApproveContent() {
		return approveContent;
	}

	public void setApproveContent(String approveContent) {
		this.approveContent = approveContent;
	}

	public Date getApproveTime() {
		return approveTime;
	}

	public void setApproveTime(Date approveTime) {
		this.approveTime = approveTime;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getUtc() {
		return utc;
	}

	public void setUtc(String utc) {
		this.utc = utc;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Integer getMode() {
		return mode;
	}

	public void setMode(Integer mode) {
		this.mode = mode;
	}

	public String getIncreaseVersion() {
		return increaseVersion;
	}

	public void setIncreaseVersion(String increaseVersion) {
		this.increaseVersion = increaseVersion;
	}
}
