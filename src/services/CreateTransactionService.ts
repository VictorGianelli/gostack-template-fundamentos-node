import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface requestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: requestDTO): Transaction {

    const { total } = this.transactionsRepository.getBalance()

    if (type === 'outcome' && total < value) {
      throw new Error('You don´t have enough money');
    }

    const eachTransaction = this.transactionsRepository.create({
      title,
      type,
      value,
    })

    return eachTransaction;
  }
}

export default CreateTransactionService;
