const db = require('../services/db');

/**
 * Add a new product from a client's request.
 *
 * @param req the request.
 * @param res the response object.
 */
exports.add = (req, res) => {
	console.log(req.body);
	if (!req.body.name) {
		res.status(400).send({message: "Product fields can't be empty."});
	} else {
		let product = ({
			id: null,
			name: req.body.name,
			stock: req.body.stock
		});
		db.connect((err, connection) => {
			connection.query('INSERT INTO products SET ?', product, (err, rows, fields) => {
				connection.release();
				if (err) {
					if (err.code === 'ER_DUP_ENTRY') {
						res.status(400).send({message: "Product already exists."});
					} else {
						res.status(500).send({message: "Product couldn't be saved."});
					}
				}
				res.send(JSON.stringify(rows));
			});
		});
	}
};

/**
 * Get all the products.
 *
 * @param req the request.
 * @param res the response object.
 */
exports.getAll = (req, res) => {
	db.connect((err, connection) => {
		connection.query('SELECT * FROM products;', (err, rows, fields) => {
			connection.release();
			if (err) {
				console.log(err);
				res.status(500).send({message: "Can't get the products."});
			}
			res.status(200).send(rows);
		});
	});
};

/**
 * Get all the products with stock.
 *
 * @param req the request.
 * @param res the response object.
 */
exports.getWithStock = (req, res) => {
	db.connect((err, connection) => {
		connection.query('SELECT * FROM products WHERE stock > 0;', (err, rows, fields) => {
			connection.release();
			if (err) {
				console.log(err);
				res.status(500).send({message: "Can't get the products."});
			}
			res.status(200).send(rows);
		});
	});
};

/**
 * Get all the products without stock.
 *
 * @param req the request.
 * @param res the response object.
 */
exports.getWithoutStock = (req, res) => {
	db.connect((err, connection) => {
		connection.query('SELECT * FROM products WHERE stock = 0;', (err, rows, fields) => {
			connection.release();
			if (err) {
				console.log(err);
				res.status(500).send({message: "Can't get the products."});
			}
			res.status(200).send(rows);
		});
	});
};

/**
 * Get a product by name.
 *
 * @param req the request.
 * @param res the response object.
 */
exports.getByName = (req, res) => {
	db.connect((err, connection) => {
		connection.query('SELECT * FROM products WHERE name LIKE ?', ['%' + req.params.name + '%'], (err, rows, fields) => {
			connection.release();
			if (err) {
				console.log(err);
				res.status(500).send({message: "Can't get the products."});
			}
			res.status(200).send(rows);
		});
	});
};

/**
 * Modify the stock.
 *
 * @param req the request.
 * @param res the response object.
 */
exports.updateStock = (req, res) => {
	db.connect((err, connection) => {
		connection.query('UPDATE products SET stock = ? WHERE id = ?', [req.body.stock, req.params.id], (err, rows, fields) => {
			connection.release();
			if (err) {
				console.log(err);
				res.status(500).send({message: "Stock couldn't be modified."});
			}
			res.send(JSON.stringify(rows));
		});
	});
};

/**
 * Delete a product
 *
 * @param req the request.
 * @param res the response object.
 */
exports.delete = (req, res) => {
	db.connect((err, connection) => {
		connection.query('DELETE FROM products WHERE id = ?', [req.params.id], (err, rows, fields) => {
			connection.release();
			if (err) {
				console.log(err);
				res.status(500).send({message: "Product couldn't be deleted."});
			}
			res.send(JSON.stringify(rows));
		});
	});
};