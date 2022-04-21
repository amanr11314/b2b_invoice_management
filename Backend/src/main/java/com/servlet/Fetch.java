package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import com.crud.Crud;
import com.google.gson.Gson;
import com.response.HRCApiResponse;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class Fetch extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public Fetch() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) {
		String page = request.getParameter("page");
		String limit = request.getParameter("limit");
		String cust_number = request.getParameter("q");

		Crud crud = Crud.getInstance();
		if (cust_number != null) {
			System.out.println("received cust_number = " + cust_number);
			crud.setQueryByCustNo(cust_number);
		}
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
			HRCApiResponse apiResponse = crud.getData();
			Gson gson = new Gson();
			String respData = gson.toJson(apiResponse);

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
