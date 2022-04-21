package com.constants;

import java.util.ArrayList;

import com.response.HRCApiResponse;

import jakarta.servlet.http.HttpServletResponse;

public class ConstantReponses {
	private ConstantReponses() {
		
	}
	public static HRCApiResponse getSQLExceptionResponse(String customMessage) {
		HRCApiResponse response = new HRCApiResponse();
		response.setStatusCode(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);

		ArrayList<String> messages = new ArrayList<String>();
		messages.add("SQL Exception occured!");
		messages.add(customMessage);
		response.setMessage(messages);
		return response;	
	}
}
