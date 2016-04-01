package com.app.action;

import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.app.interceptor.FastjsonFilter;
import com.opensymphony.xwork2.ActionSupport;

@ParentPackage("SysPackage")
@Namespace("/")
@Action
public class BaseAction extends ActionSupport{

	private static final long serialVersionUID = 1L;
	
	private static final Logger logger = Logger.getLogger(BaseAction.class);
	
	protected int page = 1;
	protected int rows = 10;
	protected String sortName;
	protected String sortOrder = "asc";
	protected String sort;// 排序字段
	protected String order = "asc";// asc/desc
	protected String id;
	
	
	public String execute(){
		return null;
	}
	
	public void writeJson(Object object) {
		try {
			
			String path = this.getRequest().getServletPath();
			StringBuffer params = new StringBuffer();
			Map<String,String[]> paramsMap = getRequest().getParameterMap();
			Set<String> keySet = paramsMap.keySet();
	        for (Iterator<String> it = keySet.iterator(); it.hasNext();) {
	            String key = it.next();
	            params.append(key+"=");
	            String[] values = paramsMap.get(key);
	            for(int i=0;i<values.length;i++){
	            	params.append(values[i]);
	            	if(i!=values.length-1){
	            		params.append("&");
	            	}
	            }
	            params.append("&");
	        }
	        logger.info("请求:"+path+"?"+params.toString());
	        
			FastjsonFilter filter = new FastjsonFilter();

	        String json;
			String User_Agent = getRequest().getHeader("User-Agent");
			if (StringUtils.indexOf(User_Agent, "MSIE 6") > -1) {
				json = JSON.toJSONString(object, filter,
						SerializerFeature.WriteDateUseDateFormat,
						SerializerFeature.DisableCircularReferenceDetect,
						SerializerFeature.BrowserCompatible);
			} else {
				json = JSON.toJSONString(object, filter,
						SerializerFeature.WriteDateUseDateFormat,
						SerializerFeature.DisableCircularReferenceDetect);
			}
	        if(json.length() < 100){
	        	logger.info("响应:" + json);
	        }else{
	        	logger.info("响应:" + json.substring(0, 99)+" ...");
	        }
	       
			getResponse().setContentType("text/html;charset=utf-8");
			getResponse().getWriter().write(json);
			getResponse().getWriter().flush();
			getResponse().getWriter().close();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 获取request
	 * @return
	 */
	public HttpServletRequest getRequest(){
		return ServletActionContext.getRequest();
	}
	
	/**
	 * 获取response
	 * @return
	 */
	public HttpServletResponse getResponse(){
		return ServletActionContext.getResponse();
	}
	
	/**
	 * 获取session
	 * @return
	 */
	public HttpSession getSession() {
		return ServletActionContext.getRequest().getSession();
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getRows() {
		return rows;
	}

	public void setRows(int rows) {
		this.rows = rows;
	}

	public String getSortName() {
		return sortName;
	}

	public void setSortName(String sortName) {
		this.sortName = sortName;
	}

	public String getSortOrder() {
		return sortOrder;
	}

	public void setSortOrder(String sortOrder) {
		this.sortOrder = sortOrder;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getSort() {
		return sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
	}

	public String getOrder() {
		return order;
	}

	public void setOrder(String order) {
		this.order = order;
	}
	
}
