import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { window } from 'rxjs';
import { Product } from '../models/product';
import { Review } from '../models/review'
import { ApiService } from '../services/api.service'
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-raise-request',
  templateUrl: './raise-request.component.html',
  styleUrls: ['./raise-request.component.scss']
})
export class RaiseRequestComponent implements OnInit {

  formValue!:FormGroup;
  timer:any=30;

  constructor(private formBuilder: FormBuilder, private router: Router,  private api: ApiService, private dataService: DataService) { }

  ngOnInit(): void {
    this.formValue=this.formBuilder.group({
      code:[null,Validators.required],
      productName:['',Validators.required],
      brand:['',Validators.required]
    })
  }

  reviews:Review[]=[];
  Products:Array<Product>=[];
  productCode:any;
  productName:any;
  productBrand:any;
  isAlert:Boolean=false;
  spinner:Boolean=false;

  checkProduct(){
      this.productCode=this.formValue.value.code;
      this.productName=this.formValue.value.productName;
      this.productBrand=this.formValue.value.brand;
      
      this.api.getAllProducts().subscribe(res=>{
        this.Products=res;
        let flag=0;
        for(let product of this.Products){
          if(product.code==this.productCode && product.productName.toUpperCase()==this.productName.toUpperCase() && product.brand.toUpperCase()==this.productBrand.toUpperCase()){
              flag=1;
              break;
          }
        }
        if(flag==1){
          this.isAlert=false;
          this.spinner=true;
          this.getAllReviews();
          flag=0;
        }else{
          this.isAlert=true;
          this.spinner=false;
        }
      })
  }

  getAllReviews(){

    this.api.getAllReviews().subscribe(res=>{
      console.log(res);
      for(let obj of res){
        if(obj.code==this.productCode && obj.approved==true)
        {
          this.reviews.push(obj);
        }
      }

      console.log(this.reviews);
      this.dataService.postData(this.reviews);
      
      this.startTimer();
      
    });
  }

 
   startTimer(){
    let t=setInterval(()=>{
        if(this.timer<=0){
          this.router.navigate(['Dashboard/ProductReviews']);
          clearInterval(t);
        }else{
          this.timer--;
        }
    },1000);
    this.timer=30;
   }
  
}
