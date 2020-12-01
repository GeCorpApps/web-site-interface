import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RestService } from '../rest.service';
import { resolve, reject } from 'q';

export interface UserResponseInt {
  id: number;
  user_type_id: number;
  user_status_id: number;
  rating: number;
  full_name: string;
  phone: number;
  email: string;
  regipaddr: string;
  sesskey: string;
  loginstatus: number;
  isSetLocations: boolean;
}

@Injectable()
export class AuthGuardService implements CanActivate {
  public jwtHelper: any;
  public response: UserResponseInt;
  public IsUserLogged: any;
  constructor(private router: Router, private RService: RestService) { }

  public getToken() {
    const vToken = localStorage.getItem('token');
    return vToken;
  }

  checkAuthStatus() {
    const promise = new Promise((resolve, reject) => {
      const cToken = this.getToken() || false;
      if(cToken){
        resolve('Token is available');
      }else{
        reject('Token is not available');
      }
      // this.RService.post('user/checktoken/').subscribe(resp => {
      //   if (resp.status === true) {
      //     this.IsUserLogged = true;
      //     resolve(true);
      //   } else {          
      //     this.IsUserLogged = false;
      //     reject(false);
      //     return false;
      //   }
      // });
    });
    return promise;
  }

  public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    return await this.checkAuthStatus().then(
      (val) => {
        console.log(val);
        return true;
      },
      (error) => {
        //alert(error.getMessage());
        this.router.navigate(['/user/signin'], { queryParams: { returnUrl: state.url.replace('/', '') } });
        return false;
      }
    );
  }
}
