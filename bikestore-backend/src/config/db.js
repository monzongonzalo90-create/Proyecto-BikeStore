/**
 * @file db.js
 * @description Configuración del pool de conexiones a la base de datos MySQL.
 */

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'tienda'
});

// Agregamos esta línea para cubrir el nombre 'pool' que reclaman los controladores
export const pool = db;

// Exportación por defecto
export default db;