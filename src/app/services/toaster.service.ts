import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastr: ToastrService) { }

  success(message: string) {
    this.toastr.success(message, 'Toastr fun!');
  }

  error(message: string) {
    this.toastr.error(message, 'Toastr fun!');
  }


}
