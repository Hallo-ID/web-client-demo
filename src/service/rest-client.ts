import {HttpClient, json} from 'aurelia-fetch-client';

export default class RestClient {

  private http: any;

  constructor() {
    this.http = new HttpClient();
    const baseUrl = 'http://localhost:10000/v1/auth';

    this.http.configure(config => {
      config.withBaseUrl(baseUrl)
        .withDefaults({
          credentials: 'include' // Valid values; omit, same-origin and include
        })
        .withInterceptor({
          request(request) {
            console.log(`Requesting ${request.method} ${request.url}`);
            return request; // you can return a modified Request, or you can short-circuit the request by returning a Response
          },
          response(response) {
            console.log(`Received ${response.status} ${response.url}`);
            return response; // you can return a modified Response
          }
        });
    })
  }

  async get(url: string): Promise<any> {
    return this.http.fetch(url, {
      method: "GET",
      headers: {
        "clientId": "610ac52c-b75a-4b34-a529-575bef537861",
        "Authorization": "Bearer 1d2f5gg4d5"
      }
    })
      .then(response => response.json())
      .catch(error => {
        console.log('Error retrieving data.');
        throw error;
      });
  }

  async post(url: string, body: any): Promise<any> {
    return this.http.fetch(url, {
      headers: {
        "clientId": "610ac52c-b75a-4b34-a529-575bef537861",
        "Authorization": "Bearer 1d2f5gg4d5"
      },
      method: 'post',
      body: json(body),
    }).then(data => data.json())
      .catch(error => {
        console.log('Error in POST request.');
        throw error
      });
  }

}

