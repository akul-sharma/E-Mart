import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'
import { Router } from '@angular/router'
import { Review } from '../models/review'

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  reviews:Review[]=[];

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getAllReviews();
  }

  getAllReviews(){
    this.api.getAllReviews().subscribe(res=>{
      console.log(res);
      for(let obj of res){
        if(obj.approved==false)
        {
          this.reviews.push(obj);
        }
      }

      console.log(this.reviews);
      
    },err=>{
      console.log("we got error");
    });
  }

  approveReview(id:any){
    console.log(id);
      this.api.approveReview(id).subscribe(res=>{
          console.log(res);
      });
      location.reload();
  }

  rejectReview(id: any){
    this.api.deleteReview(id).subscribe(res=>{
      console.log("Deleted successfully");
    });
    location.reload();
  }

}
