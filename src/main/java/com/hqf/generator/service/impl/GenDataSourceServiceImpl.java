package com.hqf.generator.service.impl;

import com.hqf.generator.mapper.GenDataSourceMapper;
import com.hqf.generator.model.GenDataSource;
import com.hqf.generator.service.GenDataSourceService;
import com.hqf.sys.base.BaseServiceImpl;
import org.springframework.stereotype.Service;

@Service("genDataSourceService")
public class GenDataSourceServiceImpl extends BaseServiceImpl<GenDataSourceMapper, GenDataSource> implements GenDataSourceService {
}
