package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.LinkedHashMap;

import com.crud.Crud;
import com.google.gson.Gson;
import com.response.HRCApiResponse;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class Search extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public Search() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) {
		String doc_id = request.getParameter("doc_id");
		String invoice_id = request.getParameter("invoice_id");
		String cust_number = request.getParameter("cust_number");
		String buisness_year = request.getParameter("buisness_year");
		String page = request.getParameter("page");
		String limit = request.getParameter("limit");

		HashMap<String, Object> data = new LinkedHashMap<String, Object>();

		if (doc_id != null) {
			System.out.println("doc_id = " + doc_id);
			data.put("doc_id", doc_id);
		}
		if (invoice_id != null && (!invoice_id.isBlank())) {
			try {
				data.put("invoice_id", Integer.parseInt(invoice_id));
			} catch (Exception e) {

			}
		}
		if (cust_number != null && (!cust_number.isBlank())) {
			try {
				data.put("cust_number", Integer.parseInt(cust_number));
			} catch (Exception e) {

			}
		}
		if (buisness_year != null && (!buisness_year.isBlank())) {
			try {
				data.put("buisness_year", Integer.parseInt(buisness_year));
			} catch (Exception e) {

			}
		}

		Crud crud = Crud.getInstance();
		if (page != null) {
			int _page = Integer.parseInt(page);
			// Currently per page 10.
			int _offset = (_page - 1) * 10;
			crud.setOffset(_offset);
			if (limit != null) {
				int _l = Integer.parseInt(limit);
				crud.setLimit(_l);
				_offset = (Integer.parseInt(page) - 1) * _l;
				crud.setOffset(_offset);
			}
		}
		PrintWriter out;

		try {

			HRCApiResponse apiResponse = crud.search(data);

			Gson gson = new Gson();
			String respData = gson.toJson(apiResponse);

			System.out.println("response  = " + respData);

			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			out = response.getWriter();

			out.print(respData);
			out.flush();
			response.setStatus(apiResponse.getStatusCode());

		} catch (IOException e) {
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}

	}

}
