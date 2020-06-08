import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, take, exhaustMap, tap } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipe = this.recipeService.getRecipe();
    this.httpClient
      .put('https://first-angular-9abd9.firebaseio.com/recipes.json', recipe)
      .subscribe((response) => {
        console.log(response);
      });
    alert('list saved sucessfully');
  }
  fetchRecipe() {
    return this.httpClient
      .get<Recipe[]>('https://first-angular-9abd9.firebaseio.com/recipes.json')
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredient: recipe.ingredient ? recipe.ingredient : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
          alert('list fetched successfully!');
        })
      );
  }
}
