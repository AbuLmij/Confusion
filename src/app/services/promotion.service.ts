import { Injectable } from '@angular/core';

import { Promotion } from '../shared/promotion';
import { Http, Response } from '@angular/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/delay';
import { baseUrl } from 'app/shared/baseurl';

@Injectable()
export class PromotionService {

  constructor(private http: Http, private processHttpService: ProcessHTTPMsgService) { }

  getPromotions(): Observable<Promotion[]> {
    return this.http.get(baseUrl + 'promotions').map(res => this.processHttpService.extractData(res))
    .catch(error => this.processHttpService.handleError(error));
  }

  getPromotion(id: number): Observable<Promotion> {
    return this.http.get(baseUrl + 'promotions/' + id).map(res => this.processHttpService.extractData(res))
    .catch(error => this.processHttpService.handleError(error));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get(baseUrl + 'promotions?featured=true').map(res => this.processHttpService.extractData(res)[0])
    .catch(error => this.processHttpService.handleError(error));
  }
}
