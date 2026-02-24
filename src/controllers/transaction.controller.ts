import { Body, Controller, Delete, Param, Post, Put } from "@nestjs/common";
import type { TransactionDto } from "src/dto/transaction.dto";
import { TransactionService } from "src/services/transaction.service";

@Controller('api/transaction')
export class TransactionController {
    constructor(
        private readonly transactionService: TransactionService
    ){}

    @Post('/')
    async save(@Body() transactionDto: TransactionDto){
        await this.transactionService.create(transactionDto)
    }

    @Delete('/:id')
    async delete(@Param('id') id: number){
        await this.transactionService.delete(id)
    }

    @Put('/')
    async update(@Body() transactionDto: TransactionDto){
        await this.transactionService.update(transactionDto)
    }
}