package com.app.dao.impl;

import java.io.Serializable;
import java.math.BigInteger;
import java.util.Calendar;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.hibernate.transform.Transformers;
import org.hibernate.type.Type;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.app.bean.PageInfoBean;
import com.app.dao.SuperBaseDao;

@Repository(value = "superBaseDao")
public class SuperBaseDaoImpl<T> implements SuperBaseDao<T> {

	@Autowired
	private SessionFactory sessionFactory;

	/**
	 * 获得当前事物的session.
	 * 
	 * @return org.hibernate.Session
	 */
	@Override
	public Session getCurrentSession() {
		return sessionFactory.getCurrentSession();
	}

	@Override
	public Serializable save(T o) {
		if (o != null) {
			return getCurrentSession().save(o);
		}
		return null;
	}

	@Override
	public T getById(Class<T> c, Serializable id) {
		return (T) getCurrentSession().get(c, id);
	}

	@Override
	public T getByHql(String hql) {
		Query q = getCurrentSession().createQuery(hql);
		List<T> l = q.list();
		if (l != null && l.size() > 0) {
			return l.get(0);
		}
		return null;
	}

	@Override
	public List<T> getListByHql(String hql) {
		Query q = getCurrentSession().createQuery(hql);
		List<T> l = q.list();
		return l;
	}

