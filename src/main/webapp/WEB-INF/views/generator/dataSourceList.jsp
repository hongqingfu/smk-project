<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@include file="/WEB-INF/views/include/taglib.jsp" %>
<html>
<head>
    <title>数据库配置</title>
    <meta name="decorator" content="default"/>
    <script type="text/javascript" src="${ctxStatic}/js/generator/dataSourceList.js"></script>
</head>
<body>
<div id="conditions" class="widget-box">
    <div class="widget-header widget-header-small">
        <h5 class="lighter">查询条件</h5>
    </div>
    <div class="widget-body">
        <div class="widget-main">
            <div class="row">
                <div class="form-horizontal">
                    <div class="form-group">
                        <label class="col-md-2 control-label">连接名称</label>
                        <div class="col-md-4">
                            <input name="description" class="input-sm form-control" data-bind="value:description"/>
                        </div>
                        <label class="col-md-2 control-label">数据库名称</label>
                        <div class="col-md-4">
                            <input name="databaseName" class="input-sm form-control" data-bind="value:databaseName"/>
                        </div>
                        <div class="text-right">
                            <button class="btn btn-primary" data-bind="click:query">
                                <span class="glyphicon glyphicon-search"></span>查询
                            </button>
                            <button class="btn btn-primary" data-bind="click:clear">
                                <span class="glyphicon glyphicon-repeat"></span>重置
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="grid"></div>

</body>
</html>
