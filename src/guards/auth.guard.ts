import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Users } from '../modules/users/constants/users';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const isBearer = request?.headers?.authorization.slice(0, 6) === 'Bearer';
    const token = request?.headers?.authorization.slice(7);
    const user = Users[token];
    if (user && isBearer) {
      return true;
    }
    return false;
  }
}