	@Override
	public T getByHql(String hql, Map<String, Object> params) {
		Query q = getCurrentSession().createQuery(hql);
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				q.setParameter(key, params.get(key));
			}
		}
		List<T> l = q.list();
		if (l != null && l.size() > 0) {
			return l.get(0);
		}
		return null;
	}

	@Override
	public void delete(T o) {
		if (o != null) {
			getCurrentSession().delete(o);
		}
	}

	@Override
	public void update(T o) {
		if (o != null) {
			getCurrentSession().update(o);
		}
	}

	@Override
	public void saveOrUpdate(T o) {
		if (o != null) {
			getCurrentSession().saveOrUpdate(o);
		}
	}

	@Override
	public List<T> find(String hql) {
		Query q = getCurrentSession().createQuery(hql);
		return q.list();
	}

	@Override
	public List<T> find(String hql, Map<String, Object> params) {
		Query q = getCurrentSession().createQuery(hql);
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				q.setParameter(key, params.get(key));
			}
		}
		return q.list();
	}

	@Override
	public List<T> find(String hql, Map<String, Object> params, int page,
			int rows) {
		Query q = getCurrentSession().createQuery(hql);
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				q.setParameter(key, params.get(key));
			}
		}
		if (page >= 1) {
			q.setFirstResult((page - 1) * rows);
		}
		if (rows >= 1) {
			q.setMaxResults(rows);
		}
		return q.list();
	}

	@Override
	public List<T> find(String hql, int page, int rows) {
		Query q = getCurrentSession().createQuery(hql);
		return q.setFirstResult((page - 1) * rows).setMaxResults(rows).list();
	}

	@Override
	public Long count(String hql) {
		Query q = getCurrentSession().createQuery(hql);
		return (Long) q.uniqueResult();
	}

	@Override
	public Long count(String hql, Map<String, Object> params) {
		Query q = getCurrentSession().createQuery(hql);
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				q.setParameter(key, params.get(key));
			}
		}
		return (Long) q.uniqueResult();
	}

	@Override
	public int executeHql(String hql) {
		Query q = getCurrentSession().createQuery(hql);
		return q.executeUpdate();
	}

	@Override
	public int executeHql(String hql, Map<String, Object> params) {
		Query q = getCurrentSession().createQuery(hql);
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				q.setParameter(key, params.get(key));
			}
		}
		return q.executeUpdate();
	}

	@Override
	public List<Map> findBySql(String sql) {
		SQLQuery q = getCurrentSession().createSQLQuery(sql);
		return q.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP).list();
	}

	@Override
	public List<T> procedureCall(String sql) {

		return null;
	}

	@Override
	public List<Map> findBySql(String sql, int page, int rows) {
		SQLQuery q = getCurrentSession().createSQLQuery(sql);
		return q.setFirstResult((page - 1) * rows).setMaxResults(rows)
				.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP).list();
	}

	@Override
	public List<Map> findBySql(String sql, Map<String, Object> params) {
		SQLQuery q = getCurrentSession().createSQLQuery(sql);
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				q.setParameter(key, params.get(key));
			}
		}

		return q.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP).list();
	}

	@Override
	public List<T> findObjListBySql(String sql, String countSql,
			Map<String, Object> params, Map<String, Type> resultValueTypeMap,
			Class<T> entityClass, PageInfoBean pageInfoBean) {
		SQLQuery query = getCurrentSession().createSQLQuery(sql);

		if (pageInfoBean != null) {
			int size = getTotalSQLCount(countSql.toString(), params);
			pageInfoBean.setTotalRows(size);
			pageInfoBean.doReviseData();
		}

		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				query.setParameter(key, params.get(key));
			}
		}
		if (resultValueTypeMap != null) {
			Iterator it = resultValueTypeMap.keySet().iterator();
			while (it.hasNext()) {
				String key = (String) it.next();
				query.addScalar(key, (Type) resultValueTypeMap.get(key));
			}
		}

		if (pageInfoBean != null) {
			query.setFirstResult(pageInfoBean.getRows() * (pageInfoBean.getPage() - 1));
			query.setMaxResults(pageInfoBean.getRows());
		}

		long start = Calendar.getInstance().getTimeInMillis();
		List list = query.setResultTransformer(
				new AliasToBeanResultTransformer(entityClass)).list();
		long end = Calendar.getInstance().getTimeInMillis();
		List localList1 = list;
		return localList1;
	}

	@Override
	public List<T> findObjListBySql(String sql, Map<String, Object> params,
			Map<String, Type> resultValueTypeMap, Class<T> entityClass,
			PageInfoBean pageInfoBean) {
		SQLQuery query = getCurrentSession().createSQLQuery(sql);
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				query.setParameter(key, params.get(key));
			}
		}
		if (resultValueTypeMap != null) {
			Iterator it = resultValueTypeMap.keySet().iterator();
			while (it.hasNext()) {
				String key = (String) it.next();
				query.addScalar(key, (Type) resultValueTypeMap.get(key));
			}
		}

		if (pageInfoBean != null) {
			query.setFirstResult(pageInfoBean.getRows() * (pageInfoBean.getPage() - 1));
			query.setMaxResults(pageInfoBean.getRows());
		}

		long start = Calendar.getInstance().getTimeInMillis();
		List list = query.setResultTransformer(
				new AliasToBeanResultTransformer(entityClass)).list();
		List localList1 = list;
		return localList1;
	}

	@Override
	public List<T> queryListByPage(String hql, Map paramMap,
			PageInfoBean pageInfoBean) {

		String strhql = " " + hql + " order ";
		String hqlTemp = strhql.toLowerCase(Locale.getDefault());

		if (pageInfoBean != null) {
			StringBuffer hqlCount = new StringBuffer("select count(*)");

			if (hqlTemp.indexOf(" group ") > 0)
				hqlCount.append(strhql.subSequence(hqlTemp.indexOf(" from "),
						hqlTemp.indexOf(" group ")));
			else {
				hqlCount.append(strhql.subSequence(hqlTemp.indexOf(" from "),
						hqlTemp.indexOf(" order ")));
			}

			int size = getTotalCount(hqlCount.toString(), paramMap);

			pageInfoBean.setTotalRows(size);
		}
		
		Query query = getCurrentSession().createQuery(hql);
		if (paramMap != null) {
			Iterator it = paramMap.keySet().iterator();
			while (it.hasNext()) {
				Object key = it.next();
				setParam(query, key.toString(), paramMap.get(key));
			}
		}
		if (pageInfoBean != null) {
			query.setFirstResult(pageInfoBean.getRows() * (pageInfoBean.getPage() - 1));
			query.setMaxResults(pageInfoBean.getRows());
		}
		List localList1 = query.list();
		return localList1;
	}

	@Override
	public List<Map> findBySql(String sql, Map<String, Object> params,
			int page, int rows) {
		SQLQuery q = getCurrentSession().createSQLQuery(sql);
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				q.setParameter(key, params.get(key));
			}
		}
		return q.setFirstResult((page - 1) * rows).setMaxResults(rows)
				.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP).list();
	}

	@Override
	public int executeSql(String sql) {
		SQLQuery q = getCurrentSession().createSQLQuery(sql);
		return q.executeUpdate();
	}

	@Override
	public int executeSql(String sql, Map<String, Object> params) {
		SQLQuery q = getCurrentSession().createSQLQuery(sql);
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				q.setParameter(key, params.get(key));
			}
		}
		return q.executeUpdate();
	}

	@Override
	public BigInteger countBySql(String sql) {
		SQLQuery q = getCurrentSession().createSQLQuery(sql);
		return (BigInteger) q.uniqueResult();
	}

	@Override
	public BigInteger countBySql(String sql, Map<String, Object> params) {
		SQLQuery q = getCurrentSession().createSQLQuery(sql);
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				q.setParameter(key, params.get(key));
			}
		}
		return (BigInteger) q.uniqueResult();
	}

	@Override
	public List<T> getListByHql(String hql, Map<String, Object> params) {
		Query q = getCurrentSession().createQuery(hql);
		if (params != null && !params.isEmpty()) {
			for (String key : params.keySet()) {
				q.setParameter(key, params.get(key));
			}
		}
		List<T> l = q.list();
		return l;
	}

	public int getTotalSQLCount(String sql, Map paramMap) {
		SQLQuery query = getCurrentSession().createSQLQuery(sql);
		if (paramMap != null) {
			Iterator it = paramMap.keySet().iterator();
			while (it.hasNext()) {
				Object key = it.next();
				setParam(query, key.toString(), paramMap.get(key));
			}
		}

		long start = Calendar.getInstance().getTimeInMillis();
		List list = query.list();
		long end = Calendar.getInstance().getTimeInMillis();
		// System.out.println("getTotalSQLCount SQL: " + sql);
		// System.out.println("getTotalSQLCount SQL took time: " + (end - start)
		// + "millsec");
		int i = 0;
		if (null != list && list.size() >= 1) {
			i = Integer.parseInt(list.get(0).toString());
		}
		return i;
	}

	public int getTotalCount(String hql, Map paramMap) {
		Query query = getCurrentSession().createQuery(hql);
		if (paramMap != null) {
			Iterator it = paramMap.keySet().iterator();
			while (it.hasNext()) {
				Object key = it.next();
				setParam(query, key.toString(), paramMap.get(key));
			}
		}
		List list = query.list();
		int i = 0;
		if (null != list && list.size() >= 1) {
			i = Integer.parseInt(list.get(0).toString());
		}
		return i;

	}

	private void setParam(Query query, String key, Object value) {
		if ((value instanceof List))
			query.setParameterList(key, (List) value);
		else if (value.getClass().isArray())
			query.setParameterList(key, (Object[]) (Object[]) value);
		else
			query.setParameter(key, value);
	}

}
