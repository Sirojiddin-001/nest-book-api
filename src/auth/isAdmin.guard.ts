import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class IsAdminGuard implements CanActivate {
  constructor(private jwtService: JwtService) {
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('User not authorized');
      }

      const user = this.jwtService.verify(token);
      if (user.role === 'ADMIN') {
        req.user = user;
        return true;
      } else {
        throw new ForbiddenException('You don\'t have access');
      }
    } catch (e) {
      console.log(e)
      throw new ForbiddenException('You don\'t have access');
    }
  }
}