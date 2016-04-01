package com.app.test;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Random;
import java.util.UUID;

public class MysqlTest {
	static {

	}

	public static Connection getConnection() {
		Connection connnection = null;
		try {
			try {
				// 加载数据库驱动程序
				Class.forName("com.mysql.jdbc.Driver");
			} catch (ClassNotFoundException e) {
				System.out.println("加载驱动错误");
				System.out.println(e.getMessage());
			}
			// 获取连接
			connnection = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/app_db?useUnicode=true&characterEncoding=UTF-8&zeroDateTimeBehavior=convertToNull", "root", "");
		} catch (SQLException e) {
			System.out.println(e.getMessage());
		}
		return connnection;
	}

	public static void main(String[] args) {
		Connection conn = MysqlTest.getConnection();

		String sql = "insert into t_app_terminal_info(region) values (?)";

		try {
			PreparedStatement prep = conn.prepareStatement(sql);
			// 将连接的自动提交关闭，数据在传送到数据库的过程中相当耗时
			conn.setAutoCommit(false);
			long start = System.currentTimeMillis();
			Random random = new Random(1000);
			for (int i = 0; i < 100; i++) {
				long start2 = System.currentTimeMillis();
				// 一次性执行插入10万条数据
				for (int j = 0; j < 10000; j++) {
//					prep.setString(1,UUID.randomUUID().toString().replace("-",""));
					prep.setString(1, "上海");
					// 将预处理添加到批中
					prep.addBatch();

				}
				// 预处理批量执行
				prep.executeBatch();
				prep.clearBatch();
				conn.commit();
				long end2 = System.currentTimeMillis();
				// 批量执行一次批量打印执行依次的时间
				System.out.print("inner" + i + ": ");
				System.out.println(end2 - start2);
			}
			long end = System.currentTimeMillis();
			System.out.print("total: ");
			System.out.println(end - start);
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			if (conn != null) { // 关闭连接对象
				try {
					conn.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
	}
}
