package com.app.test;

public class InterfaceUrlTest {
	public static void main(String[] args) {
		for(int i=0;i<1000;i++){
			TestRunnable run = new TestRunnable("","","",i);
			new Thread(run).start();
		}
	}
}
