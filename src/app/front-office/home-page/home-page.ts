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
  currentField: string = "";
  currentSearchQuery: string = "";
  currentTag: string = "";

  allPosts: Post[] = [];
  posts: Post[] = [];
  categories: string[] = [];

  postService = inject(PostService);

  ngOnInit(): void {
    this.postService.getVisiblePosts().subscribe(data => {
      this.allPosts = data;
      this.posts = data;
      this.extractCategories();
    });
  }

  private extractCategories() {
    for (let post of this.allPosts) {
      for (let tag of post.tags) {
        if (!this.categories.includes(tag)) {
          this.categories.push(tag);
        }
      }
    }
  }

  applyFilters() {
    this.posts = this.allPosts;

    if (this.currentTag) {
      this.posts = this.posts.filter(p => p.tags.includes(this.currentTag));
    }

    if (this.currentSearchQuery && this.currentField) {
      const q = this.currentSearchQuery;

      this.posts = this.posts.filter(post => {
        switch (this.currentField) {
          case 'title': return post.title.toLowerCase().includes(q);
          case 'tags': return post.tags.some(tag => tag.toLowerCase().includes(q));
          case 'location': return post.location.toLowerCase().includes(q);
        }
        return false;
      });
    }
  }

  filterByTag(tag: string) {
    this.currentTag = tag;
    this.applyFilters();
  }

  onSearch(query: string, field: string) {
    this.currentSearchQuery = query.trim().toLowerCase();
    this.currentField = field;
    this.applyFilters();
  }
}
