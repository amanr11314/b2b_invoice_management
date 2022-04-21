package com.dao;

import java.util.ArrayList;

public class AnalyticsDao {
	String due_date_from;
	String due_date_to;
	String clear_date_from;
	String clear_date_to;
	String baseline_create_date_from;
	String baseline_create_date_to;
	ArrayList<String> invoice_currencies;

	public String getDue_date_from() {
		return due_date_from;
	}

	public void setDue_date_from(String due_date_from) {
		this.due_date_from = due_date_from;
	}

	public String getDue_date_to() {
		return due_date_to;
	}

	public void setDue_date_to(String due_date_to) {
		this.due_date_to = due_date_to;
	}

	public String getClear_date_from() {
		return clear_date_from;
	}

	public void setClear_date_from(String clear_date_from) {
		this.clear_date_from = clear_date_from;
	}

	public String getClear_date_to() {
		return clear_date_to;
	}

	public void setClear_date_to(String clear_date_to) {
		this.clear_date_to = clear_date_to;
	}

	public String getBaseline_create_date_from() {
		return baseline_create_date_from;
	}

	public void setBaseline_create_date_from(String baseline_create_date_from) {
		this.baseline_create_date_from = baseline_create_date_from;
	}

	public String getBaseline_create_date_to() {
		return baseline_create_date_to;
	}

	public void setBaseline_create_date_to(String baseline_create_date_to) {
		this.baseline_create_date_to = baseline_create_date_to;
	}

	public ArrayList<String> getInvoice_currencies() {
		return invoice_currencies;
	}

	public void setInvoice_currencies(ArrayList<String> invoice_currencies) {
		this.invoice_currencies = invoice_currencies;
	}

	@Override
	public String toString() {
		return "AnalyticsDao [due_date_from=" + due_date_from + ", due_date_to=" + due_date_to + ", clear_date_from="
				+ clear_date_from + ", clear_date_to=" + clear_date_to + ", baseline_create_date_from="
				+ baseline_create_date_from + ", baseline_create_date_to=" + baseline_create_date_to
				+ ", invoice_currencies=" + invoice_currencies.toString() + "]";
	}

}
