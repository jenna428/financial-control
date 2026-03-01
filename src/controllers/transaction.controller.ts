import { Body, Controller, Delete, Param, Post, Put, UseGuards } from "@nestjs/common";
import type { TransactionDto } from "src/dto/transaction.dto";
import { JwtGuard } from "src/guards/jwt.guard";
import { TransactionService } from "src/services/transaction.service";

@Controller('api/transaction')
export class TransactionController {
    constructor(
        private readonly transactionService: TransactionService
    ){}

    @UseGuards(JwtGuard)
    @Post('/')
    async save(@Body() transactionDto: TransactionDto){
        await this.transactionService.create(transactionDto)
    }

    @UseGuards(JwtGuard)
    @Delete('/:id')
    async delete(@Param('id') id: number){
        await this.transactionService.delete(id)
    }

    @UseGuards(JwtGuard)
    @Put('/')
    async update(@Body() transactionDto: TransactionDto){
        await this.transactionService.update(transactionDto)
    }
}