import { HttpClient, HttpHeaders,HttpResponse,HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  url_server = "https://music-back-seminario.herokuapp.com/";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' , observe: 'response'})
  }

  constructor(private storage: Storage, private http: HttpClient) { 
    this.storage.create();
  }

  // loginUser(credentials){
  //   return new Promise((accept, reject) => {
  //     this.storage.get("user").then((data) => {
  //       data.password = atob(data.password);
  //       if(credentials.email == data.email && credentials.password == data.password){
  //         accept("Login Exitoso");
  //       } else{
  //         reject("Login Fallido");
  //       }
  //     }).catch( err => {
  //       return reject("Fallo en el Login");
  //     });
  //   });
  // }

  loginUser(credentials){
    let params = {
      "user": credentials
    }
    return new Promise((accept, reject) => {
      this.http.post(`${this.url_server}login`,params,this.httpOptions).subscribe((data: any) => {
        if( data.status == "OK"){
          accept(data);
        } else{
          reject("Email o Contraseña invalida");
        }
      },
      (error) => {
        reject("Error en la peticion")
      }
      )
    });
  }

  registerUser(userData){
    //userData.password = btoa(userData.password);
    //return this.storage.set("user",userData)
    let params = {
      "user": userData
    }
    return new Promise ((accept,reject) => {
      this.http.post(`${this.url_server}signup`,params,this.httpOptions).subscribe((data:any) => {
        if(data.status = "OK") {
          accept(data.msg);
        }else{
          reject(data.errors)
        }
      },
      (error) => {
        reject("Error en la peticion")
      }
      )
    })
  }
}
