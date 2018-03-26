(function () {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        CHANGE = "change";

    var MEGrid = ui.Grid.extend({
        init: function (element, options) {
            var that = this;
            kendo.ui.Widget.fn.init.call(that, element, options);
            that._dataSource();
        },
        options: {
            name: "MEGrid",
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
            }
        },
        _dataSource: function() {
            var that = this;
            that.dataSource = kendo.data.DataSource.create(that.options.dataSource);

            that.dataSource.bind(CHANGE, function() {
                that.refresh();
            });
        }
    });
    kendo.ui.plugin(MEGrid);

})(jQuery);