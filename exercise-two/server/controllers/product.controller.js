const db = require('../config/db');

/**
 * Add a new product from a client's request.
 * 
 * @param req the request.
 * @param res the callback response.
 */
exports.add = (req, res) => {
    console.log(req.body)
    if (!req.body.name || !req.body.stock) {
        res.status(400).send({ message: "Product fields can't be empty." });
    } else {
        const product = ({
            id: null,
            name: req.body.name,
            stock: req.body.stock
        });
        db.connection.query('INSERT INTO products SET ?', product, (err, rows, fields) => {
            if (err) {
                if(err.code = 'ER_DUP_ENTRY') {
                    res.status(400).send({ message: "Product already exists." });
                }
                res.status(500).send({ message: "Product couldn't be saved." });
            }
            res.send(JSON.stringify(rows));
        });
    }
};


/**
 * Get all the products.
 * 
 * @param req the request.
 * @param res the callback response.
 */
exports.getAll = (req, res) => {
    db.connection.query('SELECT * FROM products;', (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Can't get the products." });
        }
        res.status(200).send(rows);
    })
};

/**
 * Get all the products with stock.
 * 
 * @param req the request.
 * @param res the callback response.
 */
exports.getWithStock = (req, res) => {
    db.connection.query('SELECT * FROM products WHERE stock > 0;', (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Can't get the products." });
        }
        res.status(200).send(rows);
    })
};


/**
 * Get all the products without stock.
 * 
 * @param req the request.
 * @param res the callback response.
 */
exports.getWithoutStock = (req, res) => {
    db.connection.query('SELECT * FROM products WHERE stock = 0;', (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Can't get the products." });
        }
        res.status(200).send(rows);
    })
};


/**
 * Get a product by name.
 * 
 * @param req the request.
 * @param res the callback response.
 */
exports.getByName = (req, res) => {
    db.connection.query('SELECT * FROM products WHERE name = ?', [req.params.name], (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Can't get the products." });
        }
        res.status(200).send(rows);
    })
};

/**
 * Modify the stock.
 * 
 * @param req the request.
 * @param res the callback response.
 */
exports.updateStock = function (req, res) {
    db.connection.query('UPDATE products SET stock = ? WHERE name = ?', [req.body.stock, req.params.name], (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Stock couldn't be modified." });
        }
        res.send(JSON.stringify(rows));
    });
};


/**
 * Delete a product
 * 
 * @param req the request.
 * @param res the callback response.
 */
exports.delete = function (req, res) {
    db.connection.query('DELETE FROM products WHERE name = ?', [req.params.name], (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Product couldn't be deleted." });
        }
        res.send(JSON.stringify(rows));
    });
};