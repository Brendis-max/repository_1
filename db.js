// Importa el módulo `Pool` desde el paquete `pg` (node-postgres) que permite manejar conexiones con bases de datos PostgreSQL
const { Pool } = require('pg');

// Carga las variables de entorno definidas en un archivo `.env` usando `dotenv`.
// Esto permite acceder a las configuraciones de la base de datos almacenadas en las variables de entorno.
require('dotenv').config();

// Crea una nueva instancia de `Pool`, que es un conjunto de conexiones reutilizables para la base de datos PostgreSQL.
const pool = new Pool({
    host: process.env.DB_HOST,        // El nombre del host o dirección IP donde está alojada la base de datos
    user: process.env.DB_USER,        // Nombre de usuario para la autenticación en la base de datos
    password: process.env.DB_PASSWORD, // Contraseña del usuario para acceder a la base de datos
    database: process.env.DB_NAME,    // Nombre de la base de datos a la que se quiere conectar
});

// Exporta el `pool` para que pueda ser utilizado en otros archivos para realizar consultas a la base de datos.
module.exports = pool;
