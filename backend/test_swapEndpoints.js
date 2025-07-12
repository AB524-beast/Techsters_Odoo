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

loginReq = http.request(loginOptions, (loginRes) => {
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

    // Create a swap
    const swapData = JSON.stringify({
      title: 'Test Swap',
      description: 'This is a test swap',
      skillsOffered: ['JavaScript'],
      skillsWanted: ['Python']
    });

    const createOptions = {
      hostname: 'localhost',
      port: 5000,
      path: '/api/swaps',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(swapData),
        'Authorization': `Bearer ${token}`
      }
    };

    const createReq = http.request(createOptions, (createRes) => {
      let createResponse = '';
      console.log(`Create swap status: ${createRes.statusCode}`);
      createRes.setEncoding('utf8');
      createRes.on('data', (chunk) => {
        createResponse += chunk;
      });
      createRes.on('end', () => {
        console.log('Create swap body:', createResponse);

        if (createRes.statusCode !== 201) return;

        const createdSwap = JSON.parse(createResponse);
        const swapId = createdSwap._id;

        // Get the swap
        const getOptions = {
          hostname: 'localhost',
          port: 5000,
          path: `/api/swaps/${swapId}`,
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };

        const getReq = http.request(getOptions, (getRes) => {
          let getResponse = '';
          console.log(`Get swap status: ${getRes.statusCode}`);
          getRes.setEncoding('utf8');
          getRes.on('data', (chunk) => {
            getResponse += chunk;
          });
          getRes.on('end', () => {
            console.log('Get swap body:', getResponse);

            // Update the swap
            const updateData = JSON.stringify({
              title: 'Updated Test Swap',
              description: 'Updated description'
            });

            const updateOptions = {
              hostname: 'localhost',
              port: 5000,
              path: `/api/swaps/${swapId}`,
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(updateData),
                'Authorization': `Bearer ${token}`
              }
            };

            const updateReq = http.request(updateOptions, (updateRes) => {
              let updateResponse = '';
              console.log(`Update swap status: ${updateRes.statusCode}`);
              updateRes.setEncoding('utf8');
              updateRes.on('data', (chunk) => {
                updateResponse += chunk;
              });
              updateRes.on('end', () => {
                console.log('Update swap body:', updateResponse);

                // Delete the swap
                const deleteOptions = {
                  hostname: 'localhost',
                  port: 5000,
                  path: `/api/swaps/${swapId}`,
                  method: 'DELETE',
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
                };

                const deleteReq = http.request(deleteOptions, (deleteRes) => {
                  let deleteResponse = '';
                  console.log(`Delete swap status: ${deleteRes.statusCode}`);
                  deleteRes.setEncoding('utf8');
                  deleteRes.on('data', (chunk) => {
                    deleteResponse += chunk;
                  });
                  deleteRes.on('end', () => {
                    console.log('Delete swap body:', deleteResponse);
                  });
                });

                deleteReq.on('error', (e) => {
                  console.error(`Problem with delete swap request: ${e.message}`);
                });

                deleteReq.end();
              });
            });

            updateReq.on('error', (e) => {
              console.error(`Problem with update swap request: ${e.message}`);
            });

            updateReq.write(updateData);
            updateReq.end();
          });
        });

        getReq.on('error', (e) => {
          console.error(`Problem with get swap request: ${e.message}`);
        });

        getReq.end();
      });
    });

    createReq.on('error', (e) => {
      console.error(`Problem with create swap request: ${e.message}`);
    });

    createReq.write(swapData);
    createReq.end();
  });
});

loginReq.on('error', (e) => {
  console.error(`Problem with login request: ${e.message}`);
});

loginReq.write(loginData);
loginReq.end();
