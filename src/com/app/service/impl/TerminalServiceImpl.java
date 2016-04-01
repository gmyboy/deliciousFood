package com.app.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.app.bean.Grid;
import com.app.bean.PageInfoBean;
import com.app.dao.SuperBaseDao;
import com.app.model.Application;
import com.app.model.Terminal;
import com.app.service.TerminalService;

@Service
public class TerminalServiceImpl implements TerminalService {

	@Autowired
	private SuperBaseDao superBaseDao;
	@Autowired
	private SuperBaseDao<Terminal> terminalDao;

	/**
	 * 保存终端信息
	 */
	@Override
	public void saveTerminalInfo(Terminal terminal) {
		Integer terminalId = terminal.getId();
		superBaseDao.saveOrUpdate(terminal);
		try {
			String appListJson = terminal.getAppList();
			String installAppListJson = terminal.getInstallAppList();
			String uninstallAppListJson = terminal.getUninstallAppList();
			//已安装app列表
			if(null==terminalId&&StringUtils.isNotBlank(appListJson)){
				List<Application> appList = JSONArray.parseArray(appListJson, Application.class);
				for(Application app:appList){
					app.setTerminalId(terminal.getId());
					superBaseDao.saveOrUpdate(app);
				}
			}
			//新增或更新的app列表
			if(StringUtils.isNotBlank(installAppListJson)){
				List<Application> appList = JSONArray.parseArray(installAppListJson, Application.class);
				for(Application app:appList){
					app.setTerminalId(terminal.getId());
					superBaseDao.saveOrUpdate(app);
				}
			}
			//删除的app列表
			if(StringUtils.isNotBlank(uninstallAppListJson)){
				List<Application> appList = JSONArray.parseArray(uninstallAppListJson, Application.class);
				for(Application app:appList){
					String deleteHql = "update Application set operate = 'uninstall' where app='"+app.getApp()+"'";
					superBaseDao.executeHql(deleteHql);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}	
	/**
	 * 更新终端渠道Id
	 */
	@Override
	public void updateTerminalChannelNo(String channelNo,String tmIds) {
		String hql = "update Terminal set channelNo = '"+channelNo+"'";
		String whereHql = " where id in (";
		String[] ids = tmIds.split(",");
		for (int i = 0; i < ids.length; i++) {
			if(i>0){
				whereHql+=",";
			}
			whereHql+=ids[i];
		}
		whereHql+=")";
		superBaseDao.executeHql(hql+whereHql);
	}

	@Override
	public Terminal getById(Integer id) {
		return (Terminal) superBaseDao.getById(Terminal.class, id);
	}

	public Terminal getTerminalByParam(String id, String imei, String imsi) {
		Map<String, Object> pararmap = new HashMap<String, Object>();
		String hql = "from Terminal where 1=1 ";
		if (!"0".equals(id)) {
			hql += " and id=:id";
			pararmap.put("id", id);
		}
		if (StringUtils.isNotBlank(imei)) {
			hql += " and imei=:imei";
			pararmap.put("imei", imei);
		}
		if (StringUtils.isNotBlank(imsi)) {
			hql += " and imsi=:imsi";
			pararmap.put("imsi", imsi);
		}

		return (Terminal) superBaseDao.getByHql(hql, pararmap);
	}

	@Override
	public Grid getTerminalList(Terminal terminal, PageInfoBean pfb,String channelNo) {
		Grid grid = new Grid();
		String hql = "from Terminal t ";
		String countHql = "select count(1) from Terminal t ";
		Map<String, Object> params = new HashMap<String, Object>();
		String whereHql = " where 1=1";
		
		//渠道号
		if(StringUtils.isNotBlank(channelNo)&&!channelNo.equals("0")){
			whereHql += " and t.channelNo =:channelNo";
			params.put("channelNo",channelNo);
		}
		//终端ID
		if(null!=terminal.getId()){
			whereHql += " and t.id =:id";
			params.put("id",terminal.getId());
		}
		//终端状态
		if(null!=terminal.getStatus()){
			whereHql += " and t.status =:status";
			params.put("status",terminal.getStatus());
		}
		//imei
		if (StringUtils.isNotBlank(terminal.getImei())) {
			whereHql += " and t.imei like :imei";
			params.put("imei", "%" + terminal.getImei() + "%");
		}
		//imsi
		if (StringUtils.isNotBlank(terminal.getImsi())) {
			whereHql += " and t.imsi like :imsi";
			params.put("imsi", "%" + terminal.getImsi() + "%");
		}
		//手机类型
		if (StringUtils.isNotBlank(terminal.getModel())) {
			whereHql += " and t.model like :model";
			params.put("model", "%" + terminal.getModel() + "%");
		}
		//手机号码
		if (StringUtils.isNotBlank(terminal.getPhone())) {
			whereHql += " and t.phone like :phone";
			params.put("phone", "%" + terminal.getPhone() + "%");
		}

		List<Terminal> list = superBaseDao.find(hql+whereHql, params, pfb.getPage(), pfb.getRows());
		Long total = superBaseDao.count(countHql+whereHql, params);

		grid.setRows(list);
		grid.setTotal(total);
		return grid;
	}

	public void deleteTerminalById(String id) {
		Terminal terminal = terminalDao.getById(Terminal.class, id);
		terminalDao.delete(terminal);
	}

	@Override
	public Grid getApplicationList(Application app, PageInfoBean pfb) {
		Grid grid = new Grid();
		String hql = "from Application t where t.terminalId ='" + app.getTerminalId() + "'";
		String countHql = "select count(1) from Application t where t.terminalId ='" + app.getTerminalId() + "'";
		Map<String, Object> params = new HashMap<String, Object>();
		List<Terminal> list = superBaseDao.find(hql, params, pfb.getPage(), pfb.getRows());
		Long total = superBaseDao.count(countHql, params);
		grid.setRows(list);
		grid.setTotal(total);
		return grid;
	}

	@Override
	public List<Terminal> getTerminalListByChannelNo(String channelNo) {
		String hql = " from Terminal t where t.channelNo='" + channelNo + "'";
		return superBaseDao.getListByHql(hql);
	}

	@Override
	public List getTerminalIdList(Terminal terminal, PageInfoBean pfb,String channelNo) {
		String hql = "select t.id,t.deviceToken from Terminal t";
		Map<String, Object> params = new HashMap<String, Object>();
		String whereHql = " where t.status = 1 and t.deviceToken is not null and t.deviceToken != ''";
		
		//渠道Id
		if(StringUtils.isNotBlank(channelNo)&&!channelNo.equals("0")){
			whereHql += " and t.channelNo =:channelNo";
			params.put("channelNo",channelNo);
		}
		//渠道号
		if(StringUtils.isNotBlank(terminal.getChannelNo())){
			whereHql += " and t.channelNo =:channelNo";
			params.put("channelNo",terminal.getChannelNo());
		}
		//终端状态
		if(null!=terminal.getStatus()){
			whereHql += " and t.status =:status";
			params.put("status",terminal.getStatus());
		}
		//imei
		if (StringUtils.isNotBlank(terminal.getImei())) {
			whereHql += " and t.imei like :imei";
			params.put("imei", "%" + terminal.getImei() + "%");
		}
		//imsi
		if (StringUtils.isNotBlank(terminal.getImsi())) {
			whereHql += " and t.imsi like :imsi";
			params.put("imsi", "%" + terminal.getImsi() + "%");
		}
		//手机类型
		if (StringUtils.isNotBlank(terminal.getModel())) {
			whereHql += " and t.model like :model";
			params.put("model", "%" + terminal.getModel() + "%");
		}
		//手机号码
		if (StringUtils.isNotBlank(terminal.getPhone())) {
			whereHql += " and t.phone like :phone";
			params.put("phone", "%" + terminal.getPhone() + "%");
		}

		List list = superBaseDao.find(hql+whereHql, params, pfb.getPage(), pfb.getRows());
		return list;
	}

	@Override
	public Terminal getTerminalByToken(String token) {
		String hql = "from Terminal where deviceToken =:deviceToken";
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("deviceToken", token);
		return (Terminal) superBaseDao.getByHql(hql, params);
	}

	/**
	 * 根据AndroidId查询终端信息
	 * @param udId
	 * @return
	 */
	@Override
	public Terminal getTerminalByUdId(String udId) {
		String hql = "from Terminal where udid =:udid";
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("udid", udId);
		return (Terminal) superBaseDao.getByHql(hql, params);
	}
	
	/**
	 * 清空渠道对应终端
	 */
	@Override
	public void deleteTerChannel(String channelNo) {
		String hql = "update Terminal set channelNo='',companyName='' where channelNo='"+channelNo+"'";
		superBaseDao.executeHql(hql);
	}
	
	/**
	 * 更新渠道对应终端
	 */
	@Override
	public void updateTerChannel(String channelNo, String companyName,String searchJson) {
		Terminal terminal = new Terminal();
		if(StringUtils.isNotBlank(searchJson)){
			terminal = JSONObject.parseObject(searchJson,Terminal.class);
		}
		String hql="update Terminal set channelNo='"+channelNo+"',companyName='"+companyName+"'";
		String whereHql=" where 1=1";
		Map<String, Object> params = new HashMap<String, Object>();
		
		if(null!=terminal){
			//终端ID
			if(null!=terminal.getId()){
				whereHql += " and id =:id";
				params.put("id",terminal.getId());
			}
			//终端状态
			if(null!=terminal.getStatus()){
				whereHql += " and status =:status";
				params.put("status",terminal.getStatus());
			}
			//手机类型
			if (StringUtils.isNotBlank(terminal.getModel())) {
				whereHql += " and model like :model";
				params.put("model", "%" + terminal.getModel() + "%");
			}
			//手机号码
			if (StringUtils.isNotBlank(terminal.getPhone())) {
				whereHql += " and phone like :phone";
				params.put("phone", "%" + terminal.getPhone() + "%");
			}
			//渠道号
			if (StringUtils.isNotBlank(terminal.getChannelNo())) {
				whereHql += " and channelNo like :channelNo";
				params.put("channelNo", "%" + terminal.getChannelNo() + "%");
			}
			//包名
			if (StringUtils.isNotBlank(terminal.getApps())) {
				whereHql += " and apps like :apps";
				params.put("apps", "%" + terminal.getApps() + "%");
			}
			//省份
			if (StringUtils.isNotBlank(terminal.getProvince())) {
				whereHql += " and province like :province";
				params.put("province", "%" + terminal.getProvince() + "%");
			}
		}
		superBaseDao.executeHql(hql+whereHql, params);		
	}
	
	@Override
	public List<Terminal> getTerminalListAddress() {
		String hql = "from Terminal t where t.phone is not null and t.province is null";
		List<Terminal> list = superBaseDao.find(hql, 1 ,100);
		return list;
	}
	
	@Override
	public void updateTerminal(Terminal ter) {
		superBaseDao.update(ter);
	}
}
