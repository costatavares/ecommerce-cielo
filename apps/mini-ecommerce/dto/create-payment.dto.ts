import { RegExHelper } from "@helpers/helpers";
import { IsDecimal, IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";

export class CreatePaymentDto{
  
  @IsNotEmpty()
  @IsNumber()
  payment_number: number;

  @IsNotEmpty()
  @Matches(RegExHelper.decimal)
  amount: number;

  @IsNotEmpty()
  @Matches(RegExHelper.decimal)
  amount_paid: number;
  
  @IsNotEmpty()
  card:cardNumber;
  
  @IsNotEmpty()
  @IsNumber()
  id_salesman: number;
  
  
  @IsNotEmpty()
  @IsNumber()
  id_client: number;
  
}

export interface cardNumber {
  card_number: string;
}