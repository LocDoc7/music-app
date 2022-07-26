import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AuthenticateService } from '../services/authenticate.service';
import { Storage } from '@ionic/storage';
import { AlertController, NavController } from '@ionic/angular';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  userImage = "assets/images/profile.png";
  photo: SafeResourceUrl;
  user = {
    email: "",
    name: "",
    last_name: "",
    following_users: [],
    followed_users: [],
    image: ""
  };
  user_id;
  users: any;
  searching = false;
  text = "Digite nombre de usuario para buscar"

  goBack = false;

  constructor(private userService: UserService,private navCtrol: NavController,private alertController: AlertController,private sanitizer: DomSanitizer, private authService: AuthenticateService, private storage: Storage) { 
    this.storage.create();
  }

  async ngOnInit() {
    this.user_id = await this.storage.get("user_id");
    this.userService.getCurrentUser(this.user_id).subscribe((data: any) => {
      this.user.email = data.email
      this.user.name = data.name
      this.user.last_name = data.last_name
      this.user.followed_users = data.followed_users
      this.user.following_users = data.following_users
      this.user.image = data.image
    },
    (error) =>
      this.presentAlert("Opps","Hubo un error",error)
    )
    if(this.goBack){
      this.navCtrol.navigateBack("/menu")
    }
  }

  async presentAlert(header, suhHeader, message) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: suhHeader,
      message: message,
      buttons: [
        {text: 'OK',
        role: 'confirm',
        handler: () => {
          this.goBack = true
        }
      }
      ]
    });
    await alert.present();
  }

  async takePhoto() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    })
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(
      image && image.dataUrl
    );
    console.log(image);
    this.updateUser({"image": image.dataUrl})
  }

  updateUser(user){
    let update_params = user
    this.userService.updateUser(this.user_id,update_params).then((data: any) => {
      this.user.email = data.user.email
      this.user.name = data.user.name
      this.user.last_name = data.user.last_name
      this.user.followed_users = data.user.followed_users
      this.user.following_users = data.user.following_users
      this.user.image = data.user.image
    })
  }

  async presentAlertText() {
    const alert = await this.alertController.create({
      header: 'Actualiza tus datos',
      buttons: [
        {
          text:'Actualizar',
          role: 'confirm',
          handler: (user) => {
            console.log(user);
            this.updateUser(user)
          } 
        }
        
      ],
      inputs: [
        {
          name: 'name',
          placeholder: 'Nombres',
        },
        {
          name: 'last_name',
          placeholder: 'Apellidos',
        },
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email',
        }
      ]
    });

    await alert.present();
  }

  openAlertUp() {
    this.presentAlertText();
  }

  getUsers(keyword: string){
    this.searching = true;
    if(keyword.length > 0) {
      this.userService.getUser(keyword).subscribe( async resp => {
        this.users = resp;
        if (this.users.length === 0){
          this.text = "No se encontraron usuarios con ese nombre"
        }
        this.searching = false;
      });
    }else{
      this.text = "Ingrese un nombre para buscar"
      this.users = [];
    }
  }


}
