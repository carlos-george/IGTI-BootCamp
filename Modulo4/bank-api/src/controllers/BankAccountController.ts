import { request, Request, Response } from 'express';

import BankAccount from '../models/bankAccount';

import accountsNew from '../../accounts-2.json';

export default {

    async createMass(request: Request, response: Response) {

        // const acc = await BankAccount.create(data);

        let error;

        const accounts = await BankAccount.create(accountsNew)
            .catch((err) => error = err.errors['balance'].message);

        if (error) return response.status(400).json({
            message: error
        })

        return response.status(201).json(accounts);
    },
    async index(request: Request, response: Response) {

        const accounts = await BankAccount.find();

        return response.status(200).json({ accounts, qtd: accounts.length });
    },

    async showAccount(request: Request, response: Response) {
        const { id } = request.params;

        const account = await BankAccount.findById(id);

        if (!account) return response.status(400).json({ message: 'Conta Corrente não encontrada na agência.' });

        return response.status(200).json(account);
    },

    async depositar(request: Request, response: Response) {

        const { agencia, conta, valor } = request.body;

        const account: any = await BankAccount.findOne({ agencia, conta });

        if (!account) return response.status(400).json({ message: 'Conta Corrente não encontrada na agência.' });

        const newValue = account.balance + +valor;

        const newAccount: any = await BankAccount.findByIdAndUpdate(account._id, { balance: newValue }, { new: true });

        return response.status(200).json({ saldo: newAccount?.balance });
    },

    async sacar(request: Request, response: Response) {

        const { agencia, conta, valor } = request.body;

        const account: any = await BankAccount.findOne({ agencia, conta });

        if (!account) return response.status(400).json({ message: 'Conta Corrente não encontrada na agência.' });

        const valorTarifa = +valor + 1;

        if (account.balance < valorTarifa) return response.status(400).json({ message: 'Saldo insuficiente para realizar saque.' });

        const newValue = account.balance = account.balance - valorTarifa;

        const newAccount: any = await BankAccount.findByIdAndUpdate(account._id, { balance: newValue }, { new: true });

        return response.status(200).json({ saldo: newAccount?.balance });
    },

    async getSaldo(request: Request, response: Response) {

        const { agencia, conta } = request.body;

        const account: any = await BankAccount.findOne({ agencia, conta });

        if (!account) return response.status(400).json({ message: 'Conta Corrente não encontrada na agência.' });

        return response.status(200).json({ saldo: account.balance });
    },

    async deleteConta(request: Request, response: Response) {

        const { agencia, conta } = request.body;

        const account: any = await BankAccount.findOne({ agencia, conta });

        if (!account) return response.status(400).json({ message: 'Conta Corrente não encontrada na agência.' });

        await BankAccount.findByIdAndDelete(account._id);

        const contaAtivas = await BankAccount.find({ agencia });

        return response.status(200).json(contaAtivas);
    },

    async transferir(request: Request, response: Response) {

        const { contaDestino, contaOrigem, valor } = request.body;

        const accountOrigem: any = await BankAccount.findOne({ conta: contaOrigem });

        const accountDestino: any = await BankAccount.findOne({ conta: contaDestino });

        let newValor = +valor;

        if (accountOrigem.agencia !== accountDestino.agencia) newValor = +valor + 8;

        const valorSaldoDebito = accountOrigem.balance - newValor;

        const newAccountOrigem: any = await BankAccount.findByIdAndUpdate(accountOrigem._id, { balance: valorSaldoDebito }, { new: true });

        const valorSaldoCredito = accountDestino.balance + +valor;

        await BankAccount.findByIdAndUpdate(accountDestino._id, { balance: valorSaldoCredito });

        return response.status(200).json({ saldoContaOrigem: newAccountOrigem.balance });
    },

    async getMediaSaldo(request: Request, response: Response) {

        const { agencia } = request.params;

        const accounts = await BankAccount.find({ agencia });

        const valorSaldoMedio = accounts.map((conta: any) => conta.balance).reduce((a, b) => a + b);

        return response.status(200).json({ saldoMedio: valorSaldoMedio / accounts.length });
    },

    async getClientesAsc(request: Request, response: Response) {

        const { limit } = request.query;

        const accounts = await BankAccount.find().limit(Number(limit)).sort('balance');

        return response.status(200).json(accounts);
    },

    async getClientesDesc(request: Request, response: Response) {

        const { limit } = request.query;

        const accounts = await BankAccount.find().limit(Number(limit)).sort({ balance: -1, name: 1 });

        return response.status(200).json(accounts);
    },

    async transferirClientes(request: Request, response: Response) {

        const agencias = await BankAccount.find().select('agencia');

        const numAgencias = agencias.filter((item: any) => item.agencia !== 99).map((age: any) => {
            return age.agencia;
        });

        const newAgenciasNumbers = [...new Set(numAgencias)];

        newAgenciasNumbers.forEach(async (item) => {
            const accounts = await BankAccount.find({ agencia: item }).limit(Number(1)).sort({ balance: -1 });

            const data = accounts[0];

            await BankAccount.findByIdAndUpdate(data._id, { agencia: 99 });
        });

        const accPrivates = await BankAccount.find({ agencia: 99 });

        return response.status(200).json({ qtd: accPrivates.length, accPrivates });
    }

}