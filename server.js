// server.js
const app = require("./app");

const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

// MySQL 연결 설정
const db = mysql.createConnection({
    host: "awseb-e-pwe866d4vm-stack-awsebrdsdatabase-aohzlb9cydlb.cwjuzuaq4d9z.eu-north-1.rds.amazonaws.com", // RDS 호스트 이름
    user: "admin", // 사용자 이름
    password: "lengle890!", // 비밀번호
    database: "ebdb", // 데이터베이스 이름
});

// 데이터베이스 연결
db.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL");
});

// 미들웨어 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 정적 파일 제공
app.use(express.static("public"));

// 메시지 불러오기
app.get("/messages", (req, res) => {
    db.query("SELECT * FROM messages", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// 메시지 저장하기
app.post("/messages", (req, res) => {
    let msg = req.body.message;
    db.query(
        "INSERT INTO messages (content) VALUES (?)",
        [msg],
        (err, result) => {
            if (err) throw err;
            res.send("Message added successfully");
        }
    );
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
