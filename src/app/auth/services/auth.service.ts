import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from 'src/app/interface/admin.interface';
import { AuthDataUser } from 'src/app/interface/user.interfae';
import { ToasterService } from 'src/app/services/toaster.service';
import { SocialAuthService } from 'angularx-social-login';





@Injectable({
  providedIn: 'root'
})



export class AuthService {

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router,
    private toasterService: ToasterService,
    private socialService: SocialAuthService
  ) { }
  public token?: any;
  public authStatusListner = new Subject<boolean>();
  public isAuthenticated = false;
  public role: any;
  public userName = new Subject<string>();
  public name?:any;
  isTimer: any;
  public userId?: any;
  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }
  getUserId() {
    return this.userId;
  }
  getAuthStatusListener() {
    return this.authStatusListner.asObservable();
  }

  getRole() {
    return this.role;
  }

  getUsername(){
    return this.userName.asObservable();
  }

  createUser(username: string, email: string, password: string, cpassword: string) {
    const authData: AuthData = {
      username: username,
      email: email,
      password: password,
      cpassword: cpassword
    };
    this.http
      .post(environment.authAdminUrl + '/register', authData)
      .subscribe(
        (response) => {
          this.router.navigate(['auth/login'], { relativeTo: this.route });
        },
        (error) => {
          this.authStatusListner.next(false);
        }
      );
  }




  createUsers(
    username: string, email: string, password: string,
    cpassword: string, gender: string, about: string,
    strength: []
  ) {
    const authData: AuthDataUser = {
      username: username,
      email: email,
      password: password,
      cpassword: cpassword,
      gender: gender,
      about: about,
      strength: strength
    };
    this.http
      .post(environment.authUserUrl + '/register', authData)
      .subscribe(
        (response) => {
          this.router.navigate(['authUser/login'], { relativeTo: this.route });
        },
        (error) => {
          this.authStatusListner.next(false);
        }
      );
  }



  login(email: string, password: string, flag: any) {
    const authData: AuthData = {
      email: email,
      password: password,
    };
    this.http
      .post<{ token: string; expiresIn: number; userid: string, role: string }>(
        (flag) ? environment.authAdminUrl + '/login' : environment.authUserUrl + '/login',
        authData
      )
      .subscribe(
        (response: any) => {
          this.token = response.token;
          if (this.token) {
            this.isAuthenticated = true;
            this.userId = response.userid;
            this.authStatusListner.next(true);
            this.role = response.role;
            this.name = response.name;
            this.userName.next(response.name)
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + response.expiresIn * 1000
            );
            this.setAuthTimer(response.expiresIn);
            this.saveAuthData(this.token, expirationDate, this.userId, this.role, this.name);
            this.toasterService.success("Welcome Back")
            if (this.role == "admin")
              this.router.navigate(['showUser']);
            else
              this.router.navigate(['']);

          }
        },
        (error) => {
          this.authStatusListner.next(false);
        }
      );
  }









  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation!.expiresDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation?.token;
      this.name = authInformation.name;
      this.userName.next(this.name);
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.role = authInformation.role;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListner.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListner.next(false);
    this.userId = null;
    this.name=null;
    this.clearAuthData();
    clearTimeout(this.isTimer);
    this.toasterService.success("Thankyou")
    this.router.navigate(['auth/login']);
  }


  logoutUser() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListner.next(false);
    this.userId = null;
    this.name=null;
    this.clearAuthData();
    clearTimeout(this.isTimer);
    this.toasterService.success("Thankyou")
    this.router.navigate(['authUser/login']);
    this.socialService.signOut();
  }



  setAuthTimer(duration: number) {
    console.log('Seting Timer :', +duration);
    this.isTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  public saveAuthData(token: string, expirationDate: Date, userId: string, role: string, name: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('role', role);
    localStorage.setItem('name', name);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expiresDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    const name = localStorage.getItem('name');
    if (!token && !expiresDate) {
      return;
    }
    return {
      token: token,
      expiresDate: new Date(expiresDate || ''),
      userId: userId,
      role: role,
      name:name
    };
  }

}
