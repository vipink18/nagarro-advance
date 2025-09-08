import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService, Item } from '../inventory.service';
import { NavbarComponent } from '../navbar.component';

@Component({
  selector: 'app-inventory-edit',
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './inventory-edit.component.html',
  styleUrl: './inventory-edit.component.css'
})
export class InventoryEditComponent {
  items: Item[] = [];
  selectedItem: Item | null = null;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit() {
    this.inventoryService.getItems().subscribe(data => {
      this.items = data;
    });
  }

  selectItem(item: Item) {
    this.selectedItem = { ...item };
  }

  saveEdit() {
    if (this.selectedItem) {
      this.inventoryService.updateItem(this.selectedItem.id, this.selectedItem).subscribe(() => {
        alert('Item updated!');
        this.selectedItem = null;
        this.inventoryService.getItems().subscribe(data => {
          this.items = data;
        });
      });
    }
  }
}
