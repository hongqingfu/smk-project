package com.hqf.modules.generator.service.impl;

import com.hqf.common.base.BaseServiceImpl;
import com.hqf.modules.generator.mappings.GenTableMapper;
import com.hqf.modules.generator.model.GenTable;
import com.hqf.modules.generator.service.GenTableService;
import org.springframework.stereotype.Service;

@Service("genTableService")
public class GenTableServiceImpl extends BaseServiceImpl<GenTableMapper, GenTable> implements GenTableService {
}
