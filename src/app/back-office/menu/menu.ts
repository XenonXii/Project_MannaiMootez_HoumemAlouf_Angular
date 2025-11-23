import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, MenuIcon ,SlidersHorizontal,File,CirclePlus,Settings} from 'lucide-angular';

@Component({
  selector: 'app-menu',
  imports: [RouterLink, RouterLinkActive,LucideAngularModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {
readonly MenuIcon = MenuIcon;
readonly FileIcon = File;
readonly ControlPanelIcon=SlidersHorizontal;
readonly AddPostIcon=CirclePlus
readonly SettingsIcon=Settings
  collapsed:boolean = false; 
  
  @Output() mobileMenuClose = new EventEmitter<void>();

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  closeMobileMenu() {
    this.mobileMenuClose.emit();
  }

}
