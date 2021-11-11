import { HttpException, Injectable } from '@nestjs/common';
import { HttpService} from  '@nestjs/axios'
import { map, Observable, catchError } from 'rxjs'; 
import { AxiosResponse, } from 'axios';
import { response } from 'express';

import axios from 'axios';

@Injectable()
export class CieloService {
    constructor(
        private readonly httpService: HttpService,
    ) {}

    async findAll(){
        
            
        
        const headersRequest = {
            'Content-Type': 'application/json',
            'MerchantId': `741d7df7-5ebb-43ed-9b44-e63708c0a0b4`,
            'MerchantKey': `CYFEVXBUYSYCIWEJGLVVNYVBYIGTBGGXTPRMUBMI`,
        };
        // return this.httpService.get('http://localhost:3000/cats');
        // return this.httpService.post('https://apisandbox.cieloecommerce.cielo.com.br/1/sales/',this.getBody(), { headers: headersRequest }).pipe(
        //     map(response => response.data),
        // );
        // await this.httpService.get('https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/07bc2b9b-3328-4671-9513-7fbdae723ccd').subscribe((response) =>{ 
        //     console.log('aqui');
        //     return response.data 
        // } );

        this.httpService.post('https://apisandbox.cieloecommerce.cielo.com.br/1/sales/',this.getBody(), { headers: headersRequest }).subscribe(resp=>{
            console.log(resp.data.Payment);
        });


        // axios.get('https://apiquerysandbox.cieloecommerce.cielo.com.br/1/sales/07bc2b9b-3328-4671-9513-7fbdae723ccd', { headers: headersRequest })
        // .then(resp=>{
        //     console.log(resp.data.Payment);
        // })  
        // .catch(error=>{
        //     console.log('error');
        //     console.log(error.request);
        // });
        
        
        
    }
    
    getBody(){
        return {  
            MerchantOrderId: "23425",
            Customer:{  
               Name:"Comprador Cartão de débito"
            },
            Payment:{  
              Type:"DebitCard",
              Authenticate: true,
              Amount:15700,
              ReturnUrl: "http://api.webhookinbox.com/i/HFOvhbPS/in/",
              DebitCard:{  
                CardNumber:"5419877942434890",
                Holder:"Teste Holder",
                ExpirationDate:"12/2030",
                SecurityCode:"123",
                Brand:"Visa"
              }
            }
         }
    }
}
