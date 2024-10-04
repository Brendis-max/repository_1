
const pool = require('../config/db'); // Importa la configuración de la base de datos desde un archivo externo.

class Productos {
    // Método que obtiene todos los productos de la base de datos.
    static async findAll() {
        const result = await pool.query('SELECT * FROM productos'); // Ejecuta una consulta para obtener todos los registros de la tabla productos.
        return result.rows; // Retorna los resultados obtenidos en forma de array.
    }

    // Método que inserta un nuevo producto en la base de datos.
    static async create(data) {
        // Extrae los valores del objeto 'data' que contiene la información del nuevo producto.
        const { producto, precio, stock_minimo, stock_maximo, existencias, SKU } = data;
        // Ejecuta una consulta para insertar el nuevo producto y retorna el registro recién creado.
        const result = await pool.query(
            'INSERT INTO productos(producto, precio, stock_minimo, stock_maximo, existencias, SKU) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
            [producto, precio, stock_minimo, stock_maximo, existencias, SKU] // Pasa los valores del producto a la consulta.
        );
        return result.rows[0]; // Retorna el primer registro (el producto recién creado).
    }

    // Método que busca un producto por su ID.
    static async findById(id) {
        try {
            const result = await pool.query('SELECT * FROM productos WHERE id = $1 AND deleted_at IS NULL', [id]);
            return result.rows[0];
        } catch (error) {
            console.error('Error al buscar producto por ID:', error.message); // Muestra el mensaje de error original
            throw error; // Lanza el error original para capturarlo en el controlador
        }
    }


    // Método que actualiza un producto por su ID.
    static async update(id, data) {
        const { producto, precio, stock_minimo, stock_maximo, existencias, SKU } = data;
        const result = await pool.query(
            'UPDATE productos SET producto = $1, precio = $2, stock_minimo = $3, stock_maximo = $4, existencias = $5, SKU = $6, updated_at = current_timestamp WHERE id = $7 AND deleted_at IS NULL RETURNING *',
            [producto, precio, stock_minimo, stock_maximo, existencias, SKU, id] // Pasa los valores actualizados y el ID a la consulta
        );
        return result.rows[0]; // Retorna el registro actualizado
    }


    // Método que realiza un borrado lógico de un producto (marca el producto como eliminado).
    static async delete(id) {
        // Ejecuta una consulta para actualizar la columna delete_at a la fecha actual, eliminando el producto.
        const result = await pool.query('UPDATE productos SET deleted_at = current_timestamp WHERE id = $1 AND deleted_at IS NULL RETURNING *', [id]);
        return result.rows[0]; // Retorna el registro del producto eliminado.
    }

    // Método que busca coincidencias en todas las columnas de la tabla productos.
    static async searchAllColumns(searchString) {
        // Ejecuta una consulta que busca coincidencias en todas las columnas de la tabla productos.
        const result = await pool.query(
            `SELECT * FROM productos
             WHERE 
                 producto ILIKE $1 OR
                 CAST(precio AS TEXT) ILIKE $1 OR
                 CAST(stock_minimo AS TEXT) ILIKE $1 OR
                 CAST(stock_maximo AS TEXT) ILIKE $1 OR
                 CAST(existencias AS TEXT) ILIKE $1 OR
                 sku ILIKE $1 OR
                 CAST(created_at AS TEXT) ILIKE $1 OR
                 CAST(updated_at AS TEXT) ILIKE $1 OR
                 CAST(deleted_at AS TEXT) ILIKE $1`,
            [`%${searchString}%`] // El parámetro de búsqueda se aplica a todas las columnas relevantes.
        );
        return result.rows; // Retorna todos los productos que coinciden con la búsqueda.
    }

    // Método que obtiene productos específicos para ser exportados a un archivo Excel.
    static async getAllProductsExcel() {
        // Ejecuta una consulta para obtener solo las columnas necesarias para exportar a Excel.
        const query = `
            SELECT producto, precio, stock_minimo, stock_maximo, existencias, sku
            FROM productos;
        `;
        const result = await pool.query(query); // Ejecuta la consulta.
        return result.rows; // Retorna los productos con las columnas especificadas.
    };
}

module.exports = Productos; // Exporta la clase Productos para que pueda ser utilizada en otros módulos.

