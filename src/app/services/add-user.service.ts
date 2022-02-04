import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { AuthDataUser } from '../interface/user.interfae';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root'
})
export class AddUserService {

  constructor(private httpClient: HttpClient, private router: Router,
    private authService: AuthService,
    private toasterService: ToasterService
  ) { }

  addUser(payload: AuthDataUser) {
    this.httpClient.post(environment.addUserUrl + "/addUser", payload).subscribe((message: any) => {
      this.router.navigate(["/showUser"]);
    }, err => {
      console.log(err)
    });
  }

  showUser() {
    return this.httpClient.get<{ allUser: AuthDataUser, message: string }>(environment.addUserUrl + "/showUser");
  }


  editUser(id: string) {
    return this.httpClient.get(environment.addUserUrl + "/editUser/" + id);
  }

  updateUser(id: string, payload: AuthDataUser) {
    payload.name = payload.username;
    this.httpClient.put(environment.addUserUrl + "/updateUser/" + id, payload).subscribe((message: any) => {
      this.router.navigate(["showUser"]);

    }, err => {
      console.log(err)
    });
  }

  deleteUser(id: string) {
    return this.httpClient.delete(environment.addUserUrl + "/deleteUser/" + id);
  }

  Google(payload: any) {
    this.httpClient.post(environment.authUserUrl + "/google", payload).subscribe((response: any) => {
      this.authService.token = response.token;
      if (this.authService.token) {
        this.authService.isAuthenticated = true;
        this.authService.userId = response.userid;
        this.authService.authStatusListner.next(true);
        this.authService.role = response.role;
        const now = new Date();
        const expirationDate = new Date(
          now.getTime() + response.expiresIn * 1000
        );
        this.authService.setAuthTimer(response.expiresIn);
        this.authService.saveAuthData(this.authService.token, expirationDate, this.authService.userId, this.authService.role, response.name);
        this.toasterService.success("Welcome  google User")
        this.authService.userName.next(response.name);
        
        this.router.navigate(['']);
      }
    }, err => {
      console.log(err);
    })
  }

  Facebook(payload: any) {
    this.httpClient.post(environment.authUserUrl + "/facebook", payload).subscribe((response: any) => {
      this.authService.token = response.token;
      if (this.authService.token) {
        this.authService.isAuthenticated = true;
        this.authService.userId = response.userid;
        this.authService.authStatusListner.next(true);

        this.authService.role = response.role;
        const now = new Date();
        const expirationDate = new Date(
          now.getTime() + response.expiresIn * 1000
        );
        this.authService.setAuthTimer(response.expiresIn);
        this.authService.saveAuthData(this.authService.token, expirationDate, this.authService.userId, this.authService.role,response.name);
        this.authService.userName.next(response.name);
        this.toasterService.success("Welcome Facebook User")
        this.router.navigate(['']);
      }
    }, err => {
      console.log(err);
    })
  }



  
  allUser() {
    return this.httpClient.get(environment.authUserUrl + '/allUser');
  }

}
