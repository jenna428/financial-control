import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './config/ormConfig';
import { UserModule } from './module/user.module';
import { TransactionTypeModule } from './module/transaction-type.module';
import { TransactionModule } from './module/transaction.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    UserModule,
    TransactionTypeModule,
    TransactionModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
