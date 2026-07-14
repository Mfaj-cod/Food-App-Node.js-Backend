const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { newRestaurantController, getAllController, getOneController, deleteRestaurantController } = require('../controllers/restaurantcontrollers')

const router = express.Router();

// routes

// POST create new restaurant
router.post('/newRestaurant', authMiddleware, newRestaurantController);

// GET all restaurants
router.get('/getAllRestaurants', getAllController);

// GET one restaurant by id
router.get('/get/:id', getOneController);

// DELETE restaurant by id
router.delete('/delete/:id', deleteRestaurantController)

// export
module.exports = router;