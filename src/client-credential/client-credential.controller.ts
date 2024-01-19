import { Body, Controller, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { ClientCredentialService } from './client-credential.service';
import { CreateClientCredentialDto, UpdateClientCredentialDto } from './dto/client-credentials-dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesTypes } from 'src/auth/roles/roles.interface';

@Controller('api/client-credential')
export class ClientCredentialController {
  constructor(private service: ClientCredentialService) {}

  @Roles(RolesTypes.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
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

  @Roles(RolesTypes.ADMIN)
  @UseGuards(JwtGuard, RoleGuard)
  @Put(':clientId')
  async updateClientCredential(@Body() body: UpdateClientCredentialDto, @Param() param) {
    return await this.service.updateClientCredential(param.clientId, body);
  }
}
