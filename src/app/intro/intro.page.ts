import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit{

  slideOpt = {
    initalSlide: 0, //slide inicial
    slidesPerView: 1, //slides por vista
    centeredSlides: true, //que las slides esten centradas
    speed: 400 //velocidad de transicion de cada slide en milisegundos
  }

  slides = [
    {title: "DOTA 2",
    subtitle: "RESEÑA DEL VIDEOJUEGO",
    icon: "musical-notes-outline",
    img: "assets/images/slide1.jpg",
    description: "Dota 2 es un videojuego de estrategia basado en WarCraft"
    },
    {title: "DOTA 2",
    subtitle: "NOTICIAS",
    icon: "musical-notes-outline",
    img: "assets/images/slide2.jpg",
    description: "Dota 2 es un videojuego de estrategia basado en WarCraft"
    },
    {title: "DOTA 2",
    subtitle: "EVENTOS RECIENTES",
    icon: "musical-notes-outline",
    img: "assets/images/slide3.jpg",
    description: "Dota 2 es un videojuego de estrategia basado en WarCraft"
    },
    {title: "DOTA 2",
    subtitle: "NUEVOS HEROES",
    icon: "musical-notes-outline",
    img: "assets/images/slide4.jpg",
    description: "Los nuevos heroes del dota saldran en finales del presente mes, en donde conoceremos grandes leyendas del dota"
    }
  ]

  constructor(private router: Router, private storage: Storage) {
    this.storage.create();
   }
  
  ngOnInit(): void {
  }

  finish() {
    this.storage.set("isIntroShowed",true);
    this.router.navigateByUrl("/login");
  }

}
