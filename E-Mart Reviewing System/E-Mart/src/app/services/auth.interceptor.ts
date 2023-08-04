import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoginapiService } from "./loginapi.service";
import { Observable } from 'rxjs'

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private loginService: LoginapiService){}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        
        let newReq=req;
        let token=this.loginService.getToken();

        console.log("Interceptor",token);

        if(token!=null){
           newReq= req.clone({setHeaders:{Authorization:`Bearer ${token}`}})
        }

        return next.handle(newReq);
    }
}