package com.app.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import org.hibernate.annotations.GenericGenerator;

/**
 * 公共实体类
 * 
 * @author aofl
 * 
 */
@MappedSuperclass
public abstract class BigBaseEntity implements Serializable {

	private static final long serialVersionUID = 1L;

	// 主键Id
	private Integer id;

	// 创建人
	private String creater;

	// 创建时间
	private Date createTime;
		
	// 公司名称
	private String companyName;

	// 最后更新人
	private String lastUpdater;

	// 最后更新时间
	private Date lastUpdateTime;
	
	//状态
	private Integer status;

	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY) 
	@GenericGenerator(name = "persistenceGenerator", strategy = "increment") 
	@Column(name = "id") 
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "create_time")
	public Date getCreateTime() {
		if (null == this.createTime) {
			this.createTime = new Date();
		}
		return createTime;
	}

	public void setCreateTime(Date createTime) {

		this.createTime = createTime;
	}

	@Column(name = "creater", length = 200)
	public String getCreater() {
		return creater;
	}

	public void setCreater(String creater) {
		this.creater = creater;
	}

	@Column(name = "last_updater", length = 200)
	public String getLastUpdater() {
		return lastUpdater;
	}

	public void setLastUpdater(String lastUpdater) {
		this.lastUpdater = lastUpdater;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "last_update_time")
	public Date getLastUpdateTime() {
		return lastUpdateTime;
	}

	public void setLastUpdateTime(Date lastUpdateTime) {
		this.lastUpdateTime = lastUpdateTime;
	}
	
	@Column(name = "status")
	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	@Column(name = "company_name", length = 200)
	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public void saveSession(User user) {
		this.createTime = new Date();
		this.lastUpdateTime = new Date();
		if (user != null) {
			this.creater = user.getUserName() + "[" + user.getFullName() + "]";
			this.lastUpdater = user.getUserName() + "[" + user.getFullName() + "]";
			this.companyName = user.getCompanyName();
		}
	}

	public void updateSession(User user) {
		this.lastUpdateTime = new Date();
		if (user != null) {
			this.lastUpdater = user.getUserName() + "[" + user.getFullName() + "]";
		}
	}
	
	public void deleteBaseInfo(){
		this.creater=null;
		this.createTime=null;
		this.lastUpdater=null;
		this.lastUpdateTime=null;
	}

}
