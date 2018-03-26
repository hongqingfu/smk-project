package com.hqf.sys.base;

import com.github.pagehelper.PageInfo;

import java.util.List;

public interface BaseService<T> {

    T get(String id);

    List<T> findList(T record);

    PageInfo<T> findPage(T record);

    int save(T record);

    int delete(String id);

}
