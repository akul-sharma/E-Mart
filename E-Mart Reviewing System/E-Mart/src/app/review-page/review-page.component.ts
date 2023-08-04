import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Review } from '../models/review'

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.scss']
})
export class ReviewPageComponent implements OnInit {

  reviews:Review[]=[];
  averageReviews:number=0;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
     this.getReviews();
  }

  getReviews(){
    this.reviews=this.dataService.getData();
    for(let review of this.reviews){
       this.averageReviews=this.averageReviews+review.rating;
    }
  }

}
