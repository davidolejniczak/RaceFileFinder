package com.WT.RaceFileFinder;

import java.net.URISyntaxException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {

    public static Connection getConnection() throws URISyntaxException, SQLException {
        String dbUrl = System.getenv("JDBC_DATABASE_URL");
        if (dbUrl == null || dbUrl.isEmpty()) {
            throw new SQLException("JDBC_DATABASE_URL environment variable not set.");
        }
        return DriverManager.getConnection(dbUrl);
    }
}
