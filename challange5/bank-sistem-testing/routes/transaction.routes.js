const express = require('express');
const router = express.Router();
const { createTransaction, getAllTransactions, getDetailTransaction, editTransaction, deleteTransaction } = require('../handler/v1/transaction');

// Create a new transaction
router.post('/', createTransaction);

// Get all transactions
router.get('/', getAllTransactions);

// Get transaction details by ID
router.get('/:transactionID', getDetailTransaction);

// Edit transaction details by ID
router.put('/:transactionID', editTransaction);

// Delete a transaction by ID
router.delete('/:transactionID', deleteTransaction);

module.exports = router;
