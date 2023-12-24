import { Component, OnInit } from '@angular/core';
import {FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

function forbiddenNameValidator(control: AbstractControl): { [key: string]: any } | null {
  const forbiddenName = 'Admin';
  const inputValue = control.value as string;

  if (inputValue && inputValue.trim().toLowerCase() === forbiddenName.toLowerCase()) {
    return { 'forbiddenName': { value: control.value } };
  }

  return null;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Reactive_Form';
  loginForm!: FormGroup;

  ngOnInit() {
    this.loginForm = new FormGroup({
      Firstname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$'), forbiddenNameValidator]),
      Lastname: new FormControl(''),
      Gender: new FormControl(''),
      Address: new FormControl(''),
      PhoneNumber: new FormControl(''),
      DateofBirth: new FormControl(''),
      email: new FormControl(''),
      subscribeToNewsletter: new FormControl(false)
    });
  
    const subscribeToNewsletterControl = this.loginForm.get('subscribeToNewsletter');
    const emailControl = this.loginForm.get('email');
  
    if (subscribeToNewsletterControl && emailControl) {
      subscribeToNewsletterControl.valueChanges.subscribe((value) => {
        if (value) {
          emailControl.setValidators([Validators.required, Validators.email]);
        } else {
          emailControl.clearValidators();
        }
        emailControl.updateValueAndValidity();
      });
    }
  }
  
  loginUser() {
    if (!this.loginForm.get('subscribeToNewsletter')?.value) {
  
      this.loginForm.get('email')?.clearValidators();
      this.loginForm.get('email')?.updateValueAndValidity();
    }
    console.warn(this.loginForm.value);
  }
  
  get Firstname() {
    return this.loginForm.get('Firstname');
  }
  
  get email() {
    return this.loginForm.get('email');
  }
  
}