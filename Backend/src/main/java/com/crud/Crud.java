package com.crud;

import java.sql.Connection;
import java.sql.Date;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;

import com.constants.ConstantReponses;
import com.crudException.KeyNotFoundException;
import com.dao.AnalyticsDao;
import com.dao.AnalyticsResponse;
import com.dao.BusinessDao;
import com.dao.CustomerDao;
import com.dao.DeleteDao;
import com.dao.EditDao;
import com.dao.InvoiceDao;
import com.response.HRCApiResponse;

import jakarta.servlet.http.HttpServletResponse;

public class Crud {
	static final String url = "YOUR_DATABASE_URL";
	static final String user = "USERNAME";
	static final String pass = "PASSWORD";

	private static Crud single_instance = null;

	private int limit;
	private int offset;
	private String queryByCustNo;

	public void setOffset(int o) {
		this.offset = o;
	}

	public void setLimit(int l) {
		this.limit = l;
	}

	private Crud() {
		this.setLimit(10);
		this.setOffset(0);
		this.setQueryByCustNo("");
	}

	public static Crud getInstance() {
		if (single_instance == null)
			single_instance = new Crud();

		return single_instance;
	}

	private static Connection getConnection() {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			Connection conn = DriverManager.getConnection(url, user, pass);
			System.out.println("CONNECTION GETTING SUCCESS");
			return conn;
		} catch (Exception e) {
			System.out.println("CONNECTION GETTING FAILED");
			System.out.println(e);
		}
		return null;
	}

	// DONE
	public HRCApiResponse getData() {

		HRCApiResponse response = new HRCApiResponse();

		ArrayList<InvoiceDao> invoiceDataList = new ArrayList<InvoiceDao>();

		String sql_query = "SELECT w.*, b.business_name, c.name_customer FROM winter_internship w, business b, customer c WHERE w.business_code=b.business_code AND w.cust_number=c.cust_number AND w.is_deleted=0 ";
		if (!this.queryByCustNo.trim().isEmpty())
			sql_query += " AND CAST(w.cust_number AS CHAR) LIKE ? ";
		sql_query += "ORDER BY sl_no LIMIT ?,?";
		Connection conn = getConnection();
		PreparedStatement pst;
		try {
			int index = 1;
			pst = conn.prepareStatement(sql_query);

			if (!this.queryByCustNo.trim().isEmpty())
				pst.setString(index++, "%" + this.queryByCustNo + "%");

			pst.setInt(index++, offset);
			pst.setInt(index++, limit);

			System.out.println(pst.toString());
			ResultSet rs = pst.executeQuery();

			while (rs.next()) {
				InvoiceDao invoiceRecord = new InvoiceDao();
				invoiceRecord.setSl_no(rs.getInt("sl_no"));

				BusinessDao business = new BusinessDao();
				business.setBusiness_code(rs.getString("business_code"));
				business.setBusiness_name(rs.getString("business_name"));

				invoiceRecord.setBusiness(business);

				CustomerDao customer = new CustomerDao();
				customer.setCust_number(rs.getInt("cust_number"));
				customer.setName_customer(rs.getString("name_customer"));

				invoiceRecord.setCustomer(customer);

				try {
					Date clearDate = rs.getDate("clear_date");
					invoiceRecord.setClear_date(clearDate);
				} catch (Exception e) {
					invoiceRecord.setClear_date(null);
				}

				invoiceRecord.setBuisness_year(rs.getInt("buisness_year"));
				invoiceRecord.setDoc_id(rs.getString("doc_id"));
				invoiceRecord.setPosting_date(rs.getDate("posting_date"));
				invoiceRecord.setDocument_create_date(rs.getDate("document_create_date"));
				invoiceRecord.setDocument_create_date1(rs.getDate("document_create_date1"));
				invoiceRecord.setDue_in_date(rs.getDate("due_in_date"));

				invoiceRecord.setInvoice_currency(rs.getString("invoice_currency"));

				invoiceRecord.setDocument_type(rs.getString("document_type"));
				invoiceRecord.setPosting_id(rs.getInt("posting_id"));
				invoiceRecord.setArea_business(rs.getString("area_business"));
				invoiceRecord.setTotal_open_amount(rs.getDouble("total_open_amount"));
				invoiceRecord.setBaseline_create_date(rs.getDate("baseline_create_date"));
				invoiceRecord.setCust_payment_terms(rs.getString("cust_payment_terms"));
				invoiceRecord.setInvoice_id(rs.getInt("invoice_id"));
				invoiceRecord.setIsOpen(rs.getShort("isOpen"));
				invoiceRecord.setAging_bucket(rs.getString("aging_bucket"));
				invoiceRecord.setIs_deleted(rs.getShort("is_deleted"));

				invoiceDataList.add(invoiceRecord);

			}

		} catch (SQLException e) {
			response = ConstantReponses.getSQLExceptionResponse(e.toString());
			return response;
		}
		HashMap<String, Object> respData = new LinkedHashMap<String, Object>();
		int total = 0;
		try {
			// total = getTotalCount();
			String query = "SELECT COUNT(*) AS total_matches FROM winter_internship WHERE is_deleted=0 AND CAST(cust_number AS CHAR) LIKE '%"
					+ queryByCustNo + "%';";
			total = _getTotalRowCount(query);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		respData.put("total", total);
		respData.put("fetch_data", invoiceDataList);
		response.setData(respData);

		if (invoiceDataList.isEmpty()) {
			response.setStatusCode(HttpServletResponse.SC_NO_CONTENT);
			response.setMessage("No Data Found!");
		} else {
			response.setStatusCode(HttpServletResponse.SC_OK);
			response.setMessage("SUCCESS!");
		}

		// return invoiceDataList;
		return response;
	}

	// DONE
	public HRCApiResponse editData(EditDao editInfo) {
		// TODO:: Create record not found exception.
		HRCApiResponse response = new HRCApiResponse();
		int rowsEffected = 0;
		try {
			if (editInfo.getSl_no() <= 0)
				throw new KeyNotFoundException("sl_no");
			ArrayList<String> editColumns = new ArrayList<String>();
			if ((editInfo.getInvoice_currency() != null) && (!editInfo.getInvoice_currency().isBlank()))
				editColumns.add("invoice_currency");
			if ((editInfo.getCust_payment_terms() != null) && (!editInfo.getCust_payment_terms().isBlank()))
				editColumns.add("cust_payment_terms");

			if (editColumns.isEmpty()) {
				response.setStatusCode(HttpServletResponse.SC_BAD_REQUEST);
				response.setMessage("No columns to edit");

				return response;
			}

			String columnsQuery = "";
			for (String column : editColumns) {
				if (editColumns.indexOf(column) > 0) {
					columnsQuery += ", ";
				}
				columnsQuery += (column) + " = ? ";
			}

			columnsQuery = "UPDATE winter_internship SET " + columnsQuery + " WHERE sl_no = ? ;";

			Connection conn = getConnection();

			PreparedStatement pst;

			pst = conn.prepareStatement(columnsQuery);

			for (int i = 0; i < editColumns.size(); ++i) {
				String val = editColumns.get(i).equals("invoice_currency") ? editInfo.getInvoice_currency()
						: editInfo.getCust_payment_terms();
				pst.setString((i + 1), val);
			}
			int lastParamId = editColumns.size() + 1;
			pst.setInt(lastParamId, editInfo.getSl_no());

			rowsEffected = pst.executeUpdate();
		} catch (SQLException e) {
			response = ConstantReponses.getSQLExceptionResponse(e.toString());
			return response;
		} catch (KeyNotFoundException e) {
			response.setStatusCode(HttpServletResponse.SC_BAD_REQUEST);
			response.setMessage(e.toString());
			return response;
		}

		response.setStatusCode(HttpServletResponse.SC_OK);
		String msg = rowsEffected + " rows edited in database";
		response.setMessage(msg);
		response.setData(rowsEffected);

		return response;
	}

	// DONE
	public HRCApiResponse deleteData(DeleteDao deleteInfo) {
		HRCApiResponse response = new HRCApiResponse();
		int rowsEffected = 0;
		ArrayList<Integer> invalidSlnos = new ArrayList<Integer>();
		try {
			if (deleteInfo.getSl_nos().isEmpty())
				throw new KeyNotFoundException("sl_nos");
			String query;
			query = "UPDATE winter_internship SET is_deleted = ? WHERE sl_no in (";
			var list = deleteInfo.getSl_nos();
			for (int i = 0; i < list.size(); ++i) {
				if (list.get(i) <= 0) {
					invalidSlnos.add(list.get(i));
					continue;
				}
				if (i > 0)
					query += " ,";
				query += "?";
			}
			query += ")";
			short is_deleted = 1;
			Connection conn = getConnection();

			PreparedStatement pst = conn.prepareStatement(query);
			int id = 1;
			pst.setInt(id++, is_deleted);
			for (var sl_no : list) {
				if (sl_no <= 0)
					continue;
				pst.setInt(id++, sl_no);
			}
			System.out.println(pst.toString());

			rowsEffected = pst.executeUpdate();
		} catch (SQLException e) {
			response = ConstantReponses.getSQLExceptionResponse(e.toString());
			return response;
		} catch (KeyNotFoundException e) {
			response.setStatusCode(HttpServletResponse.SC_BAD_REQUEST);
			response.setMessage(e.toString());
			return response;
		}
		response.setStatusCode(HttpServletResponse.SC_OK);

		String msg = rowsEffected + " rows deleted";
		if (invalidSlnos.isEmpty()) {
			response.setMessage(msg);
		} else {
			ArrayList<String> msgS = new ArrayList<String>();

			msgS.add(msg);

			String invalidIdMsg = "Invalid sl_no: " + invalidSlnos.toString();
			msgS.add(invalidIdMsg);
			response.setMessage(msgS);

		}
		response.setData(rowsEffected);
		return response;

	}

	private int _getTotalRowCount(String query) throws SQLException {
		Connection conn = getConnection();
		Statement stmt = conn.createStatement();
		ResultSet rs = stmt.executeQuery(query);
		rs.next();
		int total = rs.getInt(1);
		System.out.println("Total records = " + total);

		return total;
	}

	// DONE
	public int getTotalCount() throws SQLException {
		String query = "SELECT COUNT(*) AS TOTAL FROM winter_internship where is_deleted=0";

		Connection conn = getConnection();
		Statement stmt = conn.createStatement();
		ResultSet rs = stmt.executeQuery(query);
		rs.next();
		int total = rs.getInt(1);
		System.out.println("Total records = " + total);

		return total;
	}

	// DONE
	public HRCApiResponse addData(InvoiceDao invoice) {
		HRCApiResponse response = new HRCApiResponse();
		int rowsEffected = 0;
		try {
			Connection conn = getConnection();
			String query = "INSERT INTO winter_internship (sl_no,  business_code,cust_number,clear_date,buisness_year,doc_id,posting_date,document_create_date,document_create_date1,due_in_date,invoice_currency,document_type,posting_id,area_business,total_open_amount,baseline_create_date,cust_payment_terms,invoice_id,isOpen,aging_bucket,is_deleted)"
					+ "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

			Crud crud = new Crud();

			int total = crud.getTotalCount();

			invoice.setSl_no(total + 1);

			PreparedStatement pst = conn.prepareStatement(query);

			int sl_no = invoice.getSl_no();

			pst.setInt(1, sl_no);

			BusinessDao business = invoice.getBusiness();

			String business_code = business.getBusiness_code();

			if (business_code != null) {
				pst.setString(2, business_code);

			} else {
				pst.setNull(2, Types.VARCHAR);
			}

			CustomerDao customer = invoice.getCustomer();
			int cust_number = customer.getCust_number();

			if (cust_number > 0) {
				pst.setInt(3, cust_number);
			} else {
				pst.setNull(3, Types.INTEGER);
			}

			Date clear_date = invoice.getClear_date();
			if (clear_date != null) {
				pst.setDate(4, clear_date);
			} else {
				pst.setNull(4, Types.DATE);
			}

			int buisness_year = invoice.getBuisness_year();
			if (buisness_year > 0) {
				pst.setInt(5, buisness_year);
			} else {
				pst.setNull(5, Types.INTEGER);
			}

			String doc_id = invoice.getDoc_id();
			if (doc_id != null) {
				pst.setString(6, doc_id);

			} else {
				pst.setNull(6, Types.VARCHAR);
			}

			Date posting_date = invoice.getPosting_date();
			if (posting_date != null) {
				pst.setDate(7, posting_date);
			} else {
				pst.setNull(7, Types.DATE);
			}

			Date document_create_date = invoice.getDocument_create_date();
			if (document_create_date != null) {
				pst.setDate(8, document_create_date);
			} else {
				pst.setNull(8, Types.DATE);
			}

			Date document_create_date1 = invoice.getDocument_create_date1();
			if (document_create_date1 != null) {
				pst.setDate(9, document_create_date1);
			} else {
				pst.setNull(9, Types.DATE);
			}

			Date due_in_date = invoice.getDue_in_date();
			if (due_in_date != null) {
				pst.setDate(10, due_in_date);
			} else {
				pst.setNull(10, Types.DATE);
			}

			String invoice_currncy = invoice.getInvoice_currency();
			if (invoice_currncy != null) {
				pst.setString(11, invoice_currncy);
			} else {
				pst.setNull(11, Types.VARCHAR);
			}

			String document_type = invoice.getDocument_type();
			if (document_type != null) {
				pst.setString(12, document_type);
			} else {
				pst.setNull(12, Types.VARCHAR);
			}

			int posting_id = invoice.getPosting_id();
			if (posting_id > 0) {
				pst.setInt(13, posting_id);
			} else {
				pst.setNull(13, Types.INTEGER);
			}

			String area_business = invoice.getArea_business();
			if (area_business != null) {
				pst.setString(14, area_business);
			} else {
				pst.setNull(14, Types.VARCHAR);
			}

			double total_open_amount = invoice.getTotal_open_amount();
			if (total_open_amount > 0.0d) {
				pst.setDouble(15, total_open_amount);
			} else {
				pst.setNull(15, Types.DOUBLE);
			}

			Date baseline_create_date = invoice.getBaseline_create_date();
			if (baseline_create_date != null) {
				pst.setDate(16, baseline_create_date);
			} else {
				pst.setNull(16, Types.DATE);
			}

			String cust_payment_terms = invoice.getCust_payment_terms();
			if (cust_payment_terms != null) {
				pst.setString(17, cust_payment_terms);
			} else {
				pst.setNull(17, Types.VARCHAR);
			}

			int invoice_id = invoice.getInvoice_id();
			if (invoice_id > 0) {
				pst.setInt(18, invoice_id);
			} else {
				pst.setNull(18, Types.INTEGER);
			}

			int isOpen = clear_date == null ? 1 : 0;

			pst.setInt(19, isOpen);

			pst.setNull(20, Types.VARCHAR);

			int isDeleted = 0;
			pst.setInt(21, isDeleted);

			rowsEffected = pst.executeUpdate();
		} catch (SQLException e) {
			response = ConstantReponses.getSQLExceptionResponse(e.toString());
			return response;
		}
		response.setStatusCode(HttpServletResponse.SC_OK);
		String msg = rowsEffected + " rows added";
		response.setMessage(msg);
		response.setData(rowsEffected);
		return response;
	}

	// DONE
	public HRCApiResponse search(HashMap<String, Object> data) {
		HRCApiResponse response = new HRCApiResponse();

		ArrayList<InvoiceDao> invoiceDataList = new ArrayList<InvoiceDao>();
		String sql_query = "SELECT w.*, b.business_name, c.name_customer FROM winter_internship w, business b, customer c WHERE w.business_code=b.business_code AND w.cust_number=c.cust_number AND w.is_deleted=0 ";

		ArrayList<Object> values = new ArrayList<Object>();
		String _rowCountQuery = "SELECT COUNT(*) AS total_matches FROM winter_internship WHERE ";
		String _rowCountExpression = null;

		for (var entry : data.entrySet()) {
			String key = entry.getKey();
			String wildcardExpression = "'%" + entry.getValue() + "%'";

			if (_rowCountExpression == null) {
				_rowCountExpression = " CAST(" + key + " AS CHAR) " + " LIKE ";
			} else {
				_rowCountExpression += " AND " + " CAST(" + key + " AS CHAR) " + " LIKE ";
			}
			_rowCountExpression += wildcardExpression;

			if (key.equalsIgnoreCase("cust_number")) {
				key = "c." + key;
			}
			if (data.get(key) instanceof Integer) {
				key = "CAST(" + key + " AS CHAR)";
			}
			sql_query += " AND " + key + " LIKE ?";
			values.add(entry.getValue());
		}

		_rowCountQuery += _rowCountExpression;

		// int totalCount = _getTotalRowCount(_rowCountQuery);

		sql_query += " LIMIT ?,?";

		Connection conn = getConnection();
		PreparedStatement pst;
		try {
			pst = conn.prepareStatement(sql_query);

			int index = 1;
			for (var val : values) {
				pst.setString(index, "%" + val + "%");
				// if (val instanceof String) {
				// pst.setString(index, (String) val);
				// } else if (val instanceof Integer) {
				// pst.setInt(index, (Integer) val);
				// }
				index += 1;
			}
			pst.setInt(index++, offset);
			pst.setInt(index++, limit);

			System.out.println(pst.toString());
			System.out.println("\n\n\n\n\n");

			ResultSet rs = pst.executeQuery();

			while (rs.next()) {
				InvoiceDao invoiceRecord = new InvoiceDao();
				invoiceRecord.setSl_no(rs.getInt("sl_no"));

				BusinessDao business = new BusinessDao();
				business.setBusiness_code(rs.getString("business_code"));
				business.setBusiness_name(rs.getString("business_name"));

				invoiceRecord.setBusiness(business);

				CustomerDao customer = new CustomerDao();
				customer.setCust_number(rs.getInt("cust_number"));
				customer.setName_customer(rs.getString("name_customer"));

				invoiceRecord.setCustomer(customer);

				try {
					Date clearDate = rs.getDate("clear_date");
					invoiceRecord.setClear_date(clearDate);
				} catch (Exception e) {
					invoiceRecord.setClear_date(null);
				}

				invoiceRecord.setBuisness_year(rs.getInt("buisness_year"));
				invoiceRecord.setDoc_id(rs.getString("doc_id"));
				invoiceRecord.setPosting_date(rs.getDate("posting_date"));
				invoiceRecord.setDocument_create_date(rs.getDate("document_create_date"));
				invoiceRecord.setDocument_create_date1(rs.getDate("document_create_date1"));
				invoiceRecord.setDue_in_date(rs.getDate("due_in_date"));

				invoiceRecord.setInvoice_currency(rs.getString("invoice_currency"));

				invoiceRecord.setDocument_type(rs.getString("document_type"));
				invoiceRecord.setPosting_id(rs.getInt("posting_id"));
				invoiceRecord.setArea_business(rs.getString("area_business"));
				invoiceRecord.setTotal_open_amount(rs.getDouble("total_open_amount"));
				invoiceRecord.setBaseline_create_date(rs.getDate("baseline_create_date"));
				invoiceRecord.setCust_payment_terms(rs.getString("cust_payment_terms"));
				invoiceRecord.setInvoice_id(rs.getInt("invoice_id"));
				invoiceRecord.setIsOpen(rs.getShort("isOpen"));
				invoiceRecord.setAging_bucket(rs.getString("aging_bucket"));
				invoiceRecord.setIs_deleted(rs.getShort("is_deleted"));

				invoiceDataList.add(invoiceRecord);

			}
		} catch (SQLException e) {
			response = ConstantReponses.getSQLExceptionResponse(e.toString());
			return response;
		}

		HashMap<String, Object> respData = new LinkedHashMap<String, Object>();
		int total = 0;
		try {
			total = _getTotalRowCount(_rowCountQuery);
			System.out.println("FOUND TOTAL SEARCH QUERY = " + total);
		} catch (SQLException e) {

			System.out.println("ROWCOUNT QYERY = " + _rowCountQuery);
			e.printStackTrace();
		}
		respData.put("total", total);
		respData.put("fetch_data", invoiceDataList);
		response.setData(respData);

		// response.setData(invoiceDataList);

		if (invoiceDataList.isEmpty()) {
			response.setStatusCode(HttpServletResponse.SC_NO_CONTENT);
			response.setMessage("No Data Found!");
		} else {
			response.setStatusCode(HttpServletResponse.SC_OK);
			response.setMessage("SUCCESS!");
		}

		// return invoiceDataList;
		return response;
	}

	// DONE
	public HRCApiResponse getAnalytics(AnalyticsDao analyticsFilter) {
		HRCApiResponse response = new HRCApiResponse();
		HashMap<String, Object> respData = new LinkedHashMap<String, Object>();
		boolean isAnalytics1Empty = true;
		boolean isAnalytics2Empty = true;

		// for bar graph
		String sql_query_1 = "SELECT b.business_name, COUNT(w.business_code) AS no_of_customers, SUM(w.total_open_amount) AS total_open_amount FROM winter_internship w, business b WHERE b.business_code=w.business_code AND w.clear_date>=? AND w.clear_date<=?  AND w.due_in_date>=? AND w.due_in_date<=? AND w.baseline_create_date>=? AND w.baseline_create_date<=?  GROUP BY w.business_code";

		Connection conn = getConnection();
		PreparedStatement pst;

		ArrayList<AnalyticsResponse> analyticsResponses = new ArrayList<AnalyticsResponse>();

		try {
			pst = conn.prepareStatement(sql_query_1);
			int index = 1;
			pst.setString(index++, analyticsFilter.getClear_date_from());
			pst.setString(index++, analyticsFilter.getClear_date_to());
			pst.setString(index++, analyticsFilter.getDue_date_from());
			pst.setString(index++, analyticsFilter.getDue_date_to());
			pst.setString(index++, analyticsFilter.getBaseline_create_date_from());
			pst.setString(index++, analyticsFilter.getBaseline_create_date_to());

			System.out.println(pst.toString());
			ResultSet rs = pst.executeQuery();

			while (rs.next()) {
				isAnalytics1Empty = false;
				AnalyticsResponse analyticsRow = new AnalyticsResponse();
				analyticsRow.setBusiness_name(rs.getString("business_name"));
				analyticsRow.setNo_of_customers(rs.getInt("no_of_customers"));
				analyticsRow.setTotal_open_amount(rs.getDouble("total_open_amount"));

				analyticsResponses.add(analyticsRow);

			}

		} catch (SQLException e) {
			response = ConstantReponses.getSQLExceptionResponse(e.toString());
			return response;
		}

		for (var res : analyticsResponses) {
			System.out.println(res.toString());
		}

		respData.put("analytics1", analyticsResponses);

		HashMap<String, Integer> analytics2 = new LinkedHashMap<String, Integer>();
		String sql_query_2 = "SELECT w.invoice_currency, COUNT(w.invoice_currency) AS currency_count FROM winter_internship w WHERE invoice_currency IN (";
		var currencies = analyticsFilter.getInvoice_currencies();
		String curr_query_str = null;
		for (var __ : currencies) {
			if (curr_query_str == null) {
				curr_query_str = "?";
			} else {
				curr_query_str += ",?";
			}
		}

		sql_query_2 += curr_query_str;

		sql_query_2 += ") AND w.clear_date>=? AND w.clear_date<=?  AND w.due_in_date>=? AND w.due_in_date<=? AND w.baseline_create_date>=? AND w.baseline_create_date<=? GROUP BY w.invoice_currency";

		try {
			pst = conn.prepareStatement(sql_query_2);
			int index = 1;
			for (var currency : currencies) {
				pst.setString(index++, currency);
			}
			pst.setString(index++, analyticsFilter.getClear_date_from());
			pst.setString(index++, analyticsFilter.getClear_date_to());
			pst.setString(index++, analyticsFilter.getDue_date_from());
			pst.setString(index++, analyticsFilter.getDue_date_to());
			pst.setString(index++, analyticsFilter.getBaseline_create_date_from());
			pst.setString(index++, analyticsFilter.getBaseline_create_date_to());

			System.out.println(pst.toString());
			ResultSet rs = pst.executeQuery();

			while (rs.next()) {
				isAnalytics2Empty = false;
				analytics2.put(rs.getString("invoice_currency"), rs.getInt("currency_count"));
			}

		} catch (SQLException e) {
			response = ConstantReponses.getSQLExceptionResponse(e.toString());
			return response;
		}

		respData.put("analytics2", analytics2);
		response.setData(respData);
		response.setStatusCode(HttpServletResponse.SC_OK);
		if (isAnalytics1Empty && isAnalytics2Empty)
			response.setMessage("NO DATA FOUND!");
		else if (isAnalytics1Empty ^ isAnalytics2Empty)
			response.setMessage((isAnalytics1Empty ? "Analytics1 not found" : "Analytics2 not found"));
		else
			response.setMessage("SUCCESS!");

		return response;
	}

	public String getQueryByCustNo() {
		return queryByCustNo;
	}

	public void setQueryByCustNo(String queryByCustNo) {
		this.queryByCustNo = queryByCustNo;
	}

}
