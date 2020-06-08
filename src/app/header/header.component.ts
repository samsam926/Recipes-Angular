import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DropdownDirective } from '../Shared/dropdown.directive';
import { DataStorageService } from '../Shared/data-storage.service';
import { ThrowStmt } from '@angular/compiler';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLogged = false;
  private userSub: Subscription;
  // @Output() featureSelected = new EventEmitter<string>();
  @ViewChild('show', { static: true }) drpdown: DropdownDirective;
  constructor(
    private dataStorage: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const manageList = document.getElementById('manageList');
    this.userSub = this.authService.user.subscribe((user) => {
      this.isLogged = !!user;
      if (!this.isLogged) {
        manageList.classList.add('d-none');
      } else {
        manageList.classList.remove('d-none');
      }
    });
  }

  onSaveData() {
    this.dataStorage.storeRecipes();
  }
  onFetchData() {
    this.dataStorage.fetchRecipe().subscribe();
  }

  onLogout(){
    this.authService.logout();
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
