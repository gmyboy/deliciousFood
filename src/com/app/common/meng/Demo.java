package com.app.common.meng;

import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import com.app.common.meng.android.AndroidBroadcast;
import com.app.common.meng.android.AndroidCustomizedcast;
import com.app.common.meng.android.AndroidFilecast;
import com.app.common.meng.android.AndroidGroupcast;
import com.app.common.meng.ios.IOSBroadcast;
import com.app.common.meng.ios.IOSCustomizedcast;
import com.app.common.meng.ios.IOSFilecast;
import com.app.common.meng.ios.IOSGroupcast;
import com.app.common.meng.ios.IOSUnicast;
import com.app.util.PropertiesUtils;

public class Demo {
	private String appkey = PropertiesUtils.getProperty("appkey");
	private String appMasterSecret = PropertiesUtils.getProperty("appMasterSecret");
	// private String timestamp = null;
	private PushClient client = new PushClient();

	public Demo(String key, String secret) {
		try {
			appkey = key;
			appMasterSecret = secret;
		} catch (Exception e) {
			e.printStackTrace();
			System.exit(1);
		}
	}

	public void sendAndroidBroadcast() throws Exception {
		AndroidBroadcast broadcast = new AndroidBroadcast(appkey, appMasterSecret);
		broadcast.setTicker("Android broadcast ticker");
		broadcast.setTitle("中文的title");
		broadcast.setText("Android broadcast text");
		broadcast.goAppAfterOpen();
		broadcast.setDisplayType(AndroidNotification.DisplayType.NOTIFICATION);
		// TODO Set 'production_mode' to 'false' if it's a test device.
		// For how to register a test device, please see the developer doc.
		broadcast.setProductionMode();
		// Set customized fields
		broadcast.setExtraField("test", "helloworld");
		client.send(broadcast);
	}

	/**
	 * android 单推
	 * 
	 * @throws Exception
	 */
	public void sendAndroidUnicast(List<String> deviceTokenList, String title, String text) throws Exception {
		AndroidUnicast unicasts = new AndroidUnicast(appkey, appMasterSecret);
		// TODO 设置tocket
		unicasts.setDeviceToken(deviceTokenList.toString());
		unicasts.setTicker("internal");
		unicasts.setTitle(title);
		unicasts.setText(text);
		unicasts.goAppAfterOpen();
		unicasts.setDisplayType(AndroidNotification.DisplayType.NOTIFICATION);
		// TODO "production_mode”设置为“假”如果是测试设备。
		// 正式
		unicasts.setProductionMode(Boolean.valueOf(PropertiesUtils.getProperty("appMasterSecret")));
		// 设置自定义字段
		// unicasts.setExtraField("test", "helloworld");
		client.send(unicasts);
	}

	public void sendAndroidGroupcast() throws Exception {
		AndroidGroupcast groupcast = new AndroidGroupcast(appkey, appMasterSecret);
		/*
		 * TODO Construct the filter condition: "where": { "and": [
		 * {"tag":"test"}, {"tag":"Test"} ] }
		 */
		JSONObject filterJson = new JSONObject();
		JSONObject whereJson = new JSONObject();
		JSONArray tagArray = new JSONArray();
		JSONObject testTag = new JSONObject();
		JSONObject TestTag = new JSONObject();
		testTag.put("tag", "test");
		TestTag.put("tag", "Test");
		tagArray.put(testTag);
		tagArray.put(TestTag);
		whereJson.put("and", tagArray);
		filterJson.put("where", whereJson);
		System.out.println(filterJson.toString());

		groupcast.setFilter(filterJson);
		groupcast.setTicker("Android groupcast ticker");
		groupcast.setTitle("中文的title");
		groupcast.setText("Android groupcast text");
		groupcast.goAppAfterOpen();
		groupcast.setDisplayType(AndroidNotification.DisplayType.NOTIFICATION);
		// TODO Set 'production_mode' to 'false' if it's a test device.
		// For how to register a test device, please see the developer doc.
		groupcast.setProductionMode();
		client.send(groupcast);
	}

