import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userIsAuthenticated = false;

  private authListenerSubs?: Subscription;

  role?: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

  
    this.userIsAuthenticated = this.authService.getIsAuth();

    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(

      (isAuthenticated) => {

        this.userIsAuthenticated = isAuthenticated;

      }
    );

    this.authService.autoAuthUser();
      
  }


  onLogout() {
    if (this.authService.getRole() === "admin") {

      this.authService.logout();

    } else {

      this.authService.logoutUser();

    }
  }
  ngOnDestroy() {
    this.authListenerSubs?.unsubscribe();
  }

}
