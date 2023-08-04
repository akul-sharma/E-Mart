import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postUser(data: any){
    return this.http.post<any>("http://localhost:8080/register",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getProducts(product:any){
    return this.http.post<any>("http://localhost:8080/products",product)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getAllProducts(){
    return this.http.get<any>("http://localhost:8080/products")
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  postReview(review:any){
    return this.http.post<any>("http://localhost:8080/reviews",review)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getAllReviews(){
    return this.http.get<any>("http://localhost:8080/reviews")
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  approveReview(id:any){
    return this.http.put<any>("http://localhost:8080/admin",id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteReview(id:any){
    return this.http.delete<any>(`http://localhost:8080/admin/${id}`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getProductsCount(){
    return this.http.get<any>("http://localhost:8080/ProductsCount")
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getUsersCount(){
    return this.http.get<any>("http://localhost:8080/UsersCount")
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getReviewsCount(){
    return this.http.get<any>("http://localhost:8080/ReviewsCount")
    .pipe(map((res:any)=>{
      return res;
    }))
  }

}
