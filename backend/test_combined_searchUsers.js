const http = require('http');

const loginData = JSON.stringify({
  email: 'testuser@example.com',
  password: 'TestPass123'
});

const loginOptions = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(loginData)
  }
};

const loginReq = http.request(loginOptions, (loginRes) => {
  let data = '';
  loginRes.on('data', (chunk) => {
    data += chunk;
  });
  loginRes.on('end', () => {
    if (loginRes.statusCode !== 200) {
      console.error(`Login failed with status ${loginRes.statusCode}: ${data}`);
      return;
    }
    const parsed = JSON.parse(data);
    const token = parsed.token;
    console.log('Login successful, token:', token);

    // Now test searchUsers endpoint
    const searchOptions = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/users/search?skill=Test',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const searchReq = http.request(searchOptions, (searchRes) => {
      let searchData = '';
      console.log(`searchUsers status: ${searchRes.statusCode}`);
      searchRes.setEncoding('utf8');
      searchRes.on('data', (chunk) => {
        searchData += chunk;
      });
      searchRes.on('end', () => {
        console.log('searchUsers body:', searchData);
      });
    });

    searchReq.on('error', (e) => {
      console.error(`Problem with searchUsers request: ${e.message}`);
    });

    searchReq.end();
  });
});

loginReq.on('error', (e) => {
  console.error(`Problem with login request: ${e.message}`);
});

loginReq.write(loginData);
loginReq.end();
