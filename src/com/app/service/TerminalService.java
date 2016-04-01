package com.app.service;

import java.util.List;

import com.app.bean.Grid;
import com.app.bean.PageInfoBean;
import com.app.model.Application;
import com.app.model.Terminal;

public interface TerminalService {

	/**
	 * 保存终端信息
	 * @param terminal
	 */
	public void saveTerminalInfo(Terminal terminal);

	/**
	 * 更新终端渠道Id
	 * @param channelNo
	 * @param tmIds
	 */
	public void updateTerminalChannelNo(String channelNo,String tmIds);
	
	public Terminal getById(Integer id);

	public Terminal getTerminalByParam(String id, String imei, String imsi);

	/**
	 * 查询终端信息列表
	 * 
	 * @param user
	 * @param pfb
	 * @return
	 */
	public Grid getTerminalList(Terminal terminal, PageInfoBean pfb,String channelNo);

	/**
	 * 查询终端信息列表(Id)
	 * 
	 * @param user
	 * @param pfb
	 * @return
	 */
	public List getTerminalIdList(Terminal terminal, PageInfoBean pfb,String channelNo);

	/**
	 * 查询终端app列表
	 * 
	 * @param user
	 * @param pfb
	 * @return
	 */
	public Grid getApplicationList(Application app, PageInfoBean pfb);

	/**
	 * 删除终端信息
	 * 
	 * @param id
	 * @return
	 */
	public void deleteTerminalById(String id);

	/**
	 * 根据渠道号查询终端列表
	 */

	public List<Terminal> getTerminalListByChannelNo(String channelNo);
	
	/**
	 * 根据token查询终端信息
	 * @param token
	 * @return
	 */
	public Terminal getTerminalByToken(String token);
	
	/**
	 * 根据AndroidId查询终端信息
	 * @param udId
	 * @return
	 */
	public Terminal getTerminalByUdId(String udId);

	/**
	 * 清空渠道对应终端
	 */
	public void deleteTerChannel(String channelNo);
	
	/**
	 * 更新终端对应渠道信息
	 */
	public void updateTerChannel(String channelNo,String companyName,String searchJson);
	
	/**
	 * 查询终端列表用来更新地址
	 * @return
	 */
	public List<Terminal> getTerminalListAddress();
	
	/**
	 * 更新终端信息
	 */
	public void updateTerminal(Terminal ter);

}
