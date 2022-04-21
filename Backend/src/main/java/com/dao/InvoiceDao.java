package com.dao;

import java.sql.Date;

// Date .parse("2009-02-01")

public class InvoiceDao {

	public Date getClear_date() {
		return clear_date;
	}

	public void setClear_date(Date clear_date) {
		this.clear_date = clear_date;
	}

	public int getBuisness_year() {
		return buisness_year;
	}

	public void setBuisness_year(int buisness_year) {
		this.buisness_year = buisness_year;
	}

	public String getDoc_id() {
		return doc_id;
	}

	public void setDoc_id(String doc_id) {
		this.doc_id = doc_id;
	}

	public Date getPosting_date() {
		return posting_date;
	}

	public void setPosting_date(Date posting_date) {
		this.posting_date = posting_date;
	}

	public Date getDocument_create_date() {
		return document_create_date;
	}

	@Override
	public String toString() {
		return "InvoiceDao [sl_no=" + sl_no + ", business_code=" + business.getBusiness_code() + ", business_name=" + business.getBusiness_name() + ", customer_number=" + customer.getCust_number() + ", customer_name=" + customer.getName_customer() + ", clear_date="
				+ clear_date + ", buisness_year=" + buisness_year + ", doc_id=" + doc_id + ", posting_date="
				+ posting_date + ", document_create_date=" + document_create_date + ", document_create_date1="
				+ document_create_date1 + ", due_in_date=" + due_in_date + ", invoice_currency=" + invoice_currency
				+ ", document_type=" + document_type + ", posting_id=" + posting_id + ", area_business=" + area_business
				+ ", total_open_amount=" + total_open_amount + ", baseline_create_date=" + baseline_create_date
				+ ", cust_payment_terms=" + cust_payment_terms + ", invoice_id=" + invoice_id + ", isOpen=" + isOpen
				+ ", aging_bucket=" + aging_bucket + ", is_deleted=" + is_deleted + "]";
	}

	public void setDocument_create_date(Date document_create_date) {
		this.document_create_date = document_create_date;
	}

	public Date getDocument_create_date1() {
		return document_create_date1;
	}

	public void setDocument_create_date1(Date document_create_date1) {
		this.document_create_date1 = document_create_date1;
	}

	public Date getDue_in_date() {
		return due_in_date;
	}

	public void setDue_in_date(Date due_in_date) {
		this.due_in_date = due_in_date;
	}

	public String getInvoice_currency() {
		return invoice_currency;
	}

	public void setInvoice_currency(String invoice_currency) {
		this.invoice_currency = invoice_currency;
	}

	public String getDocument_type() {
		return document_type;
	}

	public void setDocument_type(String document_type) {
		this.document_type = document_type;
	}

	public int getPosting_id() {
		return posting_id;
	}

	public void setPosting_id(int posting_id) {
		this.posting_id = posting_id;
	}

	public String getArea_business() {
		return area_business;
	}

	public void setArea_business(String area_business) {
		this.area_business = area_business;
	}

	public double getTotal_open_amount() {
		return total_open_amount;
	}

	public void setTotal_open_amount(double total_open_amount) {
		this.total_open_amount = total_open_amount;
	}

	public Date getBaseline_create_date() {
		return baseline_create_date;
	}

	public void setBaseline_create_date(Date baseline_create_date) {
		this.baseline_create_date = baseline_create_date;
	}

	public String getCust_payment_terms() {
		return cust_payment_terms;
	}

	public void setCust_payment_terms(String cust_payment_terms) {
		this.cust_payment_terms = cust_payment_terms;
	}

	public int getInvoice_id() {
		return invoice_id;
	}

	public void setInvoice_id(int invoice_id) {
		this.invoice_id = invoice_id;
	}

	public short getIsOpen() {
		return isOpen;
	}

	public void setIsOpen(short isOpen) {
		this.isOpen = isOpen;
	}

	public String getAging_bucket() {
		return aging_bucket;
	}

	public void setAging_bucket(String aging_bucket) {
		this.aging_bucket = aging_bucket;
	}

	public short getIs_deleted() {
		return is_deleted;
	}

	public void setIs_deleted(short is_deleted) {
		this.is_deleted = is_deleted;
	}

	public int getSl_no() {
		return sl_no;
	}

	public void setSl_no(int sl_no) {
		this.sl_no = sl_no;
	}

	public BusinessDao getBusiness() {
		return business;
	}

	public void setBusiness(BusinessDao business) {
		this.business = business;
	}

	public CustomerDao getCustomer() {
		return customer;
	}

	public void setCustomer(CustomerDao customer) {
		this.customer = customer;
	}

	int sl_no;
	BusinessDao business;
	CustomerDao customer;
	Date clear_date;
	int buisness_year;
	String doc_id;
	Date posting_date;
	Date document_create_date;
	Date document_create_date1;
	Date due_in_date;
	String invoice_currency;
	String document_type;
	int posting_id;
	String area_business;
	double total_open_amount;
	Date baseline_create_date;
	String cust_payment_terms;
	int invoice_id;
	short isOpen;
	String aging_bucket;
	short is_deleted;
}
