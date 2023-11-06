import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthcheckservice() {
    return {
      serverStatus: 'Ok'
    };
  }
}
