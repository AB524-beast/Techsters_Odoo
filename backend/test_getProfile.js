const http = require('http');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NzIyNDc2NDNmMTc2ZTg2M2Q3ZTVkMCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3NTIzMTA5NDEsImV4cCI6MTc1MjkxNTc0MX0.bmf3bshkBBB UjtfQTXIhfCsC4EnbpNtChGcAmmMiorDA';

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/users/me',
  method: 'GET',
  headers: {
    'Authorization': 'Bearer ' + token
  }
};

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log('Body: ' + chunk);
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.end();
