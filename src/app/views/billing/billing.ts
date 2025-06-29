import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory';
import { Item } from '../../models/item.model';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-billing',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './billing.html',
  styleUrl: './billing.css'
})
export class Billing implements OnInit {
  items: Item[] = [];
  billForm: FormGroup;

  constructor(private inventoryService: InventoryService, private fb: FormBuilder) {
    this.billForm = this.fb.group({
      billItems: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.inventoryService.getItems().subscribe(data => {
      this.items = data;
      this.setBillItems();
    });
  }

  setBillItems() {
    const billItems = this.billForm.get('billItems') as FormArray;
    billItems.clear();
    // Start with one empty row
    billItems.push(this.fb.group({
      id: [null],
      name: [''],
      price: [0],
      quantity: [0]
    }));
  }

  onItemSelect(index: number) {
    const billItems = this.billForm.get('billItems') as FormArray;
    const group = billItems.at(index);
    const selectedId = group.get('id')?.value;
    const selectedItem = this.items.find(item => item.id === selectedId);
    if (selectedItem) {
      group.patchValue({
        name: selectedItem.name,
        price: selectedItem.price
      });
    } else {
      group.patchValue({
        name: '',
        price: 0
      });
    }
  }

  get billItems() {
    return (this.billForm.get('billItems') as FormArray).controls;
  }

  get total() {
    return this.billItems.reduce((sum, group: any) => {
      return sum + (group.value.quantity * group.value.price);
    }, 0);
  }

  finalizeBill() {
    const billed = this.billItems.filter((group: any) => group.value.quantity > 0).map((group: any) => group.value);
    console.log('Final Bill:', billed, 'Total:', this.total);
    alert('Bill finalized! Total: ' + this.total);
  }
}
