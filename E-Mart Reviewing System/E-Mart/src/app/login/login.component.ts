import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ApiService } from '../services/api.service'
import { Router } from '@angular/router'
import { LoginapiService } from '../services/loginapi.service'
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

 formValue!:FormGroup;
 invalid:boolean=false;

 credentials={
  userEmail:'',
  userPassword:''
 }

  constructor(private loginService: LoginapiService,private userService: UserService,private api: ApiService, private router: Router, private formBuilder: FormBuilder, private loginApi: LoginapiService) { }

  ngOnInit(): void {
    this.formValue=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    })
  }

  userData:any;
  data:any;

  login(){
    this.credentials.userEmail=this.formValue.value.email;
    this.credentials.userPassword=this.formValue.value.password;

    this.loginApi.generateToken(this.credentials).subscribe(
      (res:any)=>{
        this.invalid=false;
        console.log(res.token);
        this.userService.getUser(res).subscribe(
          (response:any)=>{
            console.log(response.firstName+" "+response.lastName);
            console.log("Role is:"+response.userRole);
            this.loginApi.loginUser(res.token,response.firstName+" "+response.lastName,response.userRole,response.userEmail);
            

            if(response.userRole=="USER"){

                this.router.navigate(['/Dashboard']);
                setTimeout(()=>{
                   location.reload();
                },100)
                
            }else{
                this.router.navigate(['/AdminDashboard']);
                setTimeout(()=>{
                  location.reload();
               },100)
            }

            
          }
        );
      }
    )

   

  }

}
