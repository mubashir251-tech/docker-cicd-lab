const http = require('http');

const options = {
    hostname: '127.0.0.1',
    port: process.env.PORT || 3000,
    path: '/health',
    method: 'GET',
    timeout: 3000
};

const req = http.request(options, (res) => {
    if (res.statusCode === 200) {
        console.log('Application is healthy');
        process.exit(0);
    }

    console.error(`Health check failed: HTTP ${res.statusCode}`);
    process.exit(1);
});

req.on('error', (error) => {
    console.error(`Health check failed: ${error.message}`);
    process.exit(1);
});

req.on('timeout', () => {
    console.error('Health check timed out');
    req.destroy();
    process.exit(1);
});

req.end();
