import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  slideOpt = {
    initalSlide: 0, //slide inicial
    slidesPerView: 1, //slides por vista
    centeredSlides: true, //que las slides esten centradas
    speed: 400 //velocidad de transicion de cada slide en milisegundos
  }

  constructor() {}

}
