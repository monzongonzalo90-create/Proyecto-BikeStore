CREATE DATABASE IF NOT EXISTS tienda CHARACTER SET utf8mb4;
USE tienda;

CREATE TABLE IF NO EXISTS articulos (
    ID INT AUTO_INCREMENT PRIMARY KEY;
    nombre VARCHAR (100) NOT NULL,
    precio_compra DECIMAL(10,2=),
    stock_minimo INT DEFAULT 0,
    stock_maximo INT DEFAULT 0,
    imagen VARCHAR (255) -- solo la ruta por ejemplo / uploads /0100000. p.ng
     
);