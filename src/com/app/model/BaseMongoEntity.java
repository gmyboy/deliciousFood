package com.app.model;

import java.util.Date;
import java.util.UUID;
import org.apache.commons.lang3.StringUtils;

/**
 * 持久化基类，所有MongoDb的实体类都可继承该基类
 * @author aofl
 *
 */
public abstract class BaseMongoEntity implements java.io.Serializable {

	private static final long serialVersionUID = 10L;
	
	//编号.
	private String id;
	
	//状态.
	private Integer status;
		
	//创建人
	private String creater;
	
	//创建时间
	private Date createTime;
	
	// 最后更新人
	private String lastUpdater;
	
	//最后更新时间
	private Date lastUpdateTime;
	
	// 渠道号
	private String channelNo;
	
	// 公司名称
	private String companyName;

	
	public String getId() {
		if (!StringUtils.isBlank(this.id)) {
			return this.id;
		}
		return UUID.randomUUID().toString();
	}
	public boolean hasId(){
		if(StringUtils.isNotBlank(this.id)){
			return true;
		}else{
			return false;
		}
	}
	public void setId(String id) {
		this.id = id;
	}

	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getCreater() {
		return creater;
	}
	public void setCreater(String creater) {
		this.creater = creater;
	}

	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getLastUpdateTime() {
		return lastUpdateTime;
	}
	public void setLastUpdateTime(Date lastUpdateTime) {
		this.lastUpdateTime = lastUpdateTime;
	}
	
	public String getLastUpdater() {
		return lastUpdater;
	}
	public void setLastUpdater(String lastUpdater) {
		this.lastUpdater = lastUpdater;
	}

	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	
	public String getChannelNo() {
		return channelNo;
	}
	public void setChannelNo(String channelNo) {
		this.channelNo = channelNo;
	}
	
	public void saveSession(User user) {
		this.createTime = new Date();
		this.lastUpdateTime = new Date();
		if (user != null) {
			this.creater = user.getUserName() + "[" + user.getFullName() + "]";
			this.lastUpdater = user.getUserName() + "[" + user.getFullName() + "]";
			this.channelNo = user.getChannelNo();
			this.companyName = user.getCompanyName();
		}
	}

	public void updateSession(User user) {
		this.lastUpdateTime = new Date();
		if (user != null) {
			this.lastUpdater = user.getUserName() + "[" + user.getFullName() + "]";
		}
	}
	
	public void deleteSession(){
		this.creater=null;
		this.createTime=null;
		this.lastUpdater=null;
		this.lastUpdateTime=null;
	}
}
