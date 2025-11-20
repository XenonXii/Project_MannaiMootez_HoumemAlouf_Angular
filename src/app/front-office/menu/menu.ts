import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu  {
  @Input() categories: string[] = [];
  @Output() tagSelected = new EventEmitter<string>();
  @Output() query=new EventEmitter<string>()
  @Output() field=new EventEmitter<string>()

  onToggleTag(tag: string) {
    this.tagSelected.emit(tag);
  }
  ontResetTag(){
    this.tagSelected.emit("")
  }

  onSearch(input:string,selector:string){
    this.query.emit(input)
    this.field.emit(selector)
  }




}
