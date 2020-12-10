import { environment } from './../../environments/environment';
import { Injectable } from "@angular/core";

@Injectable()
export class Config {
  private env: string; // dev, prod
  private serviceBaseURL = {
    dev: 'https://127.0.0.1:8000/api/',
    prod: '' //https://ge-corp.com/
  };

  private publicBaseURL = {
    dev: 'https://127.0.0.1:8000/',

    prod: 'https://ge-corp.com/'
  };

  private hrefPrefix = {
    dev: '',
    prod: ''
  };

  private defaultLangId = {
    dev: 1,
    prod: 1
  };

  constructor() {
    localStorage.setItem("lang", "1");
  }

  public get() {
    if (environment.production === true) {
      this.env = 'prod';
    } else {
      this.env = 'dev';
    }
    let result;
    if (this.env === 'dev') {
      result = {
        baseURL: this.serviceBaseURL.dev,
        defaultLangId: this.defaultLangId.dev,
        publicBaseURL: this.publicBaseURL.dev,
        hrefPrefix: this.hrefPrefix.dev
      };
    } else if (this.env === 'prod') {
      result = {
        baseURL: this.serviceBaseURL.prod,
        defaultLangId: this.defaultLangId.prod,
        publicBaseURL: this.publicBaseURL.prod,
        hrefPrefix: this.hrefPrefix.prod
      };
    }
    return result;
  }
}
