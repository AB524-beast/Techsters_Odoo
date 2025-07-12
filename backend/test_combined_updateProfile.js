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

    // Now test updateProfile endpoint
    const updateData = JSON.stringify({
      name: 'Updated Test User',
      location: 'Updated Location',
      availability: 'weekends'
    });

    const updateOptions = {
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

    const updateReq = http.request(updateOptions, (updateRes) => {
      let updateResponse = '';
      console.log(`updateProfile status: ${updateRes.statusCode}`);
      updateRes.setEncoding('utf8');
      updateRes.on('data', (chunk) => {
        updateResponse += chunk;
      });
      updateRes.on('end', () => {
        console.log('updateProfile body:', updateResponse);
      });
    });

    updateReq.on('error', (e) => {
      console.error(`Problem with updateProfile request: ${e.message}`);
    });

    updateReq.write(updateData);
    updateReq.end();
  });
});

loginReq.on('error', (e) => {
  console.error(`Problem with login request: ${e.message}`);
});

loginReq.write(loginData);
loginReq.end();
