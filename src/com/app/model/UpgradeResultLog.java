package com.app.model;

import java.io.Serializable;

/**
 * 升级结果日志
 * @author aofl
 *
 */
public class UpgradeResultLog extends BaseMongoEntity implements Serializable{

	private static final long serialVersionUID = 1L;
	
	/**
	 * 终端Id
	 */
	private Integer terminalId;
	
	/**
	 * 商家
	 */
	private String merchants;
	
	/**
	 * 版本号
	 */
	private String version;
	
	/**
	 * 升级结果
	 */
	private String upgradeResult;
	
	/**
	 * 失败日志
	 */
	private String errorLog;

	public Integer getTerminalId() {
		return terminalId;
	}
	public void setTerminalId(Integer terminalId) {
		this.terminalId = terminalId;
	}

	public String getMerchants() {
		return merchants;
	}
	public void setMerchants(String merchants) {
		this.merchants = merchants;
	}

	public String getVersion() {
		return version;
	}
	public void setVersion(String version) {
		this.version = version;
	}

	public String getUpgradeResult() {
		return upgradeResult;
	}
	public void setUpgradeResult(String upgradeResult) {
		this.upgradeResult = upgradeResult;
	}

	public String getErrorLog() {
		return errorLog;
	}
	public void setErrorLog(String errorLog) {
		this.errorLog = errorLog;
	}
	
}
