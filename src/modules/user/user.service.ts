import { Injectable } from '@nestjs/common';
import { Users } from '../users/constants/users';

@Injectable()
export class UserService {
  getUser(userId: string) {
    const user = Object.values(Users).filter(
      (user: any) => user.userId === userId,
    )[0];

    if (user) return user;
    return 'User Not Found';
  }
}
