import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Transaction } from '../services/transaction';

@Component({
  selector: 'app-balance',
  imports: [CommonModule],
  templateUrl: './balance.html',
  styleUrl: './balance.css',
})
export class Balance {

  totalIncome = 0;
  totalExpense = 0;

  constructor(private txService: Transaction) { }

  ngOnInit() {
    this.txService.getTotalIncome().subscribe((v: number) => this.totalIncome = v);
    this.txService.getTotalExpense().subscribe((v: number) => this.totalExpense = v);
  }

  get balance() {
    return this.totalIncome - this.totalExpense;
  }

}
