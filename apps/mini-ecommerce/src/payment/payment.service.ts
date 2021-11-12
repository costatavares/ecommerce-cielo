import { PaymentEntity } from '@database/database/entity';
import { PaymentRepository } from '@database/database/repository/payment.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from 'apps/mini-ecommerce/dto/create-payment.dto';
import { CieloService } from 'libs/cielo/src';
import { Entity, QueryFailedError } from 'typeorm';

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly cieloService: CieloService,

  ){}
  
  async getAllPayment(): Promise<PaymentEntity[]> {
    return this.paymentRepository.getAllPayment();
  }
  
  async getPaymentById(id: number): Promise<PaymentEntity> {
    
    try {
      // const cieloSales = await this.cieloService.createSale();
      // console.log(cieloSales);    
      const pyaments = await this.paymentRepository.getPaymentById(id)
      return pyaments;
      
    } catch (error) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    // await this.cieloService.createSale();

  }
  
  async createPayment(payment: CreatePaymentDto): Promise<PaymentEntity> {
    
    try{
      const paymentEntity = await this.paymentRepository.createPayment(payment)
      
      if(paymentEntity){
        const cieloSale = await this.cieloService.createSale(payment);
        console.log(cieloSale);
      }

      return paymentEntity;

    } catch (error) {
      (
        error instanceof QueryFailedError ? await this.getErrorQueryFailedError(error) : await this.getErrorHttpException(error)
      );    
    }    
  }  

  async getErrorHttpException(error: any) {
    throw new HttpException(error.response.statusText, error.response.status);
  }

  async getErrorQueryFailedError(error: any ) {
    throw new HttpException(error.detail, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
