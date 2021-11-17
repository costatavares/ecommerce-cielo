import { CustomerPortfolioRepository } from "@database/database/repository/customer-portfolio.repository";
import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { Entity } from "typeorm";
import { CustomerPortfolioCreateEvents } from "../events/customer-portfolio-create.event";
import { CustomerPortfolioEvents } from "../events/customer-portfolio.events";


@Injectable()
export class CustomerPortfolioListener {
  
  constructor(
    private readonly customerPortfolioRepository: CustomerPortfolioRepository,
  ){}
  
  @OnEvent('customerPortfolio.create')
  handleCustomerPortfolioCreateEvent(event: CustomerPortfolioCreateEvents) {
    const customerPortfolioEntity = this.customerPortfolioRepository.create(event);
    this.customerPortfolioRepository.save(customerPortfolioEntity);
  }
  
  @OnEvent('customerPortfolio.increment')
  async handleCustomerPortfolioIncrementEvent(event: CustomerPortfolioEvents) {
    const customerPortfolioEntity = await this.customerPortfolioRepository.findOne(event.id_salesman);
    this.incrementValue(customerPortfolioEntity,event);

    const entityCreate = this.customerPortfolioRepository.create({
      ...event,
      value_last_purchase : this.incrementValue(customerPortfolioEntity,event)
    });
 
    this.customerPortfolioRepository.update({ id: customerPortfolioEntity.id },entityCreate);
  }

  private incrementValue(customerPortfolioEntity,event): number {
    const currentValue = parseFloat(customerPortfolioEntity.value_last_purchase.toString());
    const eventValue = parseFloat( event.value_last_purchase.toString());    
    return (eventValue + currentValue);
  }
}