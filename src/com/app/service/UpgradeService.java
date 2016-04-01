package com.app.service;

import com.app.bean.Grid;
import com.app.bean.PageInfoBean;
import com.app.model.Upgrade;

public interface UpgradeService {

	/**
	 * 查询软件包列表
	 * 
	 * @return
	 */
	public Grid upgradeList(Upgrade upgrade, PageInfoBean pfb, String channelNo);

	/**
	 * 删除软件包信息
	 */
	public void deleteUpgrade(Upgrade upgrade);

	/**
	 * 保存软件包信息
	 */
	public void save(Upgrade upgrade);

	/**
	 * 更新软件包信息
	 */
	public void update(Upgrade upgrade);

	/**
	 * 根据ID查询软件包信息
	 * 
	 * @param id
	 * @return
	 */
	public Upgrade getById(String id);

	/**
	 * 根据版本号查询最新的软件包信息
	 * 
	 * @param id
	 * @return
	 */
	public Upgrade getUpgradeByAppVersion(String appVersion);
	
	/**
	 * 根据版本号、型号查询最新的软件包信息
	 * @param id
	 * @return
	 */
	public Upgrade getUpgradeByVersion(String version,String model);

	
	public Upgrade getUpgradeByModel(String model,String base_utc,String utc);
	
	/**
	 * 根据型号更新升级包状态
	 */
	public void updateUpgradeStatus(String model,Integer mode);
}
