package com.app.util;

import java.io.IOException;
import java.util.Properties;

import org.apache.commons.lang3.StringUtils;

/**
 * 获取配置文件值
 * @author aofl
 *
 */
public class PropertiesUtils {

	private static  PropertiesUtils singl = null;
	private static Properties properties;
	
	static {
		properties = new Properties();
		try {
			properties.load(Thread.currentThread().getContextClassLoader().getResourceAsStream("config.properties"));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
    public static PropertiesUtils getInstenc(){
    	return singl == null ? new PropertiesUtils() : singl;
    }
	
    public static Properties getProperties(){
    	return PropertiesUtils.properties;
    }
	
    public static String getProperty(String key){
    	return properties.getProperty(key);
    }
	    
    public String getVlaue(String key){
    	return properties.getProperty(key);
    }

    public String getVlaue(String key,String defaultValue){
    	if(StringUtils.isBlank(properties.getProperty(key))){
    		return defaultValue;
    	}
    	return properties.getProperty(key);
    }
}
