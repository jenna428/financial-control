import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './config/ormConfig';
import { UserModule } from './module/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { VariableExpenditureModule } from './module/variable-expenditure.module';
import { RecordController } from './controllers/record.controller';
import { RecordService } from './services/record.service';
import { TransactionService } from './services/transaction.service';
import { TransactionEntity } from './entity/transaction.entity';
import { FixedTransactionEntity } from './entity/fixed-transaction.entity';
import { TransactionController } from './controllers/transaction.controller';
import { FixedTransactionController } from './controllers/fixed-transaction.controller';
import { TransactionRepository } from './repository/transaction.repository';
import { FixedTransactionRepository } from './repository/fixed-transaction.repository';
import { FixedTransactionService } from './services/fixed-transaction.service';
import { Transaction2Repository } from './repository/transaction2.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    TypeOrmModule.forFeature([
      TransactionEntity, 
      FixedTransactionEntity
    ]),
    PassportModule,
    UserModule,
    VariableExpenditureModule,
  ],
  controllers: [
    TransactionController,
    FixedTransactionController,
    RecordController
  ],
  providers: [
    JwtStrategy,
    //Repositories
    TransactionRepository,
    Transaction2Repository,
    FixedTransactionRepository,
    //Services
    TransactionService,
    FixedTransactionService,
    RecordService
  ],
})
export class AppModule {}
