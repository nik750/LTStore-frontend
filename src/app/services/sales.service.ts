import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SaleRecord {
  date: Date;
  items: Array<{ name: string; price: number; quantity: number }>;

  total: number;
}

@Injectable({ providedIn: 'root' })
export class SalesService {
  private API_URL = 'http://ec2-65-2-9-170.ap-south-1.compute.amazonaws.com:3000';

  constructor(private http: HttpClient) {}

  getSales(): Observable<SaleRecord[]> {
    return this.http.get<SaleRecord[]>(`${this.API_URL}/sales`);
  }

  addSale(record: SaleRecord): Observable<SaleRecord> {
    return this.http.post<SaleRecord>(`${this.API_URL}/sales`, record);
  }

  // Add more methods as needed for reports, etc.
}
