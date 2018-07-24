import {Component, TemplateRef, OnInit} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  modalRef: BsModalRef;
  fields;
  application: FormGroup;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.initializeForm();
  }

  onlyDecimalNumberKey(event) {
    let charCode = event.which ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
      return false;
    return true;
  }

  initializeForm() {
    this.fields = {
      Name: ['', Validators.required],
      Email: ['', Validators.required],
      CurrentCompany: ['', Validators.required],
      TotalPackage: ['', Validators.required],
      ExpectedPackage: ['', Validators.required],
      JoiningTime: ['', Validators.required],
      Experience: ['', Validators.required],
      Designation: ['', Validators.required],
      Skills: ['', Validators.required],
      Education: ['', Validators.required],
      Relocation: [true, Validators.required],
      NoticePeriod: [false, Validators.required],
    };

    this.application = this.formBuilder.group(this.fields);
  }
}
