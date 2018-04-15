package com.hqf.modules.sys.service.impl;

import com.hqf.common.base.BaseServiceImpl;
import com.hqf.modules.sys.mappings.SysUserMapper;
import com.hqf.modules.sys.model.SysUser;
import com.hqf.modules.sys.service.SysUserService;
import org.springframework.stereotype.Service;

@Service("sysUserService")
public class SysUserServiceImpl extends BaseServiceImpl<SysUserMapper, SysUser> implements SysUserService {

}
