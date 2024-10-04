const authenticate = (req, res, next) => {
    const { authorization } = req.headers; // Extrae el header de autorización.

    // Comprueba si el token es correcto.
    if (authorization && authorization === 'Bearer mi_secreto') {
        next(); // Si el token es válido, continúa con la siguiente función.
    } else {
        res.status(401).json({ message: 'Unauthorized' }); // Si el token es inválido, responde con un error 401 (no autorizado).
    }
};

module.exports = { authenticate }; // Exporta el middleware de autenticación para ser utilizado en las rutas.
