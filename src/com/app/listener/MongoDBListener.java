package com.app.listener;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import com.app.util.MongoDBClient;
import com.app.util.PropertiesUtils;

import org.apache.log4j.Logger;

/**
 * MongoDB监听器
 * 
 */
public class MongoDBListener implements ServletContextListener{

	private Logger logger = Logger.getLogger(getClass());
	
	@Override
	public void contextInitialized(ServletContextEvent sce) {
		try{
			String mongodbHost = PropertiesUtils.getProperty("mongodb.host");
			int mongodbProt = Integer.parseInt(PropertiesUtils.getProperty("mongodb.port"));
			String mongodbDbName = PropertiesUtils.getProperty("mongodb.dbname");
			MongoDBClient.connectMongoDB(mongodbHost, mongodbProt, mongodbDbName);
		}catch(Exception e){
			logger.error("连接MongoDB失败", e);
		}
		
	}

	@Override
	public void contextDestroyed(ServletContextEvent sce) {
		MongoDBClient.close();
	}
}
