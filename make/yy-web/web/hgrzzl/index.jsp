<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    response.setStatus(HttpServletResponse.SC_MOVED_PERMANENTLY);
    response.setHeader("Location", "../hgrzzl/request.html");
    Cookie sourceCookie = new Cookie("source", request.getParameter("id"));
    response.addCookie(sourceCookie);
%>