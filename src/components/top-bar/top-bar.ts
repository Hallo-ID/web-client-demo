import {Router} from 'aurelia-router';
import {inject} from "aurelia-dependency-injection";

@inject(Router)
export class TopBar {

  hasSession: boolean;
  private router: any;

  constructor(router) {
    this.router = router;
  }

  activate() {
    this.hasSession = (window.localStorage.getItem("HALLOID_AUTH") != undefined);
    console.log(this.router)
  }
}
