import { Component, inject, OnInit } from '@angular/core';
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

  ngOnInit():void{
    if(!(sessionStorage.getItem("connected") && sessionStorage.getItem("connected")==="true")){
      this.router.navigate(['/login']);
    }
  }
}
