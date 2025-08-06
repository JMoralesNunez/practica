# paso numero 1
Identificacion de las herramientas a trabajar de acuerdo al requerimiento.
## 1. Importar de Dependencias

Esto aplica si tu proyecto esta conectado a una base de datos en PG

```js
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
```

Ahora si el proyectico maneja MYSQL hacemos un pequeño cambio en la conexion
```js
const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: 'tu-host',      
  user: 'tu-usuario',   
  password: 'tu-clave', 
  database: 'mi_base', 
  port: 3306,
});
```
Exponer el servidor en un puerto difinido.
```js
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
```



## Procedemos a jugar con la estructura del endpoint
GET
```js
app.get("/", async (req, res) => {
   try {
    let result = await pool.query("");
    return res.json(result);
   } catch (error) {
      res.status().json({error : 'error'})
   }
});
```
POST
```js
app.post('/', async (req, res) => {
  const { nombre } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO usuarios (nombre) VALUES ($1)',
      [nombre]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
});
```

PUT
```js
app.put('//:id', async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const result = await pool.query(
      'UPDATE usuarios SET nombre = $1 WHERE id = $2',
      [nombre, id]
    );
    /*Que pasa si el id enviado no existe por favor aqui controlar esa posibilidad*/
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
});
```

DELETE
```js
app.delete('//:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ mensaje: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
});
```
