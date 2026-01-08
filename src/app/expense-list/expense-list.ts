import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Nav } from '../nav/nav';
import { Balance } from '../balance/balance';
import { Footer } from '../footer/footer';
import { Addbutton } from '../addbutton/addbutton';
import { Transaction } from '../services/transaction';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-expense-list',
  imports: [CommonModule,Header,Nav,Balance,Addbutton,Footer],
  templateUrl: './expense-list.html',
  styleUrl: './expense-list.css',
})
export class ExpenseList {

  expenseList$: any;
  
  constructor(
    private txService: Transaction,
    private router: Router
  ) { }

  ngOnInit() {
  this.expenseList$ = this.txService.getTransactions().pipe(
    map(list => list.filter(t => t.type === 'expense'))
  );
}
  // ngOnInit() {
  //   this.txService.getTransactions().subscribe(all => {
  //   this.transactions = all.filter(t => t.type === 'expense');
  // });
  // }

  edit(t: any) {
    this.router.navigate(['/add-expense'], { queryParams: { id: t.id } });
    // this.router.navigate(['/add-expense'], { queryParams: { id: t.id } });
  }

  delete(t: any) {
    if (confirm('Are you sure?')) {
      this.txService.deleteById(t.id);
      // this.ngOnInit();
    }
  }

}
