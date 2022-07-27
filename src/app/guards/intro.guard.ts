import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanActivate {
  constructor(private router: Router){
  }
  async canActivate(){
    const {value} = await Storage.get({key: 'isIntroShowed'});
    if(value){
      return true
    }else{
      this.router.navigateByUrl('/intro');
    }
  }
}
