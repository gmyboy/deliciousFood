package com.app.test;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.RandomAccessFile;
import java.net.HttpURLConnection;
import java.net.URL;

public class Td {
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		HttpURLConnection httpURLConnection = null;
		URL url = null;
		BufferedInputStream bis = null;
		byte[] buf = new byte[10240];
		int size = 0;
		String fileName = "aaa.mkv";
		String filePath = "D:\\";
		String remoteUrl = "http://a8928959.oicp.net:12109/androidManager/appInterface!dnss_download.do?upgradeId=3cc7d39ba020422aa1fe0e7154e779c3";

		// 检查本地文件
		RandomAccessFile rndFile = null;
		File file = new File(filePath + "\\" + fileName);
		long remoteFileSize = getRemoteFileSzie(remoteUrl);
		long nPos = 0;

		if (file.exists()) {
			long localFileSzie = file.length();
			System.out.println("服务文件大小-->" + remoteFileSize + "  \n本地文件大小-->" + localFileSzie);
			if (localFileSzie < remoteFileSize) {
				System.out.println("文件续传...");
				nPos = localFileSzie;
			} else {
				System.out.println("文件存在，重新下载...");
				file.delete();
				try {
					file.createNewFile();
				} catch (Exception e) {
					// TODO: handle exception
					e.printStackTrace();
				}
			}

		} else {
			// 建立文件
			try {
				file.createNewFile();
			} catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
			}
		}

		// 下载文件
		try {
			url = new URL(remoteUrl);
			httpURLConnection = (HttpURLConnection) url.openConnection();
			// 设置User-Agent
			httpURLConnection.setRequestProperty("User-Agent", "Net");
			System.out.println("bytes=  " + nPos);
			// 设置续传开始
			httpURLConnection.setRequestProperty("Range", "bytes=" + nPos + "-");
			// 获取输入流
			bis = new BufferedInputStream(httpURLConnection.getInputStream());
			rndFile = new RandomAccessFile(filePath + "\\" + fileName, "rw");
			rndFile.seek(nPos);
			int i = 0;
			while ((size = bis.read(buf)) != -1) {
				// if (i > 50000)
				// break;
				rndFile.write(buf, 0, size);
				System.out.println(i);
				i++;
			}
			System.out.println("i=" + i);
			httpURLConnection.disconnect();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
	}

	public static long getRemoteFileSzie(String url) {
		long size = 0;
		try {
			HttpURLConnection httpUrl = (HttpURLConnection) (new URL(url)).openConnection();
			size = httpUrl.getContentLength();
			httpUrl.disconnect();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return size;
	}
}
