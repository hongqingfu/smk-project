package com.hqf.sys.service;

import com.github.pagehelper.PageInfo;
import com.hqf.sys.model.SysMenu;

import java.util.List;

public interface SysMenuService {

    List<SysMenu> findList(SysMenu sysMenu);

    PageInfo<SysMenu> findPage(SysMenu sysMenu);

}
