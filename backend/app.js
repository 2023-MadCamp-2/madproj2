const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();

// MongoDB 연결 설정
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connectMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB 연결 에러:', error);
  }
}

connectMongoDB();

// Middleware 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우터 설정
const signupRouter = require('./routes/auth/signup');
app.use('/auth', signupRouter);

const loginRouter = require('./routes/auth/login');
app.use('/auth', loginRouter);

// 에러 핸들러 설정
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// 포트 설정
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


// const express = require("express");
// const path = require("path");
// const logger = require("morgan");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const session = require("express-session");

// require("dotenv").config();

// const indexRouter = require("./routes");

// const options = {
//     user: process.env.USERNAME,
//     database: process.env.DB,
//     password: process.env.PASSWORD,
//     host: process.env.HOST,
//     port: 3306,
// }

// const app = express();

// // 탬플릿과 탬플릿 엔진 설정
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");
// // express 서버의 포트 지정
// app.set("port", process.env.PORT || 3000);

// // express의 미들웨어 설정
// // request에 대한 로그를 기록하는 미들웨어
// app.use(logger("dev"));

// // CORS 전부 오픈
// app.use(cors());
// app.use(
//   session({
//     resave: false,
//     saveUninitialized: false,
//     secret: process.env.COOKIE_SECRET,
//     cookie: {
//         httpOnly: true,
//         secure: false,
//     },
//   }),
// );

// // 정적 파일들을 접근할 수 있도록하는 미들웨어
// app.use(express.static(path.join(__dirname, "public")));
// // request의 본문을 분석해주는 미들웨어
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// // request의 쿠키를 해석해주는 미들웨어
// app.use(cookieParser(process.env.COOKIE_SECRET));
// // app.use(sessionMiddleware);

// // index 라우터
// app.use("/", indexRouter);
// // 404에러를 찾고 error handler로 인계하는 미들웨어
// app.use((req, res, next) => {
//   const err = new Error("Not Found");
//   err.status = 404;
//   next(err);
// });

// // error handler
// app.use((err, req, res, next) => {
//   console.log(err);
//   res.local.message = err.message;
//   res.local.error = req.app.get("env") === "development" ? err : {};
//   res.status(err.status || 500);
//   res.render("error");
// });

// // 서버 설정
// const server = app.listen(app.get("port"), () => {
//   console.log(app.get("port"), "번 포트에서 대기중입니다.");
// });

// module.exports = app;