import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { Transaction } from '../services/transaction';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './chart.html',
  styleUrl: './chart.css'
})


export class Chart implements OnInit {

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  isBrowser() {
    return typeof window !== 'undefined';
  }

  chartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Income', 'Expense'],
    datasets: [{
      data: [0, 0],
      backgroundColor: ['#2ecc71', '#e74c3c']
    }]
  };

  chartOptions: ChartConfiguration<'pie'>['options'] = {};

  constructor(private txService: Transaction) { }

  ngOnInit() {
    combineLatest([
      this.txService.getTotalIncome(),
      this.txService.getTotalExpense()
    ]).subscribe(([income, expense]) => {
      this.chartData.datasets[0].data = [income, expense];
      this.chart?.update();
    });
  }
}
