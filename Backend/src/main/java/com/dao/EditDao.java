package com.dao;

public class EditDao {
	int sl_no;

	public int getSl_no() {
		return sl_no;
	}

	@Override
	public String toString() {
		return "EditDao [sl_no=" + sl_no + ", invoice_currency=" + invoice_currency + ", cust_payment_terms="
				+ cust_payment_terms + "]";
	}

	public void setSl_no(int sl_no) {
		this.sl_no = sl_no;
	}

	String invoice_currency;
	String cust_payment_terms;

	public String getInvoice_currency() {
		return invoice_currency;
	}

	public void setInvoice_currency(String invoice_currency) {
		this.invoice_currency = invoice_currency;
	}

	public String getCust_payment_terms() {
		return cust_payment_terms;
	}

	public void setCust_payment_terms(String cust_payment_terms) {
		this.cust_payment_terms = cust_payment_terms;
	}
}
