import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  constructor(private http: HttpClient) { }


  LoginWithgoogle(idtoken: any) {
    
return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=${environment.firebaseConfig.apiKey}`, {
      postBody: `id_token=${idtoken}&providerId=google.com`,
      requestUri: "http://localhost:4200",
      returnIdpCredential: true,
      returnSecureToken: true
    });
  }
}
