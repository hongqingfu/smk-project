package com.hqf.sys.base;

import com.hqf.sys.model.SysUser;

public class BaseEntity<T> {
    private static final long serialVersionUID = 1L;
    protected String id;
    protected SysUser currentUser;
    public static final String DEL_FLAG_NORMAL = "0";
    public static final String DEL_FLAG_DELETE = "1";

    protected int take;
    protected int skip;
    protected int page;
    protected int pageSize;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public SysUser getCurrentUser() {
        return currentUser;
    }

    public void setCurrentUser(SysUser currentUser) {
        this.currentUser = currentUser;
    }

    public static String getDelFlagNormal() {
        return DEL_FLAG_NORMAL;
    }

    public static String getDelFlagDelete() {
        return DEL_FLAG_DELETE;
    }

    public int getTake() {
        return take;
    }

    public void setTake(int take) {
        this.take = take;
    }

    public int getSkip() {
        return skip;
    }

    public void setSkip(int skip) {
        this.skip = skip;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }
}
