// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../../middlewares/authMiddleware');


router.post('/', authMiddleware.verifyAdmin, categoryController.createCategory);
router.get('/', categoryController.getCategories);
router.put('/:id', authMiddleware.verifyAdmin, categoryController.updateCategory);
router.delete('/:id', authMiddleware.verifyAdmin, categoryController.deleteCategory);

module.exports = router;
