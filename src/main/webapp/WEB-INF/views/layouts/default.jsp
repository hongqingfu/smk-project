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

    <link rel="stylesheet" type="text/css" href="${ctxStatic}/bootstrap/bootstrap-theme.css"/>
    <link rel="stylesheet" type="text/css" href="${ctxStatic}/bootstrap/bootstrap.min.css"/>
    <link rel="stylesheet" type="text/css" href="${ctxStatic}/kendo/kendo.common.min.css"/>
    <link rel="stylesheet" type="text/css" href="${ctxStatic}/kendo/kendo.bootstrap.min.css"/>
    <link rel="stylesheet" type="text/css" href="${ctxStatic}/common/web_common.css"/>
    <%--<link rel="stylesheet" type="text/css" href="${ctxStatic}/common/commons.css"/>--%>
    <%--<link rel="stylesheet" type="text/css" href="${ctxStatic}/common/site.css"/>--%>
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
<div id="header" class="navbar navbar-default" role="navigation" style="margin-bottom: 1px;">
    <div class="container-fluid" style="background-color: #337ab7">
        <div class="navbar-header">
            <a class="navbar-brand" href="#" style="color:#fff;">SMK</a>
        </div>

        <ul class="nav navbar-nav navbar-right">
            <li class="dropdown">
                <a data-toggle="dropdown" href="#" class="dropdown-toggle">
                    <%--<img class="nav-user-photo" src="assets/avatars/user.jpg"/>--%>
                    <span class="user-info" style="color:#fff;">
									<small>Welcome,</small>
									Jason
								</span>

                    <i class="icon-caret-down"></i>
                </a>
                <ul class="dropdown-menu">
                    <li><a href="#"><span class="glyphicon glyphicon-cog"></span> 设置</a></li>
                    <li><a href="#"><span class="glyphicon glyphicon-user"></span> 个人信息</a></li>
                    <li class="divider"></li>
                    <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> 注销</a></li>
                </ul>
            </li>
        </ul>
        <%--<p class="navbar-text navbar-right">文本</p>--%>
    </div>
</div>
<div class="main-container" style="height: 100%;">
    <div id="horizontal">
        <div id="menu-pane">
            <div class="pane-content">
                <div id="menu-panelbar"></div>
            </div>
        </div>
        <div id="main-pane">
            <div class="container-fluid">
                <sitemesh:body/>

            </div>
        </div>
    </div>
</div>
<%--<sitemesh:body/>--%>
<div id="footer"></div>
<script>
    $(document).ready(function () {
        var horizontal = $("#horizontal").kendoSplitter({
            panes: [
                {collapsible: true, max: "20%", size: "15%"},
                {collapsible: false}
            ]
        }).data("kendoSplitter");

        var browserWindow = $(window);
        var headerFooterHeight = $("#header").height() + $("#footer").height();

        // 调整高度
        function resizeSplitter() {
            horizontal.wrapper.height(browserWindow.height() - headerFooterHeight);
            horizontal.resize();
        }

        resizeSplitter();
        browserWindow.resize(resizeSplitter);

        /****************************菜单**************************************/
        var homogeneous = new kendo.data.HierarchicalDataSource({
            transport: {
                read: {
                    url: ctx + "/sys/menus",
                    dataType: "json"
                }
            },
            schema: {
                model: {
                    id: "id",
                    hasChildren: function (dataItem) {
                        if (dataItem.hasChildren == 0) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            }
        });

//        $("#menu-panelbar").kendoPanelBar({
//            dataSource: homogeneous,
//            template: function (dataItem) {
//                if (!dataItem.item.hasChildren) {
//                    var href = window.location.origin + "/" + dataItem.item.href;
//                    var a = "<a href='" + href +"'>" + dataItem.item.name + "</a>";
//                    return a;
//                } else {
//                    return dataItem.item.name
//                }
//            },
//            dataTextField: "name"
//        });
        $("#menu-panelbar").kendoMEMenu();
    });
</script>
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

    #horizontal {
        height: 100%;
    }
</style>