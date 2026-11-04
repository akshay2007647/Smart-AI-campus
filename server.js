const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const Student = require('./oop/student');
const app = express();

app.use(cors());
app.use(express.json());

// MySQL database connection
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD || '',
    database: 'smart_ai_campus'
});
db.getConnection()
  .then(connection => {
    console.log("MySQL Connected Successfully!");
    connection.release();
  })
  .catch(error => {
    console.log("MySQL Error:", error.message);
  });
// Home page
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Get all students
app.get('/api/students', async (req, res) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM students'
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Student Registration
app.post('/api/register', async (req, res) => {
    try {
        const { full_name, student_id, email, password } = req.body;

        if (!full_name || !student_id || !email || !password) {
            return res.status(400).json({
                message: 'Please fill all fields'
            });
        }

        const [existing] = await db.query(
            'SELECT id FROM users WHERE email = ? OR student_id = ?',
            [email, student_id]
        );

        if (existing.length > 0) {
            return res.status(409).json({
                message: 'Email or Student ID already registered'
            });
        }

        const password_hash = await bcrypt.hash(password, 10);

        await db.query(
            `INSERT INTO users
            (full_name, student_id, email, password_hash)
            VALUES (?, ?, ?, ?)`,
            [full_name, student_id, email, password_hash]
        );

        res.status(201).json({
            message: 'Registration successful!'
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});
// Student Login API
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const [users] = await db.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({
                message: 'Student not found'
            });
        }

        const student = new Student(
    users[0].full_name,
    users[0].email,
    users[0].password_hash,
    users[0].student_id
);

const validPassword = await student.verifyPassword(password);

if (!validPassword) {
    return res.status(401).json({
        message: 'Incorrect password'
    });
}

res.json({
    message: 'Login successful!',
    student: {
        id: users[0].id,
        name: student.name,
        student_id: student.studentId,
        email: student.email
    }
});

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Start server
// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});