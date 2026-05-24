import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpService } from "./http.service";
import { FixedTransactionDto } from "../dto/fixed-transaction.dto";
import { TransactionTableDto } from "../dto/transaction-table.dto";
import { VariableExpenditureDto } from "../dto/variable-expenditure.dto";
import { Category } from "../classes/enums/enums";

@Injectable({
    providedIn: 'root'
})
export class ToggleEnabledService{

    private readonly fixBaseUrl = environment.api_url + 'fixed-transaction/';
    private readonly varBaseUrl = environment.api_url + 'variable-expenditure/';
    
    constructor(
        private readonly http: HttpService
    ){}

    async findDisabledTransactions(): Promise <TransactionTableDto[]>{
        const [fixTransactions, varTransactions] = await Promise.all([
            this.http.get<FixedTransactionDto[]>(this.fixBaseUrl),
            this.http.get<VariableExpenditureDto[]>(this.varBaseUrl + 'disabled/')
        ]);
        
        const fixed = fixTransactions.data.map(i => ({
            name: i.name,
            id: i.id,
            category: i.category,
            isFixed: true
        }) as TransactionTableDto);

        const variable = varTransactions.data.map(c => ({
            name: c.name,
            id: c.id,
            category: Category.EXPENDITURE,
            isFixed: false
        }) as TransactionTableDto);

        return[...fixed, ...variable];
    }

    async isActive(id: number, isFixed: boolean){
        if(isFixed == true){
            await this.http.put(this.fixBaseUrl + id);
        }else{
            await this.http.put(this.varBaseUrl + id);
        }
        
    }
}