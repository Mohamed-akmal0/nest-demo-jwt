import { BadRequestException, Injectable } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserRepo } from './user-repo';
import { JwtService } from '@nestjs/jwt';
import { Res } from '@nestjs/common';
import { Response } from 'express';

export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
};
@Injectable()
export class ClientService {
  constructor(
    private readonly userRepo: UserRepo,
    private jwtService: JwtService,
  ) {}
  private readonly users: User[] = [
    { id: 1, name: 'akmal', username: 'akk', password: 'hai' },
    {
      id: 2,
      name: 'ajmal',
      username: 'ajj',
      password: 'halo',
    },
  ];

  // constructor(private readonly user:User){}
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  findAll(name?: string): User[] {
    if (name) return this.users.filter((user) => user.username === name);
    return this.users;
  }
  findById(id: number) {
    return 'not found';
  }

  async createUser(body: createUserDto) {
    const { password, username, email } = body;
    const salt = 10;
    const hashPass = await bcrypt.hash(password, salt);
    console.log(hashPass);
    return this.userRepo.create(hashPass, username, email);
  }
  //@ts-ignore
  async Login(
    body: createUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { email, password } = body;
    const user = await this.userRepo.findOne(email);
    if (!user) throw new BadRequestException('Invalid username');
    if (!(await bcrypt.compare(password, user.password)))
      throw new BadRequestException('invalid pass');
    const jwt = this.jwtService.signAsync({ id: user.id });
    response.cookie('jwt' , jwt , {httpOnly : true})
    //inside logout route or function in user service
    response.clearCookie('jwt')
    response.json({status : true})
  }

  
}
