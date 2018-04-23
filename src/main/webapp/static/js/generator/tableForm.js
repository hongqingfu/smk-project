var form;
$(document).ready(function () {
    var id = getQueryString("id");
    form = $("#conditions").kendoMEForm({
        enableValidate: true
    }).data("kendoMEForm");

    // 加载数据
    $.ajax({
        url: ctx + "/table/get?id=" + id,
        type: "post",
        dataType: "json",
        success: function (data) {
            if (data) {
                form.setData(data)
            } else {
                alertx("no data")
            }
        }
    });

    var $window = $("<div id='detail_window'></div>").appendTo($(document.body)).kendoMEWindow();

    var grid = $("#grid").kendoMEGrid({
        dataSource: {
            transport: {
                read: {
                    url: ctx + "/table/getTC?tableName=",
                    type: "post"
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
        // toolbar: [{template: '<a class="k-button k-button-icontext" onclick="return form.data.add()"><span class="k-icon k-i-plus"></span>新增</a>'}],
        columns: [
            {
                field: "name",
                title: "列名"
            },
            {
                field: "comments",
                title: "说明"
            },
            {
                field: "jdbcType",
                title: "物理类型"
            },{
                field: "javaType",
                title: "Java类型"
            },{
                field: "javaField",
                title: "Java属性名称"
            },{
                field: "isPk",
                title: "主键"
            },{
                field: "isNull",
                title: "可空"
            },{
                field: "isInsert",
                title: "插入"
            },{
                field: "isEdit",
                title: "编辑"
            },{
                field: "isList",
                title: "列表"
            },{
                field: "isQuery",
                title: "查询"
            },{
                field: "queryType",
                title: "查询匹配方式"
            },{
                field: "showType",
                title: "显示表单类型"
            },{
                field: "dictType",
                title: "字典类型"
            },{
                field: "sort",
                title: "排序"
            },
            {
                command: [
                    {
                        name: "edit", text: "配置", iconClass: "k-icon k-i-edit",
                        click: function (e) {
                            e.preventDefault();
                            var tr = $(e.target).closest("tr");
                            var data = this.dataItem(tr);
                            form.data.build(data.id);
                        }
                    },
                    {
                        name: "build", text: "生成代码", iconClass: "k-icon k-i-hyperlink-open",
                        click: function (e) {
                            e.preventDefault();
                            var tr = $(e.target).closest("tr");
                            var data = this.dataItem(tr);
                            form.data.build(data.id);
                        }
                    },
                    {
                        name: "del", text: "删除", iconClass: "k-icon k-i-delete",
                        click: function (e) {
                            e.preventDefault();
                            var tr = $(e.target).closest("tr");
                            var data = this.dataItem(tr);
                            form.data.del(data.id);
                        }
                    }
                ],
                title: "操作",
                width: "260px"
            }
        ],
        editable: true
    }).data("kendoMEGrid");
});

//格式化时间
if (Date) {
    Date.prototype.toISOString = function () {
        return kendo.toString(this, "yyyy-MM-dd HH:mm:ss");
    };
}