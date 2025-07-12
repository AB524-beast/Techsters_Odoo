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

    // Now test getProfile endpoint
    const profileOptions = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/users/me',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const profileReq = http.request(profileOptions, (profileRes) => {
      let profileData = '';
      profileRes.on('data', (chunk) => {
        profileData += chunk;
      });
      profileRes.on('end', () => {
        console.log(`getProfile status: ${profileRes.statusCode}`);
        console.log('getProfile body:', profileData);
      });
    });

    profileReq.on('error', (e) => {
      console.error(`Problem with getProfile request: ${e.message}`);
    });

    profileReq.end();
  });
});

loginReq.on('error', (e) => {
  console.error(`Problem with login request: ${e.message}`);
});

loginReq.write(loginData);
loginReq.end();
