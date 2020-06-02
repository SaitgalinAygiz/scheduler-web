import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-consultations-page',
  templateUrl: './consultations-page.component.html',
  styleUrls: ['./consultations-page.component.css']
})
export class ConsultationsPageComponent implements OnInit {
  students: string[] = ['Саитгалин Айгиз', 'Владимир Путин', 'Алсу Гимадиева', 'ЫА СУКА', 'ШЛЮХА'];
  selectedStudents: string[] = [];

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  // tslint:disable-next-line:variable-name
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
  }

}
