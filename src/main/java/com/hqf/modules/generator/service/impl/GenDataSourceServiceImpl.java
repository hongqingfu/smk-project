package com.hqf.modules.generator.service.impl;

import com.hqf.modules.generator.mappings.GenDataSourceMapper;
import com.hqf.modules.generator.model.GenDataSource;
import com.hqf.modules.generator.service.GenDataSourceService;
import com.hqf.common.base.BaseServiceImpl;
import org.springframework.stereotype.Service;

@Service("genDataSourceService")
public class GenDataSourceServiceImpl extends BaseServiceImpl<GenDataSourceMapper, GenDataSource> implements GenDataSourceService {
}
