package com.app.model;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.apache.commons.lang3.StringUtils;

/**
 * 查询条件表
 * 
 * @author aofl
 * 
 */
@Entity
@Table(name = "t_app_query")
public class Query{
	
	// 主键Id
	private String id;
	//查询条件
	private String searchJson;
	//渠道ID
	private String channelId;

	
	@Id
	@Column(name = "id", unique = true, nullable = true, length = 32)
	public String getId() {
		if (!StringUtils.isNotBlank(id)) {
			id = UUID.randomUUID().toString().replace("-", "");
		}
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}

	@Column(name = "search_json", length = 2000)
	public String getSearchJson() {
		return searchJson;
	}
	public void setSearchJson(String searchJson) {
		this.searchJson = searchJson;
	}
	
	@Column(name = "channel_id", length = 32)
	public String getChannelId() {
		return channelId;
	}
	public void setChannelId(String channelId) {
		this.channelId = channelId;
	}
}
