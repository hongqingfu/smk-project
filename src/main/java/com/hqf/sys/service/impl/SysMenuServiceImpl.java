package com.hqf.sys.service.impl;

import com.github.pagehelper.PageInfo;
import com.hqf.sys.base.BaseServiceImpl;
import com.hqf.sys.mapper.SysMenuMapper;
import com.hqf.sys.model.SysMenu;
import com.hqf.sys.service.SysMenuService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("sysMenuService")
public class SysMenuServiceImpl extends BaseServiceImpl<SysMenuMapper, SysMenu> implements SysMenuService {

    public List<SysMenu> findList(SysMenu sysMenu) {
        return super.findList(sysMenu);
    }

    public PageInfo<SysMenu> findPage(SysMenu sysMenu) {
        return super.findPage(sysMenu);
    }
}
