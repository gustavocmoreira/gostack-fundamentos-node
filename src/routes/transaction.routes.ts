import { Router } from 'express';

 import TransactionsRepository from '../repositories/TransactionsRepository';
 import CreateTransactionService from '../services/CreateTransactionService';
import Transaction from '../models/Transaction';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Report{
  transactions: Transaction[];
  balance:Balance
}
transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();
    const report: Report = {
      transactions,
      balance
    };


    return response.json(report);

  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
   const {title,value,type} = request.body;

   const createTransaction = new CreateTransactionService(transactionsRepository);

   const transaction = createTransaction.execute({
     title,
     value,
     type
   });

   return response.json(transaction)

    // TODO
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
