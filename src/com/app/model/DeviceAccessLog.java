package com.app.model;

import java.io.Serializable;

/**
 * 设备访问日志
 * @author aofl
 *
 */
public class DeviceAccessLog extends BaseMongoEntity implements Serializable{

	private static final long serialVersionUID = 1L;
	
	/**
	 * 终端Id
	 */
	private Integer terminalId;
	
	/**
	 * 返回结果
	 */
	private String result;
	
	/**
	 * 接口名称
	 */
	private String interfaceName;
	
	/**
	 * 操作说明
	 */
	private String opName;
	
	public String getOpName() {
		return opName;
	}
	public void setOpName(String opName) {
		this.opName = opName;
	}
	public Integer getTerminalId() {
		return terminalId;
	}
	public void setTerminalId(Integer terminalId) {
		this.terminalId = terminalId;
	}
	public String getResult() {
		return result;
	}
	public void setResult(String result) {
		this.result = result;
	}
	public String getInterfaceName() {
		return interfaceName;
	}
	public void setInterfaceName(String interfaceName) {
		this.interfaceName = interfaceName;
	}
}
