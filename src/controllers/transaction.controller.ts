import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards } from "@nestjs/common";
import type { PaginatorRequest, PaginatorResponse } from "src/dto/paginator.dto";
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
    @Delete('/')
    async delete(@Body() ids: number[], @Request() req){
        await this.transactionService.delete(ids, req.user.id)
    }

    @UseGuards(JwtGuard)
    @Get('/')
    async findAll(@Request() req, @Query() pag: PaginatorRequest): Promise<PaginatorResponse<TransactionDto>> {
        return await this.transactionService.findAllByUserId(pag, req.user.id); 
    }

    @UseGuards(JwtGuard)
    @Put('/')
    async update(@Body() transactionDto: TransactionDto, @Request() req){
        await this.transactionService.update(transactionDto, req.user.id)
    }
}