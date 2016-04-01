package com.app.service;

import com.app.bean.Grid;
import com.app.bean.PageInfoBean;
import com.app.model.Channel;

public interface ChannelService {

	public Grid getChannerList(String channelNo, String companyName,
			String address, String contact, String phone,Integer status,PageInfoBean pfb);
	
	/**
	 * 保存/更新
	 */
	public void  saveOrUpdate(Channel channel);
	
	public Channel getById(String id);
		
	public void delete(Channel channel);
	
	public Channel getByNo(String channelNo);
}
