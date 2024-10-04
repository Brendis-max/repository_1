const Productos = require('../models/ProductosModel');
const {response} = require('express');    // Importa el modelo de productos desde el archivo '../models/ProductosModel'
const ExcelJS = require('exceljs'); // Importa la biblioteca ExcelJS, que permite la creación y manipulación de archivos de Excel


class ProductosController{

    static async getAllProductos(req, res) // Método para obtener todos los productos
    {
       try{
            const productos = await Productos.findAll(); // Busca todos los productos en la base de datos
            res.json(productos);// Devuelve la lista de productos en formato JSON
       } catch (error)
       {
        res.status(500) // En caso de error, devuelve un código 500 y un mensaje de error
        .json({error: error.message})
       }
    }
    
    static async createProductos(req, res) // Método para crear un nuevo producto
    {
        try
        {// Crea un producto en la base de datos con los datos proporcionados en el cuerpo de la solicitud
            const productos = await Productos.create(req.body);
            res.status(201).json(productos);// Devuelve el producto creado con un estado HTTP 201 (creado)

        }catch(error)
        {
            res.status(500).json({error: error.message}); // En caso de error, devuelve un código 500 y un mensaje de error
        }
      
    }

    static async getProductosById(req, res) {
        try {
            const producto = await Productos.findById(req.params.id); // Busca el producto por ID
            if (!producto) {
                return res.status(404).json({ message: "Producto no encontrado" });
            }
            return res.json(producto); // Retorna el producto encontrado
        } catch (error) {
            console.error('Error al buscar producto por ID:', error.message); // Muestra el error en la consola
            return res.status(500).json({ error: error.message }); // Responde con el error original
        }
    }
    
    static async updateProductos(req, res) {
        const id = req.params.id; // Obtiene el ID desde los parámetros de la URL
        const data = req.body; // Obtiene los datos desde el cuerpo de la solicitud

        try {
            const productoActualizado = await Productos.update(id, data); // Llama al método de actualización del modelo
            if (!productoActualizado) {
                return res.status(404).json({ message: "Producto no encontrado" }); // Si no se encuentra el producto, devuelve 404
            }
            return res.json(productoActualizado); // Retorna el producto actualizado
        } catch (error) {
            console.error('Error al actualizar producto:', error.message);
            return res.status(500).json({ error: error.message }); // Devuelve el error al cliente
        }
    }

   
        static async deleteProductos(req, res) {
            try {
                const productoEliminado = await Productos.delete(req.params.id); // Asegúrate de que 'Productos' esté correctamente inicializado
                if (!productoEliminado) {
                    return res.status(404).json({ message: "Producto no encontrado o ya eliminado" });
                }
                return res.json({ message: "Producto eliminado correctamente" });
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
        }

    static async searchAllColumns(req, res) { // Método para buscar productos en todas las columnas de la base de datos
        try {
            const searchString = await Productos.searchAllColumns(req.params.id); // Obtiene la cadena de búsqueda de la query (parámetro de consulta)
            if (!searchString) {
                return response.status(400).json({ mi_mensaje_error: "Query parameter 'q' is required" }); // Si no se proporciona un término de búsqueda, devuelve un error 400
            }
              // Busca productos en todas las columnas de la base de datos utilizando la cadena de búsqueda
            return res.json(searchString); // Devuelve los productos encontrados
        } catch (error) {
            res.status(500).json({ mi_mensaje_error: error.message }); // En caso de error, devuelve un código 500 y un mensaje de error
        }
    }
    
    static async downloadProductsExcel (req, res){// Método para generar y descargar un archivo Excel con todos los productos
        try {
            const products = await Productos.findAll();  // Obtiene todos los productos de la base de datos
    
            // Aqui se genera un archivo y una hoja de calculo
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Productos');
    
            // Define las columnas del excel
            worksheet.columns = [
                { header: 'Nombre', key: 'producto', width: 30 },
                { header: 'Precio', key: 'precio', width: 15 },
                { header: 'Stock Min', key: 'stock_minimo', width: 15 },
                { header: 'Stock Max', key: 'stock_maximo', width: 15 },
                { header: 'Existencia', key: 'existencias', width: 15 },
                { header: 'SKU', key: 'sku', width: 15 },
               
            ];
    
            // cada dato de la db es un archivo
            products.forEach(product => {
                worksheet.addRow(product);
            });
    
            // Hace que el navegador lo descargue como xlsx
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=productos.xlsx');
    
            // lanza la request
            await workbook.xlsx.write(res);
            res.end();
        } catch (error) {
            console.error('Error generating Excel file:', error);
            res.status(500).send('Error generating Excel file');
        }
    };

}


module.exports = ProductosController;
// Exporta la clase ProductosController para que pueda ser utilizada en otras partes de la aplicación