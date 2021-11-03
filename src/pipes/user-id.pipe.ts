import { Injectable, PipeTransform } from '@nestjs/common';
import { Users } from '../modules/users/constants/users';

@Injectable()
export class UserIdPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  transform(request: any) {
    const token = request?.headers?.authorization.slice(6);
    const user = Users[token];
    if (user) {
      return user?.userId;
    }
    return null;
  }
}
