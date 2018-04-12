package com.hqf.generator.controller;

import com.alibaba.druid.util.StringUtils;
import com.github.pagehelper.PageInfo;
import com.hqf.generator.model.GenDataSource;
import com.hqf.generator.service.GenDataSourceService;
import com.hqf.sys.base.BaseMessage;
import org.codehaus.jackson.map.Serializers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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
}
