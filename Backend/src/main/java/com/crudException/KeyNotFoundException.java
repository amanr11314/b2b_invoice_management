package com.crudException;

public class KeyNotFoundException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public KeyNotFoundException(String keyName) {
		super(keyName+" not found!!");
	}
}
