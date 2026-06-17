import { Injectable } from "@nestjs/common";
import { FixedTransactionService } from "./fixed-transaction.service";
import { TransactionService } from "./transaction.service";
import { RecordDto } from "src/dto/record.dto";
import { Category } from "src/enums/enums";
import { TransactionTableDto } from "src/dto/transactions-table.dto";
import { SummaryTransaction } from "src/classes/summary-transaction";
import { response } from "express";

@Injectable()
export class RecordService{

    constructor(
        private readonly fixedTransactionService: FixedTransactionService,
        private readonly transactionService: TransactionService
    ){}

    async listRecordsByUserIdAndYear(userId: number, year: number): Promise<RecordDto[]>{
        const beginDate = new Date(year, 0, 1);
        const endDate = new Date(year, 11, 31);

        const fixedTransaction = await this.fixedTransactionService.findAllByUserIdAndPeriod(userId, beginDate, endDate);
        const transactions = await this.transactionService.findAllByUserIdAndPeriod(userId, beginDate, endDate);

        const allTransactions = fixedTransaction.map(t => ({
            amount: t.amount,
            category: t.category,
            transactionDate: t.transactionDate 
        }) as SummaryTransaction);

        allTransactions.push(
            ...transactions.map(t => ({
                amount: t.amount,
                category: Category.EXPENDITURE,
                transactionDate: t.transactionDate    
            }))       
        )

        const transacGroupsByMonth: SummaryTransaction[][] = [];

        allTransactions.forEach(transaction => {
            const month = transaction.transactionDate.getMonth();

            transacGroupsByMonth[month] ??= [];
            transacGroupsByMonth[month].push(transaction);

        });

        const records: RecordDto[] = [];

        transacGroupsByMonth.forEach((transactions, month, map) => {
            const record: RecordDto = {
                date: new Date(year, month),
                totalIncome: transactions.filter(t => t.category === Category.INCOME).reduce((acc, t) => acc + t.amount, 0),
                totalExpenditure: transactions.filter(t => t.category === Category.EXPENDITURE).reduce((acc, t) => acc + t.amount, 0),
                finalBalance: 0
            }

            record.finalBalance = record.totalIncome - record.totalExpenditure;

            records.push(record);
        });

        return records;
    }

    async filterSearch(search: string, year: number, month: number, userId: number): Promise<TransactionTableDto[]> {
        const transactions = await this.listTransactionsByUserIdAndMonth(year, month, userId)

        const transactionResponde = transactions.filter(transactions =>
            transactions.name.toLocaleLowerCase().includes(search.toLowerCase())
        )

        return transactionResponde; 
    }

    async listTransactionsByUserIdMonthAndCategory(category: string, isFixed: any | null, year: number, month: number, userId: number):Promise<TransactionTableDto[]>{
        const transactions = await this.listTransactionsByUserIdAndMonth(year, month, userId);
        isFixed = isFixed === 'true' ? true : isFixed === 'false' ? false : null;

        if(isFixed == null || category === Category.INCOME){
            const transactionResponde = transactions.filter(transactions =>
                transactions.category === category
            )
            return transactionResponde;    
        }

        console.log('1', isFixed, typeof isFixed)

        const transactionResponde = transactions.filter(transactions =>
        transactions.category === category && transactions.isFixed === isFixed)
        return transactionResponde;
    }

    async filterSearchByUserId(category: string, isFixed: boolean | null, search: string, year: number, month: number, userId: number): Promise<TransactionTableDto[]> {
        if(category == 'all'){
            const response = await this.filterSearch(search, year, month, userId);
            return response; 
        }else{
            const transactions = await this.listTransactionsByUserIdMonthAndCategory(category, isFixed, year, month, userId);
            
            
            const response = transactions.filter(transactions =>
            transactions.name.toLocaleLowerCase().includes(search.toLowerCase()))
            console.log('opa')
        return response;
        }
    }

    async listTransactionsByUserIdAndMonth(year: number, month: number, userId: number): Promise<TransactionTableDto[]>{
        const beginDate = new Date(year, month, 1);
        const endDate = new Date(year, Number(month) + 1, 0);

        const fixedTransaction = await this.fixedTransactionService.findAllByUserIdAndPeriod(userId, beginDate, endDate);
        const transactions = await this.transactionService.findAllByUserIdAndPeriod(userId, beginDate, endDate);

        const allTransactions: TransactionTableDto[] = fixedTransaction.map(t => ({
            name: t.name,
            category: t.category,
            isFixed: true,
            amount: t.amount,
            transactionDate: t.transactionDate
        }));

        allTransactions.push(
            ...transactions.map(t => ({
                name: t.expenditure.name,
                category: Category.EXPENDITURE,
                isFixed: false,
                amount: t.amount,
                transactionDate: t.transactionDate
            }))       
        )

        return allTransactions;
    }
}