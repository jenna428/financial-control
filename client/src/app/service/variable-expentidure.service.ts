import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { environment } from "../../environments/environment";
import { VariableExpenditureDto } from "../dto/variable-expenditure.dto";
import { PaginatorRequest, PaginatorResponse } from "../dto/paginator.dto";

@Injectable({
    providedIn: 'root'
})
export class VariableExpenditureService{

    private readonly baseUrl = environment.api_url + 'variable-expenditure/';

    constructor(
        private readonly http: HttpService
    ){}

    async save(variableExpenditureDto: VariableExpenditureDto){
        await this.http.post(this.baseUrl, variableExpenditureDto)
    }

    async findToPaginatior(pag: PaginatorRequest): Promise <PaginatorResponse<VariableExpenditureDto>> {
        const transactions = await this.http.get<PaginatorResponse<VariableExpenditureDto>>(this.baseUrl, {
            params: pag
        });
        return transactions.data;
        
    }

    async findAll(): Promise <VariableExpenditureDto[]> {
        const transactions = await this.http.get<VariableExpenditureDto[]>(this.baseUrl + 'all');
        return transactions.data;
        
    }

    async update(variableExpenditureDto: VariableExpenditureDto){
        await this.http.put(this.baseUrl, variableExpenditureDto)
    }

    async delete(ids: number[]){
        await this.http.delete(this.baseUrl, {
            data: ids
        })
    }
}