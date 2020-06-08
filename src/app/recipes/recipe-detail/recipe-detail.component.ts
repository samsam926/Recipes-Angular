import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { DropdownDirective } from 'src/app/Shared/dropdown.directive';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  @Input()
  recipe: Recipe;
  id: number;
  @ViewChild('show', { static: true }) drpdown: DropdownDirective;
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipes(this.id);
    });
  }

  // onEditRecipe(id: number) {
  //   this.recipeService.startedRecipeEditing.next(id);
  // }
  onAddToShoppingList() {
    this.recipeService.addIngredientToShoppingList(this.recipe.ingredient);
  }
  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  onDelete() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipeList']);
  }
}
