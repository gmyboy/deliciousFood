package com.app.util;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Date;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;

import com.alibaba.fastjson.JSONObject;

public class PhoneAttributionUtils {
	/**
	 * @param urlAll
	 *            :请求接口
	 * @param httpArg
	 *            :参数
	 * @return 返回结果
	 */
	public static Map<String,Object> request(String phone) {
		String httpUrl = "http://apis.baidu.com/apistore/mobilenumber/mobilenumber";
		String httpArg = "phone="+phone;
	    BufferedReader reader = null;
	    String result = null;
	    StringBuffer sbf = new StringBuffer();
	    httpUrl = httpUrl + "?" + httpArg;
	    try {
	        URL url = new URL(httpUrl);
	        HttpURLConnection connection = (HttpURLConnection) url
	                .openConnection();
	        connection.setRequestMethod("GET");
	        // 填入apikey到HTTP header
	        connection.setRequestProperty("apikey",  "fb06951c7053ac8d8383ef87e98b09d4");
	        connection.connect();
	        InputStream is = connection.getInputStream();
	        reader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
	        String strRead = null;
	        while ((strRead = reader.readLine()) != null) {
	            sbf.append(strRead);
	            sbf.append("\r\n");
	        }
	        reader.close();
	        result = sbf.toString();
	    } catch (Exception e) {
	        e.printStackTrace();
	    }
	    String resultStr = "";
	    Map<String,Object> map1 = null;
	    if(StringUtils.isNotBlank(result)){
	    	Map<String,Object> map = JSONObject.parseObject(result);
	    	//如果查询成功
	    	if(null!=map.get("errNum")&&map.get("errNum").toString().equals("0")){
	    		map1 = JSONObject.parseObject(map.get("retData").toString());
	    		resultStr=map1.get("province").toString()+map1.get("city").toString()+map1.get("supplier").toString();
	    	}
	    }
	    return map1;
	}
}
