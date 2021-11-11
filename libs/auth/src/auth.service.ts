import { UserEntity } from '@database/database/entity';
import { UserRepository } from '@database/database/repository/user.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService, 
  ) {}
    
  async login(user) {
    const payload = {
      sub: user.id, 
      email: user.email, 
      type: user.user_type 
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string) {
    let user: UserEntity;
    try {
      user = await this.userRepository.findOneOrFail({ email });
    } catch (error) {
      return null;
    }
  
    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) return null;
    return user;
  }    
}

