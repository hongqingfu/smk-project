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
                    type: "post",
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
    }).data("kendoMEGrid");
});

function detailInit(e) {
    var parentId = e.data.id;
    var detailGrid = $("<div/>").appendTo(e.detailCell).kendoMEGrid({
        dataSource: {
            transport: {
                read: {
                    url: ctx + "/sys/menupage",
                    type: "post",
                    data: {id: e.data.id}
                },
                update: {
                    url: ctx + "/sys/saveMenu",
                    type: "post",
//                        contentType: "application/json",
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
//                        contentType: "application/json",
                    dataType: "json"
                }
            },
            schema: {
                model: {
                    id: "id",
                    fields: {
                        name: {type: "string", nullable: true},
                        sort: {type: "string"},
                        href: {type: "string"},
                        isShow: {type: "string"},
                        permission: {type: "string"}
                    }
                }
            },
            requestEnd: function (e) {
                if (e.type == "create") {
                    this.read();
                }
            }
            //                filter: {field: "id", operator: "eq", value: e.data.id}
        },
        sortable: true,
        //            selectColumn: true,
//            rowNumber: true,
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
        editable: "inline",
        beforeEdit: function(e) {
            e.model.parentId = parentId;
        }
    }).data("kendoMEGrid");

}

//格式化时间
if (Date) {
    Date.prototype.toISOString = function () {
        return kendo.toString(this, "yyyy-MM-dd HH:mm:ss");
    };
}