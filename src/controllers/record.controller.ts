import { Controller, Get, Param, UseGuards, Request } from "@nestjs/common";
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
    @Get('/:year')
    async findAll(@Request() req, @Param('year') year: number): Promise<RecordDto[]>{
        return await this.recordService.listRecordsByUserIdAndYear(req.user.id, year);
    }

    @UseGuards(JwtGuard)
    @Get('/all/:year/:month')
    async findByMonth(@Request() req, @Param('year') year: number, @Param('month') month: number): Promise<TransactionTableDto[]>{
        return await this.recordService.listTransactionsByUserIdAndMonth(year, month, req.user.id)
    }

    @UseGuards(JwtGuard)
    @Get('/category/:category/:year/:month/')
    async filterCategory(@Request() req, @Param('category') category: string, @Param('year') year: number, @Param('month') month: number): Promise<TransactionTableDto[]>{
        return await this.recordService.listTransactionsByUserIdMonthAndCategory(category, year, month, req.user.id)
    }

    @UseGuards(JwtGuard)
    @Get('/:category/:search/:year/:month/')
    async filterCategorySearch(@Request() req, @Param('category') category: string, @Param('search') search: string, @Param('year') year: number, @Param('month') month: number): Promise<TransactionTableDto[]>{
        return await this.recordService.filterSearchByUserId(category, search, year, month, req.user.id)
    }
}