import {Component, TemplateRef, OnInit, ChangeDetectorRef} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {DataService} from '../../services/data.service';

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

  // Upload Modal Values
  fileName;
  fileBrowser;

  constructor(
    private modalService: BsModalService,
    private cd: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.dataService.getListOfJobs().then(res => (this.jobs = res));
  }

  openModal(template: TemplateRef<any>, JobId) {
    this.modalRef = this.modalService.show(template);
    this.fileName = '';
    this.initializeForm(JobId);
  }

  onFileChange(event) {
    // Set Filename
    if (event.srcElement) {
      this.fileBrowser = event.srcElement.files;
      this.fileName = this.fileBrowser['0'].name;
    } else {
      this.fileBrowser = event.target.files;
      this.fileName = this.fileBrowser['0'].name;
    }
  }

  onlyDecimalNumberKey(event) {
    let charCode = event.which ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
      return false;
    return true;
  }

  submit(data) {
    this.dataService.submitApplication(data).then(res => {
      const formData = new FormData();
      formData.append('file', this.fileBrowser['0']);
      this.dataService.uploadResume(formData, res._id).then(res => {
        this.modalRef.hide();
      });      
    });
  }

  initializeForm(JobId) {
    this.fields = {
      JobId: JobId,
      Name: ['', Validators.required],
      CurrentCompany: ['', Validators.required],
      TotalPackage: ['', Validators.required],
      ExpectedPackage: ['', Validators.required],
      JoiningTime: ['', Validators.required],
      Experience: ['', Validators.required],
      Designation: ['', Validators.required],
      Education: ['', Validators.required],
      Relocation: [true, Validators.required],
      NoticePeriod: [false, Validators.required],
    };

    this.application = this.formBuilder.group(this.fields);
  }
}
