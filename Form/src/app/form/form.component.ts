import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form: FormGroup;
  skillsForm : FormArray;

  constructor() {

  }

  ngOnInit() {
    this.form =  new FormGroup({
      email: new FormControl('', [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
      skills: new FormArray([])
    });
    this.skillsForm = this.form.get('skills') as FormArray;

    this.form.valueChanges.pipe(
      debounceTime(3000),
      distinctUntilChanged((pre,cur) =>
       pre.email == cur.email))
        .subscribe(val => console.log(val))
  }

  submit() {
    if (this.form.valid) {
      console.log('Form: ', this.form)
      const formData = {...this.form.value}

      console.log('Form Data:', formData)
    }
  }

  addSkills(){
    const control = new FormControl('', Validators.required);
    (this.form.get('skills') as FormArray).push(control);
  }
}
