import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
// import { BullModule } from '@nestjs/bull';
// import { URL } from 'url';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './services/users/users.module';
import { RolesModule } from './services/roles/roles.module';
import { AuthModule } from './services/auth/auth.module';
import { PermissionsModule } from './services/permissions/permissions.module';
import { ProductsModule } from './services/products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),

    // BullModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => {
    //     const redisUrl = configService.get<string>('UPSTASH_REDIS_URL');
    //     if (!redisUrl) {
    //       throw new Error(
    //         'UPSTASH_REDIS_URL is not defined in environment variables',
    //       );
    //     }
    //     const parsed = new URL(redisUrl);

    //     return {
    //       redis: {
    //         host: parsed.hostname,
    //         port: parseInt(parsed.port, 10),
    //         password: parsed.password,
    //         tls: {}, // Upstash yêu cầu dùng SSL
    //       },
    //     };
    //   },
    //   inject: [ConfigService],
    // }),

    AuthModule,
    UsersModule,
    RolesModule,
    PermissionsModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
