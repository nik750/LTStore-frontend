import { Component, OnInit } from '@angular/core';
import { SalesService, SaleRecord } from '../../services/sales.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './reports.html',
  styleUrls: ['./reports.css']
})
export class Reports implements OnInit {
  today: Date = new Date();
  month: number = this.today.getMonth();
  year: number = this.today.getFullYear();
  dailySales: SaleRecord[] = [];
  monthSales: SaleRecord[] = [];
  dailyTotal = 0;
  monthTotal = 0;

  constructor(private salesService: SalesService) {}

  ngOnInit() {
    this.loadReports();
  }

  loadReports() {
    this.dailySales = this.salesService.getSalesForDate(this.today);
    this.monthSales = this.salesService.getSalesForMonth(this.month, this.year);
    this.dailyTotal = this.salesService.getTotalExpenseForDate(this.today);
    this.monthTotal = this.salesService.getTotalExpenseForMonth(this.month, this.year);
  }
}
