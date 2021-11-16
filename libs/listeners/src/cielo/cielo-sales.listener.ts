import { PaymentRepository } from "@database/database/repository/payment.repository";
import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { CieloEvent } from "../events/cielo-event";


@Injectable()
export class CieloSalesListener {
  constructor(
    private readonly paymentRepository: PaymentRepository,
  ){}
  
  @OnEvent('cieloSales.create')
  handleCieloSalesCreateEvent(event: CieloEvent) {
    this.paymentRepository.update({id: event.id},{payment_id: event.PaymentId})
  }

  @OnEvent('cieloSales.consult')
  handleCieloSalesConsultEvent(event: CieloEvent) {
    console.log('cieloSales.consult');
    console.log(event);
    this.paymentRepository.update({id: event.id},{status: event.status})
  }
}