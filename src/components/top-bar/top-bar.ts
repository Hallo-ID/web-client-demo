export class TopBar {

  hasSession: boolean;

  constructor(hasSession: boolean) {
    this.hasSession = hasSession;
  }

  attached() {
    this.hasSession = false;
  }
}
