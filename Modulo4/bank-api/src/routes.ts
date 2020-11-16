import { Router } from 'express';

import BankAccountController from './controllers/BankAccountController';

const routes = Router();

routes.get('/', (req, res) => {

    return res.json({ message: 'App is Running' });
});

routes.get('/bank-accounts/create-mass', BankAccountController.createMass);

routes.get('/bank-accounts', BankAccountController.index);

routes.get('/bank-accounts/:id/conta', BankAccountController.showAccount);

routes.get('/bank-accounts/saldo', BankAccountController.getSaldo);

routes.get('/bank-accounts/:agencia/saldo-medio', BankAccountController.getMediaSaldo);

routes.get('/bank-accounts/clientes-asc', BankAccountController.getClientesAsc);

routes.get('/bank-accounts/clientes-desc', BankAccountController.getClientesDesc);

routes.put('/bank-accounts/depositar', BankAccountController.depositar);

routes.put('/bank-accounts/sacar', BankAccountController.sacar);

routes.put('/bank-accounts/transferir', BankAccountController.transferir);

routes.post('/bank-accounts/transferir-clientes', BankAccountController.transferirClientes);

routes.delete('/bank-accounts', BankAccountController.deleteConta);

export default routes;
