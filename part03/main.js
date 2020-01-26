const fs = require('fs');

// ❌แบบไม่ใส่ option
// fs.readFile('data.txt', (error, data) => {
//   console.log('data', data);
// });

// ✅แบบใส่ option เป็น encoding
// fs.readFile('data.txt', 'utf-8', (error, data) => {
//   console.log('data', data);
// });

// ❌แบบที่ผิด
// console.log('--START---');

// const data1 = fs.readFile('data.txt', 'utf-8', (error, data) => {});

// const data2 = fs.readFile('data.txt', 'utf-8', (error, data) => {});

// console.log('data1', data1);
// console.log('data2', data2);

// console.log('--END--');

// ✅ แบบถูก
// console.log('--START---');

// fs.readFile('data.txt', 'utf-8', (error, data) => {
//   console.log('data 1 >>>>', data);
// });

// fs.readFile('data.txt', 'utf-8', (error, data) => {
//   console.log('data 2 >>>>', data);
// });

// console.log('--END--');

// ✅ แบบใช้ readFileSync
// console.log('--START---');

// const data1 = fs.readFileSync('data.txt', 'utf-8');
// const data2 = fs.readFileSync('data.txt', 'utf-8');

// console.log('data1', data1);
// console.log('data2', data2);

// console.log('--END--');

// ✅ เขียนไฟล์
// fs.writeFile('hello.txt', 'Ahoy Node.js', 'utf8', (error, data) => {
//   console.log('file saved');
// });

fs.appendFile('hello2.txt', 'Ahoy Node.js\n', 'utf8', (error, data) => {
  console.log('file saved');
});
