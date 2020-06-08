import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  //  replaced with service @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[];
  private subscription : Subscription;
  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.recipeChanged
    .subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    )
    this.recipes = this.recipeService.getRecipe();
    this.subscription = this.recipeService.newRecipe.subscribe(
      (recipe: Recipe[]) => {
        this.recipes = recipe;
      }
    )
  }

  // onEditRecipe(id: number) {
  //   this.recipeService.startedRecipeEditing.next(id);
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  // onRecipeSelected(recipe: Recipe) {
  //   this.recipeWasSelected.emit(recipe);
  // } replaced with service
}
