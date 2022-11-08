import {HttpClient, json} from 'aurelia-fetch-client';

export default class BackendClient {

  private http: any;
  private baseUrl: string;

  constructor() {
    this.http = new HttpClient();
    const baseUrl = 'http://localhost:8099';

    this.http.configure(config => {
      config.withBaseUrl(baseUrl)
        // .withDefaults({
        //   credentials: 'omit' // Valid values; omit, same-origin and include
        // })
        .withInterceptor({
          request(request) {
            console.log(`Requesting ${request.method} ${request.url}`);
            return request; // you can return a modified Request, or you can short-circuit the request by returning a Response
          },
          response(response) {
            console.log(`Received ${response.status} ${response.url}`);
            return response.json(); // you can return a modified Response
          }
        });
    })
  }

  async getServiceToken(): Promise<any> {
    return this.http.fetch('/auth/token', {
      method: "GET",
    })
    .catch(error => {
      console.log('Error retrieving data.');
      throw error;
    });
  }

  async validateToken(token: string): Promise<any> {
    return this.http.fetch('/auth/token/' + token + '/verify', {
      method: "GET",
    })
    .catch(error => {
      console.log('Error retrieving data.');
      throw error;
    });
  }

}

