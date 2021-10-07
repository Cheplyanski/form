import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { bufferTime, debounceTime, delay, throttleTime } from 'rxjs/operators';
import { interval } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form: FormGroup;

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
      ])
    });
    /*
    this.form.get('email').valueChanges.pipe(debounceTime(1000)).subscribe(val => {
      console.log ("email= " + val)
    })
     */

    this.form.valueChanges.pipe(debounceTime(1000)).subscribe(val => {
      console.log(val)
    })
  }

  submit() {
    if (this.form.valid) {
      console.log('Form: ', this.form)
      const formData = {...this.form.value}

      console.log('Form Data:', formData)
    }
  }

}
