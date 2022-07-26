import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GoogleMap, MapType } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {
  @ViewChild('map')
  mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  center= {
    lat: 0,
    lng: 0
  }

  markerId;
  coordinates: any[] = [];

  constructor() { }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    await this.getCurrentPosition();
    this.watchPosition();
  }

  async createMap() {
    this.newMap = await GoogleMap.create({
      id:'my-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.googleApiKey,
      config:{
        center: this.center,
        zoom: 14,
      }
    });
    this.newMap.enableCurrentLocation(true);
    this.addMarker(this.center.lat, this.center.lng);
    this.addListeners();
    //this.newMap.enableTrafficLayer(true);
    // this.newMap.setMapType(MapType: 'Satellite');
  }

  async getCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.center = {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude
    }
    this.createMap();
  }

  async addMarker (lat, lng) {
    this.markerId = await this.newMap.addMarker({
      coordinate:{
        lat: lat,
        lng: lng
      },
      draggable: true,
      opacity: 0.8,
      iconUrl: 'assets/images/pinmusic.png'
    });
  }

  async watchPosition() {
    await Geolocation.watchPosition({},position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      this.setCamera(position.coords.latitude,position.coords.longitude);
      this.coordinates.push({coordinate: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      })
    });
  }

  setCamera(lat, lng) {
    this.removeMarker();
    this.newMap.setCamera({
      coordinate:{
        lat: lat,
        lng: lng
      },
      animate:false
    });
    this.addMarker(lat,lng);
  }

  async removeMarker(id?) {
    await this.newMap.removeMarker(id ? id : this.markerId);
  }

  async addListeners() {
    await this.newMap.setOnMarkerClickListener((event) => {
      this.removeMarker(event.markerId)
    })

    await this.newMap.setOnMapClickListener((event) => {
      this.addMarker(event.latitude, event.longitude)
    })
  }

  async showCoordsHistory() {
    // this.coordinates.forEach(coord => {
    //   this.addMarker(coord.lat, coord.lng);
    // });
    await this.newMap.addMarkers(this.coordinates)
  }

}
