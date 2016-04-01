package com.app.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.bean.Grid;
import com.app.bean.PageInfoBean;
import com.app.dao.SuperBaseDao;
import com.app.model.Upgrade;
import com.app.service.UpgradeService;
import com.app.util.DateUtil;

@Service
public class UpgradeServiceImpl implements UpgradeService {

	@Autowired
	private SuperBaseDao superBaseDao;

	/**
	 * 查询软件包列表
	 */
	@Override
	public Grid upgradeList(Upgrade upgrade, PageInfoBean pfb, String channelNo) {
		Grid grid = new Grid();
		String hql = "from Upgrade";
		String countHql = "select count(1) from Upgrade";
		Map<String, Object> params = new HashMap<String, Object>();
		String whereHql = " where 1=1";

		// 渠道号
		if (StringUtils.isNotBlank(channelNo) && !channelNo.equals("0")) {
			whereHql += " and channelNo =:channelNo";
			params.put("channelNo", channelNo);
		}

		// 商家名称
		if (StringUtils.isNotBlank(upgrade.getMerchants())) {
			whereHql += " and merchants like :merchants";
			params.put("merchants", "%" + upgrade.getMerchants() + "%");
		}
		// 软件版本号
		if (StringUtils.isNotBlank(upgrade.getVersion())) {
			whereHql += " and version like :version";
			params.put("version", "%" + upgrade.getVersion() + "%");
		}
		// 软件包标题
		if (StringUtils.isNotBlank(upgrade.getTitle())) {
			whereHql += " and title like :title";
			params.put("title", "%" + upgrade.getTitle() + "%");
		}
		// 软件包内容
		if (StringUtils.isNotBlank(upgrade.getContent())) {
			whereHql += " and content like :content";
			params.put("content", "%" + upgrade.getContent() + "%");
		}
		// 软件包状态
		if (null != upgrade.getStatus()) {
			whereHql += " and status =:status";
			params.put("status", upgrade.getStatus());
		}
		//升级类型
		if(null!=upgrade.getMode()){
			whereHql += " and mode =:mode";
			params.put("mode", upgrade.getMode());
		}

		String orderhql = "";
		if (StringUtils.isNotBlank(pfb.getSortName()) && StringUtils.isNotBlank(pfb.getSortOrder())) {
			orderhql += " order by " + pfb.getSortName() + " " + pfb.getSortOrder();
		}

		List<Upgrade> list = superBaseDao.find(hql + whereHql + orderhql, params,pfb.getPage(),pfb.getRows());
		Long total = superBaseDao.count(countHql + whereHql, params);
		grid.setRows(list);
		grid.setTotal(total);
		return grid;
	}

	/**
	 * 删除软件包
	 */
	@Override
	public void deleteUpgrade(Upgrade upgrade) {

		superBaseDao.delete(upgrade);
	}

	/**
	 * 根据Id查询软件包信息
	 */
	@Override
	public Upgrade getById(String id) {
		Upgrade ad = (Upgrade) superBaseDao.getById(Upgrade.class, id);
		String hql = "from AdvertisingPic where advertisingId =:advertisingId";
		Map<String, Object> params = new HashMap<String, Object>();
		// params.put("advertisingId", id);
		// ad.setAdPicList(superBaseDao.find(hql, params));
		return ad;
	}

	/**
	 * 保存软件包信息
	 */
	@Override
	public void save(Upgrade upgrade) {
		superBaseDao.saveOrUpdate(upgrade);
	}

	/**
	 * 更新软件包信息
	 */
	@Override
	public void update(Upgrade ad) {
		superBaseDao.update(ad);
	}

