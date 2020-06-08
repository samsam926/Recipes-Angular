import { Ingredient } from '../Shared/ingredient.model';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export class ShopListService {
    newIngredient = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    
    private ingredients: Ingredient[] = [
        new Ingredient('Batekh', 10),
        new Ingredient('Apple', 15),
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.newIngredient.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]){
        this.ingredients.push(...ingredients);
        this.newIngredient.next(this.ingredients.slice());
    }

    updateIngredient(ing: Ingredient, index: number) {
        this.ingredients[index] = ing;
        this.newIngredient.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.newIngredient.next(this.ingredients.slice());
        console.log()
    }
}