import { CieloSalesRespDto } from '@cielo/cielo/dto/cielo-sales-resp.dto';
import { PaymentEntity, SalesmanEntity } from '@database/database/entity';
import { PaymentRepository } from '@database/database/repository/payment.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreatePaymentDto } from 'apps/mini-ecommerce/dto/create-payment.dto';
import { AxiosResponse } from 'axios';
import { CieloService } from 'libs/cielo/src';
import { CieloEvent } from 'listeners/listeners/events/cielo-event';
import { CustomerPortfolioEvents } from 'listeners/listeners/events/customer-portfolio.events';
import { TransactionCreateEvent } from 'listeners/listeners/events/transaction-create.event';
import { networkInterfaces } from 'os';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly cieloService: CieloService,
    private eventEmitter: EventEmitter2,

  ){}
  
  async getAllPayment(): Promise<PaymentEntity[]> {
    return this.paymentRepository.getAllPayment();
  }
  
  async getPaymentById(id: number): Promise<PaymentEntity> {
    
    try {
      const paymentEntity = await this.paymentRepository.getPaymentById(id);
      const cieloSales = await this.cieloService.consultSale(paymentEntity.payment_id);
      return paymentEntity.status == 0 ? await this.setStatusPayment(paymentEntity,cieloSales) : paymentEntity;
      

    } catch (error) {
      // console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async setStatusPayment(paymentEntity: PaymentEntity, cieloSales: AxiosResponse): Promise<PaymentEntity>{
    this.eventEmitter.emit('cieloSales.consult', await this.setCieloSalesEvent(paymentEntity,cieloSales));
    const entity = await this.paymentRepository.getPaymentById(paymentEntity.id);
    
    if(entity.status == 2){
      this.eventEmitter.emit('customerPortfolio.increment', await this.setCustomerPortfolioEvent(paymentEntity));
      this.eventEmitter.emit('transaction.create', await this.setTransationCreate(entity));
    }
    return entity;
  }
  
  async createPayment(payment: CreatePaymentDto): Promise<CieloSalesRespDto> {
    try{
      
      const paymentEntity = await this.paymentRepository.createPayment(payment)
      const cieloSale = await this.cieloService.createSale(payment);      
      this.eventEmitter.emit('cieloSales.create', await this.setCieloSalesEvent(paymentEntity,cieloSale));      
      return await this.setCieloSalesResp(cieloSale.data,paymentEntity);
    
    } catch (error) {
      (
        error instanceof QueryFailedError ? await this.getErrorQueryFailedError(error) : await this.getErrorHttpException(error)
      );    
    }    
  }

  private async setCieloSalesEvent(paymentEntiy, cieloSale): Promise<CieloEvent>{
    return {
      id: paymentEntiy.id,
      status: cieloSale.data.Payment.Status,
      PaymentId: cieloSale.data.Payment.PaymentId 
    }
  }

  private async setTransationCreate (paymentEntiy: PaymentEntity): Promise<TransactionCreateEvent> {
    return {
      amount: paymentEntiy.amount_paid,
      payment_id: paymentEntiy.id,
      id_salesman: paymentEntiy.id_salesman,    
    }
  }  

  private async setCustomerPortfolioEvent(paymentEntiy: PaymentEntity): Promise<CustomerPortfolioEvents>{
    return {
      id_salesman: paymentEntiy.id_salesman,
      value_last_purchase: paymentEntiy.amount_paid
    }
  }

  private async setCieloSalesResp(cieloSale,paymentEntity): Promise<CieloSalesRespDto>{
    return {
      payment_id: paymentEntity.id, 
      status: cieloSale.Payment.Status,
      AuthenticationUrl: cieloSale.Payment.AuthenticationUrl,
    }
  } 

  async getErrorHttpException(error: any): Promise<void> {
    throw new HttpException(error.response.statusText, error.response.status);
  }

  async getErrorQueryFailedError(error: any ): Promise<void> {
    throw new HttpException(error.detail, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
