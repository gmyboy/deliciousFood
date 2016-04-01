package com.app.util;

import java.lang.reflect.Field;
import java.lang.reflect.Method;

/**
 * 反射实体类赋值 
 * @author aofl
 *
 */
public class GiveClassReflectionUtil {
	
	 /** 
     * @param originaClass 用于赋值的实体类  
     * @param targetClass 需要待赋值的实体类 
     * 反射实体类赋值 
     */  
    @SuppressWarnings("rawtypes")
	public static void reflectionAttr(Object originaClass,Object targetClass){  
       try {
    		Class oClazz = Class.forName(originaClass.getClass().getName());  
            Class tClazz = Class.forName(targetClass.getClass().getName());  
//          获取两个实体类的所有属性  
            Field[] fields1 = oClazz.getDeclaredFields();  
            Field[] fields2 = tClazz.getDeclaredFields();  
            GiveClassReflectionUtil cr = new GiveClassReflectionUtil();  
//          遍历class1Bean，获取逐个属性值，然后遍历class2Bean查找是否有相同的属性，如有相同则赋值  
            for (Field f1 : fields1) {  
            	//System.out.println(f1.getName());
                if(f1.getName().equals("id"))  
                    continue;  
                if (f1.getName().equals("serialVersionUID")) 
					continue;
                Object value = cr.invokeGetMethod(originaClass ,f1.getName(),null);  
                System.out.println("======"+value);
                if (null!=value) {
    	        	 for (Field f2 : fields2) {  
    	                 if(f1.getName().equals(f2.getName())){  
    	                     Object[] obj = new Object[1];  
    	                     obj[0] = value;  
    	                     cr.invokeSetMethod(targetClass, f2.getName(), obj);  
    	                 }  
    	             }  
    			}
               
            }  
		} catch (Exception e) {
			e.printStackTrace();
		}
    }  
    
    
    
    /** 
     * @param originaClass 用于赋值的实体类  
     * @param targetClass 需要待赋值的实体类 
     * 反射实体类赋值 
     * 说明：赋值的实体类属性为空，则不赋值给待赋值的实体类(待赋值的属性不为空) 
     */  
    @SuppressWarnings("rawtypes")
	public static void reflectionIsEmptyAttr(Object originaClass,Object targetClass){  
       try {
    		Class oClazz = Class.forName(originaClass.getClass().getName());  
            Class tClazz = Class.forName(targetClass.getClass().getName());  
//          获取两个实体类的所有属性  
            Field[] fields1 = oClazz.getDeclaredFields();  
            Field[] fields2 = tClazz.getDeclaredFields();  
            GiveClassReflectionUtil cr = new GiveClassReflectionUtil();  
//          遍历class1Bean，获取逐个属性值，然后遍历class2Bean查找是否有相同的属性，如有相同则赋值  
            for (Field f1 : fields1) {  
            	//System.out.println(f1.getName());
                if(f1.getName().equals("id"))  
                    continue;  
                if (f1.getName().equals("serialVersionUID")) 
					continue;
                Object value = cr.invokeGetMethod(originaClass ,f1.getName(),null);  
                //System.out.println("======"+value);
                if (null!=value&&!"".equals(value)) {
    	        	 for (Field f2 : fields2) {  
    	                 if(f1.getName().equals(f2.getName())){  
    	                     Object[] obj = new Object[1];  
    	                     obj[0] = value;  
    	                     cr.invokeSetMethod(targetClass, f2.getName(), obj);  
    	                 }  
    	             }  
    			}
               
            }  
		} catch (Exception e) {
			e.printStackTrace();
		}
    }  
    
      
    /** 
     *  
     * 执行某个Field的getField方法 
     *  
     * @param clazz 类 
     * @param fieldName 类的属性名称 
     * @param args 参数，默认为null 
     * @return  
     */  
    private Object invokeGetMethod(Object clazz, String fieldName, Object[] args)  
    {  
        String methodName = fieldName.substring(0, 1).toUpperCase()+ fieldName.substring(1);  
        Method method = null;  
        try   
        {  
        	if (!methodName.equalsIgnoreCase("serialVersionUID")) {
	            method = Class.forName(clazz.getClass().getName()).getDeclaredMethod("get" + methodName);  
	            return method.invoke(clazz);  
        	}else {
        		return "";  
			}
        }   
        catch (Exception e)  
        {  
            e.printStackTrace();  
            return "";  
        }
    }  
      
    /** 
     *  
     * 执行某个Field的setField方法 
     *  
     * @param clazz 类 
     * @param fieldName 类的属性名称 
     * @param args 参数，默认为null 
     * @return  
     */  
    @SuppressWarnings({ "rawtypes", "unchecked" })
	private Object invokeSetMethod(Object clazz, String fieldName, Object[] args)  
    {         
        String methodName = fieldName.substring(0, 1).toUpperCase()+ fieldName.substring(1);  
        Method method = null;  
        try   
        {  
            Class[] parameterTypes = new Class[1];  
            Class c = Class.forName(clazz.getClass().getName());  
            Field field = c.getDeclaredField(fieldName);   
            parameterTypes[0] = field.getType();  
            method = c.getDeclaredMethod("set" + methodName,parameterTypes);  
            return method.invoke(clazz,args);  
        }   
        catch (Exception e)  
        {  
            e.printStackTrace();  
            return "";  
        }  
    }  

}
