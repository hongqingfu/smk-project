var form;
$(document).ready(function () {

    form = $("#conditions").kendoMEForm({
        enableValidate: true,
        save: function () {
            if (form.validate()) {
                console.log(form.getData());
                var data = form.getData();
                $.ajax({
                    url: ctx + "/table/save",
                    data: data,
                    // contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    type: "post",
                    success: function (data) {
                        alert(data.message)
                    }
                })
            }
        }
    }).data("kendoMEForm");

    var dataSource = $("#dataSourceId").kendoDropDownList({
        optionLabel: "请选择...",
        autoBind: false,
        filter: "contains",
        dataTextField: "databaseName",
        dataValueField: "id",
        valuePrimitive: true,
        dataSource: {
            transport: {
                read: ctx + "/dataSource/findList",
                // contentType: "application/json",
                dataType: "json"
            }
        },
        change: function () {
            tableName.dataSource.read({dataSourceId: dataSource.value()});
            tableName.select(0);
        }
    }).data("kendoDropDownList");

    var tableName = $("#name").kendoDropDownList({
        autoBind: false,
        optionLabel: "请选择...",
        filter: "contains",
        dataTextField: "name",
        dataValueField: "name",
        valuePrimitive: true,
        dataSource: {
            transport: {
                read: ctx + "/table/getTales",
                // contentType: "application/json",
                dataType: "json"
            }
        }
    }).data("kendoDropDownList");
});

//格式化时间
if (Date) {
    Date.prototype.toISOString = function () {
        return kendo.toString(this, "yyyy-MM-dd HH:mm:ss");
    };
}