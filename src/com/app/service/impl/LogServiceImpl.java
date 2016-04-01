package com.app.service.impl;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.app.bean.Grid;
import com.app.bean.PageInfoBean;
import com.app.dao.MongoBaseDao;
import com.app.dao.SuperBaseDao;
import com.app.model.DeviceAccessLog;
import com.app.model.LoginLog;
import com.app.model.OperationLog;
import com.app.model.Terminal;
import com.app.model.Upgrade;
import com.app.model.UpgradeResultLog;
import com.app.model.User;
import com.app.service.LogService;
import com.app.util.DateUtil;
import com.mongodb.BasicDBObject;

@Service
public class LogServiceImpl implements LogService{

	@Autowired
	private MongoBaseDao mongoBaseDao;

	@Autowired
	private SuperBaseDao superBaseDao;
	
	/**
	 * 保存用户登录日志
	 */
	@Override
	public void saveLoginLog(User user, String ip, String type) {
//		LoginLog loginLog = new LoginLog();
//		loginLog.setUserName(user.getUserName());
//		loginLog.setFullName(user.getFullName());
//		//写入用户ip和ip所在地
//		loginLog.setIp(ip);
//		loginLog.setAddress(this.getAddresses(ip));
//		loginLog.setType(type);
//		loginLog.saveSession(user);
//		mongoBaseDao.save(loginLog,"loginLog");
	}

	/**
	 * 查询登陆日志列表
	 */
	@Override
	public Grid getLoginLogList(String userName,String fullName,String startTime,String endTime,String channelNo,PageInfoBean pageInfoBean) {
		Grid grid = new Grid();
		List<LoginLog> resultList = new ArrayList<LoginLog>();
		Map<String,Object> params = new HashMap<String,Object>();
		
		//渠道号
		if(StringUtils.isNotBlank(channelNo)&&!channelNo.equals("0")){
			params.put("channelNo",channelNo);
		}
		//用户姓名检索
		if (StringUtils.isNotBlank(fullName)){
			//模糊匹配
			Pattern pattern = Pattern.compile("^.*"+fullName+".*$", Pattern.CASE_INSENSITIVE);
			params.put("fullName",pattern);
		}
		//用户账号检索
		if (StringUtils.isNotBlank(userName)){
			//模糊匹配
			Pattern pattern = Pattern.compile("^.*"+userName+".*$", Pattern.CASE_INSENSITIVE);
			params.put("userName",pattern);
		}
		//登录时间检索
		BasicDBObject dateCondition = new BasicDBObject();
		Boolean isTrue = false;
		if (null != startTime) {
			dateCondition.append("$gte",startTime);
			isTrue = true;
		}
		if (null != endTime) {
			dateCondition.append("$lt",endTime);
			isTrue = true;
		}
		if(isTrue){
			params.put("createTime", dateCondition);
		}
		resultList = mongoBaseDao.findByQuery(LoginLog.class, params, pageInfoBean.getPage(), 
				pageInfoBean.getRows(),pageInfoBean.getSortName(), pageInfoBean.getSortOrder(), "loginLog");
		Long total = mongoBaseDao.CountByQuery(params, "loginLog");
		grid.setTotal(total);
		grid.setRows(resultList);
		return grid;
	}

	
	/**
	 * 获取ip对应地址
	 * @param ip
	 * @return
	 */
	public String getAddresses(String ip) {
		String httpUrl = "http://apis.baidu.com/apistore/iplookupservice/iplookup";
		String httpArg = "ip="+ip;
	    BufferedReader reader = null;
	    String result = null;
	    StringBuffer sbf = new StringBuffer();
	    httpUrl = httpUrl + "?" + httpArg;
	    String ipAddress="";
	    try {
	        URL url = new URL(httpUrl);
	        HttpURLConnection connection = (HttpURLConnection) url
	                .openConnection();
	        connection.setRequestMethod("GET");
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
		    JSONObject jsonObject = JSON.parseObject(result);
	        int errorNum = (int) jsonObject.get("errNum");
	        if(errorNum>0){
	        	ipAddress = "未分配或内网IP";
	        }else{
	        	Map map = (Map)jsonObject.get("retData");
	            ipAddress = map.get("country").toString()+map.get("province")+map.get("city")+map.get("carrier");  
	        }
		    if(ipAddress.indexOf("None")!=-1){
		    	ipAddress = "未分配或内网IP";
		    }
	    } catch (Exception e) {
	        e.printStackTrace();
	    }
        return ipAddress;
	}
	
	/**
	 * 保存用户操作日志
	 */
	@Override
	public void saveOperationLog(User user, String opName) {
		OperationLog opLog = new OperationLog();
		opLog.setUserName(user.getUserName());
		opLog.setFullName(user.getFullName());
		opLog.setOpName(opName);
		opLog.saveSession(user);
//		mongoBaseDao.save(opLog,"operationLog");
	}

