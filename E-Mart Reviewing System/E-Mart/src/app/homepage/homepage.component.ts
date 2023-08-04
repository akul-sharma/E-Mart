import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  products:number=0;
  users:number=0;
  reviews:number=0;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getCount();
  }

  getCount(){
    this.api.getProductsCount().subscribe(res=>{
      this.products=res;
    })
    this.api.getUsersCount().subscribe(res=>{
      this.users=res;
    })
    this.api.getReviewsCount().subscribe(res=>{
      this.reviews=res;
    })
  }

}
