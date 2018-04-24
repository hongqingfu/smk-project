package com.hqf.modules.generator.model;

import com.hqf.common.base.BaseEntity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class GenTable extends BaseEntity {

    //名称
    private String name;

    //描述
    private String comments;

    //类名
    private String className;

    //关联父表
    private String parentTable;

    //关联父表外键
    private String parentTableFk;

    //列
    private List<GenTableColumn> columns = new ArrayList<>();


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments == null ? null : comments.trim();
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className == null ? null : className.trim();
    }

    public String getParentTable() {
        return parentTable;
    }

    public void setParentTable(String parentTable) {
        this.parentTable = parentTable == null ? null : parentTable.trim();
    }

    public String getParentTableFk() {
        return parentTableFk;
    }

    public void setParentTableFk(String parentTableFk) {
        this.parentTableFk = parentTableFk == null ? null : parentTableFk.trim();
    }

    public List<GenTableColumn> getColumns() {
        return columns;
    }

    public void setColumns(List<GenTableColumn> columns) {
        this.columns = columns;
    }
}