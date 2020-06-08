import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

import { ShoppingListComponent } from './shopping-list.component';

const shopRoutes: Routes = [{ path: 'shopList', component: ShoppingListComponent }];

@NgModule({
  imports: [
      RouterModule.forChild(shopRoutes)
  ],
  exports: [RouterModule],
})
export class ShoppingListRouter {}
