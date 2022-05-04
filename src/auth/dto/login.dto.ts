import { ApiProperty } from '@nestjs/swagger';

export class LoginDto{
  @ApiProperty({ example: 'user@email.com', description: 'User email' })
  readonly email: string

  @ApiProperty({ example: '12345678', description: 'User password' })
  readonly password: string
}

export class LoginResponseDto{
  @ApiProperty({ example: 'John Smith', description: 'User full name' })
  readonly fullName: string

  @ApiProperty({ example: 'user@email.com', description: 'User email' })
  readonly email: string

  @ApiProperty({ example: 'Bearer ...', description: 'User token' })
  readonly token: string
}