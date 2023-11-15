import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UserCredentialService } from './user-credential.service';
import { UserCredential } from './schemas/UserCredential.entity';

@Controller('user-credential')
export class UserCredentialController {
  constructor(private userCredService: UserCredentialService) {}

  @Post('/create')
  async createUserCred(
    @Res() res,
    @Body() createUserCredential: UserCredential,
  ) {
    const userCred =
      await this.userCredService.createUserCredential(createUserCredential);
    return res.status(HttpStatus.OK).json({
      message: 'received',
      userCred: userCred,
    });
  }
}
