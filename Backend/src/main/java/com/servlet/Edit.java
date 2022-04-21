package com.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import com.crud.Crud;
import com.dao.EditDao;
import com.google.gson.Gson;
import com.response.HRCApiResponse;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class Edit extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public Edit() {
		super();
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) {
		// Note: Don't forget to set the content-type header to application/json.
		Crud crud = Crud.getInstance();
		EditDao editInfo;
		try {
			editInfo = new Gson().fromJson(request.getReader(), EditDao.class);

			HRCApiResponse apiResponse = crud.editData(editInfo);

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
