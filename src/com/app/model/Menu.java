package com.app.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * 菜单信息
 * @author aofl
 * 
 */
@Entity
@Table(name="t_app_menu",schema = "")
public class Menu extends BaseEntity{
	
	/**
	 * 菜单编号
	 */
	private Integer menuNO;
	
	/**
	 * 菜单名称
	 */
	private String menuName;
	
	/**
	 * 菜单描述
	 */
	private String menuDescription;
	
	/**
	 * 上级菜单menuNO
	 */
	private Integer parentMenuNO;
	
	/**
	 * 菜单类型（1.左侧菜单 2.页面tabs选项卡 3.APP菜单 4.闪灯 5.操作按钮 6.在线编辑 7.添加 8.面包屑 9.总闪灯 10.连接 11实时数据）
	 */
	private Integer menuType;
	
	/**
	 * 菜单连接地址
	 */
	private String url;
	
	/**
	 * 菜单直接请求的接口地址
	 */
	private String action;
	
	/**
	 * 接口地址对应操作名称
	 */
	private String opName;
	
	/**
	 * 排序号
	 */
	private Integer seqNum;
	
	/**
	 * 别名
	 */
	private String classAlias;
	
	/**
	 * 菜单所属项目名：全填appManager
	 */
	private String projectName;
	
	/**
	 * 子菜单
	 */
	private List<Menu> children;
	
	/**
	 * 可见 （1.可见 0.不可见）
	 */
	private Integer visable;

	@Column(name = "menu_no", nullable = false)
	public Integer getMenuNO() {
		return menuNO;
	}

	public void setMenuNO(Integer menuNO) {
		this.menuNO = menuNO;
	}

	@Column(name = "menu_name", nullable = false, length = 50)
	public String getMenuName() {
		return menuName;
	}

	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}

	@Column(name = "menu_description", length = 100)
	public String getMenuDescription() {
		return menuDescription;
	}

	public void setMenuDescription(String menuDescription) {
		this.menuDescription = menuDescription;
	}

	@Column(name = "parent_menu_no", nullable = false)
	public Integer getParentMenuNO() {
		return parentMenuNO;
	}

	public void setParentMenuNO(Integer parentMenuNO) {
		this.parentMenuNO = parentMenuNO;
	}

	@Column(name = "menu_type")
	public Integer getMenuType() {
		return menuType;
	}

	public void setMenuType(Integer menuType) {
		this.menuType = menuType;
	}

	@Column(name = "url", length = 200)
	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	@Column(name = "action", length = 200)
	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	@Column(name = "op_name", length = 200)
	public String getOpName() {
		return opName;
	}
	public void setOpName(String opName) {
		this.opName = opName;
	}

	@Column(name = "seq_num")
	public Integer getSeqNum() {
		return seqNum;
	}

	public void setSeqNum(Integer seqNum) {
		this.seqNum = seqNum;
	}

	@Column(name = "class_alias", length = 20)
	public String getClassAlias() {
		return classAlias;
	}

	public void setClassAlias(String classAlias) {
		this.classAlias = classAlias;
	}

	@Column(name = "project_name", length = 20)
	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	@Column(name = "visable")
	public Integer getVisable() {
		return visable;
	}

	public void setVisable(Integer visable) {
		this.visable = visable;
	}

	@Transient
	public List<Menu> getChildren() {
		return children;
	}

	public void setChildren(List<Menu> children) {
		this.children = children;
	}	
	
	public void removeInfo(){
		super.setId(null);
		super.setStatus(null);
		
//		this.menuDescription = null;
		this.visable = null;
		this.seqNum = null;
	}
}
