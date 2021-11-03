import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../../guards/auth.guard';
import { RequestDec } from '../../decorators/request.decorator';
import { UserIdPipe } from '../../pipes/user-id.pipe';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  findOne(@RequestDec(new UserIdPipe()) userId) {
    return this.userService.getUser(userId);
  }
}
