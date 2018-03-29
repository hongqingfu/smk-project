<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>菜单设置</title>
</head>
<body>
<div id="grid"></div>

<script>
    $(document).ready(function () {
        var element = $("#grid").kendoMEGrid({
            dataSource: {
                transport: {
                    read: {
                        url: ctx + "/sys/menupage",
                        type: "post"
                    }
                }
            },
            height: 600,
            sortable: true,
//            groupable: true,
            detailInit: detailInit,
//            selectColumn: true,
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
                    field: "isShow",
                    title: "是否显示"
                },
                {
                    field: "href",
                    title: "路径"
                },
                { command: [{
                    name: "edit", text: {edit: "修改", update: "更新", cancel: "取消"}, click: function (e) {
//                        $("input[name='cnName']").attr("readonly", "readonly");
//                        $("td input[name='operOrg']").attr("readonly", "readonly");
                    }
                }, {
                    name: "destroy",
                    iconClass: "k-icon k-i-delete",
                    text: "删除"
                }],
                    title: "操作",
                    width: "220px"}
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
</script>

</body>
</html>
