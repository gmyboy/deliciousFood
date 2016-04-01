package com.app.util;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.ApplicationContext;

/**
 * spring获取bean工具类
 * @author aofl
 *
 */
public class ApplicationUtil {

	private static Log logger = LogFactory.getLog(ApplicationUtil.class);

	private static ApplicationContext applicationContext;

	public static void setApplicationContext(
			ApplicationContext applicationContext) {
		synchronized (ApplicationUtil.class) {
			logger.debug("setApplicationContext, notifyAll");
			ApplicationUtil.applicationContext = applicationContext;
			ApplicationUtil.class.notifyAll();
		}
	}

	public static ApplicationContext getApplicationContext() {
		synchronized (ApplicationUtil.class) {
			while (applicationContext == null) {
				try {
					logger.debug("getApplicationContext, wait...");
					ApplicationUtil.class.wait(60000);
					if (applicationContext == null) {
						logger.warn(
								"Have been waiting for ApplicationContext to be set for 1 minute",
								new Exception());
					}
				} catch (InterruptedException ex) {
					logger.debug("getApplicationContext, wait interrupted");
				}
			}
			return applicationContext;
		}
	}

	/**
	 * 这是一个便利的方法，帮助我们快速得到一个BEAN
	 * 
	 * @param beanName
	 *            bean的名字
	 * @return 返回一个bean对象
	 */
	public static Object getBean(String beanName) {
		return applicationContext.getBean(beanName);
	}
}
