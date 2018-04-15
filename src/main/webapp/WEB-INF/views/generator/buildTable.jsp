<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@include file="/WEB-INF/views/include/taglib.jsp"%>
<html>
<head>
    <title>表单配置</title>
    <meta name="decorator" content="blank"/>
    <script type="text/javascript" src="${ctxStatic}/js/generator/buildTable.js"></script>
</head>
<body>
<div id="conditions" class="form-horizontal">
    <div class="form-group">
        <button class="btn btn-success" style="float:right;margin-right:5px"
                data-bind="click:submit,style:{display:pkid?'display':'none'}"><span
                class="glyphicon glyphicon-ok"></span>提交
        </button>
        <button class="btn btn-primary" style="float:right;margin-right:5px" data-bind="click:Temporary" remove="approve"><span
                class="glyphicon glyphicon-floppy-disk"></span>暂存
        </button>
    </div>
    <div class="panel panel-primary">
        <div class="panel-heading">生成表单配置</div>
        <div class="panel-body">
            <div class="form-group row">
                <label class="col-md-10 control-label">数据源</label>
                <div class="col-md-10">
                    <input id="dataSourceId" name="name" class="input-sm form-control" data-bind="value:dataSourceId" required/>
                </div>
            </div>
            <div class="form-group">
                <div class="form-group row">
                    <label class="col-md-10 control-label">表名</label>
                    <div class="col-md-10">
                        <input id="tableName" name="name" class="input-sm form-control" data-bind="value:tableName" required/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
