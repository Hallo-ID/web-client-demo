import HalloIDWebSDK from "halloid-ts-sdk";

export class HelloWorld {
  public message = 'Welcome to HalloID Web Template!';
  public username:string;

  private client: HalloIDWebSDK = new HalloIDWebSDK("https://www.cevicheria.halloid.com", "132465789");

  public async register() {
    let promise = await this.client.registerUser("ELPANCHO", "SOMETOKEN")
      .then(res => {
        console.log(res)
      })
    // console.log(promise)
    // console.log(await this.client.isBrowserSupported())
  }

}
