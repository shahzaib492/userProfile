import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading:boolean=false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });
  get email() { return this.loginForm.get("email") }
  get password() { return this.loginForm.get("password") }
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  flag: number = 1;
  
  onSubmit() {
    this.loading=true;
    this.authService.login(
      this.loginForm.value.email,
      this.loginForm.value.password,
      this.flag
    )
  }

}
