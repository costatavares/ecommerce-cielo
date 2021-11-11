import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';
import { RegExHelper, MessagesHelper } from '@helpers/helpers/index';
import { Role } from 'libs/guards/enum/role.enum';

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
  user_type: Role;    
}


