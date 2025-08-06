const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

// Configura tu conexión a PostgreSQL
const pool = new Pool({
    user: 'root',
    host: '168.119.183.3',
    database: 'pedritooo',
    password: 's7cq453mt2jnicTaQXKT',
    port: 5432,
});





app.get("/users", async (req, res) => {
    try {
        let result = await pool.query("select * from students");
        return res.json(result);
    } catch (error) {
        res.status().json({ error: 'error' })
    }
});

app.post("/users", async (req, res) => {
    const {first_name, last_name, email, document_number, gender, address, phone} = req.body
    try {
        let result = await pool.query('INSERT INTO students (first_name, last_name, email, document_number, gender, address, phone) VALUES($1, $2, $3, $4, $5, $6, $7)',
            [first_name, last_name, email, document_number, gender, address, phone]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});