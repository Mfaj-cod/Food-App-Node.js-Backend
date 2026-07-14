const categoryModel = require('../models/categoryModel')

const createCategoryController = async (req, res) => {
    try {
        // get body
        const { title, image } = req.body
        // validation
        if (!title) {
            return res.status(400).send({
                success:false,
                message:'Title is required!'
            });
        }
        // creating new category
        const newcategory = await categoryModel.create({
            title: title,
            image: image || 'url'
        });

        if (!newcategory) {
            return res.status(503).send({
                success:false,
                message:'Could not create category!'
            });
        }

        return res.status(201).send({
            success:true,
            message:'Successfully created category!',
            newcategory
        });

    } catch(error) {
        return res.status(500).send({
            success:false,
            message:'Error in create API',
            error
        });
    }
};

// get all categories
const getAllCategoryController = async (req, res) => {
    try {
        // getting all category
        const categories = await categoryModel.find({});
        if (!categories) {
            return res.status(503).send({
                success:false,
                message:'Could not get categories!'
            });
        }

        return res.status(201).send({
            success:true,
            message:'Successfully created category!',
            total_category: categories.length,
            categories
        });

    } catch(error) {
        return res.status(500).send({
            success:false,
            message:'Error in create API',
            error
        });
    }
};


// delete category by id
const deleteCatController = async (req, res) => {
    try {
        // get body
        const cat_id = req.params.id;
        if (!cat_id) {
            return res.status(400).send({
                success:false,
                message:"Please provide category id!"
            });
        }

        // delete by id
        const cat = await categoryModel.findByIdAndDelete({ _id: cat_id });
        if (!cat) {
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
            message:'Error in delete category API',
            error
        });
    }
};

// get by id 
const getByIdController = async (req, res) => {
    try {
        // get id from params
        const id = req.params.id;

        const cat = await categoryModel.findById({ _id: id });
        if (!cat) {
            return res.status(503).send({
                success:false,
                message:'Could not find!'
            });
        }

        return res.status(200).send({
            success:true,
            message:'Successfully found category!',
            cat,
        });

    } catch(error) {
        return res.status(500).send({
            success:false,
            message:'Error in get by id category API',
            error
        });
    }
};

// exports
module.exports = {
    createCategoryController,
    getAllCategoryController,
    deleteCatController,
    getByIdController
}