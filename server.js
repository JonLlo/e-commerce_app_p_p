const express = require('express');
const { connectDatabase, closeDatabase, client } = require('./config/database'); // Import database connection functions and client

const app = express();
const port = 3000; // You can change this port number if needed
app.use(express.json());

// general routes
app.get('/', (req, res) => {
    res.send('Welcome');
});
app.get('/dog', (req, res) => {
    res.send('Welcome to the dog');
});
app.get('/', (req, res) => {
    res.send('Hello World!')
  })

//GET request route handler for all users:

app.get('/users', async (req, res) => {
    try {
        // Connect to the database
        await connectDatabase();

        // Query the database for all users
        const result = await client.query('SELECT * FROM "User"');

        // Retrieve the users from the query result
        const users = result.rows;
        res.json(users);
    } catch (error) {
        // Handle errors
        console.error('Error retrieving users:', error);
        res.status(500).json({ error: 'Bloody Internal server error' });
    } 
});
//POST REQUEST FOR REGISTERING
app.use(express.static('public'));
app.use(express.json());


app.post('/register', async (req, res) => {
    // Extract username, email, and password from the request body
    const  {username, password, email}   = req.body;
    console.log(username, "camea")

});





    /*try {
        // Validate input (e.g., check for required fields)
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Username, email, and password are required' });
        }

        // Perform registration process (e.g., store user data in the database)
        // This is where you would typically interact with your database to store the user data
        
        // Respond with a success message
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    */




// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});