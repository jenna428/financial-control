import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './config/ormConfig';
import { UserModule } from './module/user.module';
import { TransactionTypeModule } from './module/transaction-type.module';
import { TransactionModule } from './module/transaction.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    PassportModule,
    UserModule,
    TransactionTypeModule,
    TransactionModule
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
