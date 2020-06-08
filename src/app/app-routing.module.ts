import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { PageNotfoundComponent } from './page-notfound/page-notfound.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { RecipeRouter } from './recipes/recipe-router.module';
import { ShoppingListRouter } from './shopping-list/shopList-router.module';

const routes: Routes = [
  { path: 'HomePage', component: HomepageComponent },
  { path: '', pathMatch: 'full', redirectTo: 'HomePage' },
  // { path: 'recipeList', component: RecipesComponent, canActivate: [AuthGuard] ,children: [
  //   {path: '', component: RecipeStartComponent},
  //   {path: 'new', component: RecipeEditComponent},
  //   {path: ':id', component: RecipeDetailComponent}, 
  //   {path: ':id/edit', component: RecipeEditComponent}

  // ] },
  // { path: 'shopList', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'pageNotFound', component: PageNotfoundComponent },
  { path: './**', redirectTo: 'pageNotFound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
