import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface SaleRecord {
  date: Date;
  items: Array<{ name: string; price: number; quantity: number }>;
  total: number;
}

@Injectable({ providedIn: 'root' })
export class SalesService {
  private STORAGE_KEY = 'sales_history';
  private sales: BehaviorSubject<SaleRecord[]> = new BehaviorSubject<SaleRecord[]>([]);

  constructor() {
    if (this.isBrowser()) {
      this.loadFromStorage();
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  addSale(record: SaleRecord) {
    const current = this.sales.value;
    const updated = [...current, record];
    this.sales.next(updated);
    if (this.isBrowser()) {
      this.saveToStorage(updated);
    }
  }

  private saveToStorage(sales: SaleRecord[]) {
    if (this.isBrowser()) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sales));
    }
  }

  private loadFromStorage() {
    if (!this.isBrowser()) return;
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        this.sales.next(parsed);
      } catch {}
    }
  }

  getSales(): Observable<SaleRecord[]> {
    return this.sales.asObservable();
  }

  getSalesForDate(date: Date): SaleRecord[] {
    const d = date.toDateString();
    return this.sales.value.filter(sale => new Date(sale.date).toDateString() === d);
  }

  getSalesForMonth(month: number, year: number): SaleRecord[] {
    return this.sales.value.filter(sale => {
      const saleDate = new Date(sale.date);
      return saleDate.getMonth() === month && saleDate.getFullYear() === year;
    });
  }

  getTotalExpenseForMonth(month: number, year: number): number {
    return this.getSalesForMonth(month, year).reduce((sum, sale) => sum + sale.total, 0);
  }

  getTotalExpenseForDate(date: Date): number {
    return this.getSalesForDate(date).reduce((sum, sale) => sum + sale.total, 0);
  }
}
