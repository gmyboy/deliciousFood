package com.app.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.app.bean.Grid;
import com.app.bean.PageInfoBean;
import com.app.dao.SuperBaseDao;
import com.app.model.Channel;
import com.app.model.Query;
import com.app.model.Role;
import com.app.model.Terminal;
import com.app.model.User;
import com.app.service.ChannelService;

@Service
public class ChannelServiceImpl implements ChannelService {

	@Autowired
	private SuperBaseDao superBaseDao;

	@Override
	public Grid getChannerList(String channelNo, String companyName,
			String address, String contact, String phone,Integer status,PageInfoBean pfb) {
		Grid grid = new Grid();
		Map<String, Object> pararmap = new HashMap<String, Object>();
		String hql = "from Channel where 1=1 ";
		String countHql = "select count(1) from Channel where 1=1 ";
		String whereHql = "";
		
		if (StringUtils.isNotBlank(channelNo)) {
			whereHql += " and channelNo like :channelNo";
			pararmap.put("channelNo", "%"+channelNo+"%");
		}
		if (StringUtils.isNotBlank(companyName)) {
			whereHql += " and companyName like :companyName";
			pararmap.put("companyName", "%"+companyName+"%");
		}
		if (StringUtils.isNotBlank(address)) {
			whereHql += " and address like :address";
			pararmap.put("address", "%"+address+"%");
		}
		if (StringUtils.isNotBlank(contact)) {
			whereHql += " and contact like :contact";
			pararmap.put("contact", "%"+contact+"%");
		}
		if (StringUtils.isNotBlank(phone)) {
			whereHql += " and phone like :phone";
			pararmap.put("phone", "%"+phone+"%");
		}
		if(null!=status){
			whereHql += " and status = :status";
			pararmap.put("status", status);
		}
		
		//根据页面传来值排序
		String orderhql = "";
		if(StringUtils.isNotBlank(pfb.getSortName())&&StringUtils.isNotBlank(pfb.getSortOrder())){
			orderhql += " order by "+pfb.getSortName()+" "+pfb.getSortOrder();
		}
		
		List<Channel> resultList = superBaseDao.find(hql+whereHql+orderhql,pararmap,pfb.getPage(),pfb.getRows());
		Long total = superBaseDao.count(countHql+whereHql, pararmap);
		grid.setRows(resultList);
		grid.setTotal(total);
		return grid;
	}

	@Override
	public void saveOrUpdate(Channel channel) {
		superBaseDao.saveOrUpdate(channel);
		
	}

	@Override
	public Channel getById(String id) {
		// TODO Auto-generated method stub
		Channel channel=(Channel) superBaseDao.getById(Channel.class, id);
		if(null!=channel){
			String hql="select t  from Channel c,Terminal t where c.channelNo=t.channelNo  and c.id='"+id+"'";
			List<Terminal> tmList=superBaseDao.getListByHql(hql);
			channel.setTmList(tmList);
			
			if(StringUtils.isNotBlank(channel.getUserId())){
				User user=(User) superBaseDao.getById(User.class,channel.getUserId());
				channel.setUser(user);
			}
			if(StringUtils.isNotBlank(channel.getRoleId())){
				Role role=(Role) superBaseDao.getById(Role.class, channel.getRoleId());
				channel.setRole(role);
			}
			if(StringUtils.isNotBlank(channel.getQueryId())){
				Query q=(Query) superBaseDao.getById(Query.class, channel.getQueryId());
				channel.setQuery(q);
			}
		}
		return channel;
	}

	@Override
	public void delete(Channel channel) {
		superBaseDao.delete(channel);
		
	}

	@Override
	public Channel getByNo(String channelNo) {
		String hql = "from Channel where channelNo = '"+channelNo+"'";
		return (Channel) superBaseDao.getByHql(hql);
	}
}
