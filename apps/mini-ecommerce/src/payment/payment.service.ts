import { CieloSalesRespDto } from '@cielo/cielo/dto/cielo-sales-resp.dto';
import { PaymentEntity } from '@database/database/entity';
import { PaymentRepository } from '@database/database/repository/payment.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreatePaymentDto } from 'apps/mini-ecommerce/dto/create-payment.dto';
import { CieloService } from 'libs/cielo/src';
import { CieloEvent } from 'listeners/listeners/events/cielo-event';
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
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async setStatusPayment(paymentEntity, cieloSales): Promise<PaymentEntity>{
    this.eventEmitter.emit('cieloSales.consult', await this.setCieloSalesEvent(paymentEntity,cieloSales));
    return this.paymentRepository.getPaymentById(paymentEntity.id);
  }
  
  async createPayment(payment: CreatePaymentDto): Promise<CieloSalesRespDto> {
    
    try{
      const paymentEntity = await this.paymentRepository.createPayment(payment)
      const cieloSale = await this.cieloService.createSale(payment);
      this.eventEmitter.emit('cieloSales.create', await this.setCieloSalesEvent(paymentEntity,cieloSale) );
      return await this.setCieloSalesResp(cieloSale.data);
            
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


  private async setCieloSalesResp(cieloSale): Promise<CieloSalesRespDto>{
    return {
      status: cieloSale.Payment.Status,
      AuthenticationUrl: cieloSale.Payment.AuthenticationUrl
    }
  } 

  async getErrorHttpException(error: any): Promise<void> {
    throw new HttpException(error.response.statusText, error.response.status);
  }

  async getErrorQueryFailedError(error: any ): Promise<void> {
    throw new HttpException(error.detail, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
