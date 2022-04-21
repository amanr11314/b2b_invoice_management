package com.dao;

public class AnalyticsResponse {
	String business_name;
	int no_of_customers;
	double total_open_amount;

	public String getBusiness_name() {
		return business_name;
	}

	public void setBusiness_name(String business_name) {
		this.business_name = business_name;
	}

	public int getNo_of_customers() {
		return no_of_customers;
	}

	public void setNo_of_customers(int no_of_customers) {
		this.no_of_customers = no_of_customers;
	}

	public double getTotal_open_amount() {
		return total_open_amount;
	}

	public void setTotal_open_amount(double total_open_amount) {
		this.total_open_amount = total_open_amount;
	}

	@Override
	public String toString() {
		return "AnalyticsResponse [business_name=" + business_name + ", no_of_customers=" + no_of_customers
				+ ", total_open_amount=" + total_open_amount + "]";
	}

}
