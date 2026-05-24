import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { RecordDto } from "../dto/record.dto";
import { environment } from "../../environments/environment";
import { TransactionTableDto } from "../dto/transaction-table.dto";

@Injectable({
    providedIn: 'root'
})
export class RecordService{

    constructor(
        private readonly http: HttpService
    ){}

    private readonly baseUrl = environment.api_url + 'record/';

    async findAllByYear(year: number): Promise<RecordDto[]>{
        const records = await this.http.get<RecordDto[]>(this.baseUrl + year);
        return records.data;
    }

    async findOneByMonth(year: number, month: number): Promise<TransactionTableDto[]>{
        const transactions = await this.http.get<TransactionTableDto[]>(`${this.baseUrl}all/${year}/${month}`);
        return transactions.data;
    }

    /*async filterSearch(search: string, year: number, month: number):Promise<TransactionTableDto[]>{

        if (!search || search.trim() === '') {
        return this.findOneByMonth(year, month);
        }

        const returner = await this.http.get<TransactionTableDto[]>(`${this.baseUrl}${search}/${year}/${month}`);
        return returner.data;
    }*/

    async filterCategory(category: string, year: number, month: number):Promise<TransactionTableDto[]>{
        const returner = await this.http.get<TransactionTableDto[]>(`${this.baseUrl}category/${category}/${year}/${month}`);
        return returner.data;
    }

    async filterSearch(category: string, search: string, year: number, month: number):Promise<TransactionTableDto[]>{

        if (!search || search.trim() === '') {
            if(category == null){
                return this.findOneByMonth(year, month);
            }else{
                return this.filterCategory(category, year, month);
            }
        }
        if(category == null){
            category = 'all'
        }
        const returner = await this.http.get<TransactionTableDto[]>(`${this.baseUrl}${category}/${search}/${year}/${month}`);
        return returner.data;
    }

}