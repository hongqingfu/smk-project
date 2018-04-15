package com.hqf.modules.sys.service.impl;

import com.github.pagehelper.PageInfo;
import com.hqf.common.base.BaseServiceImpl;
import com.hqf.modules.sys.mappings.SysMenuMapper;
import com.hqf.modules.sys.model.SysMenu;
import com.hqf.modules.sys.service.SysMenuService;
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
