import RestClient from "./rest-client";
import * as Buffer from "Buffer";

export default class PasswordlessAuth {

  private client: RestClient;

  constructor() {
    this.client = new RestClient();
  }

  async login(username: string) {
    return await this.client.get(`/${username}/login/init`)
      .then(async (credentialRequestOptions) => {
        // TODO Fix this error management
        // if (credentialRequestOptions.status == 500) {
        //   return await this.register(username);
        // } else {
        //   return this.getStoredCredentials(credentialRequestOptions);
        // }
        return this.getStoredCredentials(credentialRequestOptions);
      })
      .then(async (assertion: any) => {
        console.log("ASSERTION")
        return await this.assertAuthentication(assertion, username);
      })
      // .catch(reason => {
      //   console.log("THE REASON")
      //   console.log(reason)
      // })
  }

  private async assertAuthentication(assertion: any, username: string) {
    let authData = assertion.response.authenticatorData;
    let clientDataJSON = assertion.response.clientDataJSON;
    let rawId = assertion.rawId;
    let sig = assertion.response.signature;
    let userHandle = assertion.response.userHandle;

    let body = {
      id: assertion.id,
      rawId: this.bufferEncode(rawId),
      type: assertion.type,
      origin: window.location.origin,
      rpId: "localhost",
      sessionId: window.localStorage.getItem("HALLOID_SESSION"),
      response: {
        authenticatorData: this.bufferEncode(authData),
        clientDataJSON: this.bufferEncode(clientDataJSON),
        signature: this.bufferEncode(sig),
        userHandle: this.bufferEncode(userHandle),
      },
    }

    return await this.client.post(`/${username}/login/complete`, body)
  }

  private async getStoredCredentials(credentialRequestOptions) {
    let context = this;
    credentialRequestOptions.challenge = this.bufferDecode(credentialRequestOptions.challenge);
    credentialRequestOptions.allowCredentials.forEach(function (listItem) {
      listItem.id = context.bufferDecode(listItem.id);
      // listItem.transports = ['internal']
    });
    let publicKey = {
      "challenge": credentialRequestOptions.challenge,
      "allowCredentials": credentialRequestOptions.allowCredentials,
      "rpId": credentialRequestOptions.rpId,
      "timeout": credentialRequestOptions.timeout,
    }
    window.localStorage.setItem("HALLOID_SESSION", credentialRequestOptions.sessionId)
    return navigator.credentials.get({
      publicKey: credentialRequestOptions
    })
  }

  async register(username: string) {
    return await this.client.get(`/${username}/registration/init`)
      .then((credentialCreationOptions: any) => {
        return this.createPublicCredentials(credentialCreationOptions);
      })
      .then(async (credential: any) => {
        return await this.storeCredentials(credential, username);
      })
      .catch(reason => {
        console.log(reason)
      })
  }

  private async storeCredentials(credential: any, username: string) {
    let attestationObject = this.bufferEncode(credential.response.attestationObject);
    let clientDataJSON = this.bufferEncode(credential.response.clientDataJSON);
    let rawId = this.bufferEncode(credential.rawId);

    let registerCredential = {
      serverPublicKeyCredential: {
        id: credential.id,
        type: credential.type,
        response: {
          attestationObject: attestationObject,
          clientDataJSON: clientDataJSON,
        }
      },
      sessionId: window.localStorage.getItem("HALLOID_SESSION"),
      origin: window.location.origin,
      rpId: "localhost",
      rawId: rawId
    }
    console.log("===========Credential registered===================")
    console.log(registerCredential)
    return await this.client.post(`/${username}/registration/complete`, registerCredential);
  }

  private createPublicCredentials(credentialCreationOptions: any) {
    credentialCreationOptions.challenge = this.bufferDecode(credentialCreationOptions.challenge);
    credentialCreationOptions.user.id = this.bufferDecode(credentialCreationOptions.user.id);
    console.log(credentialCreationOptions)
    window.localStorage.setItem("HALLOID_SESSION", credentialCreationOptions.sessionId)
    console.log("GETTTTTTTTT")
    return navigator.credentials.create({
      publicKey: credentialCreationOptions
    })

  }


  // Base64 to ArrayBuffer
  bufferDecode(value) {
    return Uint8Array.from(atob(value), c => c.charCodeAt(0));
  }

  // ArrayBuffer to URLBase64
  bufferEncode(value) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(value)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");;
  }

}
