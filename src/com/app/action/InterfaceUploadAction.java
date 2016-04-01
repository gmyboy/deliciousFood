package com.app.action;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.RandomAccessFile;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSONObject;
import com.app.bean.JsonApp;
import com.app.model.Terminal;
import com.app.model.Upgrade;
import com.app.model.User;
import com.app.service.LogService;
import com.app.service.TerminalService;
import com.app.service.UpgradeService;
import com.app.util.GiveClassReflectionUtil;
import com.app.util.PropertiesUtils;

@Namespace("/")
@Action("/appInterface")
@Results({ @Result(name = "success", location = "/success.jsp"), @Result(name = "error", location = "/login.jsp"), @Result(name = "index", location = "/index.jsp") })
public class InterfaceUploadAction extends BaseAction {

	private static final long serialVersionUID = 1L;
	private Logger logger = Logger.getLogger(InterfaceUploadAction.class);
	@Autowired
	private TerminalService terminalService;
	@Autowired
	private UpgradeService upgradeService;
	@Autowired
	private LogService logService;
	
	//升级包Id
	private String upgradeId;

	// 终端信息
	private String info;

	// 终端Id
	private String terminalId;

	// 版本号
	private String version;
	
	private String model;
	
	private String base_utc;
	
	private String utc;

	/**
	 * 上传终端信息接口
	 */
	public String dnss_terminal() {
		JsonApp json = new JsonApp();
		try {
			String terInfo = "";
			if (StringUtils.isNotBlank(info)) {
				terInfo = info;
			} else {
				InputStream inputStream = getRequest().getInputStream();
				StringBuffer requestBuffer = new StringBuffer();
				BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, "utf-8"));
				String readLine;
				while ((readLine = reader.readLine()) != null) {
					requestBuffer.append(readLine).append("\n");
				}
				String reqStr = requestBuffer.toString();

				Map<String, Object> map = JSONObject.parseObject(reqStr);
				if (null != map) {
					terInfo = map.get("info") == null ? "" : map.get("info").toString();
				}
			}
			if (!StringUtils.isNotBlank(terInfo)) {
				json.setStatusCode(199);
				json.setMessage("上传终端信息失败,终端信息为空!");
				writeJson(json);
				return null;
			}
			logger.info("终端上传参数:"+terInfo);
			Map<String, Integer> mapResult = new HashMap<String, Integer>();
			Terminal ter = JSONObject.parseObject(terInfo, Terminal.class);
			Integer id = ter.getId();
			String opName = "";
			if (null == id) {
				json.setStatusCode(101);
				json.setMessage("请求参数错误,id不能为空");
				writeJson(json);
				return null;
			} else {
				Terminal terUdId = terminalService.getTerminalByUdId(ter.getUdid());
				// ID表示新增
				if (id == 0 && terUdId == null) {
					ter.setId(null);
					ter.setIp(getRequest().getRemoteAddr());
					ter.saveSession((User) getSession().getAttribute("user"));
					ter.setStatus(1);
					terminalService.saveTerminalInfo(ter);
					mapResult.put("id", ter.getId());
					opName = "新增";
				} else {
					if (null == terUdId) {
						ter.setIp(getRequest().getRemoteAddr());
						ter.saveSession((User) getSession().getAttribute("user"));
						ter.setStatus(1);
						terminalService.saveTerminalInfo(ter);
						mapResult.put("id", ter.getId());
						opName = "新增";
					} else {
						GiveClassReflectionUtil.reflectionIsEmptyAttr(ter, terUdId);
						terUdId.setIp(getRequest().getRemoteAddr());
						terUdId.updateSession((User) getSession().getAttribute("user"));
						logger.info("终端更新的数据:"+JSONObject.toJSONString(terUdId));
						terminalService.saveTerminalInfo(terUdId);
						mapResult.put("id", terUdId.getId());
						opName = "更新";
					}
				}
				json.setStatusCode(100);
				json.setMessage("成功");
				json.setData(mapResult);
				// 写入设备访问日志
				writeJson(json);
				logService.saveDeviceAccessLog(mapResult.get("id"), "终端信息上传", opName,json.getMessage());
			}
		} catch (Exception e) {
			logger.error("上传终端信息失败！", e);
			json.setStatusCode(199);
			json.setMessage("上传终端信息失败");
			writeJson(json);
		}
		return null;
	}

	/**
	 * 升级包查询接口
	 */
	public String dnss_queryInfo() {
		JsonApp json = new JsonApp();
		try {
			String terminalIdNew = "";
			String versionNew = "";
			if (StringUtils.isNotBlank(terminalId) && StringUtils.isNotBlank(version)) {
				terminalIdNew = terminalId;
				versionNew = version;
			} else {
				InputStream inputStream = getRequest().getInputStream();
				StringBuffer requestBuffer = new StringBuffer();
				BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, "utf-8"));
				String readLine;
				while ((readLine = reader.readLine()) != null) {
					requestBuffer.append(readLine).append("\n");
				}
				String reqStr = requestBuffer.toString();
				Map<String, Object> map = JSONObject.parseObject(reqStr);
				if (null != map) {
					terminalIdNew = map.get("terminalId") == null ? "" : map.get("terminalId").toString();
					versionNew = map.get("version") == null ? "" : map.get("version").toString();
				}
			}
			Map<String, Integer> mapResult = new HashMap<String, Integer>();
			logger.info("------升级包查询接口参数：terminalId:"+terminalIdNew+",version:"+versionNew);
			// 必填字段
			if (!StringUtils.isNotBlank(terminalIdNew) || !StringUtils.isNotBlank(versionNew)) {
				json.setStatusCode(101);
				json.setMessage("参数错误");
				writeJson(json);
			} else {
				Terminal terminal = terminalService.getById(Integer.valueOf(terminalIdNew));
				if (null != terminal && terminal.getStatus() == 1) {
					Upgrade upgrade = upgradeService.getUpgradeByAppVersion(versionNew);
					if (null!=upgrade&&!upgrade.getVersion().equals(versionNew)) {
						json.setMessage("升级包查询成功");
						json.setStatusCode(100);
						json.setData(upgrade);
						writeJson(json);
						mapResult.put("id", Integer.valueOf(terminalIdNew));
						logService.saveDeviceAccessLog(mapResult.get("id"), "升级包查询", "查询", "成功");
					} else {
						json.setStatusCode(211);
						json.setMessage("暂无可更新信息");
						writeJson(json);
						logService.saveDeviceAccessLog(Integer.parseInt(terminalIdNew), "升级包查询", "查询", "失败,无可更新信息");
					}
				} else {
					json.setMessage("终端信息不存在或者为停用状态");
					json.setStatusCode(212);
					writeJson(json);
					mapResult.put("id", Integer.valueOf(terminalIdNew));
					logService.saveDeviceAccessLog(mapResult.get("id"), "升级包查询", "查询", "失败,终端信息不存在或者为停用状态");
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("升级包查询接口失败", e);
			json.setStatusCode(199);
			json.setMessage("升级包查询接口失败");
			writeJson(json);
		}
		return null;
	}
	
	/**
	 * 升级包查询接口
	 */
	public String dnss_updateInfo() {
		JsonApp json = new JsonApp();
		try {
			//Id,型号,品牌，渠道号,imei，imsi，mobile,android版本号，剩余存储，基带版本，内核版本，系统软件版本号
			String terminalIdNew = "";
			String modelNew = "";
			String base_utcNew = "";
			String imsi="";
			String imei="";
			String phone="";
			String osv="";
			String kernelVersion="";
			String basebandVersion="";
			String brand="";

			String utcNew = "";
			if (StringUtils.isNotBlank(terminalId) && StringUtils.isNotBlank(model)) {
				terminalIdNew = terminalId;
				modelNew = model;
				base_utcNew = base_utc;
				utcNew = utc;
			} else {
				InputStream inputStream = getRequest().getInputStream();
				StringBuffer requestBuffer = new StringBuffer();
				BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, "utf-8"));
				String readLine;
				while ((readLine = reader.readLine()) != null) {
					requestBuffer.append(readLine).append("\n");
				}
				String reqStr = requestBuffer.toString();
				Map<String, Object> map = JSONObject.parseObject(reqStr);
				if (null != map) {
					terminalIdNew = map.get("terminalId") == null ? "" : map.get("terminalId").toString();
					modelNew = map.get("model") == null ? "" : map.get("model").toString();
					base_utcNew = map.get("base_utc") == null ? "" : map.get("base_utc").toString();
					utcNew = map.get("utc") == null ? "" : map.get("utc").toString();
					imsi=map.get("imsi") == null ? "" : map.get("imsi").toString();;
					imei=map.get("imei") == null ? "" : map.get("imei").toString();;
					phone=map.get("phone") == null ? "" : map.get("phone").toString();;
					osv=map.get("osv") == null ? "" : map.get("osv").toString();;
					version=map.get("version") == null ? "" : map.get("version").toString();;
					kernelVersion=map.get("kernelVersion") == null ? "" : map.get("kernelVersion").toString();;
					basebandVersion=map.get("basebandVersion") == null ? "" : map.get("basebandVersion").toString();;
					brand=map.get("brand") == null ? "" : map.get("brand").toString();;
				}
			}
			logger.info("------升级包查询接口参数：model:"+modelNew+",terminalId"+terminalIdNew+",imsi:"+imsi+",imei:"+imei+",phone:"+phone+",osv:"+osv+",version:"
					+version+",kernelVersion:"+",basebandVersion:"+basebandVersion+",brand:"+brand);
			// 必填字段
			if (!StringUtils.isNotBlank(modelNew)) {
				json.setStatusCode(101);
				json.setMessage("参数错误");
				writeJson(json);
			} else {
					Upgrade upgrade = null;
					if(StringUtils.isNotBlank(version)){
						upgrade = upgradeService.getUpgradeByVersion(version, modelNew);
						Terminal ter = terminalService.getById(StringUtils.isNotBlank(terminalIdNew)?Integer.parseInt(terminalIdNew):0);
						if(null!=ter){
							if(StringUtils.isNotBlank(imsi)){
								ter.setImsi(imsi);
							}
							if(StringUtils.isNotBlank(imei)){
								ter.setImei(imei);
							}
							if(StringUtils.isNotBlank(phone)){
								ter.setPhone(phone);
							}
							if(StringUtils.isNotBlank(osv)){
								ter.setOsv(osv);
							}
							if(StringUtils.isNotBlank(kernelVersion)){
								ter.setKernelVersion(kernelVersion);
							}
							if(StringUtils.isNotBlank(basebandVersion)){
								ter.setBasebandVersion(basebandVersion);
							}
							if(StringUtils.isNotBlank(brand)){
								ter.setBrand(brand);
							}
							terminalService.updateTerminal(ter);
						}
					}else{
						upgrade = upgradeService.getUpgradeByModel(modelNew,base_utcNew,utcNew);
					}
					if (null!=upgrade) {
						json.setMessage("升级包查询成功");
						json.setStatusCode(100);
						json.setData(upgrade);
						writeJson(json);
						logService.saveDeviceAccessLog(Integer.valueOf(terminalIdNew), "升级包查询", "查询", "成功");
					} else {
						json.setStatusCode(211);
						json.setMessage("暂无可更新信息");
						writeJson(json);
						logService.saveDeviceAccessLog(Integer.valueOf(terminalIdNew), "升级包查询", "查询", "失败,无可更新信息");
					}
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("升级包查询接口失败", e);
			json.setStatusCode(199);
			json.setMessage("升级包查询接口失败");
			writeJson(json);
		}
		return null;
	}
	
	//升级结果（1：成功、2：失败）
	private String upgradeResult;
	
	//失败日志
	private String errorLog;
	
	/**
	 * 升级结果返回
	 */
	public String dnss_upResult() {
		JsonApp json = new JsonApp();
		try {
			String upgradeResultNew = "";
			String errorLogNew = "";
			String terminalIdNew = "";
			String upgradeIdNew = "";
			if (StringUtils.isNotBlank(terminalId)) {
				terminalIdNew = terminalId;
				upgradeResultNew = upgradeResult;
				errorLogNew = errorLog;
				upgradeIdNew = upgradeId;
			} else {
				InputStream inputStream = getRequest().getInputStream();
				StringBuffer requestBuffer = new StringBuffer();
				BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, "utf-8"));
				String readLine;
				while ((readLine = reader.readLine()) != null) {
					requestBuffer.append(readLine).append("\n");
				}
				String reqStr = requestBuffer.toString();
				Map<String, Object> map = JSONObject.parseObject(reqStr);
				if (null != map) {
					terminalIdNew = map.get("terminalId") == null ? "" : map.get("terminalId").toString();
					upgradeResultNew = map.get("upgradeResult") == null ? "" : map.get("upgradeResult").toString();
					errorLogNew = map.get("errorLog") == null ? "" : map.get("errorLog").toString();;
					upgradeIdNew = map.get("upgradeId") == null ? "" : map.get("upgradeId").toString();;
				}
			}
			Map<String, Integer> mapResult = new HashMap<String, Integer>();
			logger.info("------参数：terminalId:"+terminalIdNew+",upgradeResult:"+upgradeResultNew+",errorLog:"+errorLogNew+",upgradeId:"+upgradeIdNew);
			// 必填字段
			if (!StringUtils.isNotBlank(upgradeResultNew) ||!StringUtils.isNotBlank(terminalIdNew) || !StringUtils.isNotBlank(upgradeIdNew)) {
				json.setStatusCode(101);
				json.setMessage("参数错误");
				writeJson(json);
			} else {
				logService.saveUpgradeResultLog(Integer.parseInt(terminalIdNew), upgradeIdNew, upgradeResultNew, errorLogNew);
				json.setStatusCode(100);
				json.setMessage("成功");
				writeJson(json);
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("升级结果上传失败", e);
			json.setStatusCode(199);
			json.setMessage("升级结果上传失败");
			writeJson(json);
		}
		return null;
	}
	
	
	public void dnss_download() {
		HttpServletRequest request = getRequest();
		HttpServletResponse response = getResponse();
		try {
			logger.info("请求下载的连接地址为：" + request.getRequestURL() + "?" + request.getQueryString());
			// Assert.hasText(name);
		} catch (IllegalArgumentException e) {
			logger.error("请求下载的文件名参数为空！");
			return;
		}
		// 磁盘根目录
		String diskPath = PropertiesUtils.getProperties().getProperty("diskPath");
		Upgrade upgrade = upgradeService.getById(upgradeId);
		String path = diskPath + upgrade.getFilePath();
		// String path = "http://127.0.0.1:8080/upload/2016/01/16/LoadTest.nbh";
		logger.info("文件拼装路径：" + path);
		File downloadFile = new File(path);
		if (downloadFile.exists()) {
			if (downloadFile.isFile()) {
				if (downloadFile.length() > 0) {
				} else {
					logger.info("请求下载的文件是一个空文件");
					return;
				}
				if (!downloadFile.canRead()) {
					logger.info("请求下载的文件不是一个可读的文件");
					return;
				} else {
				}
			} else {
				logger.info("请求下载的文件是一个文件夹");
				return;
			}
		} else {
			logger.info("请求下载的文件不存在！");
			return;
		}
		long fileLength = downloadFile.length(); // 记录文件大小
		long pastLength = 0; // 记录已下载文件大小
		int rangeSwitch = 0; // 0：从头开始的全文下载；1：从某字节开始的下载（bytes=27000-）；2：从某字节开始到某字节结束的下载（bytes=27000-39000）
		long toLength = 0; // 记录客户端需要下载的字节段的最后一个字节偏移量（比如bytes=27000-39000，则这个值是为39000）
		long contentLength = 0; // 客户端请求的字节总量
		String rangeBytes = ""; // 记录客户端传来的形如“bytes=27000-”或者“bytes=27000-39000”的内容
		RandomAccessFile raf = null; // 负责读取数据
		OutputStream os = null; // 写出数据
		OutputStream out = null; // 缓冲
		byte b[] = new byte[1024]; // 暂存容器
		if (request.getHeader("Range") != null) { // 客户端请求的下载的文件块的开始字节
			response.setStatus(javax.servlet.http.HttpServletResponse.SC_PARTIAL_CONTENT);
			logger.info("request.getHeader(\"Range\")=" + request.getHeader("Range"));
			rangeBytes = request.getHeader("Range").replaceAll("bytes=", "");
			if (rangeBytes.indexOf('-') == rangeBytes.length() - 1) {// bytes=969998336-
				rangeSwitch = 1;
				rangeBytes = rangeBytes.substring(0, rangeBytes.indexOf('-'));
				pastLength = Long.parseLong(rangeBytes.trim());
				contentLength = fileLength - pastLength; // 客户端请求的是 969998336
															// 之后的字节
			} else { // bytes=1275856879-1275877358
				rangeSwitch = 2;
				String temp0 = rangeBytes.substring(0, rangeBytes.indexOf('-'));
				String temp2 = rangeBytes.substring(rangeBytes.indexOf('-') + 1, rangeBytes.length());
				// bytes=1275856879-1275877358，从第 1275856879 个字节开始下载
				pastLength = Long.parseLong(temp0.trim());
				// bytes=1275856879-1275877358，到第1275877358 个字节结束
				toLength = Long.parseLong(temp2);
				// 客户端请求的是1275856879-1275877358之间的字节
				contentLength = toLength - pastLength;
			}
		} else { // 从开始进行下载
			contentLength = fileLength; // 客户端要求全文下载
		}

		/**
		 * 如果设设置了Content -Length，则客户端会自动进行多线程下载。如果不希望支持多线程，则不要设置这个参数。 响应的格式是:
		 * Content - Length: [文件的总大小] - [客户端请求的下载的文件块的开始字节]
		 * ServletActionContext.getResponse().setHeader("Content- Length", new
		 * Long(file.length() - p).toString());
		 */
		response.reset();
		// 告诉客户端允许断点续传多线程连接下载,响应的格式是:Accept-Ranges: bytes如果是第一次下,
		// 还没有断点续传,状态是默认的200,无需显式设置;响应的格式是:HTTP/1.1 200 OK
		response.setHeader("Accept-Ranges", "bytes");

		if (pastLength != 0) {
			// 不是从最开始下载,
			// 响应的格式是:
			// Content-Range: bytes [文件块的开始字节]-[文件的总大小 - 1]/[文件的总大小]
			logger.info("----------------------------不是从开始进行下载！服务器即将开始断点续传...");
			switch (rangeSwitch) {
			case 1: { // 针对 bytes=27000- 的请求
				String contentRange = new StringBuffer("bytes ").append(new Long(pastLength).toString()).append("-").append(new Long(fileLength - 1).toString()).append("/")
						.append(new Long(fileLength).toString()).toString();
				response.setHeader("Content-Range", contentRange);
				break;
			}
			case 2: { // 针对 bytes=27000-39000 的请求
				String contentRange = rangeBytes + "/" + new Long(fileLength).toString();
				response.setHeader("Content-Range", contentRange);
				break;
			}
			default: {
				break;
			}
			}
		} else {
			// 是从开始下载
			logger.info("----------------------------是从开始进行下载！");
		}

		try {
			response.addHeader("Content-Disposition", "attachment; filename=\"" + downloadFile.getName() + "\"");
			response.setContentType("application/octet-stream");
			response.addHeader("Content-Length", String.valueOf(contentLength));
			os = response.getOutputStream();
			out = new BufferedOutputStream(os);
			raf = new RandomAccessFile(downloadFile, "r");
			try {
				switch (rangeSwitch) {
				case 0: { // 普通下载，或者从头开始的下载
					// 同1
				}
				case 1: { // 针对 bytes=27000- 的请求
					raf.seek(pastLength); // 形如 bytes=969998336- 的客户端请求，跳过
											// 969998336 个字节
					int n = 0;
					while ((n = raf.read(b, 0, 1024)) != -1) {
						out.write(b, 0, n);
					}
					break;
				}
				case 2: { // 针对 bytes=27000-39000 的请求
					raf.seek(pastLength); // 形如 bytes=1275856879-1275877358
											// 的客户端请求，找到第 1275856879 个字节
					int n = 0;
					long readLength = 0; // 记录已读字节数
					while (readLength <= contentLength - 1024) {// 大部分字节在这里读取
						n = raf.read(b, 0, 1024);
						readLength += 1024;
						out.write(b, 0, n);
					}
					if (readLength <= contentLength) { // 余下的不足 1024 个字节在这里读取
						n = raf.read(b, 0, (int) (contentLength - readLength));
						out.write(b, 0, n);
					}
					break;
				}
				default: {
					break;
				}
				}
				out.flush();
				logger.info("------------------------------下载结束");
			} catch (IOException ie) {
				/**
				 * 在写数据的时候， 对于 ClientAbortException 之类的异常，
				 * 是因为客户端取消了下载，而服务器端继续向浏览器写入数据时， 抛出这个异常，这个是正常的。
				 * 尤其是对于迅雷这种吸血的客户端软件， 明明已经有一个线程在读取 bytes=1275856879-1275877358，
				 * 如果短时间内没有读取完毕，迅雷会再启第二个、第三个。。。线程来读取相同的字节段， 直到有一个线程读取完毕，迅雷会 KILL
				 * 掉其他正在下载同一字节段的线程， 强行中止字节读出，造成服务器抛 ClientAbortException。
				 * 所以，我们忽略这种异常
				 */
				// ignore
				logger.info("#提醒# 向客户端传输时出现IO异常，但此异常是允许的的，有可能客户端取消了下载，导致此异常，不用关心！");
			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		} finally {
			if (out != null) {
				try {
					out.close();
				} catch (IOException e) {
					logger.error(e.getMessage(), e);
				}
			}
			if (raf != null) {
				try {
					raf.close();
				} catch (IOException e) {
					logger.error(e.getMessage(), e);
				}
			}
		}
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getInfo() {
		return info;
	}
	public void setInfo(String info) {
		this.info = info;
	}
	public String getTerminalId() {
		return terminalId;
	}
	public void setTerminalId(String terminalId) {
		this.terminalId = terminalId;
	}
	public String getVersion() {
		return version;
	}
	public void setVersion(String version) {
		this.version = version;
	}
	public String getUpgradeId() {
		return upgradeId;
	}
	public void setUpgradeId(String upgradeId) {
		this.upgradeId = upgradeId;
	}
	public String getModel() {
		return model;
	}
	public void setModel(String model) {
		this.model = model;
	}
	public String getUpgradeResult() {
		return upgradeResult;
	}
	public void setUpgradeResult(String upgradeResult) {
		this.upgradeResult = upgradeResult;
	}
	public String getErrorLog() {
		return errorLog;
	}
	public void setErrorLog(String errorLog) {
		this.errorLog = errorLog;
	}
	public String getBase_utc() {
		return base_utc;
	}
	public void setBase_utc(String base_utc) {
		this.base_utc = base_utc;
	}
	public String getUtc() {
		return utc;
	}
	public void setUtc(String utc) {
		this.utc = utc;
	}
}
