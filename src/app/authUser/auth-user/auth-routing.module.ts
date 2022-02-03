import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserGuard } from './user.guard';

const routes:Routes=[
  {
    path: 'login',
    component: LoginComponent,
    canActivate:[UserGuard]
  },
  {
    path:'singup',
    component:RegisterComponent,
    canActivate:[UserGuard]

  }
]
@NgModule({
  imports:[
    RouterModule.forChild(routes)
  ]
})
export class AuthUserRoutingModule {}