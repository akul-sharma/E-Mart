import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  data:any;

  postData(data:any){
     this.data=data;
  }

  getData(){
    return this.data;
  }
}
