package com.app.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "t_app_application")
public class Application extends BaseEntity{
	
	private static final long serialVersionUID = 1L;
	// 终端ID
	private Integer terminalId;
	public String app;//应用的包名
    public String operate;// install(新增，更新), uninstall(删除)
    public String vc;// versionCode 版本号
    public String vn;// versionName 版本名
    
	@Column(name = "terminal_id")
	public Integer getTerminalId() {
		return terminalId;
	}

	public void setTerminalId(Integer terminalId) {
		this.terminalId = terminalId;
	}

    @Column(name = "app",length=200)
	public String getApp() {
		return app;
	}
	public void setApp(String app) {
		this.app = app;
	}
	
	@Column(name = "operate",length=50)
	public String getOperate() {
		return operate;
	}
	public void setOperate(String operate) {
		this.operate = operate;
	}
	
	@Column(name = "vc",length=100)
	public String getVc() {
		return vc;
	}
	public void setVc(String vc) {
		this.vc = vc;
	}
	
	@Column(name = "vn",length=100)
	public String getVn() {
		return vn;
	}
	public void setVn(String vn) {
		this.vn = vn;
	}
    
    
}
