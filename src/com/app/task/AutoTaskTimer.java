package com.app.task;

import java.util.List;
import java.util.Map;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import com.app.model.Terminal;
import com.app.service.TerminalService;
import com.app.util.PhoneAttributionUtils;

@Component
public class AutoTaskTimer {
	
	private static Logger logger = Logger.getLogger(AutoTaskTimer.class);

	@Autowired
	private TerminalService terminalService;
	
	/**
	 * 根据手机号码获取归属地
	 */
	@Scheduled(cron = "0 */1 * * * ?")
	public void getTerAddressByPhone(){
//		logger.info("开始获取终端地址---------开始");
//		List<Terminal> list = terminalService.getTerminalListAddress();
//		for(Terminal ter:list){
//			Map<String,Object> map = PhoneAttributionUtils.request(ter.getPhone().replace("+86",""));
//			if(null!=map){
//				ter.setProvince(map.get("province")==null?"":map.get("province").toString());
//				ter.setDistrict(map.get("city")==null?"":map.get("city").toString());
//				ter.setIso(map.get("supplier")==null?"":map.get("supplier").toString());
//				terminalService.updateTerminal(ter);
//			}
//		}
//		logger.info("获取终端地址---------结束");
	}
}
