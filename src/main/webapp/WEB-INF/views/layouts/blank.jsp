<%@ page contentType="text/html;charset=UTF-8" %>
<%@include file="/WEB-INF/views/include/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
    <title><sitemesh:title/></title>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>
    <meta http-equiv="Cache-Control" content="no-store"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Pragma" content="no-cache"/>
    <meta http-equiv="Expires" content="0"/>
    <script type="text/javascript">var ctx = '${ctx}', ctxStatic = '${ctxStatic}';</script>

    <%--<link rel="stylesheet" type="text/css" href="${ctxStatic}/bootstrap/bootstrap-theme.css"/>--%>
    <link rel="stylesheet" type="text/css" href="${ctxStatic}/bootstrap/bootstrap.min.css"/>
    <link rel="stylesheet" type="text/css" href="${ctxStatic}/kendo/kendo.common.min.css"/>
    <link rel="stylesheet" type="text/css" href="${ctxStatic}/kendo/kendo.bootstrap.min.css"/>
    <link rel="stylesheet" type="text/css" href="${ctxStatic}/common/web_common.css"/>
    <%--<link rel="stylesheet" type="text/css" href="${ctxStatic}/kendo/kendo.silver.min.css"/>--%>
    <%--<link rel="stylesheet" type="text/css" href="${ctxStatic}/common/styles.css"/>--%>

    <script type="text/javascript" src="${ctxStatic}/jquery/jquery-3.3.1.min.js"></script>
    <script type="text/javascript" src="${ctxStatic}/bootstrap/bootstrap.min.js"></script>
    <script type="text/javascript" src="${ctxStatic}/kendo/kendo.all.min.js"></script>
    <script type="text/javascript" src="${ctxStatic}/kendo/kendo.culture.zh-CN.min.js"></script>
    <script type="text/javascript" src="${ctxStatic}/common/web_common.js"></script>
    <script type="text/javascript" src="${ctxStatic}/me/MEWidget.js"></script>

    <sitemesh:head/>
</head>
<body>
<sitemesh:body/>
</body>

</html>
<style>
    html,
    body {
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
    }
</style>