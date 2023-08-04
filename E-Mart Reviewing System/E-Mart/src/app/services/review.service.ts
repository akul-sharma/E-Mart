import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  review:any;

  constructor() { }

  postData(review:any){
    this.review=review;
 }

 getData(){
   return this.review;
 }
}
