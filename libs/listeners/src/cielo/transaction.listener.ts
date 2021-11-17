import { CustomerPortfolioRepository } from "@database/database/repository/customer-portfolio.repository";
import { TransactionRepository } from "@database/database/repository/transaction.repository";
import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { create } from "domain";
import { TransactionCreateEvent } from "../events/transaction-create.event";

@Injectable()
export class TransactionListener {
  constructor(
    private readonly customerPortfolioRepository: CustomerPortfolioRepository,
    private readonly transactionRepository:TransactionRepository
  ){}
  
  @OnEvent('transaction.create')
  async handleTransactionCreateEvent(event: TransactionCreateEvent) {
    const customerPortfolioEntity = await this.customerPortfolioRepository.findOne(event.id_salesman);
    const transactionCreate = this.transactionRepository.create({...event, id_customer_portfolio: customerPortfolioEntity.id});
    this.transactionRepository.save(transactionCreate);
  }

}