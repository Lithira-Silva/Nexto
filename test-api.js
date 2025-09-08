// Simple Node.js script to test the API
const http = require('http');

// First try a GET request to trigger API compilation
const getOptions = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/tasks',
  method: 'GET'
};

console.log('Testing GET to /api/tasks first...');

const getReq = http.request(getOptions, (res) => {
  console.log(`GET Status: ${res.statusCode}`);
  
  let responseData = '';
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    console.log('GET Response:', responseData);
    
    // Now try POST request
    const postData = JSON.stringify({
      title: "Test Task from Node.js",
      description: "Testing task creation",
      priority: "medium",
      completed: false
    });

    const postOptions = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/tasks',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    console.log('\nNow testing POST to /api/tasks...');
    console.log('POST Data:', postData);

    const postReq = http.request(postOptions, (res) => {
      console.log(`POST Status: ${res.statusCode}`);
      console.log(`POST Headers: ${JSON.stringify(res.headers)}`);
      
      let responseData = '';
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        console.log('POST Response:', responseData);
        try {
          const parsed = JSON.parse(responseData);
          console.log('Parsed POST response:', parsed);
        } catch (e) {
          console.log('Failed to parse POST response as JSON');
        }
      });
    });

    postReq.on('error', (e) => {
      console.error(`Problem with POST request: ${e.message}`);
    });

    postReq.write(postData);
    postReq.end();
  });
});

getReq.on('error', (e) => {
  console.error(`Problem with GET request: ${e.message}`);
});

getReq.end();
