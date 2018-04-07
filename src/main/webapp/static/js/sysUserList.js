var form
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
            $window.data("kendoMEWindow").openUrl(ctx + "/sys/userForm");
        }
    }).data("kendoMEForm");
    var $window = $("<div id='detail_window'></div>").appendTo($(document.body)).kendoMEWindow();

    var grid = $("#grid").kendoMEGrid({
        dataSource: {
            transport: {
                read: {
                    url: ctx + "/sys/userPage",
                    type: "post"
                }
            },
            schema: {
                model: {
                    id: "id",
                    fields: {
                        name: {type: "string", nullable: true},
                        companyId: {type: "string"},
                        officeId: {type: "string"},
                        no: {type: "string"},
                        email: {type: "string"},
                        phone: {type: "string"},
                        mobile: {type: "string"},
                        userType: {type: "string"},
                        photo: {type: "string"},
                        loginIp: {type: "string"},
                        loginDate: {type: "date"},
                        loginFlag: {type: "string"}
                    }
                }
            }
        },
        resizable: true,
        sortable: true,
        height: document.documentElement.clientHeight - (70 + $("#conditions").height()),
        // toolbar: [{name: "create", text: "新增"}],
        toolbar: [{template: '<a class="k-button k-button-icontext k-grid-add" onclick="return form.data.add()"><span class="k-icon k-i-plus"></span>新增</a>'}],
        columns: [
            {
                field: "name",
                title: "名称"
            },
            {
                field: "companyId",
                title: "归属公司"
            },
            {
                field: "officeId",
                title: "归属部门"
            },
            {
                field: "loginName",
                title: "登录名"
            }, {
                field: "no",
                title: "工号"
            }, {
                field: "email",
                title: "邮箱"
            }, {
                field: "phone",
                title: "电话"
            }, {
                field: "mobile",
                title: "手机"
            }, {
                field: "userType",
                title: "用户类型"
            }, {
                field: "loginIp",
                title: "最后登陆IP"
            }, {
                field: "loginDate",
                title: "最后登陆时间",
                format: "{0: yyyy-MM-dd HH:mm:ss}"
            }, {
                field: "loginFlag",
                title: "是否可登录"
            },
            {
                command: [{
                    name: "editUser",
                    text: "修改",
                    iconClass: "k-icon k-i-edit",
                    click: function (e) {
                        e.preventDefault();
                        var tr = $(e.target).closest("tr"); // get the current table row (tr)
                        var data = this.dataItem(tr);
                        console.log(data);
                        // form.data.compile(data.pkid);
                    }
                }, {
                    name: "delUser",
                    iconClass: "k-icon k-i-delete",
                    text: "删除",
                    click: function (e) {
                        e.preventDefault();
                        var tr = $(e.target).closest("tr"); // get the current table row (tr)
                        var data = this.dataItem(tr);
                        // form.data.compile(data.pkid);
                    }
                }],
                title: "操作",
                width: "180px"
            }
        ]
    }).data("kendoMEGrid");
});

//格式化时间
if (Date) {
    Date.prototype.toISOString = function () {
        return kendo.toString(this, "yyyy-MM-dd HH:mm:ss");
    };
}