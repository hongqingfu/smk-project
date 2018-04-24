package com.hqf.modules.generator.mappings;

import com.hqf.common.base.BaseDao;
import com.hqf.modules.generator.model.GenTableColumn;

public interface GenTableColumnMapper extends BaseDao<GenTableColumn> {

    int deleteByTableId(String tableId);
}