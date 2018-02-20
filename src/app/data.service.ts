import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {Config} from './config';

@Injectable()
export class DataService {
  backendUrl = new Config();

  constructor(private http: Http) { }

  getDatas() {
    return this.http.get(this.backendUrl.backendUrl + '/').map(res => res.json());
  }

  createData(data) {
    return this.http.put(this.backendUrl.backendUrl + '/', data).map(res => res.json());
  }

}
