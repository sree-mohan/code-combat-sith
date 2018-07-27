import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-recruiter-home',
  templateUrl: './recruiter-home.component.html',
  styleUrls: ['./recruiter-home.component.scss']
})
export class RecruiterHomeComponent implements OnInit {

  jobs = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getListOfJobs()
    .then(res => this.jobs = res);
  }

}
