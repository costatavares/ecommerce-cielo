import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { HttpService} from  '@nestjs/axios'
import { map, Observable, catchError } from 'rxjs'; 
import { AxiosResponse, } from 'axios';
import { response } from 'express';

import axios from 'axios';

import { firstValueFrom, lastValueFrom } from 'rxjs';
import { headersCielo, ReturnUrlToCielo, UrlApiQuery, UrlSalesCielo } from './config/config-cielo';
import { CreatePaymentDto } from 'apps/mini-ecommerce/dto/create-payment.dto';
import { CieloCreateSalesDto } from './dto/cielo-create-sales.dto';
import { ClientRepository } from '@database/database/repository/client.repository';
import { ClientEntity } from '@database/database/entity';
import { CieloBodySalesDto } from './dto/cielo-body-sales.dto';

@Injectable()
export class CieloService {
  constructor(
    private readonly httpService: HttpService,
    private readonly clientRepository: ClientRepository
  ) {}

  async consultSale(paymentId: string): Promise<AxiosResponse>{
    return firstValueFrom(this.httpService.get(UrlApiQuery + `/${paymentId}`, headersCielo));
  }

  async createSale(payment: CreatePaymentDto): Promise<AxiosResponse> {
    const bodySales = await this.setPaymentSale(payment);
    const response = await firstValueFrom(this.httpService.post(UrlSalesCielo, this.getBody(bodySales), headersCielo));
    if(!response)  throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return response;              
  }

  async getClientName(id: number){
    const clientEnty = await this.clientRepository.findOne(id, {
      select: ['name', 'last_name'],
    });
    return `${clientEnty.name} ${clientEnty.last_name}`;
  }

  async setPaymentSale(payment: CreatePaymentDto): Promise<CieloCreateSalesDto> {
    
    return {
      MerchantOrderId: payment.payment_number,
      Amount: +payment.amount_paid,
      CardNumber: payment.card.card_number,
      Name: await this.getClientName(payment.id_client)
    }
  }
  
  private getBody(bodySales: CieloCreateSalesDto): CieloBodySalesDto {
    return {  
      MerchantOrderId: bodySales.MerchantOrderId,
      Customer:{  
        Name: bodySales.Name,
      },
      Payment:{  
        Type:"DebitCard",
        Authenticate: true,
        Amount:bodySales.Amount,
        ReturnUrl: ReturnUrlToCielo,
        DebitCard:{  
          CardNumber: bodySales.CardNumber,
          Holder:"Teste Holder",
          ExpirationDate:"12/2030",
          SecurityCode:"123",
          Brand:"Visa"
        }
      }
    }
  }
}
