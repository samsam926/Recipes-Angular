import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  constructor(private authService: AuthService, private router: Router) {}

  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string;

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
      this.isLoading = false;
      console.log(authObs);
    } else {
      authObs = this.authService.signUp(email, password);
      console.log(authObs);
    }

    authObs.subscribe(
        (response) => {
            console.log(response);
            this.isLoading = false;
            this.router.navigate(['./recipeList']);
          },
          (errorMessage) => {
            this.error = errorMessage;
            this.isLoading = false;
          }  
    )

    form.reset();
  }
}
