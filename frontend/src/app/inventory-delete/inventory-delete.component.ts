import { Component } from '@angular/core';
import { InventoryService, Item } from '../inventory.service';

import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar.component';
@Component({
  selector: 'app-inventory-delete',
  imports: [CommonModule, NavbarComponent],
  templateUrl: './inventory-delete.component.html',
  styleUrl: './inventory-delete.component.css'
})
export class InventoryDeleteComponent {
  items: Item[] = [];

  constructor(private inventoryService: InventoryService) {}

  ngOnInit() {
    this.inventoryService.getItems().subscribe(data => {
      this.items = data;
    });
  }

  deleteItem(id: number) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.inventoryService.deleteItem(id).subscribe(() => {
        alert('Item deleted!');
        this.inventoryService.getItems().subscribe(data => {
          this.items = data;
        });
      });
    }
  }
}
