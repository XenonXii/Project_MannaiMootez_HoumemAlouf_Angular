import { Component, signal } from '@angular/core';
import { LoginPage } from "./back-office/login-page/login-page";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('TP8');
}