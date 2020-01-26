// ✅ แบบ send file html
const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

const handler = (req, res) => {
  // res.writeHeader(200, { 'Content-Type': 'text/html' });

  const filename = path.join(__dirname, 'index.html');
  const indexData = fs.readFileSync(filename);
  res.end(indexData);

  // แบบใช้ fs.createReadStream
  // จะ load data ได้ไวกว่า
  // const readSream = fs.createReadStream(filename, 'utf8');
  // readSream.pipe(res);
};

const server = http.createServer(handler);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// ✅ แบบ send string
// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const handler = (req, res) => {
//   res.end(`
//     <div>
//       <h2 style="color: #ff3456;">Ahoy!</h2>
//       <p style="color: #23dd55;">This is node.js tutorial</p>
//     </div>
//   `);
// };

// const server = http.createServer(handler);

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
