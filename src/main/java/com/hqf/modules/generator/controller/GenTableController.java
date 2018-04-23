package com.hqf.modules.generator.controller;

import com.github.pagehelper.PageInfo;
import com.hqf.common.base.BaseMessage;
import com.hqf.modules.generator.model.GenDataSource;
import com.hqf.modules.generator.model.GenTable;
import com.hqf.modules.generator.model.GenTableColumn;
import com.hqf.modules.generator.service.GenDataSourceService;
import com.hqf.modules.generator.service.GenTableColumnService;
import com.hqf.modules.generator.service.GenTableService;
import com.hqf.modules.generator.util.ReadTableUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/table")
public class GenTableController {

    @Autowired
    private GenTableService genTableService;

    @Autowired
    private GenDataSourceService genDataSourceService;

    @Autowired
    private GenTableColumnService genTableColumnService;

    @RequestMapping("/list")
    public String list() {
        return "generator/tableList";
    }

    @RequestMapping("/form")
    public String form() {
        return "generator/tableForm";
    }

    @RequestMapping("/bulidTable")
    public String bulidTable() {
        return "generator/buildTable";
    }

    @RequestMapping("/get")
    @ResponseBody
    public GenTable get(String id) {
        GenTable genTable = genTableService.get(id);
        return genTable;
    }

    @RequestMapping("findPage")
    @ResponseBody
    public PageInfo<GenTable> findPage(GenTable genTable) {
        return genTableService.findPage(genTable);
    }

    @ResponseBody
    @RequestMapping("save")
    public BaseMessage save(GenTable genTable) {
        int count = genTableService.save(genTable);
        if (count > 0) {
            return new BaseMessage(200, "保存成功");
        }
        return new BaseMessage(500, "保存失败");
    }

    @RequestMapping("delete")
    @ResponseBody
    public BaseMessage delete(String id) {
        int count = genTableService.delete(id);
        if (count > 0) {
            return new BaseMessage(200, "删除成功");
        }
        return new BaseMessage(500, "删除失败");
    }

    @RequestMapping("getTales")
    @ResponseBody
    public List<GenTable> getTales(String dataSourceId) {
        GenDataSource genDataSource = genDataSourceService.get(dataSourceId);
        List<GenTable> list = new ArrayList<>();
        try {
            List<String> tableNames = new ReadTableUtils().readAllTableNames(genDataSource);
            if (tableNames.size() > 0) {
                for (int i = 0; i < tableNames.size(); i++) {
                    GenTable genTable = new GenTable();
                    genTable.setName(tableNames.get(i));
                    list.add(genTable);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    @RequestMapping("getTC")
    @ResponseBody
    public List<GenTableColumn> getTableColumn(String tableName, String tableSchema){
        if ("".equals(tableName)) {
            tableName = "sys_role";
        }
        if ("".equals(tableSchema)) {
            tableSchema = "smkdb";
        }
        List<GenTableColumn> genTableColumns = genTableColumnService.selectColumn(tableName, tableSchema);
        return genTableColumns;
    }

}
