import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipesComponent } from './recipes.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { DropdownDirectiveModule } from '../Shared/dropdown.module';
import { RecipeRouter } from './recipe-router.module';


@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeItemComponent,
    RecipesComponent,
    RecipeStartComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
  ],
  imports: [
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    DropdownDirectiveModule,
    RecipeRouter
],
  exports: []
})
export class RecipeModule {}
