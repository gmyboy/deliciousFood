package com.app.dao;

import java.io.Serializable;
import java.math.BigInteger;
import java.util.List;
import java.util.Map;
import org.hibernate.Session;
import org.hibernate.type.Type;

import com.app.bean.PageInfoBean;

/**
 * 基础数据库操作类.
 * @author aofl
 * @param <T> 模型
 */
public interface SuperBaseDao<T> {

	/**
	 * 获得当前事物的session.
	 * @return org.hibernate.Session
	 */
	public Session getCurrentSession();
	
	/**
	 * 保存一个对象.
	 * @param o 对象
	 * @return 对象的ID
	 */
	public Serializable save(T o);

	/**
	 * 删除一个对象.
	 * @param o 对象
	 */
	public void delete(T o);

	/**
	 * 更新一个对象.
	 * @param o 对象
	 */
	public void update(T o);

	/**
	 * 保存或更新一个对象.
	 * @param o 对象
	 */
	public void saveOrUpdate(T o);

	/**
	 * 通过主键获得对象.
	 * @param c 类名.class
	 * @param id 主键
	 * @return 对象
	 */
	public T getById(Class<T> c, Serializable id);

	/**
	 * 通过HQL语句获取一个对象.
	 * @param HQL语句
	 * @return 对象
	 */
	public T getByHql(String hql);
	
	/**
	 * 通过HQL语句获取一个对象.
	 * @param HQL语句
	 * @return 对象集合
	 */
	public List<T> getListByHql(String hql);
	
	/**
	 * 通过HQL语句获取一个对象.
	 * @param HQL语句
	 * @param params 参数
	 * @return 参数集合
	 */
	public List<T> getListByHql(String hql,Map<String, Object> params);

	/**
	 * 通过HQL语句获取一个对象.
	 * @param  HQL语句
	 * @param params 参数
	 * @return 对象
	 */
	public T getByHql(String hql, Map<String, Object> params);

	/**
	 * 获得对象列表.
	 * @param  HQL语句
	 * @return List
	 */
	public List<T> find(String hql);

	/**
	 * 获得对象列表.
	 * @param HQL语句
	 * @param params参数
	 * @return List
	 */
	public List<T> find(String hql, Map<String, Object> params);

	/**
	 * 获得分页后的对象列表.
	 * @param HQL语句
	 * @param page 要显示第几页
	 * @param rows 每页显示多少条
	 * @return List
	 */
	public List<T> find(String hql, int page, int rows);

	/**
	 * 获得分页后的对象列表.
	 * @param HQL语句
	 * @param params 参数
	 * @param page 要显示第几页
	 * @param rows 每页显示多少条
	 * @return List
	 */
	public List<T> find(String hql, Map<String, Object> params, int page,int rows);

	/**
	 * 统计数目.
	 * @param HQL语句(select count(*) from T)
	 * @return long
	 */
	public Long count(String hql);

	/**
	 * 统计数目.
	 * @param HQL语句(select count(*) from T where xx = :xx)
	 * @param params 参数
	 * @return long
	 */
	public Long count(String hql, Map<String, Object> params);

	/**
	 * 执行一条HQL语句.
	 * @param HQL语句
	 * @return 响应结果数目
	 */
	public int executeHql(String hql);

	/**
	 * 执行一条HQL语句.
	 * @param  HQL语句
	 * @param params 参数
	 * @return 响应结果数目
	 */
	public int executeHql(String hql, Map<String, Object> params);

	/**
	 * 获得结果集
	 * @param SQL语句
	 * @return 结果集
	 */
	public List<Map> findBySql(String sql);

	/**
	 * 获得结果集.
	 * @param SQL语句
	 * @return 结果集
	 */
	public List<T> procedureCall(String sql);

	/**
	 * 获得结果集.
	 * @param SQL语句
	 * @param page 要显示第几页
	 * @param rows 每页显示多少条
	 * @return 结果集
	 */
	public List<Map> findBySql(String sql, int page, int rows);

	/**
	 * 获得结果集.
	 * @param SQL语句
	 * @param params参数
	 * @return 结果集
	 */
	public List<Map> findBySql(String sql, Map<String, Object> params);
	
	
	/**
	 * 获得结果集.List
	 * @param SQL语句
	 * @param params 参数
	 * @return 结果集
	 */
	public List<T> findObjListBySql(String sql, Map<String, Object> params
			, Map<String, Type> resultValueTypeMap, Class<T> entityClass,PageInfoBean pageInfoBean);
	
	
	
	/**
	 * 获得结果集.List
	 * @param SQL语句
	 * @param params参数
	 * @return 结果集
	 */
	public List<T> findObjListBySql(String sql,String countSql, Map<String, Object> params
			, Map<String, Type> resultValueTypeMap, Class<T> entityClass,PageInfoBean pageInfoBean);
	
	/**
	 * 获得分页后的对象列表.
	 * @param HQL语句
	 * @param params 参数
	 * @return List
	 */
	public List<T>  queryListByPage(String hql, Map paramMap, PageInfoBean pageInfoBean);
	
	

	/**
	 * 获得结果集.
	 * @param SQL语句
	 * @param params参数
	 * @param page 要显示第几页
	 * @param rows 每页显示多少条
	 * @return 结果集
	 */
	public List<Map> findBySql(String sql, Map<String, Object> params,
			int page, int rows);

	/**
	 * 执行SQL语句.
	 * @param SQL语句
	 * @return 响应行数
	 */
	public int executeSql(String sql);

	/**
	 * 执行SQL语句.
	 * @param SQL语句
	 * @param params 参数
	 * @return 响应行数
	 */
	public int executeSql(String sql, Map<String, Object> params);

	/**
	 * 统计.
	 * @param SQL语句
	 * @return 数目
	 */
	public BigInteger countBySql(String sql);

	/**
	 * 统计.
	 * @param SQL语句
	 * @param params 参数
	 * @return 数目
	 */
	public BigInteger countBySql(String sql, Map<String, Object> params);
	
	/**
	 * 统计.
	 * @param SQL语句
	 * @param params 参数
	 * @return 数目
	 */
	public int getTotalSQLCount(String sql, Map paramMap);
	
	/**
	 * 统计.
	 * @param Hql语句
	 * @param params 参数
	 * @return 数目
	 */
	public int getTotalCount(String hql, Map paramMap);
	

}
