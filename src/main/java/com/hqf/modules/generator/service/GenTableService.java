package com.hqf.modules.generator.service;

import com.hqf.common.base.BaseService;
import com.hqf.modules.generator.model.GenTable;

public interface GenTableService extends BaseService<GenTable> {

    int saveTableAndColumn(GenTable genTable);

    int deleteTableAndColumn(String id);
}
