// 1. import express ด้วยการใช้ require
const express = require('express');

// 2. express() เป็นฟังค์ชั่น และ assign ไว้ที่ตัวแปร app
const app = express();

// 3. app เป็น object และมี function ชื่อเดียวกับ HTTP Method ครับ
// ตัวอย่างคือ `.get()` เหมือนกับ GET
app.get('/', function(req, res) {
  res.send('Hello World');
});

app.get('/ahoy', (req, res) => {
  const name = req.query.name;
  const email = req.query.email;

  // หรือ
  // const { name, email } = req.query;
  res.send(`Ahoy! ${name}`);
});

app.get('/ahoy/:name', (req, res) => {
  res.send(`Ahoy! ${req.params.name}`);
});

// 4. listen() เป็น function คล้ายๆ http module เพื่อเอาไว้ระบุว่า server จะรัน ด้วย port อะไร
app.listen(3000);
