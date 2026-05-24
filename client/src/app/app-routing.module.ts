import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FixedTransactionCreateComponent } from './components/fixed-transaction-create/fixed-transaction-create.component';
import { VariableExpenditureCreateComponent } from './components/variable-expenditure-create/variable-expenditure-create.component';
import { TransactionCreateComponent } from './components/transaction-create/transaction-create.component';
import { DisabledTransactionsComponent } from './components/disabled-transactions/disabled-transactions.component';
import { RecordComponent } from './components/record/record.component';
import { MonthRecordComponent } from './components/month-record/month-record.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: UserRegisterComponent
  },
  {
    path: 'pecunia',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'fixed-transaction',
        children: [
          {
            path: ':category',
            component: FixedTransactionCreateComponent
          },
        ]
      },
      {
        path: 'variable-expenditure',
        component: VariableExpenditureCreateComponent
      },
      {
        path: 'transaction',
        component: TransactionCreateComponent
      },
      {
        path: 'disabled-transactions',
        component: DisabledTransactionsComponent
      },
      {
        path: 'record',
        component: RecordComponent
      },
      {
        path: 'record-month/:year/:month',
        component: MonthRecordComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }