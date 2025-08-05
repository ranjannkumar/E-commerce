const productsData = require('../test-data/products.json');

// --- GET /products ---
// Returns a list of all products, with optional category filtering
exports.getAllProducts = (req, res) => {
    const category = req.query.category; 

    let filteredProducts = productsData;

    if (category) {
        // Filter products by category 
        filteredProducts = productsData.filter(
            product => product.category.toLowerCase() === category.toLowerCase()
        );
    }

    res.status(200).json(filteredProducts);
};

// --- GET /products/:id ---
// Returns a single product by ID
exports.getProductById = (req, res) => {
    const productId = req.params.id; 

    const product = productsData.find(p => p.id === productId);

    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

// --- POST /products ---
// Accepts a new product and adds it to the collection (with data validation)
exports.createProduct = (req, res) => {
    const newProduct = req.body; 

    if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.category) {
        return res.status(400).json({ message: 'Missing required product fields (name, description, price, category)' });
    }

    // Validate data types
    if (typeof newProduct.name !== 'string' || newProduct.name.trim() === '') {
        return res.status(400).json({ message: 'Product name must be a non-empty string.' });
    }
    if (typeof newProduct.description !== 'string' || newProduct.description.trim() === '') {
        return res.status(400).json({ message: 'Product description must be a non-empty string.' });
    }
    if (typeof newProduct.price !== 'number' || newProduct.price <= 0) {
        return res.status(400).json({ message: 'Product price must be a positive number.' });
    }
    if (typeof newProduct.category !== 'string' || newProduct.category.trim() === '') {
        return res.status(400).json({ message: 'Product category must be a non-empty string.' });
    }

    const generatedId = `prod_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    newProduct.id = generatedId;

    productsData.push(newProduct); 

    res.status(201).json(newProduct);
};