const express = require("express");
const transactionRouter = express.Router();

const TransactionController = require("../controllers/TransactionController");

transactionRouter.get("/", TransactionController.get);
transactionRouter.get("/saldo", TransactionController.getSaldoAno);
transactionRouter.get("/:id", TransactionController.show);
transactionRouter.post("/", TransactionController.create);
transactionRouter.put("/:id", TransactionController.update);
transactionRouter.delete("/:id", TransactionController.remove);

module.exports = transactionRouter;
