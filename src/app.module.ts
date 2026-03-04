import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './config/ormConfig';
import { UserModule } from './module/user.module';
import { FixedTransactionModule } from './module/fixed-transaction.module';
import { TransactionModule } from './module/transaction.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { VariableExpenditureModule } from './module/variable-expenditure.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    PassportModule,
    UserModule,
    FixedTransactionModule,
    TransactionModule,
    VariableExpenditureModule
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
