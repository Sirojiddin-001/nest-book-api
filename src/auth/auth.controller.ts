import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { RegistrationDto, RegistrationResponseDto } from './dto/registration.dto';

@ApiTags('auth-controller')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, type: LoginResponseDto })
  @Post('/login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Registration' })
  @ApiResponse({ status: 200, type: RegistrationResponseDto })
  @Post('/registration')
  registration(@Body() dto: RegistrationDto) {
    return this.authService.registration(dto);
  }
}