	/**
	 * 查询用户操作日志
	 */
	@Override
	public Grid getOperationLogList(String userName, String fullName,
			String startTime, String endTime, String channelNo,
			PageInfoBean pageInfoBean) {
		Grid grid = new Grid();
		List<OperationLog> resultList = new ArrayList<OperationLog>();
		Map<String,Object> params = new HashMap<String,Object>();
		//渠道号
		if(StringUtils.isNotBlank(channelNo)&&!channelNo.equals("0")){
			params.put("channelNo",channelNo);
		}
		//用户姓名检索
		if (StringUtils.isNotBlank(fullName)){
			//模糊匹配
			Pattern pattern = Pattern.compile("^.*"+fullName+".*$", Pattern.CASE_INSENSITIVE);
			params.put("fullName",pattern);
		}
		//用户账号检索
		if (StringUtils.isNotBlank(userName)){
			//模糊匹配
			Pattern pattern = Pattern.compile("^.*"+userName+".*$", Pattern.CASE_INSENSITIVE);
			params.put("userName",pattern);
		}
		//操作时间检索
		BasicDBObject dateCondition = new BasicDBObject();
		Boolean isTrue = false;
		if (null != startTime) {
			dateCondition.append("$gte",startTime);
			isTrue = true;
		}
		if (null != endTime) {
			dateCondition.append("$lt",endTime);
			isTrue = true;
		}
		if(isTrue){
			params.put("createTime", dateCondition);
		}
		resultList = mongoBaseDao.findByQuery(OperationLog.class, params, pageInfoBean.getPage(), 
				pageInfoBean.getRows(),pageInfoBean.getSortName(), pageInfoBean.getSortOrder(), "operationLog");
		Long total = mongoBaseDao.CountByQuery(params, "operationLog");
		grid.setTotal(total);
		grid.setRows(resultList);
		return grid;
	}

	
	/**
	 * 插入设备访问日志
	 */
	@Override
	public void saveDeviceAccessLog(Integer terminalId,String interfaceName,String opName,String result) {
		DeviceAccessLog deviceLog = new DeviceAccessLog();
		deviceLog.setTerminalId(terminalId);
		Terminal ter = (Terminal) superBaseDao.getById(Terminal.class, terminalId);
		if(null!=ter){
			deviceLog.setChannelNo(ter.getChannelNo());
		}
		deviceLog.setOpName(opName);
		deviceLog.setInterfaceName(interfaceName);
		deviceLog.setResult(result);
		deviceLog.setCreateTime(new Date());
		mongoBaseDao.save(deviceLog,"deviceAccessLog");
	}

	/**
	 * 查询设备访问日志
	 */
	@Override
	public Grid getDeviceAccessLogList(String startTime, String endTime,
			String channelNo, PageInfoBean pageInfoBean) {
		Grid grid = new Grid();
		List<DeviceAccessLog> resultList = new ArrayList<DeviceAccessLog>();
		Map<String,Object> params = new HashMap<String,Object>();
		//渠道号
		if(StringUtils.isNotBlank(channelNo)&&!channelNo.equals("0")){
			params.put("channelNo",channelNo);
		}
		//操作时间检索
		BasicDBObject dateCondition = new BasicDBObject();
		Boolean isTrue = false;
		if (null != startTime) {
			dateCondition.append("$gte",startTime);
			isTrue = true;
		}
		if (null != endTime) {
			dateCondition.append("$lt",endTime);
			isTrue = true;
		}
		if(isTrue){
			params.put("createTime", dateCondition);
		}
		resultList = mongoBaseDao.findByQuery(DeviceAccessLog.class, params, pageInfoBean.getPage(), 
				pageInfoBean.getRows(),pageInfoBean.getSortName(), pageInfoBean.getSortOrder(), "deviceAccessLog");
		Long total = mongoBaseDao.CountByQuery(params, "deviceAccessLog");
		grid.setTotal(total);
		grid.setRows(resultList);
		return grid;
	}

	/**
	 * 写入升级结果日志
	 */
	@Override
	public void saveUpgradeResultLog(Integer terminalId,String upgradeId,String upgradeResult,String errorLog) {
		UpgradeResultLog url = new UpgradeResultLog();
		url.setTerminalId(terminalId);
		Terminal ter = (Terminal) superBaseDao.getById(Terminal.class, terminalId);
		if(null!=ter){
			url.setChannelNo(ter.getChannelNo());
		}
		Upgrade up = (Upgrade) superBaseDao.getById(Upgrade.class, upgradeId);
		if(null!=up){
			url.setMerchants(up.getMerchants());
			url.setVersion(up.getVersion());
		}
		url.setErrorLog(errorLog);
		url.setUpgradeResult(upgradeResult);
		url.setCreateTime(new Date());
		mongoBaseDao.save(url,"upgradeResultLog");
	}

	/**
	 * 查询升级结果日志
	 */
	@Override
	public Grid getUpgradeResultLog(String startTime, String endTime,String channelNo, PageInfoBean pageInfoBean) {
		Grid grid = new Grid();
		List<Upgrade> resultList = new ArrayList<Upgrade>();
		Map<String,Object> params = new HashMap<String,Object>();
		//渠道号
		if(StringUtils.isNotBlank(channelNo)&&!channelNo.equals("0")){
			params.put("channelNo",channelNo);
		}
		//操作时间检索
		BasicDBObject dateCondition = new BasicDBObject();
		Boolean isTrue = false;
		if (null != startTime) {
			dateCondition.append("$gte",startTime);
			isTrue = true;
		}
		if (null != endTime) {
			dateCondition.append("$lt",endTime);
			isTrue = true;
		}
		if(isTrue){
			params.put("createTime", dateCondition);
		}
		resultList = mongoBaseDao.findByQuery(Upgrade.class, params, pageInfoBean.getPage(), 
				pageInfoBean.getRows(),pageInfoBean.getSortName(), pageInfoBean.getSortOrder(), "upgradeResultLog");
		Long total = mongoBaseDao.CountByQuery(params, "upgradeResultLog");
		grid.setTotal(total);
		grid.setRows(resultList);
		return grid;
	}
}
