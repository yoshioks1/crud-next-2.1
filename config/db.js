import mysql from "serverless-mysql";

const pool = mysql({
  config: {
    host: "uyu7j8yohcwo35j3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "cf4jbcqz12pp7jud",
    password: "wsb7iy0ohet7zxsn",
    port: 3306,
    database: "o5jdsg9yueda3hwk",
  },
});

export { pool };