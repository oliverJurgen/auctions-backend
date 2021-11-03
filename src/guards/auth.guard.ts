import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Users } from '../modules/users/constants/users';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    // console.log({ headers: request.headers });

    const token = request?.headers?.authorization.slice(6);
    console.log({ token });
    const user = Users[token];
    if (user) {
      return true;
    }
    return false;

    // return false;
  }
}
