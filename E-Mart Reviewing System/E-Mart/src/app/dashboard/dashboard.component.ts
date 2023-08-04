import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ApiService } from '../services/api.service'
import { Router } from '@angular/router'
import { DataService } from '../services/data.service';
import { Product } from '../models/product';
import { Review } from '../models/review'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  formValue!:FormGroup;
  searchByName:string='';

  notFound:Boolean=false;
  isAdmin:Boolean=false;
  role:any=localStorage.getItem("role")==null?"USER":localStorage.getItem("role");
 
  product={
    code:0,
    productName:'',
    brand:''
   }

   code:number=0;
   productName:any="";
   brand:any="";

   searchedProducts:Array<Product>=[];

  constructor(private productModel: Product, private api: ApiService, private router: Router, private formBuilder: FormBuilder,private dataService: DataService) { }

  ngOnInit(): void {
    this.formValue=this.formBuilder.group({
      code:[],
      productName:[''],
      brand:['']
    })

    if(this.role=="ADMIN")
      this.isAdmin=true;
    console.log(this.isAdmin);
  }

  onSubmit(){

    while(this.searchedProducts.length){
      this.searchedProducts.pop();
    }

    if(this.formValue.value.code!=null)
      this.product.code=this.formValue.value.code;
    else{
      this.product.code=0;
    }
    this.product.productName=this.formValue.value.productName;
    this.product.brand=this.formValue.value.brand;     

    console.log(this.product);

    this.api.getProducts(this.product).subscribe((res)=>{

      console.log(res);
      
    if(res.length==0){
      this.notFound=true;
    }
    else{
      this.notFound=false;
      this.searchedProducts=res;
      console.log(this.searchedProducts);
    }  
      
    });  
  }

  submit(){
    this.code=this.formValue.value.code;
    this.productName=this.formValue.value.productName;
    this.brand=this.formValue.value.brand; 
  }

  sendCode(code: any){
     this.dataService.postData(code);
  }

  reviews:Review[]=[];

  getAllReviews(productCode:any){
    this.api.getAllReviews().subscribe(res=>{
      console.log(res);
      this.notFound=false;
      for(let obj of res){
        if(obj.code==productCode && obj.approved==true)
        {
          this.reviews.push(obj);
        }
      }

      console.log(this.reviews);

      this.dataService.postData(this.reviews);
      this.router.navigate(['Dashboard/ProductReviews']);
      
    },err=>{
      console.log("we got error");
    });
  }

}
