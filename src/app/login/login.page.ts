import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticate.service';
import { Storage } from '@capacitor/storage';

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

  constructor(private alertController: AlertController,private formBuilder: FormBuilder, private authService: AuthenticateService, private navCtrol: NavController) {
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
    this.authService.loginUser(credentials).then( (res:any) => {
      Storage.set({key: "isUserLoggedIn",value: 'true'});
      Storage.set({key: "user_id", value: res.user.id})
      this.navCtrol.navigateForward("/menu");
    }).catch( err => {
      this.presentAlert("Opps","Hubo un error",err)
    })
  }

  async presentAlert(header, suhHeader, message) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: suhHeader,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  goToRegister(){
    this.navCtrol.navigateForward("/register");
  }

}
