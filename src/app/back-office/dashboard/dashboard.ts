import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Menu } from "../menu/menu";


@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, Menu],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit{
  private router = inject(Router);
  mobileMenuClosed = true;

  @ViewChild('menu') menu: Menu | undefined ;
  
  ngOnInit():void{
    if(!(sessionStorage.getItem("connected") && sessionStorage.getItem("connected")==="true")){
      this.router.navigate(['/login']);
    }
  }

  toggleMobileMenu() {
    this.mobileMenuClosed = !this.mobileMenuClosed;
  }

  closeMobileMenu() {
    this.mobileMenuClosed = true;
  }

}
