require('dotenv').config();
const express = require('express');
const userRouter = require('./router/user');
const articleRouter = require('./router/article');
const announcementRouter = require('./router/announcement');

const { sequelize } = require('./models/index.js');

const app = express();
const port = 80;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Router list
app.use('/user', userRouter);
app.use('/article', articleRouter);
app.use('/announcement', announcementRouter);

// test, hello world
app.get('/', (req, res) => {
  res.status(200).send('Hello, world!');
});

module.exports = app.listen(port, () => {
  console.log(`      🚀 Server is starting on ${port}`);
});
