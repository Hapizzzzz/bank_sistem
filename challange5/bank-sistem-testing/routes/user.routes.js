const express = require('express');
const router = express.Router();
const { createUser, getAllUsers, getDetailUser, editUser, deleteUser } = require('../handler/v1/user');

router.post('/', createUser);
router.get('/', getAllUsers);
router.get('/:userID', getDetailUser);
router.put('/:userID', editUser);
router.delete('/:userID', deleteUser);

module.exports = router;
