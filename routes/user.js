const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/', userController.createUsers)
    .get('/', userController.getAllUsers)
    .get('/:id', userController.getUserByID)
    .put('/:id', userController.replaceUser)
    .patch('/:id', userController.updateUser)
    .delete('/:id', userController.deleteUser);


exports.router = router;
