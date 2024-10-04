const express = require('express'); // Importa el módulo express para crear rutas.
const ProductosController = require('../controllers/ProductosController'); // Importa el controlador de productos que manejará las funciones de las rutas.
const {validateProducts} = require('../middlewares/validation'); // Importa el middleware que valida los datos de los productos.
const {authenticate} = require('../middlewares/auth'); // Importa el middleware que autentica al usuario.
const router = express.Router(); // Crea un nuevo enrutador de express para gestionar las rutas de productos.

// Ruta para obtener todos los productos.
router.get('/productos', ProductosController.getAllProductos); 
// Ruta para obtener un producto por su ID.
router.get('/productos/:id', ProductosController.getProductosById); 
// Ruta para eliminar un producto por su ID
router.delete('/productos/:id', ProductosController.deleteProductos);
// Ruta para crear un nuevo producto.
router.post('/productos', ProductosController.createProductos); 
// Ruta para buscar productos en todas las columnas por un valor dado.
router.get('/productos/search/:id', ProductosController.searchAllColumns); 
// Ruta para descargar todos los productos en formato Excel.
router.get('/excel', ProductosController.downloadProductsExcel); 
// Ruta para actualizar un producto por su ID
router.put('/productos/:id', ProductosController.updateProductos);

module.exports = router; // Exporta el enrutador para ser utilizado en el servidor principal.

