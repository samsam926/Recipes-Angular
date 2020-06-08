import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../Shared/ingredient.model';
import { ShopListService } from '../shopping-list/shop-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
  recipeSelected = new Subject<Recipe>();
  newRecipe = new Subject<Recipe[]>();
  startedRecipeEditing = new Subject<number>();
  private recipes: Recipe[] = [
    // new Recipe(
    //   'test1',
    //   'test desc',
    //   'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
    //   [new Ingredient('Bun', 2), new Ingredient('meat', 1)]
    // ),
    // new Recipe(
    //   'test2',
    //   'test 2 desc',
    //   'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
    //   [new Ingredient('Bun', 2), new Ingredient('meat', 1)]
    // ),
  ];

  constructor(private slService: ShopListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipe() {
    return this.recipes.slice();
  }

  getRecipes(index: number) {
    return this.recipes[index];
  }

  addRecipe(rec: Recipe) {
    this.recipes.push(rec);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipeItem: Recipe) {
    this.recipes[index] = newRecipeItem;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice())
  }
  addRecipes(recs: Recipe[]) {
    this.recipes.push(...recs);
    this.newRecipe.next(this.recipes.slice());
  }

  addIngredientToShoppingList(ingredient: Ingredient[]) {
    this.slService.addIngredients(ingredient);
  }
}
