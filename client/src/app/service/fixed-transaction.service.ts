import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { environment } from "../../environments/environment";
import { FixedTransactionDto } from "../dto/fixed-transaction.dto";
import { Category } from "../classes/enums/enums";
import { PaginatorRequest, PaginatorResponse } from "../dto/paginator.dto";

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

    async delete(ids: number[]){
        await this.http.delete(this.baseUrl, {
            data: ids
        })
    }

    async findByCategory(category: Category, pag: PaginatorRequest): Promise <PaginatorResponse<FixedTransactionDto>> {
        const response = await this.http.get<PaginatorResponse<FixedTransactionDto>>(this.baseUrl + category, {
            params: pag
        });
        return response.data;
    }
}