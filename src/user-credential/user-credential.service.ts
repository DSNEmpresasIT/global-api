import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserCredential } from './schemas/UserCredential.entity';

@Injectable()
export class UserCredentialService {
  constructor(
    @InjectModel(UserCredential.name)
    private userCredentialModel: Model<UserCredential>,
  ) {}
  async getUserCredentials(): Promise<UserCredential[]> {
    const userCredentials = await this.userCredentialModel.find();
    return userCredentials;
  }

  async getUserCredential(userCredID: string): Promise<UserCredential> {
    const userCredential = await this.userCredentialModel.findById(userCredID);
    return userCredential;
  }

  async createUserCredential(
    userCredential: UserCredential,
  ): Promise<UserCredential> {
    const userCred = new this.userCredentialModel(userCredential);
    return await userCred.save();
  }

  async deleteUserCredential(userCredID: string): Promise<UserCredential> {
    const deletUserCred =
      await this.userCredentialModel.findByIdAndDelete(userCredID);
    return deletUserCred;
  }

  async updateUserCredential(
    userCredID: string,
    createUserCred: UserCredential,
  ): Promise<UserCredential> {
    const updatedUserCred = await this.userCredentialModel.findByIdAndUpdate(
      userCredID,
      createUserCred,
      { new: true },
    );
    return updatedUserCred;
  }
}
