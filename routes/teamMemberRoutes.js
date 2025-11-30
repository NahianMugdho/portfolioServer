const express = require('express');
const router = express.Router();
const tmController = require('../controllers/teamMemberController');
const auth = require('../middleware/auth');

router.get('/', tmController.getAllTeamMembers);
router.get('/:id', tmController.getTeamMember);
router.post('/', auth, tmController.createTeamMember);
router.put('/:id', auth, tmController.updateTeamMember);
router.delete('/:id', auth, tmController.deleteTeamMember);

module.exports = router;
