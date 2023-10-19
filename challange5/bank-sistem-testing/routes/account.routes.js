const express = require('express');
const router = express.Router();
const { createAccount, getAllAccounts, getDetailAccount, editAccount, deleteAccount } = require('../handler/v1/account');

// Create a new account
router.post('/', createAccount);

// Get all accounts
router.get('/', getAllAccounts);

// Get account details by ID
router.get('/:accountID', getDetailAccount);

// Edit account details by ID
router.put('/:accountID', editAccount);

// Delete an account by ID
router.delete('/:accountID', deleteAccount);

module.exports = router;
