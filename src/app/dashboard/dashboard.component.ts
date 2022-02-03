import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { AuthDataUser } from '../interface/user.interfae';
import { AddUserService } from '../services/add-user.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  mode: string = "insert";
  userId: any;
  user: AuthDataUser | undefined;
  name?: string;
  arr?: [];

  // subscription
  userSubcription?: Subscription;
  usernameSubcription?: Subscription;
  allUserSubscrption?: Subscription;
  public role: any;
  // subscription

  constructor(private addUserService: AddUserService, private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl('', [Validators.required]),
    about: new FormControl('', [Validators.required, Validators.minLength(5)]),
    strength: new FormArray([
    ])
  });

  get username() { return this.registerForm.get('username'); }
  get email() { return this.registerForm.get("email") }
  get about() { return this.registerForm.get("about") }
  get gender() { return this.registerForm.get("gender") }
  get strength() { return this.registerForm.get("strength") }
  getControls() {
    return (this.registerForm.get('strength') as FormArray).controls;
  }
  ngOnInit(): void {
    this.name = this.authService.name;
    this.usernameSubcription = this.authService.getUsername().subscribe((name: any) => {
      this.name = name;
    });
    this.userSubcription = this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.userId = params.get("id");
      if (this.userId) {
        this.mode = "edit";
        this.allUserSubscrption = this.addUserService.editUser(this.userId).subscribe((response: any) => {
          this.user = response.user;
          this.arr = this.user?.strength;
          this.registerForm?.patchValue({
            "username": this.user?.name, "email": this.user?.email,
            "gender": this.user?.gender, "about": this.user?.about
          })
          this.arr?.forEach((val) => {
            const control = new FormControl(val, Validators.required);
            (<FormArray>this.registerForm.get("strength")).push(control)
          })
        })
      } else {
        this.mode = "insert";
      }
    })
    this.role = this.authService.getRole();
  }




  onSubmit() {
    this.spinner.show();

    if (this.registerForm.invalid) { return };
    if (this.mode === "insert") {
      this.addUserService.addUser(this.registerForm.value);
      this.spinner.hide();
    }
    else {
      this.addUserService.updateUser(this.userId, this.registerForm.value);
      this.spinner.hide();
    }
  }


  onAddStrength() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.registerForm.get("strength")).push(control)
  }

  ngOnDestroy(): void {
    this.userSubcription?.unsubscribe();
    this.usernameSubcription?.unsubscribe();
    this.allUserSubscrption?.unsubscribe();
  }

}
