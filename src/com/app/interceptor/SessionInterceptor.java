package com.app.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import com.app.model.User;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.MethodFilterInterceptor;

/**
 * session拦截器.
 */
public class SessionInterceptor extends MethodFilterInterceptor {


	private static final long serialVersionUID = 1L;
	private static final Logger logger = Logger.getLogger(SessionInterceptor.class);

	@Override
	protected String doIntercept(ActionInvocation actionInvocation)
			throws Exception {
		
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpServletResponse response = ServletActionContext.getResponse();
		HttpSession session = request.getSession();
		boolean interceptor	= false;
		String servletPath = request.getServletPath();
		String ip = request.getRemoteAddr();
		User user = (User) session.getAttribute("user");
		
		if (null == user) {
			String errMsg = "您还没有登录或登录已超时，请重新登录！";
			ServletActionContext.getRequest().setAttribute("msg", errMsg);
			logger.info("进入session拦截器->访问路径为["+ ServletActionContext.getRequest().getServletPath() + "]");
			logger.info("访问ip:"+ip+" "+errMsg);
			return "noSession";
		}else{
			return actionInvocation.invoke();
		}
	}

}
