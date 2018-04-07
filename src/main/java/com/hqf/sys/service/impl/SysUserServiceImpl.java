package com.hqf.sys.service.impl;

import com.hqf.sys.base.BaseServiceImpl;
import com.hqf.sys.dao.SysUserMapper;
import com.hqf.sys.model.SysUser;
import com.hqf.sys.service.SysUserService;
import org.springframework.stereotype.Service;

@Service("sysUserService")
public class SysUserServiceImpl extends BaseServiceImpl<SysUserMapper, SysUser> implements SysUserService {

}
