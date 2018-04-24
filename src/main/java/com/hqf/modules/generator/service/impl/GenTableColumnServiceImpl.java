package com.hqf.modules.generator.service.impl;

import com.hqf.common.base.BaseServiceImpl;
import com.hqf.modules.generator.mappings.GenTableColumnMapper;
import com.hqf.modules.generator.model.GenTableColumn;
import com.hqf.modules.generator.service.GenTableColumnService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("genTableColumnService")
public class GenTableColumnServiceImpl extends BaseServiceImpl<GenTableColumnMapper, GenTableColumn> implements GenTableColumnService {

    @Override
    public int deleteByTableId(String tableId) {
        return this.deleteByTableId(tableId);
    }
}
