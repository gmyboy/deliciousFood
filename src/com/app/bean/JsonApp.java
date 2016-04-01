package com.app.bean;

public class JsonApp {
	
	/**
	 *结果状态码(100-199为系统级错误，200以上为业务逻辑错误)
	 *100:成功，  101：请求参数错误，  102:请求超时，  103：网络异常，  104：数据库错误， 105：服务器错误 ，199：系统级未知错误
	 *200：账号不存在，201：账号或者密码错误，202:账号冻结，211:升级包不存在，212：终端信息为停用状态，299：未知错误
	 **/
	private Integer statusCode;
	
	/**
	 * 返回结果信息
	 */
	private String message;
	
	private Object data;
	
	private Integer type;

	public Integer getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(Integer statusCode) {
		this.statusCode = statusCode;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}
	
	
}
