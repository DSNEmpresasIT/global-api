import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientCredential } from './schemas/ClientCredential.schema';
import { CreateClientCredentialDto, UpdateClientCredentialDto } from './dto/client-credentials-dto';

@Injectable()
export class ClientCredentialService {
  constructor(
    @InjectModel(ClientCredential.name)
    private ClientCredentialModel: Model<ClientCredential>,
  ) {}
  async getClientCredentials(): Promise<ClientCredential[]> {
    try {
      const ClientCredentials = await this.ClientCredentialModel.find();
      return ClientCredentials;
    } catch (error) {
      throw new NotFoundException('Unable to fetch client credentials');
    }
  }

  async getClientCredential(clientName: string): Promise<ClientCredential> {
    try {
      
      return await this.ClientCredentialModel.findOne({ clientName });
    } catch (error) {
      throw new NotFoundException('Unable to fetch client credential');
    }
  }

  async createClientCredential(
    clientId: string,
    ClientCredentialDto: CreateClientCredentialDto,
  ): Promise<ClientCredential> {
    try {
      const validate = await this.ClientCredentialModel.find({ clientId })
      if (validate.length) throw new BadRequestException('This user are already in the database')

      const clientCredential = await new this.ClientCredentialModel({
        ...ClientCredentialDto,
        clientId
      });
      await clientCredential.save();

      return clientCredential;
    } catch (error) {
      throw new NotFoundException('Unable to create client credential');
    }
  }

  async deleteClientCredential(
    clientCredID: string,
  ): Promise<ClientCredential> {
    try {
      
      return await this.ClientCredentialModel.findByIdAndDelete(clientCredID);
    } catch (error) {
      throw new NotFoundException('Unable to delete client credential');
    }
  }

  async updateClientCredential(
    clientId: string,
    updateClientCredentialDto: UpdateClientCredentialDto,
  ) {
    try {

      return await this.ClientCredentialModel.updateOne(
        { clientId },
        updateClientCredentialDto,
      );
    } catch (error) {
      throw new NotFoundException('Unable to update client credential: ' + error.message);
    }
  }
}
