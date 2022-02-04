import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ShowUserComponent } from './show-user/show-user.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: "", component: DashboardComponent,
    canActivate: [AuthGuard],

  },

  {
    path: "dashboard/:id", component: DashboardComponent,
    canActivate: [AuthGuard],

  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'authUser',
    loadChildren: () => import('./authUser/auth-user/auth-user.module').then((m) => m.AuthUserModule),
  },
  {
    path: "showUser",
    component: ShowUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
