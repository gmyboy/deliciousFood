package com.app.action;

import java.util.HashMap;
import java.util.Map;
import org.apache.log4j.Logger;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;
import com.app.bean.BeanToMap;
import com.app.bean.Grid;
import com.app.bean.Json;
import com.app.bean.PageInfoBean;
import com.app.model.Application;
import com.app.model.Channel;
import com.app.model.Terminal;
import com.app.model.User;
import com.app.service.TerminalService;

/**
 * 终端
 * 
 * @author aofl
 * 
 */
@Namespace("/")
@Action("/terminalAction")
@Results({ @Result(name = "success", location = "/success.jsp"), @Result(name = "error", location = "/login.jsp"), @Result(name = "index", location = "/index.jsp") })
public class TerminalAction extends BaseAction {

	private Logger logger = Logger.getLogger(TerminalAction.class);

	private static final long serialVersionUID = 1L;

	@Autowired
	private TerminalService terminalService;
	
	private Terminal ter;

	/**
	 * 查询终端信息列表
	 * 
	 * @return
	 */
	public String terminalList() {
		Grid grid = new Grid();
		try {
			PageInfoBean pfb = new PageInfoBean(page, rows);
			pfb.setSortName(sort);
			pfb.setSortOrder(order);
			User user = (User) getSession().getAttribute("user");
			grid = terminalService.getTerminalList(ter==null?new Terminal():ter, pfb,user.getChannelNo()==null?"":user.getChannelNo());
		} catch (Exception e) {
			e.printStackTrace();
		}
		writeJson(grid);
		return null;
	}

	/**
	 * 根据Id查询终端信息
	 * 
	 * @return
	 */
	public String getTerminalById() {
		Json json = new Json();
		try {
			Terminal terminal = terminalService.getById(Integer.parseInt(id));
			json.setSuccess(1);
			json.setObj(terminal);
			json.setMsg("操作成功！");
			writeJson(terminal);
		} catch (Exception e) {
			e.printStackTrace();
			json.setSuccess(0);
			json.setMsg("查询终端信息失败！");
		}
		writeJson(json);
		return null;
	}

	/**
	 * 根据Id删除终端信息
	 * 
	 * @return
	 */
	public String delTerminalById() {
		Json json = new Json();
		try {
			terminalService.deleteTerminalById(id);
			json.setSuccess(1);
			json.setMsg("操作成功！");
			writeJson(json);
		} catch (Exception e) {
			e.printStackTrace();
			json.setSuccess(0);
			json.setMsg("删除终端信息失败！");
			writeJson(json);
		}
		return null;
	}

	/**
	 * 查看app列表
	 * 
	 * @return
	 */
	public String applicationList() {
		Grid grid = new Grid();
		try {
			PageInfoBean pfb = new PageInfoBean(page, rows);
			Application app = new Application();
			app.setTerminalId(Integer.parseInt(id));
			grid = terminalService.getApplicationList(app, pfb);
		} catch (Exception e) {
			e.printStackTrace();
		}
		writeJson(grid);
		return null;
	}

	/**
	 * 查看终端信息
	 * 
	 * @return
	 */
	public String getTerminalAndDevceInfo() {
		Map returnmap = new HashMap();
		try {
			Terminal terminal = terminalService.getById(Integer.parseInt(id));
			returnmap.put("terminal", BeanToMap.convertBean(terminal));
		} catch (Exception e) {
			e.printStackTrace();
		}
		writeJson(returnmap);
		return null;
	}
	
	/**
	 * 
	 * 停/启用
	 */
	public String updateStatus() {
		Json json = new Json();
		try {
			Terminal terminal = terminalService.getById(Integer.valueOf(id));
			String message = "";
			if (terminal == null) {
				json.setMsg("操作失败，数据不存在或已删除！");
				json.setSuccess(0);
			} else {
				Integer status = terminal.getStatus();
				if (status != null) {
					if (status == 0) {
						// 如果当前记录为停用状态，即点击后将其设置为启用状态
						terminal.setStatus(1);
						message = "切换为启用状态成功！";
					} else {
						// 如果当前记录为启用状态，即点击后将其设置为停用状态
						terminal.setStatus(0);
						message = "切换为停用状态成功！";
					}
				}
				terminalService.saveTerminalInfo(terminal);
				json.setSuccess(1);
				json.setObj(terminal);
				json.setMsg(message);
			}
			writeJson(json);
		} catch (Exception e) {
			logger.error("修改停/启用状态异常", e);
			e.printStackTrace();
			json.setSuccess(0);
			json.setMsg("更新停/启用状态失败！");
			writeJson(json);
		}
		return null;
	}

	public Terminal getTer() {
		return ter;
	}

	public void setTer(Terminal ter) {
		this.ter = ter;
	}
}
