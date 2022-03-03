import HalloIDWebSDK from "halloid-ts-sdk";

export class Login {

  showPasswordProcessCheckbox: boolean;
  renderHalloIDButton: boolean;
  halloClient: HalloIDWebSDK
  username: string;
  password: string;

  constructor() {
    this.showPasswordProcessCheckbox = true;
    this.renderHalloIDButton = false;
    this.halloClient = new HalloIDWebSDK("", "");
  }

  attached() {
    if (this.halloClient.isBrowserSupported()) {
      this.renderHalloIDButton = true;
      this.showPasswordProcessCheckbox = false;
    }
  }

  loginWithHalloID() {
    this.halloClient.login(this.username).then(token => {
      // Set Auth Token
    });
  }

}
