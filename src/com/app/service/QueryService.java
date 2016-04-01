package com.app.service;

import com.app.model.Query;

public interface QueryService {
	public void saveOrUpdate(Query query);
	
	public void delte(Query query);
	
	public Query getQueryByStrategyId(String strategyId);
	
	public Query getQueryByCompanyId(String channelId);
}
