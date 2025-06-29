import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private API_URL = 'http://ec2-65-2-9-170.ap-south-1.compute.amazonaws.com:3000';

  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.API_URL}/inventory`);
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(`${this.API_URL}/inventory`, item);
  }

  updateItem(item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.API_URL}/inventory/${item.id}`, item);
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/inventory/${id}`);
  }
}
