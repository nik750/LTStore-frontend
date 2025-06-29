import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private items: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([
    { id: 1, name: 'Bread', quantity: 30, price: 2.0 },
    { id: 2, name: 'Croissant', quantity: 25, price: 3.5 },
    { id: 3, name: 'Muffin', quantity: 40, price: 2.5 },
    { id: 4, name: 'Bagel', quantity: 20, price: 2.2 },
    { id: 5, name: 'Donut', quantity: 50, price: 1.8 }
  ]);

  constructor() {}

  getItems(): Observable<Item[]> {
    return this.items.asObservable();
  }

  addItem(item: Item): void {
    const current = this.items.value;
    this.items.next([...current, item]);
  }

  updateItem(updatedItem: Item): void {
    const updated = this.items.value.map(item =>
      item.id === updatedItem.id ? updatedItem : item
    );
    this.items.next(updated);
  }

  deleteItem(id: number): void {
    const filtered = this.items.value.filter(item => item.id !== id);
    this.items.next(filtered);
  }
}
