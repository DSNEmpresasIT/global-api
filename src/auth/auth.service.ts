import { Injectable } from '@nestjs/common';
import { VerifyErrors, sign, verify } from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';
import { Payload } from './types/payload.interface';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signPayload(payload: Payload) {
    return sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
  }
  async validateUser(payload: Payload) {
    return await this.userService.findByPayload(payload);
  }

  async verifyToken(token: string): Promise<Payload | null> {
    return new Promise((resolve, reject) => {
      verify(
        token,
        process.env.JWT_SECRET_KEY,
        (err: VerifyErrors | null, decoded: object | undefined) => {
          if (err) {
            reject(err);
          } else {
            resolve(decoded as Payload);
          }
        },
      );
    });
  }
}
