const http = require('http');

const token = 'REPLACE_WITH_VALID_TOKEN_FROM_LOGIN_RESPONSE';

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/users/search?query=Test',
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
};

const req = http.request(options, (res) => {
  let data = '';
  console.log(`Status: ${res.statusCode}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('Body: ' + data);
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.end();
