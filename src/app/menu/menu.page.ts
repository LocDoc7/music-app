import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private menu: MenuController, private navCtrl: NavController) { 
    
  }

  ngOnInit() {
  }

  closeMenu() {
    this.menu.close();
  }

  logout(){
    Storage.set({key: "isUserLoggedIn",value: "false"});
    Storage.remove({key: "user_id"});
    this.navCtrl.navigateRoot('/login')
  }

  goToSettings() {
    this.navCtrl.navigateRoot("menu/settings");
    this.menu.close();
  }

  goToHome() {
    this.navCtrl.navigateRoot("menu");
    this.menu.close();
  }

  goToMaps() {
    this.navCtrl.navigateRoot("menu/maps");
    this.menu.close();
  }

}