	@Override
	public Upgrade getUpgradeByAppVersion(String appVersion) {
		String hql = " from Upgrade where status=4 order by releaseDate desc";
		List<Upgrade> list = superBaseDao.find(hql);
		Upgrade upgrade = null;
		if (list.size() > 0) {
			upgrade = list.get(0);
		}
		superBaseDao.getCurrentSession().evict(upgrade);
		upgrade.setApproveTime(null);
		upgrade.setApprover(null);
		upgrade.setChannelNo(null);
		upgrade.setCreateTime(null);
		upgrade.setCreater(null);
		upgrade.setFileName(null);
		upgrade.setFilePath(null);
		upgrade.setFileType(null);
		upgrade.setLastUpdateTime(null);
		upgrade.setLastUpdater(null);
		upgrade.setStatus(null);
		upgrade.setReleaseDate(null);
		upgrade.setUtc(DateUtil.getDateUtc(upgrade.getUtc()));
		return upgrade;
	}

	@Override
	public Upgrade getUpgradeByModel(String model,String base_utc,String utc) {
		//查询完整升级有没有更新
//		String allHql = "from Upgrade where status=4 and mode = 1 and model='"+model+"' and utcNew>"+base_utc;
//		Upgrade upgrade = (Upgrade) superBaseDao.getByHql(allHql);
//		if(null == upgrade){
//			String irHql = "from Upgrade where status=4 and mode = 0 and model='"+model+"' and utcNew>"+utc;
//			upgrade = (Upgrade) superBaseDao.getByHql(irHql);
//		}
		String hql = " from Upgrade where status=4 and model='"+model+"' order by releaseDate asc";
		List<Upgrade> list = superBaseDao.find(hql);
		Upgrade upgrade = null;
		if (list.size() > 0) {
			upgrade = list.get(0);
		}
		if(upgrade!=null){
			superBaseDao.getCurrentSession().evict(upgrade);
			upgrade.setApproveTime(null);
			upgrade.setApprover(null);
			upgrade.setChannelNo(null);
			upgrade.setCreateTime(null);
			upgrade.setCreater(null);
			upgrade.setFileName(null);
			upgrade.setFilePath(null);
			upgrade.setFileType(null);
			upgrade.setLastUpdateTime(null);
			upgrade.setLastUpdater(null);
			upgrade.setStatus(null);
			upgrade.setReleaseDate(null);
			upgrade.setUtc(upgrade.getUtcNew());
			upgrade.setUtcNew(null);
		}
		return upgrade;
	}

	@Override
	public void updateUpgradeStatus(String model,Integer mode) {
		String hql ="update Upgrade set status = 3 where model = '"+model+"' and mode="+mode;
		superBaseDao.executeHql(hql);
	}

	@Override
	public Upgrade getUpgradeByVersion(String version, String model) {
		//查询完整升级有没有更新
		String allHql = "from Upgrade where status=4 and mode = 1 and model='"+model+"' order by releaseDate desc";
		List<Upgrade> list = superBaseDao.find(allHql);
		Upgrade upgradeNew = null;
		for(Upgrade upgrade :list){
			if(upgrade.getVersion().compareTo(version)>0){
				version = upgrade.getVersion();
				upgradeNew = upgrade;
			}
		}
		//如果没有完整升级包
		if(null==upgradeNew){
			String irHql = "from Upgrade where status=4 and mode = 0 and model='"+model+"' order by releaseDate desc";
			List<Upgrade> irList = superBaseDao.find(irHql);
			for(Upgrade upgrade :irList){
				if(upgrade.getVersion().compareTo(version)>0){
					version = upgrade.getVersion();
					upgradeNew = upgrade;
				}
			}
		}
		if(null!=upgradeNew){
			superBaseDao.getCurrentSession().evict(upgradeNew);
			upgradeNew.setApproveTime(null);
			upgradeNew.setApprover(null);
			upgradeNew.setChannelNo(null);
			upgradeNew.setCreateTime(null);
			upgradeNew.setCreater(null);
			upgradeNew.setFileName(null);
			upgradeNew.setFilePath(null);
			upgradeNew.setFileType(null);
			upgradeNew.setLastUpdateTime(null);
			upgradeNew.setLastUpdater(null);
			upgradeNew.setStatus(null);
			upgradeNew.setReleaseDate(null);
			upgradeNew.setUtc(upgradeNew.getUtcNew());
			upgradeNew.setUtcNew(null);
		}
		return upgradeNew;
	}
}
