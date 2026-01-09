import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Nav } from '../nav/nav';
import { Balance } from '../balance/balance';
import { Footer } from '../footer/footer';
import { Addbutton } from '../addbutton/addbutton';
import { Transaction } from '../services/transaction';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-income-list',
  imports: [FormsModule, CommonModule, Header, Nav, Balance, Addbutton, Footer],
  templateUrl: './income-list.html',
  styleUrl: './income-list.css',
})
export class IncomeList {

  incomeList$: any;

  constructor(
    private txService: Transaction,
    private router: Router) {}

  ngOnInit() {
    this.incomeList$ = this.txService.getTransactions().pipe(
      map(list =>
        list
          .filter(t => t.type === 'income')
          .map(t => ({
            ...t,
            date: t.date?.toDate ? t.date.toDate() : t.date
          }))
      )
    );
  }
  
  edit(t: any) {
    if (t.type === 'income') {
      this.router.navigate(['/add-income'], { queryParams: { id: t.id } });
    }
  }

  delete(t: any) {
    if (confirm('Are you sure?')) {
      this.txService.deleteById(t.id);
    }
  }

}