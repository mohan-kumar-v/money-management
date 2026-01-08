import { Component, OnInit } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Transaction } from '../services/transaction';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router} from '@angular/router';
import { Nav } from '../nav/nav';
import { Addbutton } from '../addbutton/addbutton';
import { Balance } from '../balance/balance';
import { map, Observable } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  imports: [FormsModule,CommonModule,Header,Footer,Nav,Addbutton,Balance],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit{
  
  // transactions$: any;
 transactions$!: Observable<any[]>;

  constructor(
    private txService: Transaction,
    private router: Router
  ) {}

  ngOnInit() {
    this.transactions$ = this.txService.getTransactions().pipe(
      map(list =>
        list.map(t => ({
          ...t,
          date: t.date?.toDate ? t.date.toDate() : t.date
        }))
      )
    );
  }

  edit(t: any) {
    if (!t?.id) return;

    if (t.type === 'income') {
      this.router.navigate(['/add-income'], { queryParams: { id: t.id } });
    } else {
      this.router.navigate(['/add-expense'], { queryParams: { id: t.id } });
    }
  }

  delete(t: any) {
    if (!t?.id) return;

    if (confirm('Are you sure?')) {
      this.txService.deleteById(t.id);
    }
  }
}
  // edit(t: any) {
  //   this.router.navigate(
  //     t.type === 'income'
  //       ? ['/add-income']
  //       : ['/add-expense'],
  //     { queryParams: { id: t.id } }
  //   );
  // }

//   delete(t: any) {
//     if (confirm('Are you sure?')) {
//       this.txService.deleteById(t.id);
//     }
//   }
// }
