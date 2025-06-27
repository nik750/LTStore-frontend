import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Item } from '../../models/item.model';
import { InventoryService } from '../../services/inventory';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-items',
  imports: [CommonModule,
    MatPaginatorModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './items.html',
  styleUrl: './items.css'
})
export class Items implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  items: Item[] = [];
  displayedColumns = ['name', 'quantity', 'price'];

  dataSource!: MatTableDataSource<Item>;

  productForm: FormGroup;
  constructor(private inventoryService: InventoryService, private fb: FormBuilder) {

    this.productForm = this.fb.group({
      name: [''],
      quantity: [0],
      price: [0]
    });

  }
  submit() {
    console.log('Submitted data:', this.productForm.value);
  }

  ngOnInit(): void {
    this.inventoryService.getItems().subscribe((data) => {
      this.items = data;
      this.dataSource = new MatTableDataSource<Item>(this.items)
      this.dataSource.paginator = this.paginator;
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
