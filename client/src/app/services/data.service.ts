import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Router} from '@angular/router';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {

  END_POINT = 'http://10.0.1.224:5000';

  constructor(public http: Http, public router: Router) {}

  // Submit an application
  submitApplication(data) {
    return this.http
      .post(
        `${this.END_POINT}/api/apply`,
        data
      )
      .toPromise()
      .then((res: Response) => res.json())
      .catch(this.handleError);
  }

  getApplicantsForJob(JobId) {
    return this.http
      .get(
        `${this.END_POINT}/api/openings/${JobId}/applications`
      )
      .toPromise()
      .then((res: Response) => res.json())
      .catch(this.handleError);
  }

  // Get list of jobs
  getListOfJobs() {
    return this.http
      .get(
        `${this.END_POINT}/api/openings`
      )
      .toPromise()
      .then((res: Response) => res.json())
      .catch(this.handleError);    
  }

  public extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  public handleError = (error: Response | any) => {
    return error;
  };
}
