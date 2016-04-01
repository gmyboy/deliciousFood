package com.app.filter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import com.app.model.User;

public class SessionFilter implements Filter{
	
	private static final Logger logger = Logger.getLogger(SessionFilter.class);

	private List<String> list = new ArrayList<String>();

	@Override
	public void doFilter(ServletRequest req, ServletResponse res,FilterChain chain) throws IOException, ServletException {
		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse) res;
		HttpSession session = request.getSession();

		String servletPath = request.getServletPath();
		String ip = request.getRemoteAddr();
					
		if(!request.getServletPath().startsWith("/page")){
			chain.doFilter(request, response);
			return;
		}
		
		User user = (User) session.getAttribute("user");

		if (null == user) {
			String errMsg = "您还没有登录或登录已超时，请重新登录！";
				logger.info(errMsg);
				request.setAttribute("msg", errMsg);
				request.getRequestDispatcher("/error/noSession.jsp").forward(request, response);
				return;
//				response.setCharacterEncoding("UTF-8");
//                response.setContentType("application/json;charset=UTF-8");
//                PrintWriter out = response.getWriter();
//                Json json = new Json();
//                json.setSuccess(0);
//                json.setMsg(errMsg);
//                out.print(JSON.toJSONString(json));
//                out.flush();
//				return;
		}else{
			chain.doFilter(request, response);
			return;
		}
	}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		// 初始化需要拦截的文件夹
		String include = filterConfig.getInitParameter("include");
		if (!StringUtils.isBlank(include)) {
			StringTokenizer st = new StringTokenizer(include, ",");
			list.clear();
			while (st.hasMoreTokens()) {
				list.add(st.nextToken());
			}
		}
	}

	@Override
	public void destroy() {
		
	}
}
