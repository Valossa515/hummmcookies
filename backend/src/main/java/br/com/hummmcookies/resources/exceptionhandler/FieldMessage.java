package br.com.hummmcookies.resources.exceptionhandler;

import java.io.Serializable;

public class FieldMessage implements Serializable{
private static final long serialVersionUID = 1L;
	
	private String fieldName;
	private String message;
	
	public FieldMessage()
	{
		
	}

	public FieldMessage(String fieldName, String message) {
		super();
		this.fieldName = fieldName;
		this.message = message;
	}

	public String getFieldNmae() {
		return fieldName;
	}

	public void setFieldNmae(String fieldNmae) {
		this.fieldName = fieldNmae;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
