const productController = require('../controllers/product.controller');

module.exports = (app) => {
    // Default path.
    app.get('/', (req, res) => {
        res.json({ "message": "Welcome" });
    });
    // Add a new product.
    app.post('/products', productController.add);

    // Get all products.
    app.get('/allproducts', productController.getAll);

    // Get all products with stock.
    app.get('/stock', productController.getWithStock);

    // Get all products without stock.
    app.get('/nostock', productController.getWithoutStock);

    // Get a product by name.
    app.get('/products/:name', productController.getByName);

    // Update an existing product.
    app.put('/products/:name', productController.updateStock);

    // Delete an existing product.
    app.delete('/products/:name', productController.delete);
}