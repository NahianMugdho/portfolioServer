const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth'); // যদি JWT middleware ব্যবহার করতে চাও

router.get('/', auth, userController.getAllUsers);   // সব ইউজার
router.get('/:id', auth, userController.getUser);   // এক ইউজার
router.post('/', userController.createUser);        // রেজিস্টার
router.put('/:id', auth, userController.updateUser);// আপডেট
router.delete('/:id', auth, userController.deleteUser);// ডিলিট
router.post('/login', userController.login);        // লগইন
router.post('/logout', userController.logout);

module.exports = router;
