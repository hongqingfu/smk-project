<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>菜单设置</title>
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

<script>
    $(document).ready(function () {

        var element = $("#grid").kendoMEGrid({
            dataSource: {
                transport: {
                    read: {
                        url: ctx + "/sys/menupage",
                        type: "post"
                    },
                    update: {
                        url: ctx + "/sys/saveMenu",
                        type: "post",
//                        contentType: "application/json",
                        dataType: "json"
                    },
                    destroy: {
                        url: ctx + "/sys/deleteMenu",
//                        type: "post",
                        dataType: "json"
                    },
                    create: {
                        url: ctx + "/sys/saveMenu",
                        type: "post",
//                        contentType: "application/json",
                        dataType: "json"
                    }
                },
                schema: {
                    model: {
                        id: "id",
                        fields: {
                            name: {type: "string", nullable: true},
                            sort: {type: "number"},
                            href: {type: "string"},
                            isShow: {type: "string"},
                            permission: {type: "string"}
                        }
                    }
                }
            },
            sortable: true,
            detailInit: detailInit,
            height: document.documentElement.clientHeight - (70 + $("#conditions").height()),
//            dataBound: function() {
//                this.expandRow(this.tbody.find("tr.k-master-row").first());
//            },
            toolbar: [{name: "create", text: "新增"}],
            columns: [
                {
                    field: "name",
                    title: "名称"
                },
                {
                    field: "sort",
                    title: "排序"
                },
                {
                    field: "isShow",
                    title: "是否显示"
                },
                {
                    field: "href",
                    title: "路径"
                }, {
                    field: "permission",
                    title: "权限"
                },
                {
                    command: [{
                        name: "edit", text: {edit: "修改", update: "更新", cancel: "取消"}
                    }, {
                        name: "destroy",
                        iconClass: "k-icon k-i-delete",
                        text: "删除"
                    }],
                    title: "操作",
                    width: "220px"
                }
            ],
            editable: "inline"
        });
    });

        function detailInit(e) {
            $("<div/>").appendTo(e.detailCell).kendoMEGrid({
                dataSource: {
                    transport: {
                        read: {
                            url: ctx + "/sys/menupage",
                            type: "post",
                            data: {id: e.data.id}
                        }
                    }
    //                filter: {field: "id", operator: "eq", value: e.data.id}
                },
                sortable: true,
    //            selectColumn: true,
                rowNumber: true,
                columns: [
                    {
                        field: "name",
                        title: "名称"
                    },
                    {
                        field: "isShow",
                        title: "是否显示"
                    },
                    {
                        field: "href",
                        title: "路径"
                    }
                ]
            });
        }

    //格式化时间
    if (Date) {
        Date.prototype.toISOString = function () {
            return kendo.toString(this, "yyyy-MM-dd HH:mm:ss");
        };
    }
</script>

</body>
</html>
