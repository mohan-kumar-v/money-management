import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Chart } from 'chart.js';
import { AddIncome } from './add-income/add-income';
import { AddExpense } from './add-expense/add-expense';
import { IncomeList } from './income-list/income-list';
import { ExpenseList } from './expense-list/expense-list';

export const routes: Routes = [
     { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard').then(m => m.Dashboard)
  },

  {
    path: 'income-list',
    loadComponent: () =>
      import('./income-list/income-list').then(m => m.IncomeList)
  },

  {
    path: 'add-income',
    loadComponent: () =>
      import('./add-income/add-income').then(m => m.AddIncome)
  },
  
  {
    path: 'expense-list',
    loadComponent: () =>
      import('./expense-list/expense-list').then(m => m.ExpenseList)
  },
  {
    path: 'add-expense',
    loadComponent: () =>
      import('./add-expense/add-expense').then(m => m.AddExpense)
  },
  {
    path: 'chart',
    loadComponent: () =>
      import('./chart/chart').then(m => m.Chart)
  }
    // {path:'',redirectTo: 'dashboard', pathMatch: 'full'},
    // {path:'income-list',component:IncomeList},
    // {path:'expense-list',component:ExpenseList},
    // {path: 'chart',component:Chart},
    // {path:'add-income',component:AddIncome},
    // {path:'add-expense',component:AddExpense}
    
];
