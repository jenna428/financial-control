import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
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
    async save(@Body() transactionDto: TransactionDto, @Request() req){
        await this.transactionService.create(transactionDto, req.user.id)
    }

    @UseGuards(JwtGuard)
    @Delete('/:id')
    async delete(@Param('id') id: number, @Request() req){
        await this.transactionService.delete(id, req.user.id)
    }

    @UseGuards(JwtGuard)
    @Get('/')
    async findAll(@Request() req): Promise<TransactionDto[]> {
        return await this.transactionService.findAllByUserId(req.user.id); 
    }

    @UseGuards(JwtGuard)
    @Put('/')
    async update(@Body() transactionDto: TransactionDto, @Request() req){
        await this.transactionService.update(transactionDto, req.user.id)
    }
}