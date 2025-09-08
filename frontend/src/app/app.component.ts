import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InventoryHomeComponent } from "./inventory-home/inventory-home.component";
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'inventory';
}
