import { Router } from 'express';
// import {} from 'da'
import Transaction from '../models/Transaction'

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

// interface Transaction {
//   id: string,
//     title: string,
//     value: number,
//     type: string,
// }
const transactionRouter = Router();
const transactionsRepository = new TransactionsRepository();

// const transaction: Transaction[] = [];


transactionRouter.get('/', (request, response) => {
  try {

    const transaction = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();

    return response.json({
      transaction,
      balance,
    })

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body

    const createTransaction = new CreateTransactionService(
      transactionsRepository
    )

    const transaction = createTransaction.execute({ title, value, type })

    return response.json(transaction)
    // TODO
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
