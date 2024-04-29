const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'ecom_j_db',
    password: 'donkey',
    port: 5432, // default PostgreSQL port
});

// Function to connect to the database
async function connectDatabase() {
    try {
        await client.connect();
        console.log('Connected to PostgreSQL database');
    } catch (error) {
        console.error('Error connecting to PostgreSQL database', error);
    }
}
async function closeDatabase() {
    try {
        await client.end();
        console.log('Connection to PostgreSQL database closed');
    } catch (error) {
        console.error('Error closing connection to PostgreSQL database', error);
    }
}
module.exports = {
    connectDatabase,
    closeDatabase,
    client // You can also export the client for direct usage in other modules if needed
};