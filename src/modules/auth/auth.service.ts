import { Injectable } from '@nestjs/common';
import { Users } from '../users/constants/users';

@Injectable()
export class AuthService {
  authenticate(token: string) {
    const user = Users[token];
    if (user) {
      return user.auth.token;
    }
    return null;
  }
}

