package com.app.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.Type;

/**
 * 终端信息
 * 
 * @author aofl
 * 
 */
@Entity
@Table(name = "t_app_terminal_info")
public class Terminal extends BigBaseEntity {

	// 应用包名
	private String appName;
	// 应用版本号
	private String vc;
	// 应用版本名
	private String vn;
	// 网络类型
	private String net;
	// IMSI号使用DES算法加密
	private String imsi;
	// IMEI号使用DES算法加密
	private String imei;
	// 手机型号
	private String model;
	// 手机号码使用DES算法加密
	private String phone;
	// 系统总内存(运行总内存)
	private String totalMemory;
	// 获取android当前可用内存大小 （运行内存）
	private String availMemory;
	// 手机总内存
	private String memorySize;
	// 获取可用的内存空间 返回 单位 M
	private String availMemorySize;
	// sd卡总内存
	private String sdSize;
	// sd卡可用内存
	private String sdAvailSize;
	// 手机宽度
	private String width;
	// 手机高度
	private String height;
	// 本地语言
	private String lang;
	// mac地址
	private String mac;
	// 操作系统0：表示 ios，1：表示 android，2：表示 windows phone，3：表示 feature phone
	private String os;
	// 安卓系统版本
	private String osv;
	// 国家地区
	private String icc;
	// Android ID
	private String udid;
	// 时区时区
	private String timeZone;
	// app列表
	private String appList;
	// 新增或更新的app列表
	private String installAppList;
	// 删除的app列表
	private String uninstallAppList;
	// 策略id
	private String strategyId;
	// 上次推送时间
	private Date beforePushDate;
	//友盟推送deviceToken
	private String deviceToken;
	//手机号码归属地
	private String phoneAttribution;
	// 渠道号
	private String channelNo;
	//app包名集合
	private String apps;
	// 省
	private String province;
	// 市
	private String district;
	// 运行商 移动、联通、电信等
	private String iso;
	//上传ip
	private String ip;
	//内核版本
	private String kernelVersion;
	//基带版本
	private String basebandVersion;
	//品牌
	private String brand;
	
