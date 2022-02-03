import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SocialAuthService, GoogleLoginProvider, SocialUser, FacebookLoginProvider } from 'angularx-social-login';
import { AddUserService } from 'src/app/services/add-user.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  socialUser: SocialUser | undefined;
  loading:boolean=false;
  authStatusSub?: Subscription;
  role?: string;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });
  get email() { return this.loginForm.get("email") }
  get password() { return this.loginForm.get("password") }
  constructor(private authSerice: AuthService,
    private socialAuthService: SocialAuthService,
    private addUserService: AddUserService,
    private spinner: NgxSpinnerService
  
  ) { }
  isLoggedin?: boolean;
  ngOnInit(): void {

    this.authStatusSub=this.authSerice.getAuthStatusListener().subscribe(
      authStatus=>{
        this.loading=false
      }
    )



    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
    }, err => {
      this.socialAuthService.signOut();
    });
  }
  flag: number = 0;
  onSubmit() {
    this.loading=true;
    this.loading=true;

    this.authSerice.login(
      this.loginForm.value.email,
      this.loginForm.value.password,
      this.flag

    )

  }

  loginWithGoogle(): void {
    
    this.loading=true;
    this.loading=true;
    
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((res: any) => {
      this.addUserService.Google(this.socialUser);
    }).catch(err => {
      console.log(err);
    });
  }


  loginWithFacebook(): void {
    
    this.loading=true;
   

    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(res => {
      this.addUserService.Facebook(res);
    });
  }




}
