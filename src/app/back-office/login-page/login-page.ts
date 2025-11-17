import { Component, OnInit,inject } from '@angular/core';
import {  FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Admin } from '../../models/admin';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin-service';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage implements OnInit{
  admins!:Admin[];
  adminService:AdminService=inject(AdminService);
  loginForm!:FormGroup;
  fb:FormBuilder=inject(FormBuilder);
  private router = inject(Router);
  validMail:boolean=true;
  showPassword:boolean=false;
  isLoading:boolean=false;
  loginError:string='';
  authService=inject(AuthService);
  
  ngOnInit(): void {
    this.loginForm=this.fb.nonNullable.group({
      mail:["",[Validators.required]],
      password:["",[Validators.required,Validators.minLength(12)]]
    })
    this.adminService.getAdmins().subscribe(
      data=>this.admins=data
    )
  }
  
  togglePasswordVisibility(){
    this.showPassword=!this.showPassword;
  }
  
  onSubmit(){
    if(this.loginForm.invalid) return;
    
    this.isLoading=true;
    this.loginError='';
    
    // Simulate network delay for better UX
    setTimeout(() => {
      
      
     


      this.authService.login(this.loginForm.get('mail')?.value.trim(), this.loginForm.get('password')?.value.trim(),this.admins)
        .subscribe((success) => {
          if (success) {
        this.router.navigate(['/dashboard']);

          }
          else{
 this.isLoading=false;
        this.loginError='Invalid email or password. Please try again.';
          }
        });
    }, 800);
  }

}
