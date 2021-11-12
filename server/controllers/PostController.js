const Post = require("../models/Post");

class PostController{
    async createPost(req, res){
        try {
            const post = await Post.create(req.body);
            res.status(201).json(post);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async updatePost(req, res){
        try {
            await Post.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json({
                message: 'Post updated successfully.'
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async deletePost(req, res){
        try {
            await Post.findByIdAndDelete(req.params.id);
            res.status(201).json({
                message: 'Post deleted successfully.'
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async viewPost(req, res){
        try {
            const post = await Post.findById(req.params.id);
            res.status(200).json(post);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    async getAllPost(req, res){
        try {
            const posts = await Post.find();
            res.status(200).json(posts);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = PostController;