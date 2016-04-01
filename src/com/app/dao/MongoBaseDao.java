package com.app.dao;

import java.util.List;
import java.util.Map;
/**
 * MongoDB通用操作接口实现类
 * @Title: MongoBaseDaoImpl.java 
 * @Package cn.inovance.iotgp.common.dao.impl 
 * @Description: 
 * @author fb2112  
 * @date 2015-1-15 上午10:07:15 
 * @version V1.0
 */
public interface MongoBaseDao<T> {

	/**
	 * 保存一条数据
	 * @param t 泛型对象
	 * @param collectionName 需要查询的表名
	 */
	public void save(T t,String collectionName);   
    
	
	/**
	 * 批量保存数据
	 * @param list 泛型对象
	 * @param collectionName 需要查询的表名
	 */
    public void save(List<T> list,String collectionName);
	
	/**
	 * 根据条件查询数据
	 * @param params 参数
	 * @param page 当前页数
	 * @param rows 每页数据条数
	 * @param sortName 排序名称
	 * @param sortOrder 排序类型("asc" or "desc")
	 * @param CollectionName 需要查询的表名
	 * @return List 返回list
	 */
    public List<T> findByQuery(Class<T> clazz,Map<String,Object> params,int page, int rows,String sortName,String sortOrder,String collectionName); 
    
    /**
     * 根据id查询一条数据
     * @param id 主键
     * @param collectionName 需要查询的表名
     * @return
     */
    public T getById(Class<T> clazz,String id,String collectionName);
    
    /**
     * 根据条件查询一条数据
     * @param params 条件参数
     * @param sortName 排序名称
     * @param sortOrder 排序类型("asc" or "desc")
     * @param collectionName 需要查询的表名
     * @return
     */
    public T getByQuery(Class<T> clazz,Map<String, Object> params,String sortName,String sortOrder,String collectionName);
    
    /**
     * 根据条件统计数量
     * @param params 条件参数
     * @param collectionName 需要查询的表名
     * @return
     */
    public Long CountByQuery(Map<String,Object> params,String collectionName); 
   
    /**
     * 更新一个对象  
     * @param t
     * @param collectionName
     */
    public void update(T t,String collectionName);  
    
    /**
     * 根据id删除一个对象
     * @param id
     * @param collectionName
     */
    public void deleteById(String id,String collectionName);
    
    /**
     * 根据条件删除
     * @param params
     * @param collectionName
     */
    public void deleteByQuery(Map<String, Object> params,String collectionName);
}
