var form;
$(document).ready(function () {

    form = $("#conditions").kendoMEForm({
        enableValidate: true,
        query: function () {
            grid.dataSource.read(form.getData())
        },
        clear: function () {
            form.clear();
        },
        add: function () {
            $window.data("kendoMEWindow").openUrl(ctx + "/table/bulidTable");
        },
        build: function (id) {
            $window.data("kendoMEWindow").openUrl(ctx + "/sys/userForm");
        }
    }).data("kendoMEForm");

    var $window = $("<div id='detail_window'></div>").appendTo($(document.body)).kendoMEWindow();

    var grid = $("#grid").kendoMEGrid({
        dataSource: {
            transport: {
                read: {
                    url: ctx + "/table/findPage",
                    type: "post"
                },
                update: {
                    url: ctx + "/table/save",
                    type: "post",
                    dataType: "json"
                },
                destroy: {
                    url: ctx + "/table/deleteMenu",
                    type: "post",
                    dataType: "json"
                },
                create: {
                    url: ctx + "/table/save",
                    type: "post",
                    dataType: "json"
                }
            },
            schema: {
                model: {
                    id: "id",
                    fields: {}
                }
            }
        },
        sortable: true,
        height: document.documentElement.clientHeight - (70 + $("#conditions").height()),
        toolbar: [{template: '<a class="k-button k-button-icontext" onclick="return form.data.add()"><span class="k-icon k-i-plus"></span>新增</a>'}],
        columns: [
            {
                field: "comments",
                title: "功能描述"
            },
            {
                field: "name",
                title: "表名"
            },
            {
                field: "className",
                title: "类名"
            },
            {
                command: [
                    {
                        name: "edit", text: {edit: "修改", update: "更新", cancel: "取消"}
                    },
                    {
                        name: "build", text: "生成代码",iconClass: "k-icon k-i-hyperlink-open",
                        click: function (e) {
                            e.preventDefault();
                            var tr = $(e.target).closest("tr"); // get the current table row (tr)
                            var data = this.dataItem(tr);
                            form.data.build(data.id);
                        }
                    },
                    {
                        name: "destroy", text: "删除",iconClass: "k-icon k-i-delete"
                    }
                ],
                title: "操作",
                width: "260px"
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