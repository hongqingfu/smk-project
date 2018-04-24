package com.hqf.modules.generator.service;

import com.hqf.common.base.BaseService;
import com.hqf.modules.generator.model.GenTableColumn;

import java.util.List;

public interface GenTableColumnService extends BaseService<GenTableColumn> {
    int deleteByTableId(String tableId);
}
