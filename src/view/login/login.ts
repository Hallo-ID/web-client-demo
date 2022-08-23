import HalloIDWebSDK from "halloid-ts-sdk";
import PasswordlessAuth from "../../service/passwordless-auth"
import { Router } from 'aurelia-router';
import {inject} from "aurelia-dependency-injection";

@inject(Router)
export class Login {

  private authentication: PasswordlessAuth;
  showPasswordProcessCheckbox: boolean;
  renderHalloIDButton: boolean;
  halloClient: HalloIDWebSDK
  username: string;
  password: string;
  private router: any;

  constructor(router) {
    this.router = router;
    this.authentication = new PasswordlessAuth();
    this.showPasswordProcessCheckbox = true;
    this.renderHalloIDButton = false;
    this.halloClient = new HalloIDWebSDK("", "");
  }

  attached() {
    // TODO verify browser support
    this.renderHalloIDButton = true;
    this.showPasswordProcessCheckbox = false;
  }

  public async loginWithHalloID() {
    // this.halloClient.login(this.username).then(token => {
    // Set Auth Token
    // });
    if (this.username === "") {
      alert("please enter a username");
      return;
    }

    await this.authentication.login(this.username)
      .then((response) => {
        console.log("Success login")
        console.log(response)
        this.processResponse(response.authorizationToken)
      })
      .catch(reason => {
        console.log("LO AGARRA EN ESTE CATCH")
        console.log(reason)
        return this.registerWithHalloID();
      })
  }

  public async registerWithHalloID() {
    console.log("Called!")
    if (this.username === "") {
      alert("please enter a username");
      return;
    }

    await this.authentication.register(this.username)
      .then( response => {
        console.log("ESTE VIENE DEL REGISTER")
        console.log(response)
        this.processResponse(response.authorizationToken)
        // alert("Register success")
      })
      .catch(reason => {
        console.log(reason)
      })
  }

  private async processResponse(token: string) {
    window.localStorage.setItem("HALLOID_AUTH", token);
    this.router.navigate('home')
  }

}
