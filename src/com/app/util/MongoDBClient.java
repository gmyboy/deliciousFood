package com.app.util;

import java.net.UnknownHostException;
import java.text.SimpleDateFormat;
import org.jboss.logging.Logger;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.Mongo;
import com.mongodb.MongoClient;

/**
 * MongoDB客户端
 * @author Administrator
 *
 */
public class MongoDBClient {

	private static Logger logger = Logger.getLogger(MongoDBClient.class);
	
	private static Mongo mongo ;

	private static String dbName;

	
	
	/**
	 * 初始化MongoDB客户端
	 * MongoDB自主管理连接池，默认最大843个，和系统有关
	 * @param host
	 * @param port
	 * @param dbName
	 */
	public static void connectMongoDB(String host,int port,String dbName){
		
		MongoDBClient.dbName = dbName;
		try {
			
			mongo = new MongoClient(host, port);
			logger.info("连接MongoDB成功。"+host+":"+port);
		} catch (UnknownHostException e) {
			e.printStackTrace();
		}
	}

	
	/**
	 * 关闭mongo连接，在web容器关闭时调用
	 */
	public static void close(){
		mongo.close();
	}
	

	/**
	 * 获取一个连接,指定表名
	 * @param collectionName 表名
	 * @return 
	 */
	public static DBCollection getDBCollection(String collectionName){
		DBCollection collection = null;
		try{
			DB db = mongo.getDB(dbName);
			collection = db.getCollection(collectionName);
		}catch(Exception e){
			logger.error("获取数据库连接-异常",e);
		}
		return collection;
	}

}
