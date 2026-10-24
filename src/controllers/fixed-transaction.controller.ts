import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards } from "@nestjs/common";
import type { FixedTransactionDto } from "src/dto/fixed-transaction.dto";
import type { PaginatorRequest, PaginatorResponse } from "src/dto/paginator.dto";
import { Category } from "src/enums/enums";
import { JwtGuard } from "src/guards/jwt.guard";
import { FixedTransactionService } from "src/services/fixed-transaction.service";

@Controller('api/fixed-transaction')
export class FixedTransactionController {
    constructor(
        private readonly fixedTransactionService: FixedTransactionService
    ){}

    @UseGuards(JwtGuard)
    @Get('/:category')
    async findByCategory(@Request() req, @Param('category') category: Category, @Query() pag: PaginatorRequest): Promise<PaginatorResponse<FixedTransactionDto>>{
        const response = await this.fixedTransactionService.findByCategory(category, pag, req.user.id);

        return response;
    }

    @UseGuards(JwtGuard)
    @Post('/')
    async save(@Request() req, @Body() transactionDto: FixedTransactionDto){
        await this.fixedTransactionService.create(transactionDto, req.user.id);
    }

    @UseGuards(JwtGuard)
    @Delete('/')
    async delete(@Body() ids: number[], @Request() req){
        await this.fixedTransactionService.delete(ids, req.user.id)
    }

    @UseGuards(JwtGuard)
    @Put('/')
    async update(@Request() req, @Body() transactionDto: FixedTransactionDto) {
        await this.fixedTransactionService.update(transactionDto, req.user.id)
    }
}