	public void sendAndroidCustomizedcast() throws Exception {
		AndroidCustomizedcast customizedcast = new AndroidCustomizedcast(appkey, appMasterSecret);
		// TODO Set your alias here, and use comma to split them if there are
		// multiple alias.
		// And if you have many alias, you can also upload a file containing
		// these alias, then
		// use file_id to send customized notification.
		customizedcast.setAlias("alias", "alias_type");
		customizedcast.setTicker("Android customizedcast ticker");
		customizedcast.setTitle("中文的title");
		customizedcast.setText("Android customizedcast text");
		customizedcast.goAppAfterOpen();
		customizedcast.setDisplayType(AndroidNotification.DisplayType.NOTIFICATION);
		// TODO Set 'production_mode' to 'false' if it's a test device.
		// For how to register a test device, please see the developer doc.
		customizedcast.setProductionMode();
		client.send(customizedcast);
	}

	public void sendAndroidCustomizedcastFile() throws Exception {
		AndroidCustomizedcast customizedcast = new AndroidCustomizedcast(appkey, appMasterSecret);
		// TODO Set your alias here, and use comma to split them if there are
		// multiple alias.
		// And if you have many alias, you can also upload a file containing
		// these alias, then
		// use file_id to send customized notification.
		String fileId = client.uploadContents(appkey, appMasterSecret, "aa" + "\n" + "bb" + "\n" + "alias");
		customizedcast.setFileId(fileId, "alias_type");
		customizedcast.setTicker("Android customizedcast ticker");
		customizedcast.setTitle("中文的title");
		customizedcast.setText("Android customizedcast text");
		customizedcast.goAppAfterOpen();
		customizedcast.setDisplayType(AndroidNotification.DisplayType.NOTIFICATION);
		// TODO Set 'production_mode' to 'false' if it's a test device.
		// For how to register a test device, please see the developer doc.
		customizedcast.setProductionMode();
		client.send(customizedcast);
	}

	public void sendAndroidFilecast() throws Exception {
		AndroidFilecast filecast = new AndroidFilecast(appkey, appMasterSecret);
		// TODO upload your device tokens, and use '\n' to split them if there
		// are multiple tokens
		String fileId = client.uploadContents(appkey, appMasterSecret, "aa" + "\n" + "bb");
		filecast.setFileId(fileId);
		filecast.setTicker("Android filecast ticker");
		filecast.setTitle("中文的title");
		filecast.setText("Android filecast text");
		filecast.goAppAfterOpen();
		filecast.setDisplayType(AndroidNotification.DisplayType.NOTIFICATION);
		client.send(filecast);
	}

	public void sendIOSBroadcast() throws Exception {
		IOSBroadcast broadcast = new IOSBroadcast(appkey, appMasterSecret);

		broadcast.setAlert("IOS 广播测试");
		broadcast.setBadge(0);
		broadcast.setSound("default");
		// TODO set 'production_mode' to 'true' if your app is under production
		// mode
		broadcast.setTestMode();
		// Set customized fields
		broadcast.setCustomizedField("test", "helloworld");
		client.send(broadcast);
	}

	public void sendIOSUnicast() throws Exception {
		IOSUnicast unicast = new IOSUnicast(appkey, appMasterSecret);
		// TODO Set your device token
		unicast.setDeviceToken("xx");
		unicast.setAlert("IOS 单播测试");
		unicast.setBadge(0);
		unicast.setSound("default");
		// TODO set 'production_mode' to 'true' if your app is under production
		// mode
		unicast.setTestMode();
		// Set customized fields
		unicast.setCustomizedField("test", "helloworld");
		client.send(unicast);
	}

