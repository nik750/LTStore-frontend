import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory';
import { Item } from '../../models/item.model';
import { FormBuilder, FormGroup, FormArray, AbstractControl, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { SalesService } from '../../services/sales.service';

@Component({
  standalone: true,
  selector: 'app-billing',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './billing.html',
  styleUrls: ['./billing.css']
})
export class Billing implements OnInit {
  items: Item[] = [];
  billForm: FormGroup;

  constructor(private inventoryService: InventoryService, private fb: FormBuilder, private salesService: SalesService) {
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
    this.salesService.addSale({
      date: new Date(),
      items: billed,
      total: this.total
    });
    this.printBill(billed, this.total);
  }

  printBill(billed: any[], total: number) {
    const billWindow = window.open('', '_blank', 'width=600,height=800');
    if (!billWindow) return;
    const billHtml = `
      <html>
      <head>
        <title>Bill</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 24px; }
          h2 { text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background: #f5f5f5; }
          .total { text-align: right; font-weight: bold; }
        </style>
      </head>
      <body>
        <h2>Bill</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${billed.map(item => `
              <tr>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>${item.quantity}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div class="total">Grand Total: ${total.toFixed(2)}</div>
      </body>
      </html>
    `;
    billWindow.document.write(billHtml);
    billWindow.document.close();
    billWindow.print();
  }

  getQuantityControl(group: AbstractControl) {
    return group.get('quantity') as FormControl;
  }

  getIdControl(group: AbstractControl) {
    return group.get('id') as FormControl;
  }

  addBillItem() {
    const billItems = this.billForm.get('billItems') as FormArray;
    billItems.push(this.fb.group({
      id: [null],
      name: [''],
      price: [0],
      quantity: [0]
    }));
  }
}
