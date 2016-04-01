package com.app.service.impl;

import java.util.List;
import java.util.Map;
import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.app.dao.MongoBaseDao;
import com.app.service.MongoBaseService;

/**
 * MongoDB通用操作接口实现类
 * @author aofl
 * 
 */
@Service
public class MongoBaseServiceImpl<T> implements MongoBaseService<T> {

	
	private static Logger logger = Logger.getLogger(MongoBaseServiceImpl.class);
	
	@Autowired
	private MongoBaseDao<T> baseDao;
	
	/**
	 * 保存一条数据
	 * @param t 泛型对象
	 * @param collectionName 需要查询的表名
	 */
	@Override
	public void save(T t, String collectionName) {
		baseDao.save(t, collectionName);
	}

	/**
	 * 批量保存数据
	 * @param list 泛型对象
	 * @param collectionName 需要查询的表名
	 */
	@Override
	public void save(List<T> list, String collectionName) {
		baseDao.save(list, collectionName);
		
		
	}

	/**
	 * 通过条件查询数据
	 * @param params 参数
	 * @param page 当前页数
	 * @param rows 每页数据条数
	 * @param sortName 排序名称
	 * @param sortOrder 排序("asc" or "desc")
	 * @param CollectionName 需要查询的表名
	 * @return List 返回list
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<T> findByQuery(Class<T> clazz,Map<String, Object> params, int page, int rows,
			String sortName, String sortOrder,String collectionName) {
		
		return baseDao.findByQuery(clazz, params, page, rows, sortName, sortOrder, collectionName);
	}
	
	
	/**
     * 通过id查询一条数据
     * @param id 主键
     * @param collectionName 需要查询的表名
     * @return
     */
	@Override
	public T getById(Class<T> clazz,String id, String collectionName) {
		return baseDao.getById(clazz, id, collectionName);
	}

	
	/**
     * 根据条件查询一条数据
     * @param params 条件参数 <br>
     * 如果是比较，则需要构造BasicDBObject<br>
     * 例如params.put("lastUpdateTime",new BasicDBObject().append("$gte",beginTime).append("$lte",endTime));
     * @param sortName 排序名称
     * @param sortOrder 排序类型("asc" or "desc")
     * @param collectionName 需要查询的表名
     * @return
     */
	@Override
    public T getByQuery(Class<T> clazz,Map<String, Object> params,String sortName,String sortOrder,String collectionName){
		return baseDao.getByQuery(clazz, params, sortName, sortOrder, collectionName);
    }
	
	/**
     * 通过条件统计数量
     * @param params map
     * @param collectionName 需要查询的表名
     * @return
     */
	@Override
	public Long CountByQuery(Map<String, Object> params, String collectionName) {
		return baseDao.CountByQuery(params, collectionName);
	}
	
	

	/**
     * 更新一个对象  
     * @param t
     * @param collectionName
     */
	@Override
	public void update(T t, String collectionName) {
		
		baseDao.update(t, collectionName);
	}

	
	/**
     * 根据id删除一个对象
     * @param id
     * @param collectionName
     */
	@Override
	public void deleteById(String id, String collectionName) {
		baseDao.deleteById(id, collectionName);
		
	}

	
	/**
     * 根据条件删除
     * @param params
     * @param collectionName
     */
	@Override
	public void deleteByQuery(Map<String, Object> params,String collectionName) {
		baseDao.deleteByQuery(params, collectionName);
		
	}

	
	/**
	 * 保存用户操作日志
	 */
//	public void saveUserOpLog(HttpServletRequest request,String params){
//		try {
//			if(map.size()==0){
//				this.menuOpNameList();
//			}
//			if(!map.containsKey(request.getServletPath())){
//				return;
//			}
//			SessionInfo sessionInfo = (SessionInfo) Webutil.getAttributeByRequest();
//			User user = sessionInfo.getUser();
//			UserOpLog userOpLog = new UserOpLog();
//			userOpLog.setUserName(user.getUserName()); //操作用户账号
//			userOpLog.setFullName(user.getFullName()); //操作用户姓名
//			userOpLog.setOpTime(new Date()); //操作时间
//			userOpLog.setOpType("");	//操作类型
//			userOpLog.setOpUrl(request.getServletPath());  //操作路径
//			userOpLog.setOpBussinesName(this.getBussinesName(request.getServletPath(), params));  //操作业务名称
//			userOpLog.setCustomerCode(user.getCustomerCode());
//			
//			//如果操作名称不为空则写入，为空则不写入
//			if(StringUtils.isNotBlank(userOpLog.getOpBussinesName())){
//				mongoBaseDao.save(userOpLog, "userOperatorLog");
//			}
//		} catch (Exception e) {
//			logger.error("写入操作日志-异常",e);
//		}
//	}

	/**
	 * 用户操作日志查询
	 */
//	public Grid userOpLogList(UserOpLog userOpLog, int page, int rows,
//			String sortName, String sortOrder,String userNameList) {
//		Grid grid = new Grid();
//		List<UserOpLog> resultList = new ArrayList<UserOpLog>();
//		SessionInfo sessionInfo = (SessionInfo) Webutil.getAttributeByRequest();
//		
//		Map<String,Object> params = new HashMap<String,Object>();
//		params.put("customerCode", sessionInfo.getCustomerInfo().getCustomerCode());
//		
//		//用户姓名检索
//		String fullName = userOpLog.getFullName();
//		if (StringUtils.isNotBlank(fullName)){
//			//模糊匹配
//			Pattern pattern = Pattern.compile("^.*"+fullName+".*$", Pattern.CASE_INSENSITIVE);
//			params.put("fullName",pattern);
//		}
//		//用户账号检索
//		String userName = userOpLog.getUserName();
//		if (StringUtils.isNotBlank(userName)){
//			//模糊匹配
//			Pattern pattern = Pattern.compile("^.*"+userName+".*$", Pattern.CASE_INSENSITIVE);
//			params.put("userName",pattern);
//		}
//		//登录时间检索
//		Date startTime = userOpLog.getStartTime();
//		Date endTime = userOpLog.getEndTime();
//		BasicDBObject dateCondition = new BasicDBObject();
//		Boolean isTrue = false;
//		if (null != startTime) {
//			dateCondition.append("$gte",DateUtil.dateToString(startTime));
//			isTrue = true;
//		}
//		if (null != endTime) {
//			dateCondition.append("$lt",DateUtil.dateToString(endTime));
//			isTrue = true;
//		}
//		if(isTrue){
//			params.put("opTime", dateCondition);
//		}
//		
//		//权限过滤
//		if(StringUtils.isNoneBlank(userNameList)){
//			BasicDBList values = new BasicDBList();
//			String[] userNameListStr = userNameList.split(",");
//			for(int i=0;i<userNameListStr.length;i++){
//				values.add(userNameListStr[i].replaceAll("'", ""));
//			}
//			params.put("userName",new BasicDBObject().append("$in",values));
//		}
//		
//		resultList = mongoBaseDao.findByQuery(UserOpLog.class, params, page, rows, sortName, sortOrder, "userOperatorLog");
//		Long total = mongoBaseDao.CountByQuery(params, "userOperatorLog");
//		grid.setTotal(total);
//		grid.setRows(resultList);
//		return grid;
//	}
}
