import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { baseUrl } from '../shared/baseurl';

import { ProcessHTTPMsgService } from './process-httpmsg.service';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import { observeOn } from 'rxjs/operator/observeOn';

@Injectable()
export class DishService {

  constructor(private http: Http,
    private processHTTPMsgService: ProcessHTTPMsgService) { }
  
  getDishes(): Observable<Dish[]> {
    return this.http.get(baseUrl + 'dishes').map(res => this.processHTTPMsgService.extractData(res));
  }

  getDish(id: number): Observable<Dish> {
    return this.http.get(baseUrl + 'dishes/' + id).map(res => this.processHTTPMsgService.extractData(res));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get(baseUrl + 'dishes?featured=true').map(res => this.processHTTPMsgService.extractData(res)[0]);
  }

  getDishIds() : Observable<number[]> {
    return this.getDishes().map(dishes => {return dishes.map(dish => dish.id)});
  }
}
