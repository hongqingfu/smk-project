package com.hqf.modules.generator.service.impl;

import com.hqf.common.base.BaseServiceImpl;
import com.hqf.modules.generator.mappings.GenTableColumnMapper;
import com.hqf.modules.generator.mappings.GenTableMapper;
import com.hqf.modules.generator.model.GenTable;
import com.hqf.modules.generator.model.GenTableColumn;
import com.hqf.modules.generator.service.GenTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("genTableService")
public class GenTableServiceImpl extends BaseServiceImpl<GenTableMapper, GenTable> implements GenTableService {

    @Autowired
    private GenTableMapper genTableMapper;

    @Autowired
    private GenTableColumnMapper genTableColumnMapper;

    @Override
    @Transactional
    public int saveTableAndColumn(GenTable genTable) {

        genTable.preInsert();
        genTableMapper.insert(genTable);
        if (genTable.getColumns().size() > 0) {
            for (GenTableColumn column : genTable.getColumns()) {
                column.preInsert();
                column.setGenTableId(genTable.getId());
            }
            return this.genTableColumnMapper.insertBatch(genTable.getColumns());
        }
         return 0;
    }

    @Override
    @Transactional
    public int deleteTableAndColumn(String id) {
        genTableMapper.deleteByPrimaryKey(id);
        return genTableColumnMapper.deleteByTableId(id);

    }
}
