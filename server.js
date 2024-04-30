const express = require('express');
const { connectDatabase, closeDatabase, client } = require('./config/database'); // Import database connection functions and client
const bodyParser = require('body-parser');


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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static('public'));




app.post('/register', async (req, res) => {
    // Extract username, email, and password from the request body
    console.log(req.body); // Log the entire req.body object
    const  {user_name, pass_word, e_mail}   = req.body
    console.log(user_name, pass_word, e_mail,"camea")




   try {
        // Validate input (e.g., check for required fields)
        if (!user_name || !e_mail || !pass_word) {
            return res.status(400).json({ error: 'Username, email, and password are required' });
        }

        await connectDatabase();

        // Insert the user data into the database
        const insertQuery = 'INSERT INTO "User" (username, email, password) VALUES ($1, $2, $3)';
        await client.query(insertQuery, [user_name, e_mail, pass_word]);


        // Perform registration process (e.g., store user data in the database)
        // This is where you would typically interact with your database to store the user data
        
        // Respond with a success message
        res.status(201).json({ message:
             `User registered successfully. username: ${user_name}, email: ${e_mail}, password: ${pass_word}`,  });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
 
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});