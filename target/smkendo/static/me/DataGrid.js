function DataGrid(options) {
    this.options = {
        height: "100%",
        sortable: true,
        reorderable: true,
        scrollable: true,
        filterable: {
            mode: "menu",
            extra: false,
            operators: {
                string: {
                    contains: "Contains",
                    equal: "Equal to"
                }
            }
        },
        editable: { mode: "popup" },
        resizable: true,
        columnMenu: true,
        pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5
        },
        dataSourceOptions: {
            transport: {},
            batch: true,
            pageSize: 50,
            schema: {
                model: false,
                data: function (d) {
                    return d.Data;
                },
                total: function (d) {
                    return d.RowCount;
                }
            },
            serverPaging: true,
            serverFiltering: true,
            serverSorting: true
        }
    };

    this.init = function () {
        this.setOptions(options);

        var thatOptions = this.options.temp;
        var self = this;

        // render KendoUI Grid
        $("#" + thatOptions.id).kendoGrid(self.options);

        $("#" + thatOptions.id).addClass("grid-column-command-default");
        return self;
    };

    this.setOptions = function (options) {
        var self = this;

        //Only assign the property values the keys of which are included in 'options'
        for (var property in options) {
            if (this.options.hasOwnProperty(property) && property != "dataSourceOptions") {
                this.options[property] = options[property];
            }
        }
        this.options.temp = options; // cache the old options

        // Append each item to toolbar container
        if (options.toolbar) {
            this.setToolbar(options);
        }

        this.setDataSource(options);

        this.setColumns(options);

        if (options.showCheckBox) {
            this.options.columns.unshift({
                headerTemplate: '<input type="checkbox" />',
                template: '<input type="checkbox" />',
                width: 35
            });
        }

        this.options.dataBound = function () {
            options.gridActions && options.gridActions.edit && self.bindRowDblClick();
            options.contextMenuOptions && self.bindRowContextMenu();
            options.showCheckBox && (typeof self.bindHeaderCheckBoxClick == "function") && self.bindHeaderCheckBoxClick();
            var id = options.id;
            $("#" + id + " tbody tr[role=row]").each(function () {
                if (!$("#" + id).data("kendoGrid")) {
                    return;
                }
                var rowItem = $("#" + id).data("kendoGrid").dataItem($(this));
                var status = rowItem.Status;
                if (status && status != "Active") {
                    $(this).addClass("row-inactive").addClass("row-inactive-" + status);
                }
                var isHighlighted = rowItem.IsHighlighted;
                if (isHighlighted) {
                    $(this).addClass("row-highlighted");
                }
            });

            self.bindClearAllFiltersClick();//clear all filters (default function)

            (typeof options.dataBound == "function") && options.dataBound();

            $("#" + id + " .k-grid-create").off("click").on("click", function (e) {
                e.preventDefault();
                self.showDialog(null, self, options);
            });

            self.resize();
        };

        this.options.edit = function (e) {
            if (options.editable && typeof window[options.editable.rowEditCallback] == "function") {
                window[options.editable.rowEditCallback](e);
            }
        };
        this.options.remove = function (e) {
            if (options.editable && typeof window[options.editable.rowRemoveCallback] == "function") {
                window[options.editable.rowRemoveCallback](e);
            }
        };
        this.options.save = function (e) {
            if (typeof options.save == "function") {
                options.save(e);

                //Force to reload the data of gridview
                var timer = setInterval(function () {
                    if ($("#" + options.id).data("ajaxcompleted")) {
                        clearInterval(timer);
                        self.refresh();
                    }
                }, 500);
            }
        };
        this.options.filter = function (e) {
            if (e.filter && e.filter.filters) {
                for (var i = 0; i < e.filter.filters.length; i++) {
                    var item = e.filter.filters[i];
                    item.value = item.value.replace(/^\s*└\s*/g, "");
                }
            }
            $('#' + options.id + ' .alert-warning').remove();
        };
    };

    this.setDataSource = function (options) {
        var self = this;
        if (options.dataSourceOptions) {
            var thatOptions = options;
            this.options.dataSourceOptions.transport = {
                read: {
                    type: "post",
                    url: options.dataSourceOptions.read,
                    dataType: "json",
                    contentType: "application/json"
                },
                update: {
                    type: "post",
                    url: options.dataSourceOptions.update,
                    dataType: "json",
                    contentType: "application/json"
                },
                create: {
                    type: "post",
                    url: options.dataSourceOptions.update,
                    dataType: "json",
                    contentType: "application/json"
                },
                destroy: {
                    type: "post",
                    url: options.dataSourceOptions.destroy,
                    dataType: "json",
                    contentType: "application/json"
                },
                parameterMap: function (options, operation) {
                    if (operation === "read") {
                        var criteria = {
                            Limit: options.take || 50,
                            Offset: options.skip || 0
                        };
                        if (options.filter && options.filter.filters) {
                            criteria.PostFilters = options.filter.filters;
                            //Assign the column datatype
                            for (var i = 0; i < criteria.PostFilters.length; i++) {
                                for (var j = 0; j < thatOptions.columns.length; j++) {
                                    if (criteria.PostFilters[i].field == thatOptions.columns[j].field) {
                                        criteria.PostFilters[i].DataType = thatOptions.columns[j].filterDataType;
                                        continue;
                                    }
                                }
                            }
                        }

                        if (options.sort && options.sort.length > 0) {
                            criteria.SortBy = options.sort[0].field;
                            criteria.SortDirection = options.sort[0].dir + "ending";
                        }

                        // Apply custom parameterMap logic
                        var grid = $("#" + thatOptions.id).data("kendoGrid");
                        var customParamMap = grid.options.temp.dataSourceOptions.customParamMap;
                        if (customParamMap) {
                            criteria = customParamMap(criteria);
                        }
                        grid.options.temp.criteria = criteria;//Cache the all filters
                        return kendo.stringify(criteria);
                    }

                    if (operation === "create" || operation === "update") {
                        if (thatOptions.editable && thatOptions.editable.mode == "inline") {
                            return kendo.stringify(options.models ? options.models[0] : {});
                        }
                    }
                    if (operation === "destroy") {
                        if (thatOptions.editable && thatOptions.editable.mode == "inline") {
                            return kendo.stringify(options.models ? options.models[0] : {});
                        }
                    }
                }
            };

            this.options.dataSourceOptions.schema.model = {
                id: "Id",
                fields: options.dataSourceOptions.modelFields
            };
            this.options.dataSourceOptions.pageSize = options.dataSourceOptions.pageSize || 50;

            this.options.dataSourceOptions.requestStart = function (e) {
                $("#" + options.id).data("ajaxcompleted", false);
            };
            this.options.dataSourceOptions.requestEnd = function (e) {
                $("#" + options.id).data("ajaxcompleted", true);
            };
        }
        this.options.dataSource = new kendo.data.DataSource(this.options.dataSourceOptions);
    };

    this.setColumns = function (options) {
        var columnsOptions = options.columnsOptions || {};
        //Fetch columns data from server
        $.ajax({
            type: "post",
            url: columnsOptions.url || "/GridView/GetColumnHeaders",
            data: columnsOptions.params || { metaType: options.metaType },
            dataType: "json",
            async: false,
            success: function (data) {
                options.columns = data;
            }
        });

        //Set filter-menu features of each column
        this.setFilterMenus(options);

        //Enable Row-Editing function
        if (options.editable && options.editable.mode == "inline") {
            options.editable.commandColumn && options.columns.push(options.editable.commandColumn);
        }

        this.options.columns = options.columns;
    };

    this.setFilterMenus = function (gridOptions) {
        gridOptions.columns && $(gridOptions.columns).each(function (index, column) {
            var serviceOptions = {
                transport: {
                    read: {
                        type: "post",
                        url: column.filterControlDataService,
                        dataType: "json",
                        contentType: "application/json"
                    },
                    parameterMap: function (options, operation) {
                        if (operation === "read") {
                            var criteria = {};
                            if (options.filter && options.filter.filters && options.filter.filters.length) {
                                criteria = options.filter.filters[0];
                            }
                            return kendo.stringify(criteria);
                        }
                    }
                },
                serverFiltering: true
            };

            var filterableOptions = null;
            switch (column.filterControlType) {
                case 1://DropDownList
                    if (column.filterDataType == 2) {
                        serviceOptions = [{ Text: "false", Value: "false" }, { Text: "true", Value: "true" }];
                    }
                    filterableOptions = {
                        operators: {
                            string: {
                                equal: "Equal to"
                            }
                        },
                        ui: function (element) {
                            element.kendoDropDownList({
                                autoWidth: true,
                                filter: "contains",
                                dataTextField: "Text",
                                dataValueField: "Value",
                                dataSource: serviceOptions
                            });
                        }
                    };
                    break;
                case 3://AutoComplete
                    filterableOptions = {
                        operators: {
                            string: {
                                contains: "Contains"
                            }
                        },
                        ui: function (element) {
                            element.kendoAutoComplete({
                                autoWidth: true,
                                filter: "contains",
                                dataTextField: "Text",
                                dataValueField: "Value",
                                dataSource: serviceOptions
                            });
                        }
                    };
                    break;
                default:
                    break;
            }

            $.extend(column, {
                filterable: filterableOptions
            });
        });
    };

    this.setToolbar = function (options) {
        if (!options.toolbar) {
            return;
        }
        if (options.toolbar === "All") {
            options.toolbar = {
                items: [{ name: "addRecord", text: "Add Record" },
                    { name: "importExcel", text: "Excel Bulk Edit" },
                    { name: "excel", text: "Generate Excel Report" },
                    { name: "pdf", text: "Generate PDF Report" },
                    { name: "clearFilters", text: "Clear All Filters" }]
            };
        }

        var toolbarItems = [];
        options.toolbar.items && $(options.toolbar.items).each(function (index, toolItem) {
            var displayOrNot = toolItem.display == "always" ? "" : " style='display:none;'";
            switch (toolItem.name) {
                case "addRecord":
                    toolbarItems.push({ template: "<a role='button' class='k-button k-button-icontext k-grid-create' href='javascript:void(0);'" + displayOrNot + "><span class='k-icon k-i-plus'></span>" + toolItem.text + "</a>" });
                    break;
                case "importExcel":
                    var dropdownListId = options.id + "_bulk_edit";
                    var dropdownTemplate = "<div class='dropdown' style='display: inline-block;'><a id='" + dropdownListId + "' role='button' class='k-button k-button-icontext k-grid-import' href='javascript:void(0);' " + displayOrNot + " data-toggle='dropdown' aria-haspopup='true' aria-expanded='true'><span class='k-icon k-i-menu'></span> " + toolItem.text + "</a>";
                    dropdownTemplate += "<ul id='" + dropdownListId + "DropDownMenu' class='dropdown-menu' aria-labelledby='" + dropdownListId + "'>";
                    dropdownTemplate += "<li><a href='javascript:void(0)' id='btn_" + dropdownListId + "_by_search'><i class='fa fa-fw fa-file-excel-o mr-5'></i><span class='ml-5'>Download template for Current Search</span></a></li>";
                    dropdownTemplate += "<li><a href= 'javascript:void(0)' id= 'btn_" + dropdownListId + "_by_all' ><i class='fa fa-fw fa-file-excel-o mr-5'></i><span class='ml-5'>Download template for All Records</span></a></li>";
                    dropdownTemplate += "<li role='separator' class='divider'></li>";
                    dropdownTemplate += "<li><a href='javascript:void(0)' id='btn_" + dropdownListId + "_by_custom'><i class='fa fa-fw fa-upload mr-5'></i><span class='ml-5'>Import Bulk Edit Worksheet</span></a></li>";
                    dropdownTemplate += "</ul></div>";
                    toolbarItems.push({ template: dropdownTemplate });
                    break;
                case "excel":
                    toolbarItems.push({ name: "excel", text: toolItem.text });
                    options.excel = {
                        fileName: "ExcelReport.xlsx",
                        proxyURL: "/GridView/GenerateExcelReport",
                        filterable: true
                    };
                    break;
                case "pdf":
                    toolbarItems.push({ name: "pdf", text: toolItem.text });
                    options.pdf = {
                        allPages: true,
                        avoidLinks: true,
                        paperSize: "A4",
                        margin: { top: "2cm", left: "1cm", right: "1cm", bottom: "1cm" },
                        landscape: true,
                        repeatHeaders: true,
                        template: '<div class="page-template">' +
                        '< div class="header" >' + '<div style="float: right">Page #: pageNum # of #: totalPages #</div>' +
                        '</div>' +
                        '<div class="watermark">M+W Group</div>' +
                        '<div class="footer">Page #: pageNum # of #: totalPages #</div>' +
                        '</div>',
                        scale: 0.8
                    };
                    break;
                case "create":
                    toolbarItems.push({ name: "create", text: "Add", template: "<a role=\"button\" class=\"k-button k-button-icontext k-grid-add\" href=\"##\"" + displayOrNot + "><span class=\"k-icon k-i-plus\"></span>" + toolItem.text + "</a>" });
                    break;
                case "clearFilters":
                    toolbarItems.push({ template: "<a role='button' class='k-button k-button-icontext k-grid-clearfilters pull-right' href='javascript:void(0);'><span class='k-icon k-i-filter-clear'></span>" + toolItem.text + "</a>" });
                    break;
                default:
                    toolbarItems.push(toolItem);
                    break;
            }
        });
        this.options.toolbar = toolbarItems;
    };
    this.clearAllFilters = function () {
        var options = this.options.temp;
        $("#" + options.id).find(".k-grid-toolbar .k-grid-clearfilters").click();
    };
    this.bindClearAllFiltersClick = function () {
        var options = this.options.temp;
        //Clear the selected filters of gridview
        $("#" + options.id).find(".k-grid-toolbar .k-grid-clearfilters").off("click").on("click", function (e) {
            e.preventDefault();
            //Clear gridview filters:
            var grid = $("#" + options.id).data("kendoGrid");
            grid.options.temp.dataSourceOptions.customParamMap = function (criterias) {
                criterias.MetaType = grid.options.temp.MetaType;
                return criterias;
            };
            var datasource = grid.dataSource;
            datasource.filter([]);

            $("#" + options.id + " .alert-warning").remove();
        });
    }

    this.bindRowDblClick = function () {
        var thatOptions = this.options.temp;
        var self = this;
        $("#" + thatOptions.id + " tbody tr[role=row]").off("dblclick").on("dblclick", function (e) {
            e.preventDefault();
            self.showDialog($(this), self, thatOptions);
        });
    };

    this.bindRowContextMenu = function () {
        var that = this;
        var thatOptions = that.options.temp;

        if (!thatOptions.contextMenuOptions) {
            return;
        }

        var defaultRemoveAction = function (e) {
            var dataKey = $("#" + thatOptions.id).data("kendoGrid").dataItem(e.target).Id;
            kendo.confirm("The data of this row will be deleted, are you sure to proceed?").then(function () {
                $.post(thatOptions.gridActions.remove + "/" + dataKey, function (d) {
                    if (d && d.Ok) {
                        that.refresh();
                    }
                });
            });
        }
        var menuItems = [
            { name: "view", onClick: function (e) { that.showDialog(e.target, that, thatOptions); } },
            { name: "edit", onClick: function (e) { that.showDialog(e.target, that, thatOptions); } },
            { name: "remove", onClick: defaultRemoveAction }
        ];
        thatOptions.contextMenuOptions.items && $(thatOptions.contextMenuOptions.items).each(function (index, item) {
            for (var i = 0; i < menuItems.length; i++) {
                if (menuItems[i].name == item.name) {
                    if (!item.onClick) {
                        item.onClick = menuItems[i].onClick;
                    }
                }
            }
        });

        var contextMenuOptions = {
            targetId: thatOptions.id,
            filter: "tbody tr[role=row]",
            items: thatOptions.contextMenuOptions.items || menuItems,
            metaType: thatOptions.metaType
        };
        new ContextMenu(contextMenuOptions).init();
    };

    this.showDialog = function (target, grid, options) {
        var dataKey = "", url;
        if (target) {
            dataKey = $("#" + options.id).data("kendoGrid").dataItem($(target)).Id;
            url = $.format("{0}/{1}", options.gridActions.edit, dataKey);
        } else {
            url = options.gridActions.create;
        }
        new ModalDialog({
            id: options.id + "_dialog",
            title: options.metaType,
            content: url,
            dataKey: dataKey,
            metaType: options.metaType,
            showSave: true,
            callbackAfterSaving: function () {
                grid.refresh();
            }
        }).show();
    };

    // Select multiple rows through checking the checkbox in front of each data rows
    this.bindHeaderCheckBoxClick = function () {
        var thatOptions = this.options.temp;
        $("#" + thatOptions.id + " thead tr[role=row] th:first-child :checkbox").on("click", function () {
            var parentCheckBox = $(this);
            $("#" + thatOptions.id + " tbody tr[role=row] td:first-child :checkbox").each(function () {
                $(this).prop("checked", $(parentCheckBox).prop("checked"));
            });
        });

        $("#" + thatOptions.id + " tbody tr[role=row] td:first-child :checkbox").on("click", function () {
            var parentCheckBox = $("#" + thatOptions.id + " thead tr[role=row] th:first-child :checkbox");
            if ($("#" + thatOptions.id + " tbody tr[role=row] td:first-child :checked").size() != $("#" + thatOptions.id + " tbody tr[role=row] td:first-child :checkbox").size()) {
                parentCheckBox.prop("checked", false);
            } else {
                parentCheckBox.prop("checked", true);
            }
        });
    };

    this.refresh = function () {
        var self = this;
        var thatOptions = this.options.temp;
        if ($("#" + thatOptions.id).data("kendoGrid")) {
            $("#" + thatOptions.id).data("kendoGrid").dataSource.read();
        }
        var timer = setTimeout(function () {
            clearTimeout(timer);
            self.options.dataBound && self.options.dataBound();
            self.resize();
        }, 50);
    };

    this.resize = function () {//Fix Grid Height autofit issue
        var thatOptions = this.options.temp;

        var timer = setTimeout(function () {
            clearTimeout(timer);
            var gridElement = $("#" + thatOptions.id),
                dataArea = gridElement.find(".k-grid-content"),
                gridHeight = gridElement.innerHeight(),
                otherElements = gridElement.children().not(".k-grid-content"),
                otherElementsHeight = 0;
            otherElements.each(function () {
                otherElementsHeight += $(this).outerHeight();
            });
            dataArea.height(gridHeight - otherElementsHeight);
        }, 500);
    };
    return this;
}

