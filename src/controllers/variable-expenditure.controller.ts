import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, Request, UseGuards } from "@nestjs/common";
import type { VariableExpenditureDto } from "src/dto/variable-expenditure.dto";
import { JwtGuard } from "src/guards/jwt.guard";
import { VariableExpenditureService } from "src/services/variable-expenditure.service";


@Controller('api/transaction-type')
export class VariableExpenditureController {
    constructor(
        private readonly variableExpenditureService: VariableExpenditureService
    ){}

    @UseGuards(JwtGuard)
    @Post('/')
    async save(@Body() transactionDto: VariableExpenditureDto){
        await this.variableExpenditureService.create(transactionDto)
    }

    @UseGuards(JwtGuard)
    @Delete('/:id')
    async delete(@Param('id') id: number){
        await this.variableExpenditureService.delete(id)
    }

    @UseGuards(JwtGuard)
    @Put('/')
    async update(@Request() req, @Body() transactionDto: VariableExpenditureDto) {
        await this.variableExpenditureService.update(transactionDto, req.user.id)
    }

}