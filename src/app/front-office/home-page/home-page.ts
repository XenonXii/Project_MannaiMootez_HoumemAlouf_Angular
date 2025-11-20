import { Component, effect, inject, OnInit, ViewChild, runInInjectionContext, Injector } from '@angular/core';
import { Menu } from "../menu/menu";
import { PostService } from '../../services/post-service';
import { Post } from '../../models/post';
import { HotTopics } from "../hot-topics/hot-topics";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home-page',
  imports: [Menu, HotTopics, RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {
currentField: string = '';
  allPosts: Post[] = []; 
  posts: Post[] = [];
  categories: string[] = [];

  postService: PostService = inject(PostService);

  ngOnInit(): void {
    this.postService.getVisiblePosts().subscribe({
      next: data => {
        this.allPosts = data;
        this.posts = data;
        this.extractCategories();
      }
    });
  }

  filterByTag(tag: string) {
    if(tag!=""){
      this.posts = this.allPosts.filter(p => p.tags.includes(tag));
    }
    else{
      this.posts=this.allPosts
    }
  }

  private extractCategories(): void {
    for (let post of this.allPosts) {
      for (let tag of post.tags) {
        if (!this.categories.includes(tag)) {
          this.categories.push(tag);
        }
      }
    }
  }

    onSearch(query: string, field: string) {
  query = query.toLowerCase().trim();

  if (!query) {
    this.posts = this.allPosts;
    return;
  }

  this.posts = this.allPosts.filter(post => {
    if (field === 'title') {
      return post.title.toLowerCase().includes(query);
    } 
    else if(field==="tags"){
      return post.tags.some(tag => tag.toLowerCase().includes(query));
    }
    return false;
  });
}

}
