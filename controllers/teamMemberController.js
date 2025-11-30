const TeamMember = require('../models/teamMemberModel');

const getAllTeamMembers = (req, res) => TeamMember.getAll((err, results) => err ? res.status(500).json({ message: err.message }) : res.json(results));
const getTeamMember = (req, res) => TeamMember.getById(req.params.id, (err, tm) => !tm ? res.status(404).json({ message: 'Not found' }) : res.json(tm));
const createTeamMember = (req, res) => TeamMember.create(req.body, (err, id) => err ? res.status(500).json({ message: err.message }) : res.status(201).json({ id }));
const updateTeamMember = (req, res) => TeamMember.update(req.params.id, req.body, (err, affectedRows) => !affectedRows ? res.status(404).json({ message: 'Not found' }) : res.json({ message: 'Updated' }));
const deleteTeamMember = (req, res) => TeamMember.delete(req.params.id, (err, affectedRows) => !affectedRows ? res.status(404).json({ message: 'Not found' }) : res.json({ message: 'Deleted' }));

module.exports = { getAllTeamMembers, getTeamMember, createTeamMember, updateTeamMember, deleteTeamMember };
