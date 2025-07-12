const http = require('http');

const token = 'REPLACE_WITH_VALID_TOKEN_FROM_LOGIN_RESPONSE';

const updateData = JSON.stringify({
  name: 'Updated Test User',
  location: 'Updated Location',
  availability: 'weekends'
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/users/me',
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(updateData),
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

req.write(updateData);
req.end();
