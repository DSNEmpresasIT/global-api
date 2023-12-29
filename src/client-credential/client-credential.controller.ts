import { Body, Controller, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ClientCredentialService } from './client-credential.service';
import { CreateClientCredentialDto, UpdateClientCredentialDto } from './dto/client-credentials-dto';

@Controller('api/client-credential')
export class ClientCredentialController {
  constructor(private service: ClientCredentialService) {}

  @Post(':clientId/create')
  async createUserCred(
    @Body() createClientCredential: CreateClientCredentialDto,
    @Param() param
  ) {
    return await this.service.createClientCredential(
      param.clientId,      
      createClientCredential
    );
  }

  @Put(':clientId')
  async updateClientCredential(@Body() body: UpdateClientCredentialDto, @Param() param) {
    return await this.service.updateClientCredential(param.clientId, body);
  }
}
