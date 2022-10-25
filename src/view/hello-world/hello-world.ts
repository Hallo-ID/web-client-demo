import { Router } from 'aurelia-router';
import {inject} from "aurelia-dependency-injection";

@inject(Router)
export class HelloWorld {
  public message = 'Welcome to HalloID Authentication Test!';
  public username:string;
  private router: any;
  private domain: any;
  private sub: any;
  private userVerified: any;

  constructor(router) {
    this.router = router;
  }

  attached() {
    const token = window.localStorage.getItem("HALLOID_AUTH");
    const user = this.parseJwt(token);
    console.log(user)
    this.domain = user.name
    this.sub = user.sub
    this.userVerified = user.userVerified
  }

  public async logout() {
    window.localStorage.removeItem("HALLOID_AUTH")
    this.router.navigateToRoute(
      this.router.currentInstruction.config.name,
      this.router.currentInstruction.params,
      { replace: true }
    );
  }

  // THIS METHOD DOES NOT VERIFY SIGNATURE
  private parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

}
