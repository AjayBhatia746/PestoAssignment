// controllers/productController.js

const productService = require('../services/productService');
const {productSchema,getproductByIdSchema,updateProductSchema} = require('../validation/productValidation');

const validateProduct = (productData,productSchema) => {
    return productSchema.validate(productData, { abortEarly: false });
};

const getAllProducts = (req, res) => {
    try {
        const [status, response] = productService.getAllProducts();
        res.status(status).send(response);
    } catch (e) {
        return res.status(400).send({ status: false, message: e.message });
    }
};

const getProductById = (req, res) => {
    try {
        const { error } = validateProduct(req.params,getproductByIdSchema);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const [status, response] = productService.getProductById(req.params.id);
        res.status(status).send(response);
    } catch (e) {
        return res.status(400).send({ status: false, message: e.message });
    }
};

const createProduct = (req, res) => {
    try {
        const { error } = validateProduct(req.body,productSchema);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const { name, price, id, sellerId } = req.body;
        const [status, response] = productService.createProduct(id, name, price, sellerId);
        res.status(status).send(response);
    } catch (e) {
        return res.status(400).send({ status: false, message: e.message });
    }
};

const updateProduct = (req, res) => {
    try {
        const { error } = validateProduct(req.body,updateProductSchema);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const productId = req.params.id;
        const { name, price,sellerId,currency,version } = req.body;
        const [status, response] = productService.updateProduct(productId, name, price,currency,version,sellerId);
        res.status(status).send(response);
    } catch (e) {
        return res.status(400).send({ status: false, message: e.message });
    }
};

const deleteProduct = (req, res) => {
    try {
        const { error } = validateProduct(req.params,getproductByIdSchema);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const productId = req.params.id;
        const [status, response] = productService.deleteProduct(productId);
        res.status(status).send(response);
    } catch (e) {
        return res.status(400).send({ status: false, message: e.message });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};  