const Blog = require('../models/blogModel');

const getAllBlogs = (req, res) => Blog.getAll((err, results) => err ? res.status(500).json({ message: err.message }) : res.json(results));
const getBlog = (req, res) => Blog.getById(req.params.id, (err, blog) => !blog ? res.status(404).json({ message: 'Not found' }) : res.json(blog));
const createBlog = (req, res) => Blog.create(req.body, (err, id) => err ? res.status(500).json({ message: err.message }) : res.status(201).json({ id }));
const updateBlog = (req, res) => Blog.update(req.params.id, req.body, (err, affectedRows) => !affectedRows ? res.status(404).json({ message: 'Not found' }) : res.json({ message: 'Updated' }));
const deleteBlog = (req, res) => Blog.delete(req.params.id, (err, affectedRows) => !affectedRows ? res.status(404).json({ message: 'Not found' }) : res.json({ message: 'Deleted' }));

module.exports = { getAllBlogs, getBlog, createBlog, updateBlog, deleteBlog };
