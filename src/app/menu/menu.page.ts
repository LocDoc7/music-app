import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private menu: MenuController) { }

  ngOnInit() {
  }

  closeMenu() {
    this.menu.close();
  }

  logout(){
    console.log("Funcion para cerrar sesión")
  }

}
