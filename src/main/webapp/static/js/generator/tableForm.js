var form;
$(document).ready(function () {
    var id = getQueryString("id");
    form = $("#conditions").kendoMEForm({
        enableValidate: true,
        save: function () {
            var data = grid._data;
            console.log(data)
        },
        isPk: function (pk) {
            console.log(pk)
        }
    }).data("kendoMEForm");

    // 加载数据
    $.ajax({
        url: ctx + "/table/get?id=" + id,
        type: "post",
        dataType: "json",
        async: false,
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
                    url: ctx + "/table/getColumns?tableId=" + form.getData().id,
                    type: "post"
                }
            },
            schema: {
                model: {
                    id: "id",
                    fields: {
                        name: {type: "string", editable: false},
                        comments: {type: "string"},
                        jdbcType: {type: "string", editable: false},
                        javaType: {type: "string"},
                        javaField: {type: "string"},
                        isPk: {type: "string"},
                        isNull: {type: "string"},
                        isInsert: {type: "string"},
                        isEdit: {type: "string"},
                        isList: {type: "string"},
                        isQuery: {type: "string"},
                        queryType: {type: "string"},
                        showType: {type: "string"},
                        dictType: {type: "string"},
                        sort: {type: "string"}
                    }
                }
            }
        },
        sortable: true,
        resizable: true,
        height: document.documentElement.clientHeight - (70 + $("#conditions").height()),
        columns: [
            {
                field: "name",
                title: "列名"
            },
            {
                field: "jdbcType",
                title: "物理类型"
            },
            {
                field: "comments",
                title: "说明"
            },
            {
                field: "javaType",
                title: "Java类型",
                editor: function (container, options) {
                    $("<input/>").attr("name", options.field)
                        .appendTo(container)
                        .kendoDropDownList({
                            dataTextField: "text",
                            dataValueField: "value",
                            dataSource: [
                                {text: "String", value: "String"},
                                {text: "Integer", value: "Integer"},
                                {text: "Long", value: "Long"},
                                {text: "Float", value: "Float"},
                                {text: "Double", value: "Double"},
                                {text: "Date", value: "Date"},
                                {text: "BigDecimal", value: "BigDecimal"}
                            ],
                            change: function (e) {
                                console.log(e)
                            },
                            index: 1
                        });
                }
            },
            {
                field: "javaField",
                title: "Java属性名称"
            },
            {
                field: "isPk",
                title: "主键",
                template: '<input type="checkbox" id="#: id#1" data-bind="checked:isPk" #= isPk==\'Y\' ? \'checked="checked"\' : "" # class="k-checkbox is-pk"  />' + '<label class="k-checkbox-label" for="#: id#1"></label>'
            },
            {
                field: "isNull",
                title: "可空",
                template: '<input type="checkbox" id="#: id#2" data-bind="checked:isNull" #= isNull==\'Y\' ? \'checked="checked"\' : "" # class="k-checkbox is-null"  />' + '<label class="k-checkbox-label" for="#: id#2"></label>'
            },
            {
                field: "isInsert",
                title: "插入",
                template: '<input type="checkbox" id="#: id#3" data-bind="checked:isInsert" #= isInsert==\'Y\' ? \'checked="checked"\' : "" # class="k-checkbox is-insert"  />' + '<label class="k-checkbox-label" for="#: id#3"></label>'
            },
            {
                field: "isEdit",
                title: "编辑",
                template: '<input type="checkbox" id="#: id#4" data-bind="checked:isEdit" #= isEdit==\'Y\' ? \'checked="checked"\' : "" # class="k-checkbox is-edit"  />' + '<label class="k-checkbox-label" for="#: id#4"></label>'
            },
            {
                field: "isList",
                title: "列表",
                template: '<input type="checkbox" id="#: id#5" data-bind="checked:isList" #= isList==\'Y\' ? \'checked="checked"\' : "" # class="k-checkbox is-list"  />' + '<label class="k-checkbox-label" for="#: id#5"></label>'
            },
            {
                field: "isQuery",
                title: "查询",
                template: '<input type="checkbox" id="#: id#6" data-bind="checked:isQuery" #= isQuery==\'Y\' ? \'checked="checked"\' : "" # class="k-checkbox is-query"  />' + '<label class="k-checkbox-label" for="#: id#6"></label>'
            },
            {
                field: "queryType",
                title: "查询匹配方式"
            },
            {
                field: "showType",
                title: "显示表单类型"
            },
            {
                field: "dictType",
                title: "字典类型"
            },
            {
                field: "sort",
                title: "排序"
            }
        ],
        editable: true
    }).data("kendoMEGrid");

    grid.tbody.on("change", ".is-pk", function (e) {
        var row = $(e.target).closest("tr");
        var item = grid.dataItem(row);
        item.set("isPk", $(e.target).is(":checked") ? 'Y' : 'N');
    });
    grid.tbody.on("change", ".is-null", function (e) {
        var row = $(e.target).closest("tr");
        var item = grid.dataItem(row);
        item.set("isNull", $(e.target).is(":checked") ? 'Y' : 'N');
    });
    grid.tbody.on("change", ".is-insert", function (e) {
        var row = $(e.target).closest("tr");
        var item = grid.dataItem(row);
        item.set("isInsert", $(e.target).is(":checked") ? 'Y' : 'N');
    });
    grid.tbody.on("change", ".is-edit", function (e) {
        var row = $(e.target).closest("tr");
        var item = grid.dataItem(row);
        item.set("isEdit", $(e.target).is(":checked") ? 'Y' : 'N');
    });
    grid.tbody.on("change", ".is-list", function (e) {
        var row = $(e.target).closest("tr");
        var item = grid.dataItem(row);
        item.set("isList", $(e.target).is(":checked") ? 'Y' : 'N');
    });
    grid.tbody.on("change", ".is-query", function (e) {
        var row = $(e.target).closest("tr");
        var item = grid.dataItem(row);
        item.set("isQuery", $(e.target).is(":checked") ? 'Y' : 'N');
    });
});

//格式化时间
if (Date) {
    Date.prototype.toISOString = function () {
        return kendo.toString(this, "yyyy-MM-dd HH:mm:ss");
    };
}

window.isPk = function (pk) {
}