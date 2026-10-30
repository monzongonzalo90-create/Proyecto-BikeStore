-- 1. Creación de la Base de Datos
CREATE DATABASE IF NOT EXISTS tienda CHARACTER SET utf8mb4;
USE tienda;

-- 2. Tabla de Roles
CREATE TABLE IF NOT EXISTS roles (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre_rol VARCHAR(50) NOT NULL UNIQUE
);

-- 3. Tabla de Usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    rol_id INT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rol_id) REFERENCES roles(id_rol) ON DELETE SET NULL
);

-- 4. Tabla de Categorías
CREATE TABLE IF NOT EXISTS categorias (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre_categoria VARCHAR(100) NOT NULL UNIQUE
);

-- 5. Tabla de Artículos / Productos
CREATE TABLE IF NOT EXISTS articulos (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio_compra DECIMAL(10,2) NOT NULL,
    stock_minimo INT DEFAULT 0,
    stock_maximo INT DEFAULT 0,
    imagen VARCHAR(255),
    categoria_id INT,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id_categoria) ON DELETE SET NULL
);

-- 6. Datos Iniciales de Prueba (Seeds)
INSERT INTO roles (nombre_rol) VALUES ('Administrador'), ('Cliente');
INSERT INTO categorias (nombre_categoria) VALUES ('Bicicletas de Ruta'), ('Bicicletas MTB'), ('Accesorios');
