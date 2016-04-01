package com.app.test;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.List;
import java.util.Map;
import java.util.Random;

public class Test {

	public static void main(String[] args) {
//		for (int i = 0; i < 10; i++) {

//			System.out.println(generateNumber2());
			// String param = "terminalId=0&imei="
			// + imei
			// + "&imsi="
			// + imei
			// +
			// "&model=1&merchants=000001&mobile=138001380001=&merchantsVersion=mer4.0&beforePushDate=2015-12-28 21:01:01&firstLogTime=2015-12-28 21:01:01&sysVersion=android4.0&region=中国深圳&timeZone=东八&smsCenter=400&mac=xxxxmac&sdkVersion=sdk5.0&cpu=Inteli5&memoryTotal=16G&memoryResidue=4G&resolution=720*320&baseband=xxx&coreVersion=neihe&newAppName=美团&newAppName=酷狗&newAppName=天猫&unloadAppName=京东&unloadAppName=小说阅读器";
			// Test.sendGet("http://localhost:8080/appManager/interfaceUploadAction!interfaceUploadAction",
			// param);
//		}
//		String str = "{\"info\": \"{\"os\":\"android\",\"model\":\"HM NOTE 1TD\",\"phone\":\"\",\"totalMemory\":\"1.91 GB\",\"sdSize\":\"5.87 GB\",\"memorySize\":\"5.92 GB\",\"osv\":17,\"imei\":\"865454020905579\",\"width\":720,\"mac\":\"64:09:80:e7:ef:f7\",\"timeZone\":\"Asia\\/Shanghai\",\"udid\":\"b137824660aac49c\",\"net\":\"wifi\",\"sdAvailSize\":\"640 MB\",\"lang\":\"zh\",\"vn\":\"1.0.0\",\"appName\":\"com.jp.jpad\",\"appList\":\"cmb.pb\",\"availMemory\":\"562 MB\",\"height\":1280,\"icc\":\"cn\",\"vc\":\"1\",\"availMemorySize\":\"690 MB\",\"imsi\":\"460000160193895\",\"channel\":\"appstore\"}}";
//		System.out.println(str);
		String str1 = "L1199.9.01.01.00";
		String str2 = "L1199.4.01.02.00";
		System.out.println(str2.compareTo(str1));
	}

	public static String generateNumber2() {
		String no = "";
		int num[] = new int[15];
		int c = 0;
		for (int i = 0; i < 15; i++) {
			num[i] = new Random().nextInt(10);
			c = num[i];
			for (int j = 0; j < i; j++) {
				if (num[j] == c) {
					i--;
					break;
				}
			}
		}
		if (num.length > 0) {
			for (int i = 0; i < num.length; i++) {
				no += num[i];
			}
		}
		return no;
	}

	/**
	 * 向指定URL发送GET方法的请求
	 * 
	 * @param url
	 *            发送请求的URL
	 * @param param
	 *            请求参数，请求参数应该是 name1=value1&name2=value2 的形式。
	 * @return URL 所代表远程资源的响应结果
	 */
	public static String sendGet(String url, String param) {
		String result = "";
		BufferedReader in = null;
		try {
			String urlNameString = url + "?" + param;
			URL realUrl = new URL(urlNameString);
			// 打开和URL之间的连接
			URLConnection connection = realUrl.openConnection();
			// 设置通用的请求属性
			connection.setRequestProperty("accept", "*/*");
			connection.setRequestProperty("connection", "Keep-Alive");
			connection.setRequestProperty("user-agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
			// 建立实际的连接
			connection.connect();
			// 获取所有响应头字段
			Map<String, List<String>> map = connection.getHeaderFields();
			// 遍历所有的响应头字段
			for (String key : map.keySet()) {
				System.out.println(key + "--->" + map.get(key));
			}
			// 定义 BufferedReader输入流来读取URL的响应
			in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
			String line;
			while ((line = in.readLine()) != null) {
				result += line;
			}
		} catch (Exception e) {
			System.out.println("发送GET请求出现异常！" + e);
			e.printStackTrace();
		}
		// 使用finally块来关闭输入流
		finally {
			try {
				if (in != null) {
					in.close();
				}
			} catch (Exception e2) {
				e2.printStackTrace();
			}
		}
		return result;
	}
}
