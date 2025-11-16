import { Component, inject, OnInit, } from '@angular/core';
import { Admin } from '../../models/admin';
import { AdminService } from '../../services/admin-service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule,Save} from 'lucide-angular';

@Component({
  selector: 'app-admin-settings',
  imports: [ReactiveFormsModule,LucideAngularModule],
  templateUrl: './admin-settings.html',
  styleUrl: './admin-settings.css',
})
export class AdminSettings implements OnInit {
  admin!: Admin;
  adminService: AdminService = inject(AdminService);
  adminForm!: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  readonly SaveIcon = Save;
  router: Router = inject(Router);
  ngOnInit(): void {
    this.adminService.getAdmin(sessionStorage.getItem("adminId") || '').subscribe(
      {
        next: data => {
          this.admin = data;
          console.log(this.admin);
            this.adminForm = this.fb.nonNullable.group({
      id: [this.admin.id],
      mail: [this.admin.mail,[Validators.required, Validators.email]],
      password: [this.admin.password,[Validators.required, Validators.minLength(12)]],

  });
        }
      }
    );
  
  }

  onSubmit() {  
    if(!this.adminForm.valid) {
      console.log("Form is not valid");
    }
    else{
      this.adminService.updateAdmin(this.admin.id || '', this.adminForm.value).subscribe({
        next: data => {
          console.log("Admin updated successfully", data);
          this.router.navigate(['/dashboard']);
        }
      });
    }
  }
  onResetForm() {
    this.adminForm.reset();
  }

}
