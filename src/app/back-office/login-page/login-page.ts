import { Component, OnInit,inject } from '@angular/core';
import {  FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Admin } from '../../models/admin';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin-service';

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
  ngOnInit(): void {
    this.loginForm=this.fb.nonNullable.group({
      mail:["",[Validators.required]],
      password:["",[Validators.required,Validators.minLength(12)]]
    })
    this.adminService.getAdmins().subscribe(
      data=>this.admins=data
    )
  }
  onSubmit(){
    // console.log(this.loginForm.value)
    // console.log(this.loginForm.get("mail")?.value)
    // console.log(this.loginForm.get("password")?.value)
    // console.log(this.admin.mail)
    // console.log(this.admin.password)
    // if(this.loginForm.get("mail")?.value.trim()===this.admin.mail.trim() && this.loginForm.get("password")?.value.trim()===this.admin.password.trim()){
    //   this.router.navigate(['/dashboard']);
    // }
      const found = this.admins.find(admin =>
    admin.mail === this.loginForm.get('mail')?.value.trim() &&
    admin.password === this.loginForm.get('password')?.value.trim()
  );
  if(found){
    sessionStorage.setItem("connected","true")
    this.router.navigate(['/dashboard']);
  }
  }

}
