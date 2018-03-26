package com.hqf.sys.controller;

import com.github.pagehelper.PageInfo;
import com.hqf.sys.model.SysMenu;
import com.hqf.sys.service.SysMenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("sys")
public class SysController {

    @Autowired
    private SysMenuService sysMenuService;

    @RequestMapping("menulist")
    public String menuList() {
        return "/sys/menu";
    }

    @RequestMapping("menus")
    @ResponseBody
    public List<SysMenu> menuList (SysMenu sysMenu) {
        if ("".equals(sysMenu.getId()) || null == sysMenu.getId()) {
            sysMenu.setParentId("0");
        } else {
            sysMenu.setParentId(sysMenu.getId());
        }
        return sysMenuService.findList(sysMenu);
    }

    @RequestMapping("menupage")
    @ResponseBody
    public PageInfo<SysMenu> menuPage (SysMenu sysMenu,int page, int pageSize) {
        return sysMenuService.findPage(sysMenu);
    }
}
