import { Component } from '@angular/core';
import { InventoryService, Item } from '../inventory.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar.component';

@Component({
  selector: 'app-inventory-list',
  imports: [CommonModule, NavbarComponent],
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.css'
})
export class InventoryListComponent {
  items: Item[] = [];

  constructor(private inventoryService: InventoryService, private router: Router) {}

  ngOnInit() {
    this.inventoryService.getItems().subscribe(data => {
      this.items = data;
    });
  }

  goToAdd() {
    this.router.navigate(['/add']);
  }

  goToEdit() {
    this.router.navigate(['/edit']);
  }

  goToDelete() {
    this.router.navigate(['/delete/1']); // Example: you can pass dynamic id if needed
  }
}
