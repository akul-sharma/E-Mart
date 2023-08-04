import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class LoginapiService {

  constructor(private http: HttpClient) { }

  generateToken(credentials:any){
     return this.http.post('http://localhost:8080/users',credentials);
  }

  loginUser(token:any, name:any, role:any, email:any){
     localStorage.setItem('token',token);
     localStorage.setItem('name',name);
     localStorage.setItem('role',role);
     localStorage.setItem('email',email);
  }

  isLoggedIn(){
    let token=localStorage.getItem('token');
    if(token=='' || token==null || token==undefined)
    {
      return false;
    }
    else{
      return true;
    }  
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    return true;
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getName(){
    return localStorage.getItem('name');
  }

  getRole(){
    return localStorage.getItem('role');
  }

  
}
