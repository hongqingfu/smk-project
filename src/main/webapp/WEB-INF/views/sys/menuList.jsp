<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@include file="/WEB-INF/views/include/taglib.jsp" %>
<html>
<head>
    <title>菜单设置</title>
    <meta name="decorator" content="default"/>
    <script type="text/javascript" src="${ctxStatic}/js/menuList.js"></script>
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
                        <label class="col-md-2 control-label">名称</label>
                        <div class="col-md-4">
                            <input name="name" class="input-sm form-control" data-bind="value:name"/>
                        </div>
                        <label class="col-md-2 control-label">是否显示</label>
                        <div class="col-md-4">
                            <input name="2" class="input-sm form-control" data-bind="value:isShow"/>
                        </div>
                        <%--<label class="col-md-2 control-label">条件3</label>
                        <div class="col-md-4">
                            <input name="3" class="input-sm form-control"/>
                        </div>
                        <label class="col-md-2 control-label">条件4</label>
                        <div class="col-md-4">
                            <input name="4" class="input-sm form-control"/>
                        </div>--%>
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
            <%--<div class="row" style="text-align: center">
                <button class="btn btn-primary" id="test">
                    <span class="glyphicon glyphicon-search"></span>查询
                </button>
                <button class="btn btn-primary">
                    <span class="glyphicon glyphicon-repeat"></span>重置
                </button>
            </div>--%>
        </div>
    </div>
</div>

<div id="grid"></div>

</body>
</html>
