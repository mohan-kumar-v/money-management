import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Transaction } from '../services/transaction';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Header } from '../header/header';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-expense',
  imports: [FormsModule, CommonModule, Header],
  templateUrl: './add-expense.html',
  styleUrl: './add-expense.css',
})

export class AddExpense implements OnInit {

  id: any = null;

  expense: any = {
    type: 'expense',
    amount: '',
    date: this.toDateTimeLocal(new Date()),
    note: '',
    category: '',
    account: ''
  };

  expenseCategories: string[] = [
    'Food',
    'Transport',
    'Household',
    'Apparel',
    'Beauty',
    'Health',
    'Education',
    'Others'
  ];

  constructor(
    private txService: Transaction,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.queryParamMap.get('id');
    if (!this.id) return;

    this.txService.getTransactionById(this.id).then(docSnap => {
      if (!docSnap || !docSnap.exists()) return;

      const data: any = docSnap.data();

      this.expense = {
        type: 'expense', // ✅ FIXED
        amount: data.amount ?? '',
        category: data.category ?? '',
        note: data.note ?? '',
        account: data.account ?? '',
        date: this.toDateTimeLocal(
          data.date?.toDate ? data.date.toDate() : data.date
        )
      };
      this.cdr.detectChanges();
    });
  }

  toDateTimeLocal(value: any) {
    const d = new Date(value);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 16);
  }

  onSubmit() {
    const payload = {
      ...this.expense,
      date: new Date(this.expense.date),
      type: 'expense'
    };
    if (this.id) {
      this.txService.updateById(this.id, payload); // ✅ FIXED
    } else {
      this.txService.addTransaction(payload);
    }
    this.router.navigate(['/expense-list']);
  }
}
