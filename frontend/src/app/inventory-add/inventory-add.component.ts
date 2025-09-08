import { Component } from '@angular/core';
import { InventoryService, Item } from '../inventory.service';

import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar.component';
@Component({
  selector: 'app-inventory-add',
  imports: [FormsModule, NavbarComponent],
  templateUrl: './inventory-add.component.html',
  styleUrl: './inventory-add.component.css'
})
export class InventoryAddComponent {
  newItem: Partial<Item> = { name: '', quantity: 0, price: 0 };

  constructor(private inventoryService: InventoryService) {}

  addItem() {
    if (!this.newItem.name || this.newItem.quantity! <= 0 || this.newItem.price! <= 0) {
      alert('Please fill in all fields correctly.');
      return;
    }
    this.inventoryService.addItem(this.newItem as Item).subscribe(() => {
      alert('Item added!');
      this.newItem = { name: '', quantity: 0, price: 0 };
    });
  }
}
