import {Component, TemplateRef, OnInit} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  modalRef: BsModalRef;
  fields;
  jobs = [];
  application: FormGroup;
  skills = ['Angular', 'React', 'JavaScript', 'NodeJS'];

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.dataService.getListOfJobs()
      .then(res => this.jobs = res);
  }

  openModal(template: TemplateRef<any>, JobId) {
    this.modalRef = this.modalService.show(template);
    this.initializeForm(JobId);
  }

  closeModal(template: TemplateRef<any>) {
    this.modalRef.hide();
  }

  onlyDecimalNumberKey(event) {
    let charCode = event.which ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
      return false;
    return true;
  }

  submit(data) {
    this.dataService.submitApplication(data)
      .then(res => {
        this.closeModal();
      })
  }

  initializeForm(JobId) {
    this.fields = {
      JobId: JobId,
      Name: ['', Validators.required],
      Email: ['', Validators.required],
      CurrentCompany: ['', Validators.required],
      TotalPackage: ['', Validators.required],
      ExpectedPackage: ['', Validators.required],
      JoiningTime: ['', Validators.required],
      Experience: ['', Validators.required],
      Designation: ['', Validators.required],
      Skills: [[], Validators.required],
      Education: ['', Validators.required],
      Relocation: [true, Validators.required],
      NoticePeriod: [false, Validators.required],
    };

    this.application = this.formBuilder.group(this.fields);
  }
}
