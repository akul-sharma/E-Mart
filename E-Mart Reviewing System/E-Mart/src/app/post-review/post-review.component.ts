import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { DataService } from '../services/data.service';
import { Review } from '../models/review'

@Component({
  selector: 'app-post-review',
  templateUrl: './post-review.component.html',
  styleUrls: ['./post-review.component.scss']
})
export class PostReviewComponent implements OnInit {

  code:any;
  formValue!:FormGroup;
  name:any;
  constructor(private dataService: DataService, private formBuilder: FormBuilder, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.formValue=this.formBuilder.group({
      heading:['',[Validators.required]],
      rating:[null,[Validators.required,Validators.min(0),Validators.max(5)]],
      comment:['',Validators.required]
    })
     this.getCode();
  }

  getCode(){
    this.code=this.dataService.getData();
    console.log(this.code);
  }

  review:Review=new Review();

  postReview(){
    console.log(this.code);
    console.log(this.formValue.value.heading);
    console.log(this.formValue.value.rating);
    console.log(this.formValue.value.comment);
    console.log(localStorage.getItem("name"));

    this.name=localStorage.getItem("name");

    this.review.code=this.code;
   this.review.heading=this.formValue.value.heading;
   this.review.rating=this.formValue.value.rating;
   this.review.comment=this.formValue.value.comment;
   this.review.userName=this.name==null?'':this.name;

    this.api.postReview(this.review)
    .subscribe(res=>{
      console.log(res)
    }) 
    
    this.router.navigate(['/Dashboard']);
  }

}
