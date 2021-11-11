import { NotFoundException } from "@nestjs/common";
import { CreatePaymentDto } from "apps/mini-ecommerce/dto/create-payment.dto";
import { EntityRepository, Repository } from "typeorm";
import { PaymentEntity } from "../entity";

@EntityRepository(PaymentEntity)
export class PaymentRepository extends Repository<PaymentEntity>{
  async getAllPayment(): Promise<PaymentEntity[]> {
    return this.find();
  }

  async getPaymentById(id: number): Promise<PaymentEntity> {
    const PaymentEntity = await this.findOne(id, {
      relations: ['card', 'salesman', 'client'],
    });
  
    if (!PaymentEntity) {
      throw new NotFoundException(`Payment with id ${id} doesnt exists`);
    }
    return PaymentEntity;
  }

  async createPayment(Payment: CreatePaymentDto[] ): Promise<PaymentEntity[]> {
    const PaymentEntity = this.create(Payment);
    return this.save(PaymentEntity);
  }
}
