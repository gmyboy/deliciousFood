package com.app.test;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Date;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;
import com.app.util.ApplicationUtil;

@Component
public class TestRunnable implements Runnable{

	private static final Logger logger = Logger.getLogger(TestRunnable.class);

	/**
	 * 策略Id
	 */
	private String strategyId;
	
	/**
	 * 渠道号
	 */
	private String channelNo;
	
	/**
	 * 策略类型
	 */
	private String type;
	
	private Integer num;
	
	public TestRunnable() {
		
	}

	public TestRunnable(String strategyId, String channelNo,String type,Integer num) {
		this.strategyId = strategyId;
		this.channelNo = channelNo;
		this.type = type;
		this.num = num;
	}

	@Override
	public void run() {
//		String httpUrl ="http://127.0.0.1:8080/androidManager/appInterface!dnss_terminal.do?info={%20%22id%22:%20%220%22,%20%22phone%22:%20%2212345678912%22%20}";
		String httpUrl = "http://127.0.0.1:8080/androidManager/appInterface!dnss_queryInfo.do?terminalId=1&&version=1";
	    BufferedReader reader = null;
	    String result = null;
	    StringBuffer sbf = new StringBuffer();
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
	        System.out.println("第"+num+"次:"+result);
	    } catch (Exception e) {
	        e.printStackTrace();
	    }
	}

}
