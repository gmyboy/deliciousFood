package com.app.util;

import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.TimeZone;

import org.apache.commons.lang3.StringUtils;

/**
 * 日期工具类
 * @author aofl
 *
 */
public class DateUtil {

	private static SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	private static SimpleDateFormat df2 = new SimpleDateFormat("yyyy-MM-dd");
	private static SimpleDateFormat df3 = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
	private static SimpleDateFormat df4 = new SimpleDateFormat("yyyy/MM/dd");
	private static SimpleDateFormat df5 = new SimpleDateFormat("yyyy-MM");
	private static SimpleDateFormat df6 = new SimpleDateFormat("yyyy/MM");
	private static SimpleDateFormat df7 = new SimpleDateFormat("yyyy");
	
	
	public static Date stringToDate(String dateStr){
		
		Date date = null;
		if(StringUtils.isNotBlank(dateStr)){
			try {
				dateStr = URLDecoder.decode(dateStr, "UTF-8");
				if(dateStr.trim().length() > 10)
				{
					if(dateStr.indexOf("-") != -1)
					{
						date = df.parse(dateStr);
					}
					else if(dateStr.indexOf("/") != -1)
					{
						date = df3.parse(dateStr);
					}
				}
				else if(dateStr.trim().length() <= 10 && dateStr.trim().length() > 8 )
				{
					if(dateStr.indexOf("-") != -1)
					{
						date = df2.parse(dateStr);
					}
					else if(dateStr.indexOf("/") != -1)
					{
						date = df4.parse(dateStr);
					}
				}
				else if(dateStr.trim().length() <= 7 && dateStr.trim().length() > 4)
				{
					if(dateStr.indexOf("-") != -1)
					{
						date = df5.parse(dateStr);
					}
					else if(dateStr.indexOf("/") != -1)
					{
						date = df6.parse(dateStr);
					}
				}
				else
				{
					date = df7.parse(dateStr);
				}
				
			} catch (Exception e) {
				
				e.printStackTrace();
			}

		}
		return date; 

	}
	
	/**
	 * 获取年数运算后的日期
	 * @param date
	 * @param yearCount
	 * @return
	 */
	public static Date addYears(Date date,int yearCount)
	{
		 Calendar calendar = Calendar.getInstance();
		 calendar.setTime(date);
		 calendar.add(Calendar.YEAR, yearCount);
		 return calendar.getTime();
	}
	
	/**
	 * 获取天数运算后的日期
	 * @param date
	 * @param yearCount
	 * @return
	 */
	public static Date addDays(Date date,int dayCount)
	{
		 Calendar calendar = Calendar.getInstance();
		 calendar.setTime(date);
		 calendar.add(Calendar.DAY_OF_MONTH, dayCount);
		 return calendar.getTime();
	}
	
	/**
	 * 获取月数运算后的日期
	 * @param date
	 * @param yearCount
	 * @return
	 */
	public static Date addMonths(Date date,int monthCount)
	{
		 Calendar calendar = Calendar.getInstance();
		 calendar.setTime(date);
		 calendar.add(Calendar.MONTH, monthCount);
		 return calendar.getTime();
	}
	
	
	public static String dateToString(Date date){
		if(null == date)
		{
			return "";
		}
		String dateStr = df.format(date);
		
		return dateStr;
	}
	
	public static String dateToString(Date date,String formatte)
	{
		if(null == date)
		{
			return "";
		}
		
		SimpleDateFormat df = new SimpleDateFormat(formatte);
		return df.format(date);
	}
	
	
	public static int getDayCount(Date date)
	{
		 Calendar calendar = Calendar.getInstance();
		 calendar.setTime(date);
		 calendar.set(Calendar.DATE, 1);//把日期设置为当月第一天  
		 calendar.roll(Calendar.DATE, -1);//日期回滚一天，也就是最后一天 
		 return calendar.get(Calendar.DATE);
	}
	
	
	/**
	 * 返回date是这个月的第几天
	 */ 
	public static int getDayOfMonth(Date date)
	{
		 Calendar calendar = Calendar.getInstance();
		 calendar.setTime(date);
		 return calendar.get(Calendar.DAY_OF_MONTH);
	}
	
	/**
	 * 获取今天的起始时间
	 * @return
	 */
	public static Date getTodayStartDate(Date date)
	{
		Calendar todayStart = Calendar.getInstance();  
		todayStart.setTime(date);
        todayStart.set(Calendar.HOUR_OF_DAY, 0);  
        todayStart.set(Calendar.MINUTE, 0);  
        todayStart.set(Calendar.SECOND, 0);  
        todayStart.set(Calendar.MILLISECOND, 0);  
        return todayStart.getTime();
	}
	
	/**
	 * 获取当月的起始时间
	 */
	public static Date getMonthStartDate(Date date)
	{
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.set(calendar.get(calendar.YEAR),calendar.get(calendar.MONTH),1);
		calendar.set(Calendar.HOUR_OF_DAY, 0);  
		calendar.set(Calendar.MINUTE, 0);  
		calendar.set(Calendar.SECOND, 0);  
		calendar.set(Calendar.MILLISECOND, 0); 
		return calendar.getTime();
	}
	
