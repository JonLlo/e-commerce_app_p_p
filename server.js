const express = require('express');
const app = express();
const port = 3000; // You can change this port number if needed

// Define a route
app.get('/', (req, res) => {
    res.send('Welcome to the E-commerce API!!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});