// Provider a Grid Widget Plugin
$(function () {
    $.fn.extend({
        dataGrid: function (options) {
            return this.each(function () {
                var selfOptions = $(this).data();
                if (selfOptions.optionsKey && window[selfOptions.optionsKey]) {
                    $.extend(selfOptions, window[selfOptions.optionsKey]);
                }
                selfOptions.id = $(this).prop("id");

                var dataSourceOptions = selfOptions.dataSourceOptions || {};
                selfOptions.dataSourceOptions = {
                    read: ((dataSourceOptions ? dataSourceOptions.read : null) || "/GridView/GetDataSource"),
                    update: (dataSourceOptions ? dataSourceOptions.update : null),
                    destroy: (dataSourceOptions ? dataSourceOptions.destroy : null),
                    modelFields: selfOptions.modelFields,
                    customParamMap: function (criteria) {
                        criteria.PreFilters = options.preFilters || selfOptions.preFilters;
                        criteria.PostFilters = options.postFilters || [];

                        selfOptions.postFilters && $(selfOptions.postFilters).each(function (index, item) {
                            criteria.PostFilters.push(item);
                        });

                        criteria.MetaType = options.metaType || selfOptions.metaType;
                        return criteria;
                    },
                    pageSize: dataSourceOptions.pageSize || 50
                };

                if (selfOptions.filterable == undefined) {
                    selfOptions.filterable = false;
                }
                if (selfOptions.columnMenu == undefined) {
                    selfOptions.columnMenu = false;
                }
                if (selfOptions.pageable == undefined) {
                    selfOptions.pageable = false;
                }

                if (options) {
                    $.extend(selfOptions, options);
                }

                var instance = new DataGrid(selfOptions).init();
                $(this).data("cutomeGrid", instance);
            });
        }
    });
});