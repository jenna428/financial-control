import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { environment } from "../../environments/environment";
import { TransactionDto } from "../dto/transaction.dto";

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

    async findAll(): Promise <TransactionDto[]> {
        const transactions = await this.http.get<TransactionDto[]>(this.baseUrl);
        return transactions.data;
        
    }

    async delete(id: number){
        await this.http.delete(this.baseUrl + id)
    }

    async update(transactionDto: TransactionDto){
        await this.http.put(this.baseUrl, transactionDto)
    }
}