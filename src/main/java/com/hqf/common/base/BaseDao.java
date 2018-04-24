package com.hqf.common.base;

import java.util.List;

public interface BaseDao<T> {

    int insert(T record);

    int insertSelective(T record);

    int deleteByPrimaryKey(String id);

    int updateByPrimaryKeySelective(T record);

    int updateByPrimaryKey(T record);

    T selectByPrimaryKey(String id);

    List<T> selectSelective(T record);

    int insertBatch(List<T> records);

}
