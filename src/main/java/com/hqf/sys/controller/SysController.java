package com.hqf.sys.controller;

import com.github.pagehelper.PageInfo;
import com.hqf.sys.base.BaseMessage;
import com.hqf.sys.model.SysMenu;
import com.hqf.sys.service.SysMenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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

    @RequestMapping("userList")
    public String userList() {
        return "/sys/sysUserList";
    }

    @RequestMapping("menus")
    @ResponseBody
    public List<SysMenu> menuList(SysMenu sysMenu) {
        if ("".equals(sysMenu.getId()) || null == sysMenu.getId()) {
            sysMenu.setParentId("0");
        } else {
            sysMenu.setParentId(sysMenu.getId());
        }
        return sysMenuService.findList(sysMenu);
    }

    @RequestMapping("menupage")
    @ResponseBody
    public PageInfo<SysMenu> menuPage(SysMenu sysMenu) {
        if ("".equals(sysMenu.getId()) || null == sysMenu.getId()) {
            sysMenu.setParentId("0");
        } else {
            sysMenu.setParentId(sysMenu.getId());
        }
        return sysMenuService.findPage(sysMenu);
    }

    @RequestMapping("menus2")
    @ResponseBody
    public List<SysMenu> menuList2(SysMenu sysMenu) {
        return sysMenuService.findList(sysMenu);
    }

    @RequestMapping(value = "saveMenu", method = RequestMethod.POST)
    @ResponseBody
    public BaseMessage saveMenu(SysMenu sysMenu) {
        int i = sysMenuService.save(sysMenu);
        if (i > 0) {
            return new BaseMessage(200, "保存成功");
        }
        return new BaseMessage(500, "保存失败");
    }

    @RequestMapping(value = "deleteMenu", method = RequestMethod.POST)
    @ResponseBody
    public BaseMessage deleteMenu(SysMenu sysMenu) {
        int i = sysMenuService.delete(sysMenu.getId());
        if (i > 0) {
            return new BaseMessage(200, "删除成功");
        }
        return new BaseMessage(500, "删除失败");
    }

}