	public void sendIOSGroupcast() throws Exception {
		IOSGroupcast groupcast = new IOSGroupcast(appkey, appMasterSecret);
		/*
		 * TODO Construct the filter condition: "where": { "and": [
		 * {"tag":"iostest"} ] }
		 */
		JSONObject filterJson = new JSONObject();
		JSONObject whereJson = new JSONObject();
		JSONArray tagArray = new JSONArray();
		JSONObject testTag = new JSONObject();
		testTag.put("tag", "iostest");
		tagArray.put(testTag);
		whereJson.put("and", tagArray);
		filterJson.put("where", whereJson);
		System.out.println(filterJson.toString());

		// Set filter condition into rootJson
		groupcast.setFilter(filterJson);
		groupcast.setAlert("IOS 组播测试");
		groupcast.setBadge(0);
		groupcast.setSound("default");
		// TODO set 'production_mode' to 'true' if your app is under production
		// mode
		groupcast.setTestMode();
		client.send(groupcast);
	}

	public void sendIOSCustomizedcast() throws Exception {
		IOSCustomizedcast customizedcast = new IOSCustomizedcast(appkey, appMasterSecret);
		// TODO Set your alias and alias_type here, and use comma to split them
		// if there are multiple alias.
		// And if you have many alias, you can also upload a file containing
		// these alias, then
		// use file_id to send customized notification.
		customizedcast.setAlias("alias", "alias_type");
		customizedcast.setAlert("IOS 个性化测试");
		customizedcast.setBadge(0);
		customizedcast.setSound("default");
		// TODO set 'production_mode' to 'true' if your app is under production
		// mode
		customizedcast.setTestMode();
		client.send(customizedcast);
	}

	public void sendIOSFilecast() throws Exception {
		IOSFilecast filecast = new IOSFilecast(appkey, appMasterSecret);
		// TODO upload your device tokens, and use '\n' to split them if there
		// are multiple tokens
		String fileId = client.uploadContents(appkey, appMasterSecret, "aa" + "\n" + "bb");
		filecast.setFileId(fileId);
		filecast.setAlert("IOS 文件播测试");
		filecast.setBadge(0);
		filecast.setSound("default");
		// TODO set 'production_mode' to 'true' if your app is under production
		// mode
		filecast.setTestMode();
		client.send(filecast);
	}

	public void sendUnicast(String deviceToken, String title, String text, boolean environment) throws Exception {
		IOSUnicast unicast = new IOSUnicast(appkey, appMasterSecret);
		unicast.setDeviceToken(deviceToken);
		unicast.setAlert(text);
		unicast.setBadge(0);
		unicast.setSound("default");
		// TODO “production_mode”设置为“真正的”如果你的应用正在生产中
		unicast.setProductionMode(environment);
		// 设置自定义字段
		// unicast.setCustomizedField("test", "helloworld");
		client.send(unicast);

		AndroidUnicast unicasts = new AndroidUnicast(appkey, appMasterSecret);
		// TODO 设置tocket
		unicasts.setDeviceToken(deviceToken);
		unicasts.setTicker("Android unicast ticker");
		unicasts.setTitle(title);
		unicasts.setText(text);
		unicasts.goAppAfterOpen();
		unicasts.setDisplayType(AndroidNotification.DisplayType.NOTIFICATION);
		// TODO "production_mode”设置为“假”如果是测试设备。
		// 正式
		unicasts.setProductionMode(environment);
		// 设置自定义字段
		// unicasts.setExtraField("test", "helloworld");
		client.send(unicast);
	}

	public static void main(String[] args) {
		// TODO set your appkey and master secret here
		Demo demo = new Demo(PropertiesUtils.getProperty("appkey"), PropertiesUtils.getProperty("ppMasterSecret"));
		try {
			// demo.sendAndroidUnicast();
			/*
			 * TODO these methods are all available, just fill in some fields
			 * and do the test demo.sendAndroidCustomizedcastFile();
			 * demo.sendAndroidBroadcast(); demo.sendAndroidGroupcast();
			 * demo.sendAndroidCustomizedcast(); demo.sendAndroidFilecast();
			 * 
			 * demo.sendIOSBroadcast(); demo.sendIOSUnicast();
			 * demo.sendIOSGroupcast(); demo.sendIOSCustomizedcast();
			 * demo.sendIOSFilecast();
			 */
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

}
