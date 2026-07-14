const express = require('express');

const authMiddleware = require('../middleware/authMiddleware');
const { 
    createCategoryController,
    getAllCategoryController,
    deleteCatController,
    getByIdController
} = require('../controllers/categoryControllers');

const router = express.Router();

// routes

// POST create new category
router.post('/create', authMiddleware, createCategoryController);

// GET all cats
router.get('/getAll', authMiddleware, getAllCategoryController);

// GET by id
router.get('/get/:id', authMiddleware, getByIdController);

// DELETE cat by id
router.delete('/delete/:id', authMiddleware, deleteCatController);

// exports
module.exports = router;