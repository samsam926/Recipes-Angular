import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  NgForm,
  FormGroup,
  FormControl,
  FormArray,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/Shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  // @ViewChild('f', { static: false }) rcpForm: NgForm;
  id: number;
  recipeEdit: boolean = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipeEdit = params['id'] != null;
      this.initForm();
      // console.log(this.recipeEdit);
    });
  }
  onSubmit() {
    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imgPath'],
      this.recipeForm.value['ingredients']
    );
    if (this.recipeEdit) {
      this.recService.updateRecipe(this.id, newRecipe);
      console.log(newRecipe);
    } else {
      this.recService.addRecipe(newRecipe);
      console.log(newRecipe);
    }
    this.onCancel();
  }

  addNewIng() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
    console.log(FormArray);
  }

  deleteIng(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  private initForm() {
    let recipeName = '';
    let recipeDesc = '';
    let recipeImg = '';
    let recipeIng = new FormArray([]);
    
    if (this.recipeEdit) {
      const recipe = this.recService.getRecipes(this.id);
      recipeName = recipe.name;
      recipeDesc = recipe.description;
      recipeImg = recipe.imagePath;
      // recipeIng = recipe.ingredient;
      if (recipe['ingredient']) {
        for (let ingredient of recipe.ingredient) {
          recipeIng.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imgPath: new FormControl(recipeImg, Validators.required),
      description: new FormControl(recipeDesc, Validators.required),
      ingredients: recipeIng,
    });
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
