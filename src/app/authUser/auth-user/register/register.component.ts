import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    cpassword: new FormControl('', [Validators.required, Validators.minLength(5)]),
    gender: new FormControl('', [Validators.required]),
    aboutus: new FormControl('', [Validators.required, Validators.minLength(5)]),
    strength: new FormArray([])

  });

  getControls() {
    return (this.registerForm.get('strength') as FormArray).controls;
  }
  constructor(private authService: AuthService) { }
  get username() { return this.registerForm.get('username'); }
  get email() { return this.registerForm.get("email") }
  get password() { return this.registerForm.get("password") }
  get cpassword() { return this.registerForm.get("cpassword") }
  get gender() { return this.registerForm.get("gender") }
  get aboutus() { return this.registerForm.get("aboutus") }
  ngOnInit(): void {

  }

  onSubmit() {
    if(this.registerForm.invalid){
      return ;
    }
    this.authService.createUsers(
      this.registerForm.value.username,
      this.registerForm.value.email,
      this.registerForm.value.password,
      this.registerForm.value.cpassword,
      this.registerForm.value.gender,
      this.registerForm.value.aboutus,
      this.registerForm.value.strength,
    )
  }

  onAddStrength() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.registerForm.get("strength")).push(control)
  }
}
