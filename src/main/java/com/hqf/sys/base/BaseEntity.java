package com.hqf.sys.base;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Date;
import java.util.UUID;

public class BaseEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    //id
    private String id;

    //创建人
    private String createBy;

    //创建时间
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date createDate;

    //更新人
    private String updateBy;

    //更新时间
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date updateDate;

    //备注
    private String remarks;

    //删除标志
    private String delFlag;

    //
    private int take;

    //
    private int skip;

    //当前页数
    protected int page;

    //每页显示数量
    private int pageSize;

    public static String uuid() {
        return UUID.randomUUID().toString().replaceAll("-", "");
    }

    public void preInsert() {
        if ("".equals(this.getId()) || null == this.getId()) {
            setId(this.uuid());
        }
        this.createBy = "1";
        this.createDate = new Date();
//        SysUser user = UserUtils.getUser();
//        if (StringUtils.isNotBlank(user.getId())) {
//            this.updateBy = user;
//            this.createBy = user;
//        }
//        this.updateDate = new Date();
//        this.createDate = this.updateDate;
    }

    public void preUpdate() {
//        User user = UserUtils.getUser();
//        if (StringUtils.isNotBlank(user.getId())) {
        this.updateBy = "1";
//        }
        this.updateDate = new Date();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCreateBy() {
        return createBy;
    }

    public void setCreateBy(String createBy) {
        this.createBy = createBy;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getUpdateBy() {
        return updateBy;
    }

    public void setUpdateBy(String updateBy) {
        this.updateBy = updateBy;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getDelFlag() {
        return delFlag;
    }

    public void setDelFlag(String delFlag) {
        this.delFlag = delFlag;
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
