import { PaymentEntity } from '@database/database/entity';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreatePaymentDto } from 'apps/mini-ecommerce/dto/create-payment.dto';
import { PaymentService } from './payment.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('payment')
@UseGuards(AuthGuard('jwt'))
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Get()
  async getAll(): Promise<PaymentEntity[]>{
    return this.paymentService.getAllPayment();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<PaymentEntity>{
    return await this.paymentService.getPaymentById(id);
  }

  @Post()
  async create(@Body() payment: CreatePaymentDto): Promise<PaymentEntity>{
    return await this.paymentService.createPayment(payment);
  }
}
