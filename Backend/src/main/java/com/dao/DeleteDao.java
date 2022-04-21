package com.dao;

import java.util.ArrayList;

public class DeleteDao {
	ArrayList<Integer> sl_nos = new ArrayList<Integer>();

	public ArrayList<Integer> getSl_nos() {
		return sl_nos;
	}

	public void addSl_nos(int e) {
		this.sl_nos.add(e);
	}

	public void setSl_nos(ArrayList<Integer> sl_nos) {
		this.sl_nos = sl_nos;
	}

}
