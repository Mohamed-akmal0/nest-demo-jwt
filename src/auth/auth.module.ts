import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ClientModule } from 'src/client/client.module';
import { AuthService } from './auth.service';
import { localStrategy } from './auth.strategy';

@Module({
  imports: [ClientModule, PassportModule],
  providers: [AuthService, localStrategy],
})
export class AuthModule {}
