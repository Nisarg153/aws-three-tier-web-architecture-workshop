const transactionService = require('./TransactionService');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 4000;
const HOST = '0.0.0.0'; // bind to all IP addresses

// MIDDLEWARES
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES FOR OUR API
// =======================================================

app.get('/health', (req, res) => {
    res.status(200).json({ message: "Server is healthy ✅" });
});

app.post('/transaction', (req, res) => {
    try {
        console.log(req.body);
        const { amount, desc } = req.body;
        const success = transactionService.addTransaction(amount, desc);
        if (success === 200) {
            res.status(200).json({ message: 'Added transaction successfully' });
        } else {
            res.status(500).json({ message: 'Failed to add transaction' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong', error: err.message });
    }
});

app.get('/transaction', (req, res) => {
    try {
        transactionService.getAllTransactions(function (results) {
            const transactionList = results.map(row => ({
                id: row.id,
                amount: row.amount,
                description: row.description
            }));
            res.status(200).json({ result: transactionList });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Could not get all transactions", error: err.message });
    }
});

app.delete('/transaction', (req, res) => {
    try {
        transactionService.deleteAllTransactions(function (result) {
            res.status(200).json({ message: "All transactions deleted successfully" });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Deleting all transactions may have failed.", error: err.message });
    }
});

app.delete('/transaction/id', (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "Transaction ID is required" });
        }
        transactionService.deleteTransactionById(id, function (result) {
            res.status(200).json({ message: `Transaction with ID ${id} deleted.` });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting transaction", error: err.message });
    }
});

app.get('/transaction/id', (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "Transaction ID is required" });
        }
        transactionService.findTransactionById(id, function (result) {
            if (result.length > 0) {
                const { id, amount, description } = result[0];
                res.status(200).json({ id, amount, description });
            } else {
                res.status(404).json({ message: "Transaction not found" });
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error retrieving transaction", error: err.message });
    }
});

// SERVE FRONTEND BUILD (React) from best-practice location
app.use(express.static(path.join(__dirname, '../web-tier/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../web-tier/build', 'index.html'));
});

// START SERVER
app.listen(PORT, HOST, () => {
    console.log(`🚀 AB3 backend app listening at http://${HOST}:${PORT}`);
});
