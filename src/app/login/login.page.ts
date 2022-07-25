import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticate.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  validation_messages = {
    email: [
      { type: "required", message: "El email es obligatorio"},
      { type: "pattern", message: "El email no es valido" }
    ],
    password: [
      { type: "required", message: "El password es obligatorio" },
      { type: "minlength", message: "El password no es valido" }
    ]
  };

  errorMessage: String;

  constructor(private formBuilder: FormBuilder, private authService: AuthenticateService, private navCtrol: NavController, private storage: Storage) {
    this.storage.create();
    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]+$")
        ])
      ),
      password: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(6)
        ])
      )
    })
   }

  ngOnInit() {
  }

  loginUser(credentials) {
    this.authService.loginUser(credentials).then( res => {
      this.errorMessage = "";
      this.storage.set("isUserLoggedIn",true);
      this.navCtrol.navigateForward("/home");
    }).catch( err => {
      this.errorMessage = err;
    })
  }
  goToRegister(){
    this.navCtrol.navigateForward("/register");
  }

}
