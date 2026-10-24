import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards } from "@nestjs/common";
import type { PaginatorRequest, PaginatorResponse } from "src/dto/paginator.dto";
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
    @Get('/all')
    async findAll(@Request() req): Promise<VariableExpenditureDto[]> {
        const variableExpenditure = await this.variableExpenditureService.findAll(req.user.id);

        return variableExpenditure;
    }

    @UseGuards(JwtGuard)
    @Get('/')
    async findToPaginator(@Request() req, @Query() pag: PaginatorRequest): Promise<PaginatorResponse<VariableExpenditureDto>> {
        const variableExpenditure = await this.variableExpenditureService.findToPaginator(pag, req.user.id);

        return variableExpenditure;
    }

    @UseGuards(JwtGuard)
    @Delete('/')
    async delete(@Body() ids: number[], @Request() req){
        await this.variableExpenditureService.delete(ids, req.user.id)
    }

    @UseGuards(JwtGuard)
    @Put('/')
    async update(@Request() req, @Body() transactionDto: VariableExpenditureDto) {
        await this.variableExpenditureService.update(transactionDto, req.user.id)
    }

}