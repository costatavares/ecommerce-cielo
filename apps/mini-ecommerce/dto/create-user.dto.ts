import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';
import { RegExHelper, MessagesHelper } from '@helpers/helpers/index';

export class CreateUserDto {
    
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(RegExHelper.password, { message: MessagesHelper.PASSWORD_VALID })
  password: string;

  @IsNotEmpty()
  @IsNumber()
  user_type: number;    
}