var form;
$(document).ready(function () {

    form = $("#conditions").kendoMEForm({
        enableValidate: true
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
            tableName.dataSource.read({carrier: carrier.value()});
            tableName.select(0);
        }
    }).data("kendoDropDownList");

    var tableName = $("#tableName").kendoDropDownList({
        autoBind: false,
        optionLabel: "请选择...",
        filter: "contains",
        dataTextField: "repairCompany",
        dataValueField: "repairCompany",
        valuePrimitive: true,
        dataSource: {
            transport: {
                read: ctx + "/dataSource/findTables",
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