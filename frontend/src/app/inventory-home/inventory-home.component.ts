import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar.component";


@Component({
  selector: 'app-inventory-home',
  imports: [NavbarComponent],
  templateUrl: './inventory-home.component.html',
  styleUrl: './inventory-home.component.css'
})
export class InventoryHomeComponent {
  constructor(private router: Router) {}

  showInventory() {
    this.router.navigate(['list']);
  }

  addInventory() {
    this.router.navigate(['add']);
  }

  editInventory() {
    this.router.navigate(['edit']);
  }

  deleteInventory() {
    this.router.navigate(['delete']);
  }
}