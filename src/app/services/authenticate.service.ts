import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor() { }

  loginUser(credentials){
    return new Promise((accept, reject) => {
      if(credentials.email == "abc@gmail.com" && credentials.password == "123456"){
        accept("Login Exitoso");
      } else{
        reject("Login Fallido");
      }
    });
  }

}
