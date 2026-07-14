const restaurantModel = require("../models/restaurantModel");

const newRestaurantController = async (req, res) => {
    try {
        // get body
        const { title, image, foods, time, pickup, delivery, isOpen, logoURL, rating, ratingCount, code, coords } = req.body
        // validation
        if (!title) {
            return res.status(400).send({
                success:false,
                message:'title is required!'
            });
        } 

        const newRestaurant = await restaurantModel.create({ title, image, foods, time, pickup, delivery, isOpen, logoURL, rating, ratingCount, code, coords });
        if (!newRestaurant) {
            return res.status(500).send({
                success:false,
                message:'Restaurant not created, try again after sometime!'
            });
        }
        
        return res.status(201).send({
            success:true,
            message:'Restaurant successfully created!'
        });

    } catch(error) {
        return res.status(500).send({
            success:false,
            message:"Error creating new restaurant!"
        })
    }
};

// get all restaurants
const getAllController = async (req, res) => {
    try {
        // get body
        const AllRestaurants = await restaurantModel.find();
        if (!AllRestaurants) {
            return res.status(204).send({
                success:false,
                message:'No records found!'
            });
        }

        return res.status(200).send({
            success:true,
            message:'Successfully retrieved!',
            AllRestaurants
        });

    } catch(error) {
        return res.status(500).send({
            success:false,
            message:'Error in get all restaurants API',
            error
        });
    }
};

// get single restaurant by id
const getOneController = async (req, res) => {
    try {
        // get body
        const restaurant_id = req.params.id;
        if (!restaurant_id) {
            return res.status(400).send({
                success:false,
                message:"Please provide restaurant id!"
            });
        }

        // retrieve by id
        const restaurant = await restaurantModel.findById(restaurant_id);
        if (!restaurant) {
            return res.status(204).send({
                success:false,
                message:'Not found1'
            });
        }

        return res.status(200).send({
            success:true,
            message:'Successfully retrieved!',
            restaurant
        });

    } catch(error) {
        return res.status(500).send({
            success:false,
            message:'Error in get one restaurant API',
            error
        });
    }
};

// delete restaurant by id

// get single restaurant by id
const deleteRestaurantController = async (req, res) => {
    try {
        // get body
        const restaurant_id = req.params.id;
        if (!restaurant_id) {
            return res.status(400).send({
                success:false,
                message:"Please provide restaurant id!"
            });
        }

        // delete by id
        const restaurant = await restaurantModel.findByIdAndDelete({ _id: restaurant_id });
        if (!restaurant) {
            return res.status(204).send({
                success:false,
                message:'Not found!'
            });
        }

        return res.status(200).send({
            success:true,
            message:'Successfully Deleted!'
        });

    } catch(error) {
        return res.status(500).send({
            success:false,
            message:'Error in delete restaurant API',
            error
        });
    }
};


module.exports = {
    newRestaurantController,
    getAllController,
    getOneController,
    deleteRestaurantController
};
