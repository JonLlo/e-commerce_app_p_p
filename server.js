const express = require('express');
const { connectDatabase, closeDatabase, client } = require('./config/database'); // Import database connection functions and client
const bodyParser = require('body-parser');


const app = express();
const port = 3000; // You can change this port number if needed
app.use(express.json());
app.use(express.static('public'));

// general routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/home.html'); // Serve the HTML file
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
        res.sendFile(__dirname + '/public/users.html');
 
    } catch (error) {
        // Handle errors
        console.error('Error retrieving users:', error);
        res.status(500).send(`Internal server error
        <br>
        <br>
        <button onclick="window.location.href='/users'">Go to Users</button>`);} 
});
//POST REQUEST FOR REGISTERING
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static('public'));




app.post('/register', async (req, res) => {

   /*here*/
});


app.post('/removal', async (req, res) => {
    await connectDatabase();
    console.log("hello");


})
    

