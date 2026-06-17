import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { RecordDto } from "../dto/record.dto";
import { environment } from "../../environments/environment";
import { TransactionTableDto } from "../dto/transaction-table.dto";
import { query } from "@angular/animations";

@Injectable({
    providedIn: 'root'
})
export class RecordService{

    constructor(
        private readonly http: HttpService
    ){}

    private readonly baseUrl = environment.api_url + 'record/';

    async findAllByYear(year: number): Promise<RecordDto[]>{
        const records = await this.http.get<RecordDto[]>(this.baseUrl + 'year/' + year);
        return records.data;
    }

    async findOneByMonth(year: number, month: number): Promise<TransactionTableDto[]>{
        const transactions = await this.http.get<TransactionTableDto[]>(`${this.baseUrl}all/${year}/${month}`);
        return transactions.data;
    }

    async filterCategory(category: string, isFixed: boolean | null, year: number, month: number):Promise<TransactionTableDto[]>{
        const returner = await this.http.get<TransactionTableDto[]>(`${this.baseUrl}category`, {params: { category, isFixed, year, month}});
        return returner.data;
    }

    async filterSearch(category: string, isFixed: boolean | null, search: string, year: number, month: number):Promise<TransactionTableDto[]>{

        if (!search || search.trim() === '') {
            if(category == null){
                return this.findOneByMonth(year, month);
            }else{
                return this.filterCategory(category, isFixed, year, month);
            }
        }
        if(category == null){
            category = 'all'
        }

        const returner = await this.http.get<TransactionTableDto[]>(`${this.baseUrl}filter`, {params: { category, isFixed, search, year, month }});
        console.log(returner.data);
        return returner.data;

    }
}