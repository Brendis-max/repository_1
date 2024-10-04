const express = require('express');
const ProductosRoutes = require('./routes/ProductosRoutes');
const Productos = require('./models/ProductosModel');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api',ProductosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
    {
        console.log(`Server is running on port ${PORT}`);
    }
)