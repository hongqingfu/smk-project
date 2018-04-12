<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@include file="/WEB-INF/views/include/taglib.jsp"%>
<html>
<head>
    <title>用户设置</title>
    <meta name="decorator" content="blank"/>
    <script type="text/javascript" src="${ctxStatic}/js/sysUserForm.js"></script>
</head>
<body>
<div id="form" class="form-horizontal">
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
        <div class="panel-heading">用户信息</div>
        <div class="panel-body">
            <div class="form-group row">
                <label class="col-md-2 control-label">名称</label>
                <div class="col-md-4">
                    <input id="name" name="name" class="input-sm form-control" data-bind="value:name" required/>
                </div>
                <label class="col-md-2 control-label">归属公司</label>
                <div class="col-md-4">
                    <input id="companyId" name="companyId" class="input-sm form-control"
                           data-bind="value:companyId"
                           required/>
                </div>
                <label class="col-md-2 control-label">归属部门</label>
                <div class="col-md-4">
                    <input id="officeId" name="officeId" class="input-sm form-control" data-bind="value:officeId"
                           required/>
                </div>
                <label class="col-md-2 control-label">工号</label>
                <div class="col-md-4">
                    <input id="no" name="no" class="input-sm form-control "
                           data-bind="value:no"
                           required/>
                </div>
            </div>
            <div class="space-4"></div>
            <div class="form-group">
                <label class="col-md-2 control-label">登录名</label>
                <div class="col-md-4">
                    <input id="loginName" name="loginName" class="input-sm form-control" data-bind="value:loginName" required/>
                </div>
                <label class="col-md-2 control-label">邮箱</label>
                <div class="col-md-4">
                    <input id="email" name="email" class="input-sm form-control"
                           data-bind="value:email"
                           required/>
                </div>
                <label class="col-md-2 control-label">电话</label>
                <div class="col-md-4">
                    <input id="phone" name="phone" class="input-sm form-control" data-bind="value:phone"
                           required/>
                </div>
                <label class="col-md-2 control-label">手机</label>
                <div class="col-md-4">
                    <input id="mobile" name="mobile" class="input-sm form-control "
                           data-bind="value:mobile"
                           required/>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
