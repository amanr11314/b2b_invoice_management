package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import com.crud.Crud;
import com.dao.DeleteDao;
import com.google.gson.Gson;
import com.response.HRCApiResponse;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class Delete extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public Delete() {
		super();
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) {
		// Note: Don't forget to set the content-type header to application/json.
		DeleteDao deleteInfo;
		Crud crud = Crud.getInstance();
		try {
			deleteInfo = new Gson().fromJson(request.getReader(), DeleteDao.class);

			System.out.println("Received: " + deleteInfo.toString());

			HRCApiResponse apiResponse = crud.deleteData(deleteInfo);

			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			String sendResponse = new Gson().toJson(apiResponse);

			PrintWriter out = response.getWriter();

			response.setStatus(apiResponse.getStatusCode());
			out.print(sendResponse);
			out.flush();

		} catch (IOException e) {
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
	}

}
