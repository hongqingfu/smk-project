package com.hqf.sys.base;

/**
 * 返回消息类
 */
public class BaseMessage {

    private Integer code = Integer.valueOf(200);
    private Object message;

    public BaseMessage() {
    }

    public BaseMessage(Integer code) {
        this.code = code;
    }

    public BaseMessage(Integer code, Object message) {
        this.code = code;
        this.message = message;
    }

    public Integer getCode() {
        return this.code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public Object getMessage() {
        return this.message;
    }

    public void setMessage(Object message) {
        this.message = message;
    }
}
