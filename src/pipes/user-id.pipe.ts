import { Injectable, PipeTransform } from '@nestjs/common';
import { Users } from '../modules/users/constants/users';

@Injectable()
export class UserIdPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  transform(request: any) {
    const isBearer = request?.headers?.authorization.slice(0, 6) === 'Bearer';
    const token = request?.headers?.authorization.slice(7);
    const user = Users[token];
    if (user && isBearer) {
      return user?.userId;
    }
    return null;
  }
}
