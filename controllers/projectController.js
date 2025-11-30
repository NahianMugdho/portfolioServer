const Project = require('../models/projectModel');

const getAllProjects = (req, res) => {
  Project.getAll((err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
};

const getProject = (req, res) => {
  const id = req.params.id;
  Project.getById(id, (err, project) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  });
};

const createProject = (req, res) => {
  Project.create(req.body, (err, id) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(201).json({ message: 'Project created', id });
  });
};

const updateProject = (req, res) => {
  const id = req.params.id;
  Project.update(id, req.body, (err, affectedRows) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!affectedRows) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project updated' });
  });
};

const deleteProject = (req, res) => {
  const id = req.params.id;
  Project.delete(id, (err, affectedRows) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!affectedRows) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted' });
  });
};

module.exports = { getAllProjects, getProject, createProject, updateProject, deleteProject };
