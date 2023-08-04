import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { ApiService } from '../services/api.service'
import { user } from '../models/user'
import { Router } from '@angular/router'
import { ConfirmedValidator } from './confirmed.validator'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formValue!:FormGroup;
  recordObj:user=new user();

  constructor(private formBuilder: FormBuilder, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.formValue=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      password:['',[Validators.required,Validators.minLength(5),Validators.maxLength(10)]],
      checkPassword:['',Validators.required],
    },{
      validator:ConfirmedValidator('password','checkPassword')
    })
  }

  get f(){
    return this.formValue.controls;
  }

  

  postUser(){
    this.recordObj.userEmail=this.formValue.value.email;
    this.recordObj.firstName=this.formValue.value.firstName;
    this.recordObj.lastName=this.formValue.value.lastName;
    this.recordObj.userPassword=this.formValue.value.password;

    this.api.postUser(this.recordObj)
    .subscribe(res=>{
      console.log(res)
    })

     
  }



}
