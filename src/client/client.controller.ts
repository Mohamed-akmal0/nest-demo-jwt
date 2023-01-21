import { Body, Controller, Post , Get, Req , Res } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';
import { Request, response } from 'express';
// import { NotFoundException } from '@nestjs/common/exceptions';
// import { ParseIntPipe } from '@nestjs/common/pipes';
import { ClientService } from './client.service';
import { createUserDto } from './dto/create-user.dto';

@Controller('api/client')
export class ClientController {
  constructor(private readonly clientService: ClientService,
    private jwtService : JwtService) {}

  // @Get()
  // getClients(@Query('name') name?:string) :any{
  //     return this.clientService.findAll(name)
  // }

  @Post('register')
  async register(@Body() body: createUserDto): Promise<any> {
    return this.clientService.createUser(body);
  }

  // @Get(':id')
  // getUserbyId(@Param('id' , ParseIntPipe) id:number) : any{
  //     const user = this.clientService.findById(id)
  //     if(!user) throw new NotFoundException();
  //     return user;
  // }

  @Post('login')
  async login(@Body() body: createUserDto): Promise<any> {
    //@ts-ignore
    return this.clientService.Login(body);
  }
  @Get('dashboard')
  async dash(@Req() req:Request) : Promise <any>{
    const cookie = req.cookies('jwt')
    const data = await this.jwtService.verifyAsync(cookie)
    if(!data) throw new UnauthorizedException()
    return data
  }
  @Post('logout')
  async logout(@Res({passthrough : true}) response :Response){
    
  }
}
