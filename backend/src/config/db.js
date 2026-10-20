const mysql = require('mysql2/promise');

// Configuración de la conexión a la base de datos 'tienda'
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // Ingrese la contraseña de MySQL local si la tiene
    database: 'tienda',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
