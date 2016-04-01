package com.app.bean;

import java.util.ArrayList;
import java.util.List;

/**
 * EasyUI DataGrid模型.
 * 
 * 
 */
public class Grid implements java.io.Serializable {

	private Long total = 0L;
	private List rows = new ArrayList();
	/**
	 * 可选字段，主要用在参数等版本
	 */
	private String version;

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public Long getTotal() {
		return total;
	}

	public void setTotal(Long total) {
		this.total = total;
	}

	public List getRows() {
		return rows;
	}

	public void setRows(List rows) {
		this.rows = rows;
	}

}
