import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerData = {
    user_name : '',
    user_email : '',
    password : '',
  };
  
  errorRegistering;
  constructor( private router:Router, public authService:AuthService) { }

  ngOnInit() { }

  register(){
    this.authService.register(this.registerData).subscribe((data:any) =>{
      if(data.status=="1"){
        this.router.navigate(['']);
        console.log(data);
        localStorage.setItem('token',data.jwtToken);
      }
      else{
        this.errorRegistering=true;
      }
    });
  }

}
