import { Controller, Get, Param, UseGuards, Request, Query } from "@nestjs/common";
import type { TransactionQuery } from "src/classes/transaction-query";
import { RecordDto } from "src/dto/record.dto";
import { TransactionTableDto } from "src/dto/transactions-table.dto";
import { Category } from "src/enums/enums";
import { JwtGuard } from "src/guards/jwt.guard";
import { RecordService } from "src/services/record.service";

@Controller('api/record')
export class RecordController {

    constructor(
        private readonly recordService: RecordService
    ){}

    @UseGuards(JwtGuard)
    @Get('/year/:year')
    async findAll(@Request() req, @Param('year') year: number): Promise<RecordDto[]>{
        return await this.recordService.listRecordsByUserIdAndYear(req.user.id, year);
    }

    @UseGuards(JwtGuard)
    @Get('/all/:year/:month')
    async findByMonth(@Request() req, @Param('year') year: number, @Param('month') month: number): Promise<TransactionTableDto[]>{
        return await this.recordService.listTransactionsByUserIdAndMonth(year, month, req.user.id)
    }

    @UseGuards(JwtGuard)
    @Get('/category')
    async filterCategory(@Request() req, @Query() query: TransactionQuery): Promise<TransactionTableDto[]>{
        return await this.recordService.listTransactionsByUserIdMonthAndCategory(query.category, query.isFixed, query.year, query.month, req.user.id)
    }

    @UseGuards(JwtGuard)
    @Get('/filter')
    async filterCategorySearch(@Request() req, @Query() query: any): Promise<TransactionTableDto[]>{
        console.log("Query", query);
        return await this.recordService.filterSearchByUserId(query.category, query.isFixed, query.search, query.year, query.month, req.user.id)
    }
}