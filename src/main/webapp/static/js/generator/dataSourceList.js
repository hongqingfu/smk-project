$(document).ready(function () {

    var form = $("#conditions").kendoMEForm({
        enableValidate: true,
        query: function () {
            grid.dataSource.read(form.getData())
        },
        clear:function(){
            form.clear();
        }
    }).data("kendoMEForm");
    var grid = $("#grid").kendoMEGrid({
        dataSource: {
            transport: {
                read: {
                    url: ctx + "/dataSource/findPage",
                    type: "post"
                },
                update: {
                    url: ctx + "/dataSource/save",
                    type: "post",
                    dataType: "json"
                },
                destroy: {
                    url: ctx + "/sys/deleteMenu",
                    type: "post",
                    dataType: "json"
                },
                create: {
                    url: ctx + "/sys/saveMenu",
                    type: "post",
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
        height: document.documentElement.clientHeight - (70 + $("#conditions").height()),
//            dataBound: function() {
//                this.expandRow(this.tbody.find("tr.k-master-row").first());
//            },
        toolbar: [{name: "create", text: "新增"}],
        columns: [
            {
                field: "description",
                title: "连接名称"
            },
            {
                field: "databaseType",
                title: "数据库类型"
            },
            {
                field: "databaseName",
                title: "数据库名"
            },
            {
                field: "server",
                title: "服务器IP"
            }, {
                field: "port",
                title: "端口号"
            },{
                field: "username",
                title: "用户名"
            },{
                field: "password",
                title: "密码"
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
    }).data("kendoMEGrid");
});

//格式化时间
if (Date) {
    Date.prototype.toISOString = function () {
        return kendo.toString(this, "yyyy-MM-dd HH:mm:ss");
    };
}