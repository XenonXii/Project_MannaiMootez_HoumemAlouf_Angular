import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit{
  private router = inject(Router);

  ngOnInit():void{
    if(!(sessionStorage.getItem("connected") && sessionStorage.getItem("connected")==="true")){
      this.router.navigate(['/login']);
    }
  }
}
