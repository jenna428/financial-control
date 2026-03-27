import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { environment } from "../../environments/environment";
import { FixedTransactionDto } from "../dto/fixed-transaction.dto";
import { Category } from "../classes/enums/enums";

@Injectable({
    providedIn: 'root'
})
export class FixedTransactionService{

    private readonly baseUrl = environment.api_url + 'fixed-transaction/';

    constructor(
        private readonly http: HttpService
    ){}

    async save(fixedTransactionDto: FixedTransactionDto){
        await this.http.post(this.baseUrl, fixedTransactionDto)
    }

    async update(fixedTransactionDto: FixedTransactionDto){
        await this.http.put(this.baseUrl, fixedTransactionDto)
    }

    async findByCategory(category: Category): Promise <FixedTransactionDto[]> {
    const transactions = await this.http.get<FixedTransactionDto[]>(this.baseUrl + category);
    return transactions.data;
  }
}