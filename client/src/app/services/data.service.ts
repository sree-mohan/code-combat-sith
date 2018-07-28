import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Router} from '@angular/router';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {
  END_POINT = 'http://localhost:5000';

  constructor(public http: Http, public router: Router) {}

  httpOptions = {
    headers: new Headers({
      'Access-Control-Allow-Origin': '*',
      Authorization: 'authkey',
      userid: '1',
    }),
  };

  // Submit an application
  submitApplication(data) {
    return this.http
      .post(`${this.END_POINT}/api/apply`, data, this.httpOptions)
      .toPromise()
      .then((res: Response) => res.json())
      .catch(this.handleError);
  }

  // Upload a resume
  uploadResume(resume, id) {
    return this.http
      .post(`${this.END_POINT}/api/upload-resume/${id}`, resume, this.httpOptions)
      .toPromise()
      .then((res: Response) => res.json())
      .catch(this.handleError);
  }

  getApplicantsForJob(JobId) {
    return this.http
      .get(`${this.END_POINT}/api/openings/${JobId}/applications`)
      .toPromise()
      .then((res: Response) => res.json())
      .catch(this.handleError);
  }

  // Get list of jobs
  getListOfJobs() {
    return this.http
      .get(`${this.END_POINT}/api/openings`)
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
