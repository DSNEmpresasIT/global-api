import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { ClientCredentialService } from './client-credential.service';
import { ClientCredential as ClientCredentialDto } from './models/clientCredential.interface';

@Controller('user-credential')
export class ClientCredentialController {
  constructor(private userCredService: ClientCredentialService) {}

  @Post('/create')
  async createUserCred(
    @Res() res,
    @Body() createClientCredential: ClientCredentialDto,
  ) {
    const userCred =
      await this.userCredService.createClientCredential(createClientCredential);
    return res.status(HttpStatus.OK).json({
      message: 'received',
      userCred: userCred,
    });
  }
}
