import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { AuthDataUser } from '../interface/user.interfae';
import { AddUserService } from '../services/add-user.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit, OnDestroy {
  users: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: any;

  userSubscription?: Subscription;
  userRmSubscription?: Subscription;
  userEdSubscription?: Subscription;

  constructor(private addUserService: AddUserService,
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {


  }
  ngOnInit(): void {
    if (this.authService.getRole() == "user") {
      console.log(this.authService.getRole())
      this.router.navigate([''])
    }
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]],

    };
    this.dtTrigger = new Subject();
    this.spinner.show();
    this.userSubscription = this.addUserService.showUser().subscribe(
      (response: { allUser: AuthDataUser, message: string }) => {
        this.users = response.allUser;
        this.dtTrigger.next();
        this.spinner.hide();


      })
  }

  show() {
    this.userEdSubscription = this.addUserService.showUser().subscribe(
      (response: { allUser: AuthDataUser, message: string }) => {
        this.users = response.allUser;
      })
  }






  onDelete(id: string) {
    this.spinner.show();

    this.userRmSubscription = this.addUserService.deleteUser(id).subscribe(() => {
      this.spinner.hide();
      this.users = this.users.filter((user: any) => {
        return user._id != id
      })

    });
  }


  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.userRmSubscription?.unsubscribe();
    this.userEdSubscription?.unsubscribe();
  }


}
