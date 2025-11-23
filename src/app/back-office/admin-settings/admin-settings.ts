import { Component, inject, OnInit } from '@angular/core';
import { Admin } from '../../models/admin';
import { AdminService } from '../../services/admin-service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { LucideAngularModule, Save } from 'lucide-angular';

@Component({
  selector: 'app-admin-settings',
  imports: [ReactiveFormsModule, LucideAngularModule, FormsModule],
  templateUrl: './admin-settings.html',
  styleUrl: './admin-settings.css',
})
export class AdminSettings implements OnInit {
  admin!: Admin;
  adminService: AdminService = inject(AdminService);
  adminForm!: FormGroup;
  confirmPassword: string = '';
  fb: FormBuilder = inject(FormBuilder);
  readonly SaveIcon = Save;
  router: Router = inject(Router);
  showPassword1:boolean=false;
  showPassword2:boolean=false;

  ngOnInit(): void {
    this.adminService.getAdmin(sessionStorage.getItem("adminId") || '').subscribe({
      next: data => {
        this.admin = data;
        this.adminForm = this.fb.nonNullable.group({
          id: [this.admin.id],
          mail: [this.admin.mail, [Validators.required, Validators.email]],
          password: [this.admin.password, [Validators.required, Validators.minLength(12)]],
        });
      }
    });
  }
   togglePasswordVisibility1(){
    this.showPassword1=!this.showPassword1;
  }
     togglePasswordVisibility2(){
    this.showPassword2=!this.showPassword2;
  }
  
  

  onSubmit() {
    const password = this.adminForm.get('password')?.value;

    if (!this.adminForm.valid) {
      console.log("Form is invalid");
      return;
    }

    if (password !== this.confirmPassword) {
      console.log("Passwords do not match");
      alert("Passwords do not match!"); 
      return;
    }

    this.adminService.updateAdmin(this.admin.id || '', this.adminForm.value).subscribe({
      next: data => {
        console.log("Admin updated successfully", data);
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        console.error("Update failed", err);
      }
    });
  }

  onResetForm() {
    this.adminForm.reset();
    this.confirmPassword = ''; 
  }

  show(pass:string){
    this.confirmPassword=pass
    console.log(this.confirmPassword)
  }
}