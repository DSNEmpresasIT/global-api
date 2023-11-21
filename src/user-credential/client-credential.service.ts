import { Injectable, NotFoundException } from '@nestjs/common';
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
    try {
      const ClientCredentials = await this.ClientCredentialModel.find();
      return ClientCredentials;
    } catch (error) {
      throw new NotFoundException('Unable to fetch client credentials');
    }
  }

  async getClientCredential(clientCredID: string): Promise<ClientCredential> {
    try {
      const ClientCredential =
        await this.ClientCredentialModel.findById(clientCredID);
      if (!ClientCredential) {
        throw new NotFoundException('Client credential not found');
      }
      return ClientCredential;
    } catch (error) {
      throw new NotFoundException('Unable to fetch client credential');
    }
  }

  async createClientCredential(
    ClientCredential: ClientCredentialDto,
  ): Promise<ClientCredential> {
    try {
      const clientCred = new this.ClientCredentialModel(ClientCredential);
      return await clientCred.save();
    } catch (error) {
      throw new NotFoundException('Unable to create client credential');
    }
  }

  async deleteClientCredential(
    clientCredID: string,
  ): Promise<ClientCredential> {
    try {
      const deletclientCred =
        await this.ClientCredentialModel.findByIdAndDelete(clientCredID);
      if (!deletclientCred) {
        throw new NotFoundException('Client credential not found for deletion');
      }
      return deletclientCred;
    } catch (error) {
      throw new NotFoundException('Unable to delete client credential');
    }
  }

  async updateClientCredential(
    clientCredID: string,
    createclientCred: ClientCredential,
  ): Promise<ClientCredential> {
    try {
      const updatedClientCred =
        await this.ClientCredentialModel.findByIdAndUpdate(
          clientCredID,
          createclientCred,
          { new: true },
        );
      if (!updatedClientCred) {
        throw new NotFoundException('Client credential not found for updating');
      }
      return updatedClientCred;
    } catch (error) {
      throw new NotFoundException('Unable to update client credential');
    }
  }
}
