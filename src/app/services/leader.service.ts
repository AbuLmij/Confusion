import { Injectable } from '@angular/core';

import { Leader } from '../shared/leader';
import { Http, Response } from '@angular/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/delay';
import { baseUrl } from 'app/shared/baseurl';

@Injectable()
export class LeaderService {

  constructor(private http: Http, private processHttpService: ProcessHTTPMsgService) { }

  getLeaders(): Observable<Leader[]> {
    return this.http.get(baseUrl + 'leaders').map(res => this.processHttpService.extractData(res))
    .catch(error => this.processHttpService.handleError(error));
  }

  getLeader(id: number): Observable<Leader> {
    return this.http.get(baseUrl + 'leaders/' + id).map(res => this.processHttpService.extractData(res))
    .catch(error => this.processHttpService.handleError(error));
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get(baseUrl + 'leaders?featured=true').map(res => this.processHttpService.extractData(res)[0])
    .catch(error => this.processHttpService.handleError(error));
  }
}
