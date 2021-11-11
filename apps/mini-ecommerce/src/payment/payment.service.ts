import { PaymentEntity } from '@database/database/entity';
import { PaymentRepository } from '@database/database/repository/payment.repository';
import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from 'apps/mini-ecommerce/dto/create-payment.dto';
import { CieloService } from 'libs/cielo/src';

@Injectable()
export class PaymentService {
    constructor(
        private readonly paymentRepository: PaymentRepository,
        private readonly cieloService: CieloService,

    ){}
    
    async getAllPayment(): Promise<PaymentEntity[]> {
        console.log( await this.cieloService.findAll());
        return this.paymentRepository.getAllPayment();
    }
    
    async getPaymentById(id: number): Promise<PaymentEntity> {
        return this.paymentRepository.getPaymentById(id);
    }
    
    async createPayment(Payment: CreatePaymentDto[]): Promise<PaymentEntity[]> {
        return this.paymentRepository.createPayment(Payment);
    }
}
