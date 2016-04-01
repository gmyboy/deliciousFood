package com.app.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.Type;

/**
 * 广告信息表
 * 
 * @author aofl
 * 
 */
@Entity
@Table(name = "t_app_upgrade_info")
public class Upgrade extends BaseEntity {
	// 型号
	private String model;
	// 商家
	private String merchants;
	// 版本号
	private String version;
	// 发布时间
	private Date releaseDate;
	// 文件名称
	private String fileName;
	// 访问地址
	private String fileUrl;
	// 文件路径
	private String filePath;
	// 文件md5
	private String md5;
	// 文件类型
	private String fileType;
	//文件大小
	private String fileSize;
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
	// json
	private String info;
	//build时间
	private String utc;
	//utc格式
	private String utcNew;
	//成功数量
	private Integer successCount;
	//失败数量
	private Integer errorCount;
	//升级模式(0：增加升级，1：完整升级)
	private Integer mode;
	//增量升级基本版本号
	private String increaseVersion;
	
	// 状态（0:暂存，1:审核中，2:激活，-1:审核打回，3:停用，4：已发布）

	@Column(name = "model", length = 20)
	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	@Type(type = "text")
	@Column(name = "info")
	public String getInfo() {
		return info;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	@Column(name = "merchants", length = 20)
	public String getMerchants() {
		return merchants;
	}

	public void setMerchants(String merchants) {
		this.merchants = merchants;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "release_date")
	public Date getReleaseDate() {
		return releaseDate;
	}

	public void setReleaseDate(Date releaseDate) {
		this.releaseDate = releaseDate;
	}

	@Column(name = "file_url", length = 200)
	public String getFileUrl() {
		return fileUrl;
	}

	public void setFileUrl(String fileUrl) {
		this.fileUrl = fileUrl;
	}

	@Column(name = "file_type", length = 50)
	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	@Column(name = "android_version", length = 50)
	public String getAndroidVersion() {
		return androidVersion;
	}

	public void setAndroidVersion(String androidVersion) {
		this.androidVersion = androidVersion;
	}

	@Column(name = "approver", length = 200)
	public String getApprover() {
		return approver;
	}

	public void setApprover(String approver) {
		this.approver = approver;
	}

	@Column(name = "approve_content", length = 200)
	public String getApproveContent() {
		return approveContent;
	}

	public void setApproveContent(String approveContent) {
		this.approveContent = approveContent;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "approve_time", length = 20)
	public Date getApproveTime() {
		return approveTime;
	}

	public void setApproveTime(Date approveTime) {
		this.approveTime = approveTime;
	}

	@Column(name = "file_path", length = 200)
	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	@Column(name = "md5", length = 50)
	public String getMd5() {
		return md5;
	}

	public void setMd5(String md5) {
		this.md5 = md5;
	}
	
	@Column(name = "utc",length=50)
	public String getUtc() {
		return utc;
	}

	public void setUtc(String utc) {
		this.utc = utc;
	}

	@Column(name = "version", length = 50)
	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	@Column(name = "file_name", length = 200)
	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	@Column(name = "title", length = 500)
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	@Type(type = "text")
	@Column(name = "content")
	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	@Column(name = "success_count")
	public Integer getSuccessCount() {
		return successCount;
	}

	public void setSuccessCount(Integer successCount) {
		this.successCount = successCount;
	}
	
	@Column(name = "error_count")
	public Integer getErrorCount() {
		return errorCount;
	}

	public void setErrorCount(Integer errorCount) {
		this.errorCount = errorCount;
	}

	@Column(name = "mode")
	public Integer getMode() {
		return mode;
	}
	public void setMode(Integer mode) {
		this.mode = mode;
	}

	@Column(name = "increase_version")
	public String getIncreaseVersion() {
		return increaseVersion;
	}
	public void setIncreaseVersion(String increaseVersion) {
		this.increaseVersion = increaseVersion;
	}

	@Column(name = "utc_new")
	public String getUtcNew() {
		return utcNew;
	}

	public void setUtcNew(String utcNew) {
		this.utcNew = utcNew;
	}

	@Column(name = "file_size")
	public String getFileSize() {
		return fileSize;
	}

	public void setFileSize(String fileSize) {
		this.fileSize = fileSize;
	}
	
}
