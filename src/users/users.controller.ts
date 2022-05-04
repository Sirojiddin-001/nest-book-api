import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { UsersService } from './users.service';
import { ApiBasicAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('users-controller')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @ApiOperation({ summary: 'Get profile' })
  @ApiOkResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        fullName: { type: 'string' },
        email: { type: 'string' },
      },
    },
  })
  @ApiBasicAuth()
  @UseGuards(AuthGuard)
  @Get('/profile')
  profile(@Req() req) {
    return this.usersService.getUserById(req.user.id);
  }
}
