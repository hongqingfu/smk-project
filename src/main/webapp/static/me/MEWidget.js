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
                            return response.list;
                        },
                        total: function (response) {
                            return response.total;
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
         @method clearSelection
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

    var MEMenu = kendo.ui.Widget.extend({
        init: function (element, options) {
            var that = this;

            kendo.ui.Widget.fn.init.call(this, element, options);
            this.setMenu(element);
            // $.get(ctx + "/sys/menus2", {}, function (response) {
            //     var menuList = response;
            //     // that.replaceChildren(menuList, "children");
            //     for (var i = 0; i < menuList.length; i++) {
            //         menuList[i].none = [{text: ""}]
            //     }
            //     var datasource = new kendo.data.HierarchicalDataSource({
            //         data: menuList,
            //         schema: {
            //             model: {
            //                 children: "none"
            //             }
            //         }
            //     });
            //     var $menu = $(element);
            //     $menu.kendoPanelBar({
            //         dataSource: datasource,
            //         loadOnDemand: false,
            //         expandMode: "single",
            //         dataTextField: "name"
            //
            //     });
            //     that.panelBar = $menu.data("kendoPanelBar");
            //     //子菜单
            //     for (var i = 0; i < menuList.length; i++) {
            //         var menuitem = menuList[i];
            //         if (menuitem.items) {
            //             var uid = that.panelBar.dataSource.get(menuitem.id).uid;
            //             var $li = $menu.find('[data-uid=' + uid + ']').find('li');
            //             var inline = new kendo.data.HierarchicalDataSource({
            //                 data: menuitem.items,
            //                 schema: {
            //                     model: {
            //                         hasChildren: function (dataItem) {
            //                             if (dataItem.hasChildren == 0) {
            //                                 return true;
            //                             } else {
            //                                 return false;
            //                             }
            //                         }
            //                     }
            //                 }
            //         });
            //             var $menutrees = $('<div></div>').appendTo($li).kendoTreeView({
            //                 dataSource: inline,
            //                 // template: "<span class='#= item.iconCls != ''?item.iconCls:item.leaf?'glyphicon glyphicon-file':'glyphicon glyphicon-folder-open' #'></span>#= item.text #",
            //                 loadOnDemand:false,
            //                 select: function (e) {
            //                     e.preventDefault();
            //                     console.log("Selecting", e.node);
            //                     if(e.sender.dataItem(e.node).hasChildren){
            //                         e.sender.toggle($(e.node));
            //                     }
            //                     // return false;
            //                 },
            //             });
            //             var treeView = $menutrees.data('kendoTreeView');
            //             that.trees.push({tree:treeView,panelId:uid});
            //             //注册单击打开菜单事件
            //             $menutrees.on('click', 'span.k-state-selected',
            //                 function (e) {
            //                     $(e.delegateTarget).children().children().data('kendoTreeView').expand($(this));
            //                 });
            //             // var $menuLinks = $menu.find('a');
            //             // $menuLinks.on('click', function (e: JQueryEventObject) {
            //             //     e.preventDefault();
            //             //     $("#main-splider").getKendoSplitter().ajaxRequest("#content-panel", e.target.getAttribute("href"));
            //             // });
            //         }
            //     }
            //     that.panelBar.collapse($('ul'),false);
            //     that.bind("dataBound",that.skipToMenu);
            //     that.trigger("dataBound");
            //
            //     // that.skipToMenu();
            // })
        },
        options: {
            name: "MEMenu"
        },
        setMenu: function (element) {
            var homogeneous = new kendo.data.HierarchicalDataSource({
                transport: {
                    read: {
                        url: ctx + "/sys/menus",
                        dataType: "json"
                    }
                },
                schema: {
                    model: {
                        id: "id",
                        hasChildren: function (dataItem) {
                            if (dataItem.hasChildren == 0) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }
                }
            });
            var m = $(element).kendoPanelBar({
                dataSource: homogeneous,
                loadOnDemand: false,
                expandMode: "single",
                dataTextField: "name",
                template: function (dataItem) {
                    if (!dataItem.item.hasChildren) {
                        var href = window.location.origin + "/" + dataItem.item.href;
                        var a = "<a href='" + href + "'>" + dataItem.item.name + "</a>";
                        return a;
                    } else {
                        return dataItem.item.name
                    }
                }
            });

            m.data("kendoPanelBar").select(function () {
            })
        }
    });
    kendo.ui.plugin(MEGrid);
    kendo.ui.plugin(MEMenu);

})(jQuery);