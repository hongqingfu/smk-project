package com.hqf.modules.generator.model;

import com.hqf.common.base.BaseEntity;

public class GenDataSource extends BaseEntity {

    private String description;

    private String databaseType;

    private String databaseName;

    private String server;

    private String port;

    private String username;

    private String password;


    public String getDiverName(){
        String diverName = null;

        if("mysql".equals(this.databaseType)){
            diverName = "com.mysql.jdbc.Driver";
        }
        else if("oracle".equals(this.databaseType)){
            diverName = "oracle.jdbc.driver.OracleDriver";
        }
        else if("sqlserver".equals(this.databaseType)){
            diverName = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
        }

        return diverName;
    }

    public String getUrl(){
        String url = null;

        if("mysql".equals(this.databaseType)){
            url = "jdbc:mysql://"+ this.server +":"+ this.port +"/"
                    + this.databaseName +"?useUnicode=true&characterEncoding=UTF-8";
        }
        else if("oracle".equals(this.databaseType)){
            url = "jdbc:oracle:thin:@"+ this.server +":"+ this.port +":"+ this.databaseName;
        }
        else if("sqlserver".equals(this.databaseType)){
            url = "jdbc:sqlserver://"+ this.server +":"+ this.port +";DatabaseName="+ this.databaseName;
        }

        return url;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    public String getDatabaseType() {
        return databaseType;
    }

    public void setDatabaseType(String databaseType) {
        this.databaseType = databaseType == null ? null : databaseType.trim();
    }

    public String getDatabaseName() {
        return databaseName;
    }

    public void setDatabaseName(String databaseName) {
        this.databaseName = databaseName == null ? null : databaseName.trim();
    }

    public String getServer() {
        return server;
    }

    public void setServer(String server) {
        this.server = server == null ? null : server.trim();
    }

    public String getPort() {
        return port;
    }

    public void setPort(String port) {
        this.port = port == null ? null : port.trim();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

}