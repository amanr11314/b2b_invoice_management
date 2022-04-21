package com.servlet;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

import com.crud.Crud;
import com.dao.AnalyticsDao;
import com.google.gson.Gson;
import com.response.HRCApiResponse;

public class Analytics extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public Analytics() {
		super();
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) {
		Crud crud = Crud.getInstance();
		AnalyticsDao analyticsInfo;
		try {
			analyticsInfo = new Gson().fromJson(request.getReader(), AnalyticsDao.class);

			HRCApiResponse apiResponse = crud.getAnalytics(analyticsInfo);

			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			String sendResponse = new Gson().toJson(apiResponse);

			PrintWriter out = response.getWriter();

			out.print(sendResponse);
			out.flush();

			response.setStatus(apiResponse.getStatusCode());
		} catch (IOException e) {
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	}

}
