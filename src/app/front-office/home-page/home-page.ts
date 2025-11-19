import { Component, inject, OnInit } from '@angular/core';
import { Menu } from "../menu/menu";
import { PostService } from '../../services/post-service';
import { Post } from '../../models/post';
import { HotTopics } from "../hot-topics/hot-topics";

@Component({
  selector: 'app-home-page',
  imports: [Menu, HotTopics],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {
  posts: Post[] = []; 
  categories: string[] = [];
  
  postService: PostService = inject(PostService);

  ngOnInit(): void {
    this.postService.getVisiblePosts().subscribe({
      next: data => {
        this.posts = data;
        
        // Extract categories from posts after data is loaded
        this.extractCategories();
      }
    });

  }

  private extractCategories(): void {
   for (let post of this.posts) {
          for (let tag of post.tags) {
            if (!this.categories.includes(tag)) {
              this.categories.push(tag);
            }
          }
        }
  }
}