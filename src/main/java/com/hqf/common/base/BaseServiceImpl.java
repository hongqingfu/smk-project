package com.hqf.common.base;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public class BaseServiceImpl<D extends BaseDao<T>, T extends BaseEntity> {

    @Autowired
    private D dao;

    public T get(String id) {
        return this.dao.selectByPrimaryKey(id);
    }

    public List<T> findList(T record) {
        return this.dao.selectSelective(record);
    }

    public PageInfo<T> findPage(T record) {
        PageHelper.startPage(record.getPage(), record.getPageSize());
        List<T> list = this.dao.selectSelective(record);
        PageInfo<T> page = new PageInfo<>(list);
        return page;
    }

    @Transactional
    public int save(T record) {
        if ("".equals(record.getId()) || null == record.getId()) {
            record.preInsert();
            return this.dao.insertSelective(record);
        } else {
            record.preUpdate();
            return this.dao.updateByPrimaryKeySelective(record);
        }
    }

    @Transactional
    public int delete(String id) {
        return this.dao.deleteByPrimaryKey(id);
    }
}
