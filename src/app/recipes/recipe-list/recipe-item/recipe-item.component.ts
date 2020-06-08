import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model'
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input('rcpItem') recipe: Recipe;
  @Input() index: number;
  // @Output() recipeItemSelected = new EventEmitter<void>(); replaced by service
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  // rcpSelected() {
  //   this.recipeService.recipeSelected.emit(this.recipe);
  //   // this.recipeItemSelected.emit(); replaced by service
  // }
}
