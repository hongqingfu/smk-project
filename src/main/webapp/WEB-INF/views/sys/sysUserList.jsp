<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>用户设置</title>
</head>
<body>
<div id="conditions" class="row well">
    <div class="form-horizontal ">
        <div class="form-group">
            <label class="col-md-2 control-label">营运人</label>
            <div class="col-md-4">
                <input class="input-sm form-control" data-bind="value:carrier" id="carrier"/>
            </div>
            <label class="col-md-2 control-label">申请人/工号</label>
            <div class="col-md-4">
                <input name="userId" class="input-sm form-control" data-bind="value:userId"/>
            </div>
            <label class="col-md-2 control-label">所在单位</label>
            <div class="col-md-4">
                <input name="operOrg" class="input-sm form-control" data-bind="value:operOrg"/>
            </div>

            <label class="col-md-2 control-label">录入时间</label>
            <div class="col-md-4">
                <input id="applyData" name="applyData" class="input-sm form-control" data-bind="value:applyData"/>
            </div>
        </div>
        <div class="form-group">
            <label class="col-md-2 control-label">授权类别</label>
            <div class="col-md-4">
                <input id="grantType" name="grantType" class="input-sm form-control" data-bind="value:grantType"/>
            </div>
            <label class="col-md-2 control-label">大类</label>
            <div class="col-md-4">
                <input id="priCategory" name="priCategoryId" class="input-sm form-control"
                       data-bind="value:priCategoryId"/>
            </div>
            <label class="col-md-2 control-label">子类</label>
            <div class="col-md-4">
                <input id="subCategory" name="subCategoryId" class="input-sm form-control"
                       data-bind="value:subCategoryId"/>
            </div>
            <label class="col-md-2 control-label">项目名称</label>
            <div class="col-md-4">
                <input id="projectName" name="projectName" class="input-sm form-control"
                       data-bind="value:projectName"/>
            </div>
            <div class="col-md-4">

                <button class="btn btn-primary"
                        data-bind="click:query"><span
                        class="glyphicon glyphicon-search"></span>查询
                </button>
                <button class="btn btn-primary"
                        data-bind="click:reset"><span
                        class="glyphicon glyphicon-repeat"></span>重置
                </button>
            </div>
        </div>
    </div>
</div>
</body>
</html>
