<%@ page language="java" contentType="text/html; charset=gbk"
	import="com.baidu.ueditor.ActionEnter"
    pageEncoding="gbk"%>
<%@ page trimDirectiveWhitespaces="true" %>
<%

    request.setCharacterEncoding( "utf-8" );
	response.setHeader("Content-Type" , "text/html");
	String rootPath = application.getRealPath( "/" );
	 
	String action = request.getParameter("action");
	String result = new ActionEnter( request, rootPath ).exec();
	if( action!=null && 
	   (action.equals("listfile") || action.equals("listimage") ) ){
	    rootPath = rootPath.replace("\\", "/");
	    result = result.replaceAll(rootPath, "/");//�ѷ���·���е�����·���滻Ϊ '/'
	}
	out.write( result );
	
%>