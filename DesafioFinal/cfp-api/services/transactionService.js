const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require("../models/TransactionModel");

async function getSaldoAno(ano) {
  const transactions = await TransactionModel.find({ year: ano });

  return transactions;
}

async function getTransactions(period) {
  const transactions = await TransactionModel.find({ yearMonth: period });

  return transactions;
}

async function showTransactions(id) {
  const transaction = await TransactionModel.findById({ _id: id });

  return transaction;
}

async function createTransactions(transaction) {
  const transac = await TransactionModel.create(transaction);
  return transac;
}

async function updateTransactions(id, body) {
  const transaction = await TransactionModel.findByIdAndUpdate(
    { _id: id },
    body,
    { new: true }
  );

  return transaction;
}

async function removeTransactions(id) {
  const transaction = await TransactionModel.findByIdAndDelete({ _id: id });

  return transaction;
}

module.exports = {
  getTransactions,
  getSaldoAno,
  showTransactions,
  createTransactions,
  updateTransactions,
  removeTransactions,
};
