const TransactionService = require("../services/transactionService");

async function getSaldoAno(req, res) {
  const { ano } = req.query;

  const transactions = await TransactionService.getSaldoAno(ano);

  const receitas = transactions.filter((item) => item.type === "+");
  const receita = receitas.map((item) => item.value).reduce((a, b) => a + b);
  const despesas = transactions.filter((item) => item.type === "-");
  const despesa = despesas.map((item) => item.value).reduce((a, b) => a + b);

  const saldo = receita - despesa;

  const resceitaSalario = transactions
    .filter((item) => {
      if (item.type === "+" && item.description.includes("Salário"))
        return item;
    })
    .map((item) => item.value)
    .reduce((a, b) => a + b);

  return res.status(200).json({ saldo, resceitaSalario });
}

async function get(req, res) {
  const { period } = req.query;

  if (!period)
    return res.status(400).json({
      error:
        'É necessário informar o parâmetro "period", cujo valor deve estar o formato "yyyy-mm"',
    });

  const transactions = await TransactionService.getTransactions(period);

  const receitas = transactions.filter((item) => item.type === "+");
  const receita = receitas.map((item) => item.value).reduce((a, b) => a + b);
  const despesas = transactions.filter((item) => item.type === "-");
  const despesa = despesas.map((item) => item.value).reduce((a, b) => a + b);

  const saldo = receita - despesa;

  return res.json({
    length: transactions.length,
    receita,
    despesa,
    saldo,
    transactions,
  });
}

async function create(req, res) {
  const {
    description,
    value,
    category,
    year,
    month,
    day,
    yearMonth,
    yearMonthDay,
    type,
  } = req.body;

  const data = {
    description,
    value,
    category,
    year,
    month,
    day,
    yearMonth,
    yearMonthDay,
    type,
  };

  console.log(data);

  const transaction = await TransactionService.createTransactions(data);

  return res
    .status(201)
    .json({ message: "Transação criada com sucesso", transaction });
}

async function update(req, res) {
  const { id } = req.params;

  const transaction = await TransactionService.updateTransactions(id, req.body);

  return res.status(200).json(transaction);
}

async function show(req, res) {
  const { id } = req.params;

  const transaction = await TransactionService.showTransactions(id);

  return res.status(200).json(transaction);
}

async function remove(req, res) {
  const { id } = req.params;

  await TransactionService.removeTransactions(id);

  return res.status(200).json({ message: "Transação removida com sucesso." });
}

module.exports = {
  getSaldoAno,
  get,
  create,
  update,
  show,
  remove,
};
