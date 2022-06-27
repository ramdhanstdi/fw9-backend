const { listTransaction } = require("../controllers/transaction")

const transaction = require(`express`).Router()

transaction.get(`/`, listTransaction)

module.exports = transaction