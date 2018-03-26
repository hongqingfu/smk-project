<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>菜单设置</title>
</head>
<body>
<div id="grid"></div>

<script>
    $(document).ready(function () {
        var element = $("#grid").kendoGrid({
            dataSource: {
                transport: {
                    read: ctx + "/sys/menupage"
                },
                serverPaging: true,
                serverSorting: true,
                serverFiltering: true,
                parameterMap: function (options, operation) {
                    if (operation == "read") {
                        var parameter = {
                            pageNum: options.pageNum,    //当前页
                            pageSize: options.pageSize//每页显示个数

                        };
                        return kendo.stringify(parameter);
                    }
                },
                schema: {
                    data: function (response) {
                        return response.list;
                    },
                    total: function (response) {
                        return response.total;
                    }
                }
            },
//            height: 600,
            sortable: true,
            pageable: {
                refresh: true,
                buttonCount: 5,
                page: 1,
                pageSize: 10,
                pageSizes: [10, 20, 30],
                messages: {
                    display: "显示 {0}-{1} 共 {2} 项",
                    empty: "没有数据",
                    itemsPerPage: "每面显示数量",
                    first: "第一页",
                    last: "最后一页",
                    next: "下一页",
                    previous: "上一页"
                }
            },
//            detailInit: detailInit,
//            dataBound: function() {
//                this.expandRow(this.tbody.find("tr.k-master-row").first());
//            },
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
    });

    function detailInit(e) {
        $("<div/>").appendTo(e.detailCell).kendoGrid({
            dataSource: {
                type: "odata",
                transport: {
                    read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
                },
                serverPaging: true,
                serverSorting: true,
                serverFiltering: true,
                pageSize: 10,
                filter: {field: "EmployeeID", operator: "eq", value: e.data.EmployeeID}
            },
            scrollable: false,
            sortable: true,
            pageable: true,
            columns: [
                {field: "OrderID", width: "110px"},
                {field: "ShipCountry", title: "Ship Country", width: "110px"},
                {field: "ShipAddress", title: "Ship Address"},
                {field: "ShipName", title: "Ship Name", width: "300px"}
            ]
        });
    }
</script>

</body>
</html>
