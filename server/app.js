require('dotenv').config();
const express = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const { sequelize } = require('./models/index.js');

const router = require('./router');

const app = express();
const port = 80;

const https = require('https');
const fs = require('fs');

const cert = fs.readFileSync(process.env.CERT);
const key = fs.readFileSync(process.env.PRIV);


app.use(cors({
  allowedHeaders: ['Authorization', 'Content-Type'],
  origin: 'http://localhost:3000',
  credentials: true,
  preflightContinue: false,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/', router);

// test, hello world
app.get('/', (req, res) => {
  res.status(200).send('Hello, world!');
});

return https.createServer({ cert, key }, app).listen(443, () => {
  console.log(`      🚀 Server is starting on 443`);
})

// module.exports = app.listen(port, () => {
//   console.log(`      🚀 Server is starting on ${port}`);
// });


