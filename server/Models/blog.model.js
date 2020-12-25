const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 300,
    },
    blog: {
        type: String,
        required: true,
    },
    creator:{
        type: Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
})

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;