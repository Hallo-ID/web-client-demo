import HalloIDWebSDK from "halloid-web-sdk";
import { Router } from 'aurelia-router';
import {inject} from "aurelia-dependency-injection";

@inject(Router)
export class Login {
  showPasswordProcessCheckbox: boolean;
  renderHalloIDButton: boolean;
  halloClient: HalloIDWebSDK
  username: string;
  password: string;
  private router: any;

  constructor(router) {
    this.router = router;
    this.showPasswordProcessCheckbox = true;
    this.renderHalloIDButton = false;
    this.halloClient = new HalloIDWebSDK("CLIENT_URL", "CLIENT_ID");
  }

  attached() {
    // TODO verify browser support
    this.renderHalloIDButton = true;
    this.showPasswordProcessCheckbox = false;
  }

  // If user not exists, HalloID will call the register method
  public async loginWithHalloID() {
    await this.halloClient.login(this.username, "Bearer 23423423423423432").then(response => {
      this.processResponse(response.authorizationToken)
    }).catch(reason => {
        console.log(reason)
        return this.registerWithHalloID();
      });
  }

  public async registerWithHalloID() {
    await this.halloClient.registerUser(this.username, "Bearer 23423423423423432").then(response => {
      this.processResponse(response.authorizationToken)
    });
  }

  private async processResponse(token: string) {
    window.localStorage.setItem("HALLOID_AUTH", token);
    this.router.navigate('home')
  }

}
