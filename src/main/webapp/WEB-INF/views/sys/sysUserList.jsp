<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@include file="/WEB-INF/views/include/taglib.jsp"%>
<html>
<head>
    <title>用户设置</title>
    <meta name="decorator" content="default"/>
    <script type="text/javascript" src="${ctxStatic}/js/sysUserList.js"></script>
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
                        <label class="col-md-2 control-label">条件1</label>
                        <div class="col-md-4">
                            <input name="" class="input-sm form-control"/>
                        </div>
                        <label class="col-md-2 control-label">条件2</label>
                        <div class="col-md-4">
                            <input name="" class="input-sm form-control"/>
                        </div>
                        <label class="col-md-2 control-label">条件3</label>
                        <div class="col-md-4">
                            <input name="" class="input-sm form-control"/>
                        </div>
                        <label class="col-md-2 control-label">条件4</label>
                        <div class="col-md-4">
                            <input name="" class="input-sm form-control"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" style="text-align: center">
                <button class="btn btn-primary">
                    <span class="glyphicon glyphicon-search"></span>查询
                </button>
                <button class="btn btn-primary">
                    <span class="glyphicon glyphicon-repeat"></span>重置
                </button>
            </div>
        </div>
    </div>
</div>

<div id="grid"></div>
</body>
</html>
