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
    this.salesService.getSales().subscribe((sales) => {
      this.dailySales = sales.filter(sale => {
        const saleDate = new Date(sale.date);
        return saleDate.toDateString() === this.today.toDateString();
      });
      this.monthSales = sales.filter(sale => {
        const saleDate = new Date(sale.date);
        return saleDate.getMonth() === this.month && saleDate.getFullYear() === this.year;
      });
      this.dailyTotal = this.dailySales.reduce((sum, sale) => sum + sale.total, 0);
      this.monthTotal = this.monthSales.reduce((sum, sale) => sum + sale.total, 0);
    });
  }
}