	@Column(name = "model", length = 50)
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}

	@Column(name = "imei", length = 30)
	public String getImei() {
		return imei;
	}
	public void setImei(String imei) {
		this.imei = imei;
	}

	@Column(name = "imsi", length = 30)
	public String getImsi() {
		return imsi;
	}
	public void setImsi(String imsi) {
		this.imsi = imsi;
	}

	@Column(name = "time_zone", length = 30)
	public String getTimeZone() {
		return timeZone;
	}
	public void setTimeZone(String timeZone) {
		this.timeZone = timeZone;
	}

	@Column(name = "mac", length = 50)
	public String getMac() {
		return mac;
	}
	public void setMac(String mac) {
		this.mac = mac;
	}

	@Column(name = "app_name", length = 200)
	public String getAppName() {
		return appName;
	}
	public void setAppName(String appName) {
		this.appName = appName;
	}

	@Column(name = "vc", length = 100)
	public String getVc() {
		return vc;
	}
	public void setVc(String vc) {
		this.vc = vc;
	}

	@Column(name = "vn", length = 100)
	public String getVn() {
		return vn;
	}
	public void setVn(String vn) {
		this.vn = vn;
	}

	@Column(name = "net", length = 50)
	public String getNet() {
		return net;
	}
	public void setNet(String net) {
		this.net = net;
	}

	@Column(name = "phone", length = 20)
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}

	@Column(name = "total_memory", length = 20)
	public String getTotalMemory() {
		return totalMemory;
	}
	public void setTotalMemory(String totalMemory) {
		this.totalMemory = totalMemory;
	}

	@Column(name = "avail_memory", length = 20)
	public String getAvailMemory() {
		return availMemory;
	}
	public void setAvailMemory(String availMemory) {
		this.availMemory = availMemory;
	}

	@Column(name = "memory_size", length = 20)
	public String getMemorySize() {
		return memorySize;
	}
	public void setMemorySize(String memorySize) {
		this.memorySize = memorySize;
	}

	@Column(name = "avail_memory_size", length = 20)
	public String getAvailMemorySize() {
		return availMemorySize;
	}
	public void setAvailMemorySize(String availMemorySize) {
		this.availMemorySize = availMemorySize;
	}

	@Column(name = "sd_size", length = 20)
	public String getSdSize() {
		return sdSize;
	}
	public void setSdSize(String sdSize) {
		this.sdSize = sdSize;
	}

	@Column(name = "sd_avail_size", length = 20)
	public String getSdAvailSize() {
		return sdAvailSize;
	}
	public void setSdAvailSize(String sdAvailSize) {
		this.sdAvailSize = sdAvailSize;
	}

	@Column(name = "width", length = 10)
	public String getWidth() {
		return width;
	}
	public void setWidth(String width) {
		this.width = width;
	}

	@Column(name = "height", length = 10)
	public String getHeight() {
		return height;
	}
	public void setHeight(String height) {
		this.height = height;
	}

	@Column(name = "lang", length = 20)
	public String getLang() {
		return lang;
	}
	public void setLang(String lang) {
		this.lang = lang;
	}

	@Column(name = "os", length = 50)
	public String getOs() {
		return os;
	}
	public void setOs(String os) {
		this.os = os;
	}

	@Column(name = "osv", length = 50)
	public String getOsv() {
		return osv;
	}
	public void setOsv(String osv) {
		this.osv = osv;
	}

	@Column(name = "icc", length = 10)
	public String getIcc() {
		return icc;
	}
	public void setIcc(String icc) {
		this.icc = icc;
	}

	@Column(name = "ud_id", length = 200)
	public String getUdid() {
		return udid;
	}
	public void setUdid(String udid) {
		this.udid = udid;
	}

	@Transient
	public String getAppList() {
		return appList;
	}
	public void setAppList(String appList) {
		this.appList = appList;
	}
	@Transient
	public String getInstallAppList() {
		return installAppList;
	}
	public void setInstallAppList(String installAppList) {
		this.installAppList = installAppList;
	}
	@Transient
	public String getUninstallAppList() {
		return uninstallAppList;
	}
	public void setUninstallAppList(String uninstallAppList) {
		this.uninstallAppList = uninstallAppList;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "before_push_date")
	public Date getBeforePushDate() {
		return beforePushDate;
	}
	public void setBeforePushDate(Date beforePushDate) {
		this.beforePushDate = beforePushDate;
	}

	@Column(name = "strategy_id", length = 32)
	public String getStrategyId() {
		return strategyId;
	}
	public void setStrategyId(String strategyId) {
		this.strategyId = strategyId;
	}

	@Column(name = "device_token", length = 44)
	public String getDeviceToken() {
		return deviceToken;
	}
	public void setDeviceToken(String deviceToken) {
		this.deviceToken = deviceToken;
	}
	
	@Column(name = "phone_attribution", length = 500)
	public String getPhoneAttribution() {
		return phoneAttribution;
	}
	public void setPhoneAttribution(String phoneAttribution) {
		this.phoneAttribution = phoneAttribution;
	}
	
	@Column(name = "channel_no", length = 50)
	public String getChannelNo() {
		return channelNo;
	}
	public void setChannelNo(String channelNo) {
		this.channelNo = channelNo;
	}
	
	@Type(type="text")
	@Column(name = "apps")
	public String getApps() {
		return apps;
	}
	public void setApps(String apps) {
		this.apps = apps;
	}
	
	@Column(name = "province", length = 50)
	public String getProvince() {
		return province;
	}
	public void setProvince(String province) {
		this.province = province;
	}

	@Column(name = "district", length = 50)
	public String getDistrict() {
		return district;
	}
	public void setDistrict(String district) {
		this.district = district;
	}

	@Column(name = "iso", length = 50)
	public String getIso() {
		return iso;
	}
	public void setIso(String iso) {
		this.iso = iso;
	}

	@Column(name = "ip", length = 500)
	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	
	@Column(name = "kernel_version", length = 100)
	public String getKernelVersion() {
		return kernelVersion;
	}
	public void setKernelVersion(String kernelVersion) {
		this.kernelVersion = kernelVersion;
	}
	
	@Column(name = "baseband_version", length = 100)
	public String getBasebandVersion() {
		return basebandVersion;
	}
	public void setBasebandVersion(String basebandVersion) {
		this.basebandVersion = basebandVersion;
	}
	
	@Column(name = "brand", length = 100)
	public String getBrand() {
		return brand;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
}
