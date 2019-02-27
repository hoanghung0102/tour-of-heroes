import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-ang-form',
  templateUrl: './ang-form.component.pug',
  styleUrls: ['./ang-form.component.scss']
})
export class AngFormComponent implements OnInit {

  profileForm: FormGroup;

  get hobbies() {
    return ["Swimming", "Football", "Running", "Jumping", "Drift", "Badminton"]
  }

  get rangeAges() {
    return [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
  }

  constructor() {}

  ngOnInit() {
    this.profileForm = this.createFormGroup();
  }

  public onSubmit(event) {
    console.log(event);
  }

  createFormGroup () {
    return new FormGroup({
      name: new FormControl([
        Validators.required,
        Validators.maxLength(12)
      ]),
      age: new FormControl(this.rangeAges[0]),
      hobbie: new FormControl(this.hobbies[0]),
      sex: new FormControl(true)
    })
  }
}
