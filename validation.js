const { validationResult, body } = require("express-validator"); // Importa funciones de express-validator para la validación de datos.

// Array de validaciones para el producto.
const validateProducts = [
    // Valida que el campo 'producto' no esté vacío.
    body('producto').notEmpty().withMessage('Producto is required'),
    // Valida que el campo 'precio' no esté vacío.
    body('precio').notEmpty().withMessage('Precio is required'),
    // Valida que el campo 'stock_minimo' no esté vacío.
    body('stock_minimo').notEmpty().withMessage('Stock_minimo is required'),
    // Valida que el campo 'stock_maximo' no esté vacío.
    body('stock_maximo').notEmpty().withMessage('Stock_maximo is required'),
    // Valida que el campo 'existencias' no esté vacío.
    body('existencias').notEmpty().withMessage('Existencias is required'),
    // Valida que el campo 'SKU' no esté vacío.
    body('SKU').notEmpty().withMessage('SKU is required'),

    // Función middleware que maneja los errores de validación.
    (req, res, next) => {
        const error = validationResult(req); // Comprueba si hay errores de validación.
        if (!error.isEmpty()) {
            // Si hay errores, responde con código 400 y un JSON con los errores.
            return res.status(400).json({ error: error.array() });
        }
        next(); // Si no hay errores, pasa al siguiente middleware.
    }
];

module.exports = { validateProducts }; // Exporta el middleware de validación para que pueda ser usado en las rutas.
