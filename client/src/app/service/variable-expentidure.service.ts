import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { environment } from "../../environments/environment";
import { VariableExpenditureDto } from "../dto/variable-expenditure.dto";
import { Category } from "../classes/enums/enums";

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

    async findAll(): Promise <VariableExpenditureDto[]> {
        const transactions = await this.http.get<VariableExpenditureDto[]>(this.baseUrl);
        // console.log(transactions);
        return transactions.data;
        
    }

    async update(variableExpenditureDto: VariableExpenditureDto){
        await this.http.put(this.baseUrl, variableExpenditureDto)
    }
}