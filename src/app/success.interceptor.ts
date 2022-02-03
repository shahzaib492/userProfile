import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class SuccessInterceptor implements HttpInterceptor {

  constructor(public toasterService: ToastrService) { }


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(evt => {
        let successMessage:any="";
        if (evt instanceof HttpResponse ) {
          if(evt.status===201){
            successMessage=evt.body;
            this.toasterService.success(successMessage.message)
          }
        }
      }));
    }

}