(function () {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        CHANGE = "change";

    var MEGrid = kendo.ui.Grid.extend({
        init: function (element, options) {
            var that = this;

            var optionsCopy = {
                dataSource: {
                    serverPaging: true,
                    // serverSorting: true,
                    // serverFiltering: true,
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
                            if (response.list) {
                                return response.list;
                            }
                            return response;
                        },
                        total: function (response) {
                            if (response.total) {
                                return response.total;
                            }
                            return response;
                        }
                    }
                },
                groupable: {
                    messages: {
                        empty: "拖放表头至此处进行分组"
                    }
                },
                pageable: {
                    refresh: true,
                    buttonCount: 5,
                    page: 1,
                    pageSize: 10,
                    pageSizes: [10, 20, 30],
                    messages: {
                        display: "显示 {0}-{1} 共 {2} 项",
                        empty: "没有数据",
                        itemsPerPage: "每页显示数量",
                        first: "第一页",
                        last: "最后一页",
                        next: "下一页",
                        previous: "上一页"
                    }
                }
            };

            if (options.groupable && !(options.groupable instanceof Object))
                options.groupable = {};
            else
                options.groupable = false;

            $.extend(true, optionsCopy, options);
            //kendo.ui.Widget.fn.init.call(this, element, options);
            //var newOptions = $.extend({}, that.options, options);
            //渲染元素前的操作
            that._AddSelectColumn(optionsCopy);
            that._AddRowNumberColumn(optionsCopy);
            that._setWidth(element, options);

            kendo.ui.Grid.fn.init.call(that, element, optionsCopy);

            //渲染元素后的操作
            that._RegisterSelectColumnEvent();
            that._RegisterRowNumberColumnEvent();

        },
        _setWidth: function (element, options) {
            if (options.hasOwnProperty('width')) {
                $(element).width(options['width']);
            }
        },
        /*
            负责控制行号列的显示或隐藏，在初始化Grid时调用，根据Options的rowNumber参数来显示或隐藏行号列
        */
        _AddRowNumberColumn: function (options) {
            if (options.rowNumber) {
                var that = this;
                var rowTemplate = '#= count #';
                var renderRowCount = function () {

                    that.options._count += 1;
                    return kendo.render(kendo.template(rowTemplate), [{count: that.options._count}]);
                };
                if (options.rowNumber) {
                    if (options.columns) {
                        //1. 添加行号列
                        options.columns.splice(0, 0, {
                            attributes: {'class': 'tight-cell'},
                            editor: null,
                            editable: false,
                            title: '',
                            template: renderRowCount,
                            width: "38px"
                        });
                    }
                }
            }
        },
        /*
            根据Options的参数设置来控制选择列的隐藏和显示
        */
        _AddSelectColumn: function (options) {
            var that = this;
            if (options.selectColumn) {
                options.columns.splice(0, 0, {
                    headerTemplate: "<input type='checkbox' id='header-chb' class='k-checkbox header-checkbox'><label class='k-checkbox-label' for='header-chb'></label>",
                    template: "<input type='checkbox' id='#= id#' class='k-checkbox row-checkbox'><label class='k-checkbox-label' for='#= id#'></label>",
                    width: 33, sortable: true
                });
            }
        },
        /**
         注册MEGrid的选择列事件处理
         */
        select: function (items) {
            if (this.selectable) {
                return kendo.ui.Grid.fn.select.call(this, items);
            } else {
                if (items) {

                    var that = this;
                    var $items = $(items);
                    $items.addClass('k-state-selected');
                    if (that.options.selectColumn) {
                        $items.each(function () {
                            $(this).find('.row-checkbox')[0].checked = true;
                        });
                    }
                    this.trigger('change');
                } else {
                    return this.tbody.find('tr.k-state-selected');
                }
            }
        },
        deselect: function (items) {
            var that = this;
            var $items = $(items);
            $items.removeClass('k-state-selected');
            if (that.options.selectColumn) {
                $items.each(function () {
                    $(this).find('.row-checkbox')[0].checked = false;
                });
            }
        },
        _RegisterSelectColumnEvent: function () {
            var that = this;
            if (!that.options.selectColumn) {
                return;
            }

            //注册表格的值变更事件(checked状态变更)
            that.element.on('change', '.k-grid-content .k-grid-checkbox', {}, function (e) {
                var $row = $(this).closest('tr');
                if (that.selectable.options.multiple) {
                    if (this.checked)
                        $row.addClass('k-state-selected');
                    else
                        $row.removeClass('k-state-selected');
                } else {

                }
                that.trigger('change');
            });

            that.thead.find('.header-checkbox').on('change', function () {
                if (this.checked) {
                    that.select(that.items());
                }
                else {
                    that.deselect(that.items());
                    that.trigger('change');
                }
            });

            //注册change事件，当发生选择变化时，更改checkbox选择列的状态
            that.bind('change', function (e) {
                var $selectedRow = that.select();
                $selectedRow.find('input.k-grid-checkbox').each(function () {
                    this.checked = true;
                });
                that.tbody.find('tr').not($selectedRow).find('.k-grid-checkbox:checkbox:checked').each(function () {
                    this.checked = false;
                });
            });

        },
        _RegisterRowNumberColumnEvent: function () {
            var that = this;
            if (that.options.rowNumber) {
                var that = this;
                that.bind('dataBinding', function () {
                    that.options._count = (that.dataSource.page() - 1) * that.dataSource.pageSize();
                    that.options._count = isNaN(that.options._count) ? 0 : that.options._count;
                });
            }
        },
        /**
         重载了kendoGrid默认的clearSelection方法
         为了实现清除checkbox选择列的状态
         */
        clearSelection: function () {
            if (this.selectable) {
                kendo.ui.Grid.fn.clearSelection.call(this);
                if (this.options.selectColumn) {
                    this.tbody.find('input.k-grid-checkbox:checked').each(function () {
                        this.checked = false;
                    });
                }
            }

        },
        options: {
            name: 'MEGrid',
            _count: 0,
            rowNumber: false,
            selectColumn: false
        }
    });

    var MEForm = kendo.ui.Widget.extend({
        init: function (element, options) {
            var $element = $(element);
            var that = this;
            this.data = kendo.observable(options);
            kendo.bind(element, this.data);
            if (options.enableValidate) {
                //see ref   http://docs.telerik.com/kendo-ui/controls/editors/validator/overview
                this.validator = $(element).kendoValidator({
                    messages: {
                        custom: "Please enter valid value for my custom rule",
                        required: "字段值不能为空",
                        email: function (input) {
                            return (input);
                        }
                    }
                }).data("kendoValidator");
            }
            kendo.ui.Widget.fn.init.call(that, $element, options);
        },
        options: {
            name: 'MEForm',
            enableValidate: false
        },
        clear: function () {
            var that = this;
            for (var attr in that.data) {
                if (attr.indexOf("_") != 0 && typeof((that.data)[attr]) != "function" && attr != "uid" && attr != "enableValidate")
                    this.data.set(attr, null);
            }
            that.trigger('clear');
        },
        getData: function () {
            return this.data.toJSON();
        },
        setData: function (data) {
            for (items in data) {
                this.data.set(items, data[items]);
            }
        },
        validate: function () {
            if (this.validator) {
                return this.validator.validate();
            }
        }
    });

    var MEWindow = kendo.ui.Window.extend({
        options: {
            name: 'MEWindow',
            title: "详情",
            visible: false,
            modal: true,
            actions: [
                "Minimize",
                "Maximize",
                "Close"
            ],
            width: document.documentElement.clientWidth - 100,
            height: document.documentElement.clientHeight - 100,
            resizable: true,
            open: function () {
                this.center();
            },
            close: function () {
                this.refresh({
                    url: "about:blank",
                    iframe: true
                });
                //that.queryCondition.query();
            }
        },
        init: function (element, options) {
            var that = this;
            var $element;
            var newOptions;

            //构建kendoWindow
            newOptions = that.options;
            kendo.ui.Window.fn.init.call(that, element, newOptions);

            // that.bind('close', function () {
            //     that.destroy();
            // });
            // return that;
        },
        openUrl: function (url) {
            this.refresh({url: url, iframe: true});
            this.open().center();
        }
    });

    var MEMenu = kendo.ui.Widget.extend({
        _uid: null,
        _treeview: [],
        _panelbar: null,
        _v: null,

        init: function (element, options) {
            var that = this;

            kendo.ui.Widget.fn.init.call(that, element, options);

            var data = [
                {
                    id: 1,
                    text: "Furniture", items: [
                    {text: "Tables & Chairs"},
                    {text: "Sofas"},
                    {text: "Occasional Furniture"}
                ],
                    none: [{text: ""}]
                },
                {
                    id: 2,
                    text: "Decor", items: [
                    {text: "Bed Linen"},
                    {text: "Curtains & Blinds"},
                    {text: "Carpets"}
                ], none: [{text: ""}]
                }
            ];
            var inlineDefault1 = new kendo.data.HierarchicalDataSource({
                data: data,
                schema: {
                    model: {
                        children: "none"
                    }
                }
            });

            $.get(ctx + "/sys/menus2", function (response) {
                var menuList = response;
                that.replaceChildren(menuList, "menuList");
                for (var i = 0; i < menuList.length; i++) {
                    menuList[i].none = [{text: ""}]
                }
                var inlineDefault = new kendo.data.HierarchicalDataSource({
                    data: menuList,
                    schema: {
                        model: {
                            id: "id",
                            children: "none"
                        }
                    }
                });

                that._panelbar = $(element).kendoPanelBar({
                    dataSource: inlineDefault,
                    loadOnDemand: false,
                    // expandMode: "single"
                }).data("kendoPanelBar");
                for (var i = 0; i < menuList.length; i++) {
                    var datas = menuList[i];
                    if (datas.items) {
                        var uid = that._panelbar.dataSource.get(datas.id).uid;
                        var $li = $(element).find('[data-uid=' + uid + ']').find("li");
                        var inline = new kendo.data.HierarchicalDataSource({
                            data: datas.items,
                            schema: {
                                model: {
                                    id: "id",
                                    children: "items"
                                }
                            }
                        });
                        var $menutrees = $('<div></div>').appendTo($li).kendoTreeView({
                            dataSource: inline,
                            template: "<span class='glyphicon glyphicon-folder-open'></span>&nbsp;&nbsp;&nbsp;#= item.text #",
                            loadOnDemand: false,
                            select: function (e) {
                                e.preventDefault();
                                console.log("Selecting", e.sender.dataItem(e.node));
                                var dataItem = e.sender.dataItem(e.node);
                                var href = window.location.origin + "/" + dataItem.href;
                                if ((e.sender.dataItem(e.node)).hasChildren) {
                                    e.sender.toggle($(e.node));
                                } else {
                                    window.location.href = href;
                                }
                            }
                        });


                        var treeView = $menutrees.data('kendoTreeView');
                        that._treeview.push({tree: treeView, panelId: uid});
                        $menutrees.on('click', 'span.k-state-selected',
                            function (e) {
                                $(e.delegateTarget).children().children().data('kendoTreeView').expand($(this));
                            });
                    }
                }
                that._panelbar.collapse($('ul'), false);
                that.bind("dataBound",that.skipToMenu);
                that.trigger("dataBound");
            }, "json")

        },
        options: {
            name: "MEMenu"
        },
        replaceChildren: function (list, fieldname) {
            for (var i = 0; i < list.length; i++) {
                list[i].text = list[i].name;
                if (typeof list[i].menuList == "object") {
                    list[i].items = list[i].menuList;
                    delete list[i].menuList;
                    delete list[i].hasChildren;
                    if (list[i].href) {
                        var url = ctx + list[i].href;
                        if (url.indexOf('?') > 0) {
                            url = url + "&menuid=" + list[i].id;
                        } else {
                            url = url + "?menuid=" + list[i].id;
                        }
                        list[i].href = url;
                    }
                    if (list[i].items != null) {
                        this.replaceChildren(list[i].items, fieldname);
                    } else {
                        list[i].items = "";
                    }
                }
            }
        },
        skipToMenu: function () {
            var menuId = getQueryString("menuid");
            console.log(menuId);
            if(menuId){
                delete getQueryString("menuid");
                // var urlparam = common.ToUrlParam(common.GetRequest());
                // history.replaceState(null,"",window.location.pathname + urlparam );
                for(var i = 0;i < this._treeview.length;i++){
                    var target = this._treeview[i];
                    var menuData = target.tree.dataSource.get(menuId);
                    if(menuData != null){
                        this._panelbar.expand($("[data-uid=" + target.panelId + "]"),false);
                        var tree = target.tree;
                        var $menu = tree.findByUid(tree.dataSource.get(menuId).uid);
                        tree.expandTo(menuId);
                        tree.select($menu);
                    }
                }
            }
        }
    });

    kendo.ui.plugin(MEGrid);
    kendo.ui.plugin(MEMenu);
    kendo.ui.plugin(MEForm);
    kendo.ui.plugin(MEWindow);

})(jQuery);