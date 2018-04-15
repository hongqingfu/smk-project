package com.hqf.modules.generator.controller;

import com.github.pagehelper.PageInfo;
import com.hqf.modules.generator.model.GenDataSource;
import com.hqf.modules.generator.service.GenDataSourceService;
import com.hqf.common.base.BaseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/dataSource")
public class GenDataSourceController {

    @Autowired
    private GenDataSourceService genDataSourceService;

    @RequestMapping("/list")
    public String dataSourceList() {
        return "generator/dataSourceList";
    }

    @RequestMapping("findPage")
    @ResponseBody
    public PageInfo<GenDataSource> findPage(GenDataSource genDataSource) {
        return genDataSourceService.findPage(genDataSource);
    }

    @ResponseBody
    @RequestMapping("save")
    public BaseMessage save(GenDataSource genDataSource) {
        int count = genDataSourceService.save(genDataSource);
        if (count > 0) {
            return new BaseMessage(200, "保存成功");
        }
        return new BaseMessage(500, "保存失败");
    }

    @RequestMapping("findList")
    @ResponseBody
    public List<GenDataSource> findList(GenDataSource genDataSource) {
        return genDataSourceService.findList(genDataSource);
    }
}
