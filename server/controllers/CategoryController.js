const Category = require("../models/Category");

class CategoryController{
    async create(req, res){
        console.log(req.body)
        try {
            const post = await Category.create(req.body);
            res.status(201).json(post);
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
    }

    async update(req, res){
        try {
            await Category.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json({
                message: 'Category updated successfully.'
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async get(req, res){
        try {
            const posts = await Category.find();
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async delete(req, res){
        try {
            await Category.findByIdAndDelete(req.params.id);
            res.status(201).json({
                message: 'Category deleted successfully.'
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = CategoryController;