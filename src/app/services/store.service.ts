import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Store {
  id: string;
  name: string;
  location: string;
}

@Injectable({ providedIn: 'root' })
export class StoreService {
  private API_URL = 'http://ec2-65-2-9-170.ap-south-1.compute.amazonaws.com:3000';

  constructor(private http: HttpClient) {}

  getStores(): Observable<Store[]> {
    return this.http.get<Store[]>(`${this.API_URL}/stores`);
  }

  addStore(store: Store): Observable<Store> {
    return this.http.post<Store>(`${this.API_URL}/stores`, store);
  }
}
