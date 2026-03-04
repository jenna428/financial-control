import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, Request, UseGuards } from "@nestjs/common";
import type { FixedTransactionDto } from "src/dto/fixed-transaction.dto";
import { JwtGuard } from "src/guards/jwt.guard";
import { FixedTransactionService } from "src/services/fixed-transaction.service";

@Controller('api/transaction-type')
export class FixedTransactionController {
    constructor(
        private readonly fixedTransactionService: FixedTransactionService
    ){}

    @UseGuards(JwtGuard)
    @Post('/')
    async save(@Body() transactionDto: FixedTransactionDto){
        await this.fixedTransactionService.create(transactionDto)
    }

    @UseGuards(JwtGuard)
    @Delete('/:id')
    async delete(@Param('id') id: number){
        await this.fixedTransactionService.delete(id)
    }

    @UseGuards(JwtGuard)
    @Put('/')
    async update(@Request() req, @Body() transactionDto: FixedTransactionDto) {
        await this.fixedTransactionService.update(transactionDto, req.user.id)
    }

}