package com.hqf.modules.generator.controller;

import com.github.pagehelper.PageInfo;
import com.hqf.common.base.BaseMessage;
import com.hqf.modules.generator.model.GenDataSource;
import com.hqf.modules.generator.model.GenTable;
import com.hqf.modules.generator.service.GenDataSourceService;
import com.hqf.modules.generator.service.GenTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/table")
public class GenTableController {

    @Autowired
    private GenTableService genTableService;

    @RequestMapping("/list")
    public String list() {
        return "generator/tableList";
    }

    @RequestMapping("/bulidTable")
    public String form() {
        return "generator/buildTable";
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


}
