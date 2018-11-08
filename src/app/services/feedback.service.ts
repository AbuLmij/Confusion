import { Injectable } from '@angular/core';
import { Feedback } from '../shared/feedback';
import { Http } from '@angular/http';
import { baseUrl } from '../shared/baseurl';
import { Observable } from 'rxjs';
import { ProcessHTTPMsgService } from '../services/process-httpmsg.service';

@Injectable()
export class FeedbackService {

  constructor(private http: Http, private processHTTPMsgService: ProcessHTTPMsgService) { }

  submitFeedback(feedback: Feedback) : Observable<Feedback> {
    return this.http.post(baseUrl + 'feedback', feedback).map(res => this.processHTTPMsgService.extractData(res))
    .catch(error => this.processHTTPMsgService.handleError(error));
  }
}
