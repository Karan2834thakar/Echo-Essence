const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// MySQL database connection
const db = mysql.createConnection({
    host: "localhost",      // Update with your MySQL host
    user: "root",           // Your MySQL username
    password: "karan1234",   // Your MySQL password
    database: "userDB"      // The database you created earlier
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error("Database connection error:", err);
    } else {
        console.log("Connected to MySQL database");
    }
});

// Route to save user data
app.post("/", async (req, res) => {
    const { email, password } = req.body;
    console.log("post request");

    console.log(email, password);

    // Insert new user if not already in the database
    const insertUserQuery = `INSERT INTO users (email, password) VALUES ("${email}", "${password}")`;
    db.query(insertUserQuery, [email, password], (err, result) => {
        console.log("insert chale chhe");
        if (err) {
            return res.status(500).json({ message: "Error saving user data", error: err });
        }
        res.status(200).json({ message: "User data saved successfully" });
    });
}); 

// Define the root route
app.get('/', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            return res.status(500).send('Error fetching data from database.');
        }
        // Send the results as a response
        res.send(results);
        console.log("results returned");
    });
});

// Start the server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
