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
    this.halloClient = new HalloIDWebSDK("http://localhost:10000", "c1f86b69-e7fc-4191-965a-90744fd7702e");
  }

  attached() {
    // TODO verify browser support
    this.renderHalloIDButton = true;
    this.showPasswordProcessCheckbox = false;
  }

  public async loginWithHalloID() {
    await this.halloClient.login(this.username)
      .then(response => {
        this.processResponse(response.authorizationToken)
      })
      .catch(reason => {
        return this.registerWithHalloID();
      });
  }

  // If user not exists, HalloID will call the register method
  // public async loginWithHalloID() {
  //   await this.generateServiceToken()
  //     .then(serviceToken => {
  //       return this.halloClient.login(this.username, serviceToken.toString())
  //     })
  //     .then(response => {
  //       this.processResponse(response.authorizationToken)
  //     })
  //     .catch(reason => {
  //         return this.registerWithHalloID();
  //     });
  // }

  public async registerWithHalloID() {
    await this.halloClient.registerUser(this.username)
      .then(response => {
        this.processResponse(response.authenticationToken)
      });
  }


  // public async registerWithHalloID() {
  //   await this.generateServiceToken()
  //     .then(serviceToken => {
  //       return this.halloClient.registerUser(this.username, serviceToken.toString())
  //     })
  //     .then(response => {
  //       this.processResponse(response.authenticationToken)
  //     });
  // }

  private async processResponse(token: string) {
    await this.validateAuthenticationToken(token)
      .then(response => {
        console.log(response)
        window.localStorage.setItem("HALLOID_AUTH", token);
        this.router.navigate('home')
      })
  }

  private async validateAuthenticationToken(token: string): Promise<any> {
    return this.backendClient.validateToken(token).then(response => {
      return response.token;
    });
  }

  private async generateServiceToken(): Promise<any> {
    return this.backendClient.getServiceToken().then(response => {
      return response.token;
    });
  }

}
