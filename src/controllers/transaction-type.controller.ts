import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, Request, UseGuards } from "@nestjs/common";
import type { TransactionTypeDto } from "src/dto/transaction-type.dto";
import { JwtGuard } from "src/guards/jwt.guard";
import { TransactionTypeService } from "src/services/transaction-type.service";

@Controller('api/transaction-type')
export class TransationTypeController {
    constructor(
        private readonly transactionTypeService: TransactionTypeService
    ){}

    @UseGuards(JwtGuard)
    @Post('/')
    async save(@Body() transactionDto: TransactionTypeDto){
        await this.transactionTypeService.create(transactionDto)
    }

    @UseGuards(JwtGuard)
    @Delete('/:id')
    async delete(@Param('id') id: number){
        await this.transactionTypeService.delete(id)
    }

    @UseGuards(JwtGuard)
    @Put('/')
    async update(@Request() req, @Body() transactionDto: TransactionTypeDto) {
        await this.transactionTypeService.update(transactionDto, req.user.id)
    }

}