	/**
	 * 获取当月的结束时间
	 */
	public static Date getMonthEndDate(Date date)
	{
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.set(calendar.get(calendar.YEAR),calendar.get(calendar.MONTH),1);
		calendar.roll(Calendar.DATE, -1);
		calendar.set(Calendar.HOUR_OF_DAY, 23);  
		calendar.set(Calendar.MINUTE, 59);  
		calendar.set(Calendar.SECOND, 59);  
		calendar.set(Calendar.MILLISECOND, 999);  
		return calendar.getTime();
	}
	
	/**
	 * 获取当年的结束时间
	 */
	public static Date getYearEndDate(Date date)
	{
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.set(calendar.get(calendar.YEAR),11,1);
		calendar.roll(Calendar.DATE, -1);
		calendar.set(Calendar.HOUR_OF_DAY, 23);  
		calendar.set(Calendar.MINUTE, 59);  
		calendar.set(Calendar.SECOND, 59);  
		calendar.set(Calendar.MILLISECOND, 999);  
		return calendar.getTime();
	}
	
	/**
	 * 获取当年的开始时间
	 */
	public static Date getYearStartDate(Date date)
	{
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.set(calendar.get(calendar.YEAR),0,1);
		calendar.set(Calendar.HOUR_OF_DAY, 0);  
		calendar.set(Calendar.MINUTE, 0);  
		calendar.set(Calendar.SECOND, 0);  
		calendar.set(Calendar.MILLISECOND, 0); 
		return calendar.getTime();
	}
	
	/**
	 * 获取今天的结束时间
	 */
	public static Date getTodayEndDate(Date date)
	{
		Calendar todayEnd = Calendar.getInstance();  
		todayEnd.setTime(date);
        todayEnd.set(Calendar.HOUR_OF_DAY, 23);  
        todayEnd.set(Calendar.MINUTE, 59);  
        todayEnd.set(Calendar.SECOND, 59);  
        todayEnd.set(Calendar.MILLISECOND, 999);  
        return todayEnd.getTime();
	}
	
	/**
	 * 比较时间，如果date1大，返回true,否则返回法律false
	 * @param date1
	 * @param date2
	 * @return
	 */
	public static boolean compareDate(Date date1, Date date2)
	{
		if(null == date1)
		{
			return false;
		}
		if(null == date2)
		{
			return true;
		}
		return date1.after(date2);
	}
	
	/** 
     * 计算两个日期之间相差的天数 
     * @param date1 
     * @param date2 
     * @return 
     */  
    public static int daysBetween(Date date1,Date date2)  
    {  
          Calendar cal = Calendar.getInstance();  
          cal.setTime(date1);  
          long time1 = cal.getTimeInMillis();               
          cal.setTime(date2);  
          long time2 = cal.getTimeInMillis();       
          long between_days=(time2-time1)/(1000*3600*24);  
          return Integer.parseInt(String.valueOf(between_days));  
    }  
	
    /**
     * 判断两个日期是否是同一月
     * @param date1
     * @param date2
     * @return
     */
    public static boolean isSameMonth(Date date1,Date date2)
    {
    	 Calendar cal1 = Calendar.getInstance();
    	 cal1.setTime(date1);
    	 Calendar cal2 = Calendar.getInstance();
    	 cal2.setTime(date2);
    	 
    	 boolean isSameYear = cal1.get(Calendar.YEAR) == cal2
                 .get(Calendar.YEAR);
    	 boolean isSameMonth = isSameYear
                 && cal1.get(Calendar.MONTH) == cal2.get(Calendar.MONTH);
    	 return isSameMonth;
    }
    
    
    /**
     * 判断两个时间区间是否有交集
     * @param startDate1  第一个区间开始时间
     * @param endDate1    第一个区间结束时间
     * @param startDate2  第二个区间开始时间
     * @param endDate2    第二个区间结束时间
     * @return true:有交集  false:无交集
     */
    public static boolean isSameTimeInterval(Date startDate1,Date endDate1,Date startDate2,Date endDate2)
    {
    	if(endDate1.getTime()<startDate2.getTime()||startDate1.getTime()>endDate2.getTime()){
    		return false;
    	}else{
    		return true;
    	}
    }
    
    /**
     * 
     * @Description 计算时间差
     * @param date 减数
     * @param date2 被减数
     * @author aofl
     */
    public static String calcTimeDifference(Date date,Date date2){
    	Calendar cal1 = Calendar.getInstance();
		Calendar cal2 = Calendar.getInstance();
		cal1.setTime(date);
		cal2.setTime(date2);
		long l = cal1.getTimeInMillis() - cal2.getTimeInMillis();
		long day = l / (24 * 60 * 60 * 1000);
		long hour = (l / (60 * 60 * 1000) - day * 24);
		long min = ((l / (60 * 1000)) - day * 24 * 60 - hour * 60);
		long s = (l / 1000 - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60);
		
		return day+"天"+hour+"小时"+min+"分钟"+s+"秒";
    }
    
    /**
     * 获取当前日期(不带时分秒)
     */
    public static Date getCurDate(){
    	String curDateStr = DateUtil.dateToString(new Date(),"yyyy-MM-dd");
    	return DateUtil.stringToDate(curDateStr);
    }
    
    /**
     * 取得时间对应的utc
     * @param date
     * @return
     */
    public static String getDateUtc(String dateStr){
        Calendar calendar1 = Calendar.getInstance();
        calendar1.setTime(DateUtil.stringToDate(dateStr));
        System.out.println("Long 类型Date ：" + calendar1.getTimeInMillis()/1000);
        return (calendar1.getTimeInMillis()/1000)+"";
    }
}
