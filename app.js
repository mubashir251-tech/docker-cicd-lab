const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Home endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Docker CI/CD Lab Application',
        status: 'Running',
        version: '1.0.0'
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

// Users API endpoint
app.get('/api/users', (req, res) => {
    res.json({
        users: [
            { id: 1, name: 'Alice', role: 'Admin' },
            { id: 2, name: 'Bob', role: 'Developer' },
            { id: 3, name: 'Charlie', role: 'DevOps Engineer' }
        ]
    });
});

// Start server only when running app.js directly.
// This allows Jest/Supertest to import the app without opening a port.
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

module.exports = app;
