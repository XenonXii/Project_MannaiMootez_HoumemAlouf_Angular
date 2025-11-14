import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, MenuIcon ,SlidersHorizontal,File,CirclePlus} from 'lucide-angular';

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
  collapsed:boolean = false;

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

}
