import { ChangeDetectorRef, Component } from '@angular/core';
import { Transaction } from '../services/transaction';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Header } from '../header/header';

@Component({
  selector: 'app-add-income',
  imports: [FormsModule,CommonModule,RouterLink,Header],
  templateUrl: './add-income.html',
  styleUrl: './add-income.css',
})
export class AddIncome {

  id: any = null;

  income: any = {
    type: 'income',
    amount: '',
    date: this.toDateTimeLocal(new Date()),
    note: '',
    category: '',
    account:''
  };

  incomeCategories: string[] = [
    'Salary',
    'Business',
    'Interest',
    'Bonus',
    'Other'
  ];

  constructor(
    private txService: Transaction,
    private route: ActivatedRoute,
    private router: Router,
    private cdr:ChangeDetectorRef
  ) {}

  ngOnInit() {
  this.id = this.route.snapshot.queryParamMap.get('id');

  if (!this.id) return;

  this.txService.getTransactionById(this.id).then(docSnap => {
    if (!docSnap || !docSnap.exists()) return;

    const data: any = docSnap.data();

    this.income = {
      type: 'income',
      amount: data.amount ?? '',
      note: data.note ?? '',
      category: data.category ?? '',
      account: data.account ?? '',
      date: this.toDateTimeLocal(
        data.date?.toDate ? data.date.toDate() : data.date
      )
    };
    this.cdr.detectChanges();
    // console.log('Income bound to form:', this.income);
  });
}

  save() {
    if (this.id) {
      this.txService.updateById(this.id, this.income);
    } else {
      this.txService.addTransaction(this.income);
    }
    this.router.navigate(['/income-list']);
  }

  toDateTimeLocal(value: any) {
  const d = new Date(value);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
}

onSubmit() {
  const payload = {
    ...this.income,
    date: new Date(this.income.date) // convert back for Firestore
  };

  if (this.id) {
    this.txService.updateById(this.id, payload);
  } else {
    this.txService.addTransaction(payload);
  }

  this.router.navigate(['/income-list']);
}

}
