const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const Blog = require('../Models/blog.model');
const User = require('../Models/user.model');

router.get('/get/all', (req, res) => {
    Blog.find().sort({_id: -1}).skip(req.query.pk).limit(100)
    .then(blogs => res.json(blogs))
    .catch(err => res.status(500).json(err))
})

router.get('/get/:id', (req, res) => {
    Blog.findOne({_id: req.params.id}, (err, blog) => {
        if(err || !blog) res.status(404).json("Blog not found.")
        else res.json(blog)
    })
})

//Create a blog
router.post('/create', jsonParser, (req, res) => {
    const {token, creator, title, blog} = req.body;
    //Validating creator
    User.findOne({email: creator, token}, (err, user) => {
        if(err) res.status(500).json("Something went wrong.")
        else if(!user) res.status(403).json("Permission denied.")
        else{
            const newBlog = new Blog({title, blog, creator: user._id})
            newBlog.save()
            .then(() => res.json({message: "Success", id: newBlog._id}))
            .catch(err => res.status(500).json(err))
        }
    })
})

router.post('/edit', jsonParser, (req, res) => {
    const {token, creator, title, content, id} = req.body;
    User.findOne({email: creator, token}, (err, user) => {
        if(err) res.status(500).json("Something went wrong.")
        else if(!user) res.status(403).json("Permission denied.")
        else{
            Blog.findOne({_id: id, creator: user._id}, (err, blog) => {
                if(err) res.status(500).json("Something went wrong.")
                else if(!blog) res.status(404).json("Blog not found.")
                else{
                    blog.title = title
                    blog.blog = content
                    blog.save()
                    .then(() => res.json({message: "Updated"}))
                    .catch(err => res.status(500).json(err))
                }
            })
        }
    })
})

router.post('/delete', jsonParser, (req, res) => {
    const {token, creator, id} = req.body;
    User.findOne({email: creator, token}, (err, user) => {
        if(err) res.status(500).json("Something went wrong.")
        else if(!user) res.status(403).json("Permission denied.")
        else{
            Blog.findOne({creator: user._id, _id: id}, (err, blog) => {
                if(err) res.status(500).json("Something went wrong.")
                else if(!blog) res.status(404).json("Blog not found.")
                else{
                    blog.delete()
                    .then(() => res.json({"message": "Deleted"}))
                    .catch(err => res.status(500).json(err))
                }
            })
        }
    })
})

router.post('/like', jsonParser, (req, res) => {
    const {blog, liker} = req.body;
    User.findOne({token: liker}, (err, user) => {
        if(err) res.status(500).json("Something went wrong.")
        else if(!user) res.status(403).json("Permission denied.")
        else{
            Blog.findOne({_id: blog}, (err, blog) => {
                if(err) res.status(500).json("Something went wrong.")
                else if(!blog) res.status(404).json("Blog not found.")
                else{
                    blog.like.push(user._id)
                    blog.save()
                    .then(() => res.json("Success"))
                    .catch(err => res.status(500).json(err))
                }
            })
        }
    })
})

router.post('/unlike', jsonParser, (req, res) => {
    const {blog, liker} = req.body;
    User.findOne({token: liker}, (err, user) => {
        if(err) res.status(500).json("Something went wrong.")
        else if(!user) res.status(403).json("Permission denied.")
        else{
            Blog.findOne({_id: blog}, (err, blog) => {
                if(err) res.status(500).json("Something went wrong.")
                else if(!blog) res.status(404).json("Blog not found.")
                else{
                    blog.like.filter((value) => String(user._id) !== String(value))
                    blog.save()
                    .then(() => res.json("Success"))
                    .catch(err => res.status(500).json(err))
                }
            })
        }
    })
})

router.post('/comment', jsonParser, (req, res) => {
    const {blog, commenter, comment} = req.body;
    User.findOne({token: commenter}, (err, user) => {
        if(err) res.status(500).json("Something went wrong.")
        else if(!user) res.status(403).json("Permission denied.")
        else{
            Blog.findOne({_id: blog}, (err, blog) => {
                if(err) res.status(500).json("Something went wrong.")
                else if(!blog) res.status(404).json("Blog not found.")
                else{
                    blog.comment.push({commenter: user._id, comment})
                    blog.save()
                    .then(() => res.json("Success"))
                    .catch(err => res.status(500).json(err))
                }
            })
        }
    })
})

module.exports = router;