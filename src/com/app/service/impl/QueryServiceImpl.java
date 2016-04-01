package com.app.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.SuperBaseDao;
import com.app.model.Query;
import com.app.service.QueryService;

@Service
public class QueryServiceImpl implements QueryService{
	@Autowired
	private SuperBaseDao<Query> superBaseDao;
	
	@Override
	public void saveOrUpdate(Query query) {
		superBaseDao.saveOrUpdate(query);
	}

	@Override
	public void delte(Query query) {
		superBaseDao.delete(query);
		
	}

	@Override
	public Query getQueryByStrategyId(String strategyId) {
		String hql=" from Query where strategyId='"+strategyId+"'";
		return superBaseDao.getByHql(hql);
	}

	@Override
	public Query getQueryByCompanyId(String channelId) {
		String hql=" from Query where channelId='"+channelId+"'";
		return superBaseDao.getByHql(hql);
	}

}
