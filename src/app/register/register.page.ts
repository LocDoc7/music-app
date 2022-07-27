import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';
import { AuthenticateService } from '../services/authenticate.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  registerResult;
  errMessage;
  validation_messages = {
    name: [
      { type: "required", message: "El nombre es obligatorio"},
      { type: "pattern", message: "El nombre no es valido" }
    ],
    lastname: [
      { type: "required", message: "El apellido es obligatorio" },
      { type: "pattern", message: "El apellido no es valido" }
    ],
    email: [
      { type: "required", message: "El email es obligatorio" },
      { type: "pattern", message: "El email no es valido" }
    ],
    password: [
      { type: "required", message: "El password es obligatorio" },
      { type: "minlength", message: "El password no es valido" }
    ]
  };

  constructor(private alertController: AlertController,private formBuilder: FormBuilder, private navCtrl: NavController, private authService: AuthenticateService) {
    this.registerForm = this.formBuilder.group({
      name: new FormControl("",Validators.compose([Validators.required,Validators.pattern("^[a-zA-Z -]{2,}\s?([a-zA-Z]{1,})?")])),
      last_name: new FormControl("",Validators.compose([Validators.required,Validators.pattern("^[a-zA-Z -]{2,}\s?([a-zA-Z]{1,})?")])),
      email: new FormControl("",Validators.compose([Validators.required,Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]+$")])),
      password: new FormControl("",Validators.compose([Validators.required,Validators.minLength(6)]))
    })
  }

  ngOnInit() {
  }

  register(registerFormValues) {
    this.authService.registerUser(registerFormValues).then((data) =>{
      this.errMessage="";
      this.navCtrl.navigateBack("/login");
    }).catch(err =>{
      this.presentAlert("Opps","Hubo un error",err)
    });
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


  goToLogin() {
    this.navCtrl.navigateBack("/login")
  }

}
