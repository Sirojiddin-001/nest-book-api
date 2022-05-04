import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegistrationDto } from './dto/registration.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {
  }

  async registration(dto: RegistrationDto) {
    const candidate = await this.usersService.getUserByEmail(dto.email);
    if (candidate) {
      throw  new HttpException('User with this email exists', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.usersService.createUser({ ...dto, password: hashPassword });
    return {
      fullName: user.fullName,
      email: user.email,
      token: await this.generateToken(user),
    };
  }

  async login(dto: LoginDto) {
    try {
      const user = await this.usersService.getUserByEmail(dto.email);
      const passwordEquals = await bcrypt.compare(dto.password, user.password);
      if (user && passwordEquals) {
        return {
          fullName: user.fullName,
          email: user.email,
          token: await this.generateToken(user),
        };
      }
      throw new UnauthorizedException('Invalid email address or password');
    } catch (e) {
      throw new UnauthorizedException('Invalid email address or password');
    }
  }

  private async generateToken(user) {
    const payload = { id: user.id, email: user.email, role: user.role };
    return this.jwtService.sign(payload);
  }
}
