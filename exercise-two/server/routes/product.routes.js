const productController = require('../controllers/product.controller');

module.exports = (app) => {
	// Default path.
	app.get('/', (req, res) => {
		res.json({"message": "Welcome"})
	});

	// Add a new product.
	app.post('/products', productController.add);

	// Get all products.
	app.get('/products', productController.getAll);

	// Get all products with stock.
	app.get('/products/stock', productController.getWithStock);

	// Get all products without stock.
	app.get('/products/nostock', productController.getWithoutStock);

	// Get a product by name.
	app.get('/products/:name', productController.getByName);

	// Update an existing product.
	app.put('/products/:id', productController.updateStock);

	// Delete an existing product.
	app.delete('/products/:id', productController.delete);
};