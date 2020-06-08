import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  EventEmitter,
  Output,
  ViewChildren,
  OnDestroy,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/Shared/ingredient.model';
import { ShopListService } from '../shop-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput', { static: true }) nameInputRef: ElementRef;
  // @ViewChild('amountInput', { static: true }) amountInputRef: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();

  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  constructor(private slService: ShopListService) {}

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing
    .subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
        console.log(this.slService.getIngredient(index));
      }
    );
  }

  onNewAdd(form: NgForm) {
    event.preventDefault();
    const value = form.value;
    const nameInput: string = value.name;
    const amountInput: number = value.amount;
    const newIngredient = new Ingredient(nameInput, amountInput);
    // if (nameInput === '' || amountInput <= 0 || !amountInput) {
    //   alert('please add correct values')
    //   return;
    // }
    if (this.editMode) {
      this.slService.updateIngredient(newIngredient, this.editedItemIndex);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    this.slForm.resetForm();
    console.log(newIngredient);
    // this.ingredientAdded.emit(newIngredient);
  }

  onClear() {
    this.editMode = false;
    this.slForm.resetForm();
  }

  onRemove() {
    if (this.editMode) {
      this.slService.deleteIngredient(this.editedItemIndex);
      this.editMode = false;
      this.slForm.resetForm();  
    } else {
      alert('select item to remove!')
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
