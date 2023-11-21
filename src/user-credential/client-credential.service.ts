import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientCredential } from './schemas/ClientCredential.schema';
import { ClientCredential as ClientCredentialDto } from './models/clientCredential.interface';

@Injectable()
export class ClientCredentialService {
  constructor(
    @InjectModel(ClientCredential.name)
    private ClientCredentialModel: Model<ClientCredential>,
  ) {}
  async getClientCredentials(): Promise<ClientCredential[]> {
    const ClientCredentials = await this.ClientCredentialModel.find();
    return ClientCredentials;
  }

  async getClientCredential(clientCredID: string): Promise<ClientCredential> {
    const ClientCredential =
      await this.ClientCredentialModel.findById(clientCredID);
    return ClientCredential;
  }

  async createClientCredential(
    ClientCredential: ClientCredentialDto,
  ): Promise<ClientCredential> {
    const clientCred = new this.ClientCredentialModel(ClientCredential);
    return await clientCred.save();
  }

  async deleteClientCredential(
    clientCredID: string,
  ): Promise<ClientCredential> {
    const deletclientCred =
      await this.ClientCredentialModel.findByIdAndDelete(clientCredID);
    return deletclientCred;
  }

  async updateClientCredential(
    clientCredID: string,
    createclientCred: ClientCredential,
  ): Promise<ClientCredential> {
    const updatedclientCred =
      await this.ClientCredentialModel.findByIdAndUpdate(
        clientCredID,
        createclientCred,
        { new: true },
      );
    return updatedclientCred;
  }
}
