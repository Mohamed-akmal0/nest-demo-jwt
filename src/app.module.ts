import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

import { ClientModule } from './client/client.module';
import { TheaterModule } from './theater/theater.module';
import { AdminModule } from './admin/admin.module';
import { JwtModule } from '@nestjs/jwt/dist';

@Module({
  imports: [
    AuthModule,
    ClientModule,
    TheaterModule,
    AdminModule,
    JwtModule.register({
      secret: 'hai',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
