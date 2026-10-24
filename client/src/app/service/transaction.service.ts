import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { environment } from "../../environments/environment";
import { TransactionDto } from "../dto/transaction.dto";
import { PaginatorRequest, PaginatorResponse } from "../dto/paginator.dto";

@Injectable({
    providedIn: 'root'
})
export class TransactionService{

    private readonly baseUrl = environment.api_url + 'transaction/';

    constructor(
        private readonly http: HttpService
    ){}

    async save(transactionDto: TransactionDto){
        await this.http.post(this.baseUrl, transactionDto)
    }

    async findAll(pag: PaginatorRequest): Promise <PaginatorResponse<TransactionDto>> {
        const transactions = await this.http.get<PaginatorResponse<TransactionDto>>(this.baseUrl, {
            params: pag
        });
        return transactions.data;
        
    }

    async delete(ids: number[]){
        await this.http.delete(this.baseUrl, {
            data: ids
        })
    }

    async update(transactionDto: TransactionDto){
        await this.http.put(this.baseUrl, transactionDto)
    }
}