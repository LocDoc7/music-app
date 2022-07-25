import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
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

  constructor(private formBuilder: FormBuilder, private navCtrl: NavController) {
    this.registerForm = this.formBuilder.group({
      name: new FormControl("",Validators.compose([Validators.required,Validators.pattern("^[a-zA-Z -]{2,}\s?([a-zA-Z]{1,})?")])),
      lastname: new FormControl("",Validators.compose([Validators.required,Validators.pattern("^[a-zA-Z -]{2,}\s?([a-zA-Z]{1,})?")])),
      email: new FormControl("",Validators.compose([Validators.required,Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]+$")])),
      password: new FormControl("",Validators.compose([Validators.required,Validators.minLength(6)]))
    })
  }

  ngOnInit() {
  }

}
