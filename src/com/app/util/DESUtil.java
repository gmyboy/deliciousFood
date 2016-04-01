package com.app.util;

import java.util.Calendar;
import java.util.Date;
import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;

/**
 * dec算法加密工具
 * @author aofl
 *
 */
public class DESUtil {


	/**
	 * dsc加密Base64位显示
	 * @param message
	 * @param key
	 * @return
	 * @throws Exception
	 */
	public static String desEncryptForBase64(String message, String key)
			throws Exception {
		String outputStr = Coder.encryptBASE64(desEncrypt(message, key));
		return outputStr;
	}
	
	/**
	 * dec加密
	 * @param message
	 * @param key
	 * @return
	 * @throws Exception
	 */
	public static byte[] desEncrypt(String message, String key)
			throws Exception {
		Cipher cipher = Cipher.getInstance("DES");//Cipher.getInstance("DES/CBC/PKCS5Padding");
		DESKeySpec desKeySpec = new DESKeySpec(key.getBytes("UTF-8"));
		SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");
		SecretKey secretKey = keyFactory.generateSecret(desKeySpec);
		cipher.init(Cipher.ENCRYPT_MODE, secretKey);
		return cipher.doFinal(message.getBytes("UTF-8"));
	}

	/**
	 * dsc解密
	 * @param message
	 * @param key
	 * @return
	 * @throws Exception
	 */
	public static String desDncrypt(byte[] message, String key)
			throws Exception {
		Cipher cipher = Cipher.getInstance("DES");//Cipher.getInstance("DES/CBC/PKCS5Padding");
		DESKeySpec desKeySpec = new DESKeySpec(key.getBytes("UTF-8"));
		SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");
		SecretKey secretKey = keyFactory.generateSecret(desKeySpec);
		cipher.init(Cipher.DECRYPT_MODE, secretKey);
		byte[] retByte = cipher.doFinal(message);
		return new String(retByte);
	}
	
	/**
	 * dsc解密Base64位显示
	 * @param message
	 * @param key
	 * @return
	 * @throws Exception
	 */
	public static String desDncryptForBase64(String message, String key)
			throws Exception {
		byte[] inputData = Coder.decryptBASE64(message);
		return desDncrypt(inputData, key);
	}

	/**
	 * 测试
	 * @param args
	 */
	public static void main(String[] args) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new Date());
		String strDate = "" + calendar.get(Calendar.YEAR)+calendar.get(Calendar.MONTH)+calendar.get(Calendar.WEEK_OF_YEAR);
		String key = "12345678";
		try {
			String inputdata = DESUtil.desEncryptForBase64(strDate, key);
			System.err.println("加密后:\t" + inputdata);
			
			String str="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"
+"xZStNF8RRmLsth/iUQkk2dBHe1XBxA==";
			
			String outputStr = DESUtil.desDncryptForBase64(str, key);
			System.err.println("解密后:\t" + outputStr);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
