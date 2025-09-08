import { Routes } from '@angular/router';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { InventoryAddComponent } from './inventory-add/inventory-add.component';
import { InventoryDeleteComponent } from './inventory-delete/inventory-delete.component';
import { InventoryHomeComponent } from './inventory-home/inventory-home.component';
import { InventoryEditComponent } from './inventory-edit/inventory-edit.component';

export const routes: Routes = [
    { path: '', component: InventoryHomeComponent },
    { path: 'list', component: InventoryListComponent },
    { path: 'add', component: InventoryAddComponent },
    { path: 'edit', component: InventoryEditComponent },
    { path: 'delete', component: InventoryDeleteComponent },
    { path: 'delete/:id', component: InventoryDeleteComponent }
];
