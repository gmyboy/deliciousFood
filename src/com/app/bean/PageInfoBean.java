package com.app.bean;

import java.io.Serializable;

/**
 * 分页公共bean
 * @author aofl
 *
 */
public class PageInfoBean implements Serializable {
	
	private static final long serialVersionUID = 4536458165540069462L;

	//每页记录数
	private int rows;
	//当前页
	private int page;
	//总页数
	private int totalPageNo;
	//总记录数
	private int totalRows = 0;
	
	/** 按哪个字段排序 */
	private String sortName;
	
	/** 排序标记(升序ASC， 降序DESC) */
	private String sortOrder = "asc";

	public PageInfoBean() {
	}
	
	public PageInfoBean(int page) {
		this.page = page;
		this.rows = 10;
	}
	
	public PageInfoBean(int page, int rows){
	     this.page = page;
	     this.rows = rows;
	}

	public int getRows() {
		return rows;
	}

	public void setRows(int rows) {
		this.rows = rows;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getTotalRows() {
		return totalRows;
	}

	public void setTotalRows(int totalRows) {
		this.totalRows = totalRows;
	}
	
	public int getTotalPageNo() {
		return totalPageNo;
	}

	public void setTotalPageNo(int totalPageNo) {
		this.totalPageNo = totalPageNo;
	}

	public String getSortName() {
		return sortName;
	}

	public void setSortName(String sortName) {
		this.sortName = sortName;
	}

	public String getSortOrder() {
		return sortOrder;
	}

	public void setSortOrder(String sortOrder) {
		this.sortOrder = sortOrder;
	}

	public void doReviseData() {
		if (this.page <= 0) {
			this.page = 1;
		}
		if (this.rows <= 0) {
			this.rows = 10;
		}

		if (this.totalRows < 0) {
			this.totalRows = 0;
		}

		this.totalPageNo = (int) Math.ceil((double)this.totalRows/ (double)this.rows);
		if (this.totalPageNo == 0) {
			this.totalPageNo = 1;
		}

		if (this.page > this.totalPageNo)
			this.page = this.totalPageNo;
	}

}
