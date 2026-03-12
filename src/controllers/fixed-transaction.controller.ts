import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, Request, UseGuards } from "@nestjs/common";
import type { FixedTransactionDto } from "src/dto/fixed-transaction.dto";
import { Category } from "src/enums/enums";
import { JwtGuard } from "src/guards/jwt.guard";
import { FixedTransactionService } from "src/services/fixed-transaction.service";

@Controller('api/fixed-transaction')
export class FixedTransactionController {
    constructor(
        private readonly fixedTransactionService: FixedTransactionService
    ){}

    @UseGuards(JwtGuard)
    @Get('/')
    async findByCategory(@Request() req, @Param('category') category: Category): Promise<FixedTransactionDto[]>{
        const transactions = await this.fixedTransactionService.findByCategory(category, req.user.id);
        return transactions;
    }

    @UseGuards(JwtGuard)
    @Post('/')
    async save(@Request() req, @Body() transactionDto: FixedTransactionDto){
        await this.fixedTransactionService.create(transactionDto, req.user.id);
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