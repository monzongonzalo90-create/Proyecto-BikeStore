const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root', // <--- Escribe aquí tu clave (o déjalo en '' si no usa contraseña)
    database: 'tienda'                 // <--- Asegúrate de que sea el nombre exacto de tu BD
});

module.exports = pool;

