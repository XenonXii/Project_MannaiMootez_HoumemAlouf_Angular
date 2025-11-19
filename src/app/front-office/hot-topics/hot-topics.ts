import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post-service';
import { RouterLink } from "@angular/router";
import { ArrowRight, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-hot-topics',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './hot-topics.html',
  styleUrl: './hot-topics.css',
})
export class HotTopics implements OnInit {
  readonly ArrowIcon=ArrowRight
  hotPosts: Post[] = [];
  postService: PostService = inject(PostService);
  ngOnInit(): void {
    this.postService.getHotPosts().subscribe({
      next: data => {
        this.hotPosts = data;
      }
    });
  }

  // Scroll functionality
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
scrollLeft() {
  this.scrollContainer.nativeElement.scrollBy({
    left: -300,
    behavior: 'smooth'
  });
}

scrollRight() {
  this.scrollContainer.nativeElement.scrollBy({
    left: 300,
    behavior: 'smooth'
  });
}
    
}
