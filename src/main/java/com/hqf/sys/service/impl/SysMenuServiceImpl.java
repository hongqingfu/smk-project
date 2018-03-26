package com.hqf.sys.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.hqf.sys.dao.SysMenuMapper;
import com.hqf.sys.model.SysMenu;
import com.hqf.sys.service.SysMenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("sysMenuService")
public class SysMenuServiceImpl implements SysMenuService {

    @Autowired
    private SysMenuMapper sysMenuMapper;

    @Override
    public List<SysMenu> findList(SysMenu sysMenu) {
        return sysMenuMapper.selectSelective(sysMenu);
    }

    @Override
    public PageInfo<SysMenu> findPage(SysMenu sysMenu) {
        PageHelper.startPage(sysMenu.getPage(), sysMenu.getPageSize());
        List<SysMenu> list = sysMenuMapper.selectSelective(sysMenu);
        PageInfo<SysMenu> page = new PageInfo<>(list);
        return page;
    }
}
