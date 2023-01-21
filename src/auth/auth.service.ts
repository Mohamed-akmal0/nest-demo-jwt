import { Injectable } from '@nestjs/common';

import { ClientService } from 'src/client/client.service';
// import {User} from '../models/user'
@Injectable()
export class AuthService {
  constructor(
    private readonly clientService: ClientService, //this is for checking  user is validate or not.
  ) {}

  async validate(username: string, password: string): Promise<any> {
    const client = await this.clientService.findOne(username);
    if (client && client.password === password) {
      const { username, password, ...rest } = client;
      return rest;
    }

    // in real case we use bcrypt.compare for password comparing. this is just for demo purpose.
  }
}
