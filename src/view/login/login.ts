import HalloIDWebSDK from "halloid-web-sdk";
import { Router } from 'aurelia-router';
import {inject} from "aurelia-dependency-injection";
import BackendClient from "../../service/backend-client";

@inject(Router)
export class Login {
  showPasswordProcessCheckbox: boolean;
  renderHalloIDButton: boolean;
  halloClient: HalloIDWebSDK
  backendClient: BackendClient
  username: string;
  password: string;
  private router: any;

  constructor(router) {
    this.router = router;
    this.showPasswordProcessCheckbox = true;
    this.renderHalloIDButton = false;
    this.backendClient = new BackendClient();
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
    await this.generateServiceToken()
      .then(serviceToken => {
        return this.halloClient.registerUser(this.username, serviceToken)
      })
      .then(response => {
        this.processResponse(response.authorizationToken)
      });
    // await this.halloClient.registerUser(this.username, serviceToken).then(response => {
    //   this.processResponse(response.authorizationToken)
    // });
  }

  private async processResponse(token: string) {
    window.localStorage.setItem("HALLOID_AUTH", token);
    this.router.navigate('home')
  }

  private async generateServiceToken(): Promise<string> {
    return this.backendClient.getServiceToken();
  }

}
