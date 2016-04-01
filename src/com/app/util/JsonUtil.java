package com.app.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.app.interceptor.FastjsonFilter;

public class JsonUtil {
	
	public static String writeJson(Object object) {
		FastjsonFilter filter = new FastjsonFilter();
		String json = JSON.toJSONString(object, filter,
				SerializerFeature.WriteDateUseDateFormat,
				SerializerFeature.DisableCircularReferenceDetect);
		return json;
	}
}
