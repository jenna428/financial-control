import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import type { VariableExpenditureDto } from "src/dto/variable-expenditure.dto";
import { JwtGuard } from "src/guards/jwt.guard";
import { VariableExpenditureService } from "src/services/variable-expenditure.service";

@Controller('api/variable-expenditure')
export class VariableExpenditureController {
    constructor(
        private readonly variableExpenditureService: VariableExpenditureService
    ){}

    @UseGuards(JwtGuard)
    @Post('/')
    async save(@Request() req, @Body() transactionDto: VariableExpenditureDto){
        await this.variableExpenditureService.create(transactionDto, req.user.id)
    }

    @UseGuards(JwtGuard)
    @Get('/')
    async findAll(): Promise<VariableExpenditureDto[]> {
        const variableExpenditure = await this.variableExpenditureService.findAll();

        return variableExpenditure;
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