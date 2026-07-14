const express = require('express');
const { getUserController, updateUserController, updateUserPassword, deleteUserController } = require('../controllers/userControllers');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// routes

// GET user
router.get('/getUser', authMiddleware, getUserController);

// PUT update user
router.put('/updateUser', authMiddleware, updateUserController);

// POST reset password
router.post('/updatePassword', authMiddleware, updateUserPassword);

// DELETE user
router.delete('/deleteUser', authMiddleware, deleteUserController)

// export
module.exports = router;