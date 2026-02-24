import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import type { TransactionTypeDto } from "src/dto/transaction-type.dto";
import { TransactionTypeService } from "src/services/transaction-type.service";

@Controller('api/transaction-type')
export class TransationTypeController {
    constructor(
        private readonly transactionTypeService: TransactionTypeService
    ){}

    @Post('/')
    async save(@Body() transactionDto: TransactionTypeDto){
        await this.transactionTypeService.create(transactionDto)
    }

    @Delete('/:id')
    async delete(@Param('id') id: number){
        await this.transactionTypeService.delete(id)
    }

    @Put('/')
    async update(@Body() transactionDto: TransactionTypeDto){
        await this.transactionTypeService.update(transactionDto)
    }

}