import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loading:boolean=false;
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    cpassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });
  constructor(private authService: AuthService) { }
  get username() { return this.registerForm.get('username'); }
  get email() { return this.registerForm.get("email") }
  get password() { return this.registerForm.get("password") }
  get cpassword() { return this.registerForm.get("cpassword") }
  ngOnInit(): void {

  }

  onSubmit() {
    this.loading=true;
    this.authService.createUser(
      this.registerForm.value.username,
      this.registerForm.value.email,
      this.registerForm.value.password,
      this.registerForm.value.cpassword,
    )
  }


}
