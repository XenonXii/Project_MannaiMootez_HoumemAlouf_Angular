import { Component, inject, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post-service';
import { LucideAngularModule, Eye, EyeOff, Trash, Flame ,ScanEye,Plus} from 'lucide-angular';
import { Router, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-control-panel',
  imports: [LucideAngularModule, RouterLink, DatePipe],
  templateUrl: './control-panel.html',
  styleUrl: './control-panel.css',
})
export class ControlPanel implements OnInit {
  allPosts: Post[] = []
  postService: PostService = inject(PostService)
  readonly EyeIcon = Eye
  readonly EyeOffIcon = EyeOff
  readonly TrashIcon = Trash
  readonly FlameIcon = Flame
  readonly PlusIcon = Plus
  readonly ScanEyeIcon=ScanEye
  posts!: Post[];
today: Date = new Date();

  private router = inject(Router);

  ngOnInit(): void {
    if(sessionStorage.getItem("connected")){
        setInterval(() => {
    this.today = new Date();
  }, 1000);
        //v1 : returns an object
    // this.postService.getPosts().subscribe({
    //   next:(data)=>{this.posts=data},
    //   error:(error)=>{console.log(error)}
    // })

    // v2 : return 1 return

    this.postService.getPosts().subscribe(
      data => { this.allPosts = data; this.posts = this.allPosts.filter(p=>p.draft==false) }
      // error=>console.log(error)
    )
    }
    else{
      this.router.navigate(['/login']);

    }
  


  }

get totalPosts() { return this.allPosts.length; }
get visiblePosts() { return this.allPosts.filter(p => p.visible).length; }
get hiddenPosts() { return this.allPosts.filter(p => !p.visible).length; }
get hotPosts() { return this.allPosts.filter(p => p.hot).length; }



onLogout() {
  sessionStorage.removeItem("connected")
      this.router.navigate(['/login']);

}

  onSearch(query: string, field: string) {
  query = query.toLowerCase().trim();

  if (!query) {
    // Empty query → show all posts
    this.posts = this.allPosts;
    return;
  }

  this.posts = this.allPosts.filter(post => {
    if (field === 'title') {
      return post.title.toLowerCase().includes(query);
    } else if (field === 'id') {
      return post.id.includes(query);
    }
    else if(field==="tags"){
      return post.tags.some(tag => tag.toLowerCase().includes(query));
    }
    return false;
  });
}

  onDeletePost(id: string) {
    this.postService.deletePost(id).subscribe(() => {
      this.allPosts = this.allPosts.filter(post => post.id !== id);
      this.posts = this.allPosts
    });
  }

  // UI update
  onToggleHiddenPosts() {
    this.posts = this.allPosts.filter(post => post.visible === false);

  }
  onToggleHotTopics() {
    this.posts = this.allPosts.filter(post => post.hot === true);
  }

  // json update
  toggleVisibility(post: Post) {
    post.visible = !post.visible;
    this.postService.updatePost(post.id, post).subscribe({
      next: updated => console.log(`Post ${post.id} visibility updated`),
      error: err => console.error(err)
    });
  }

  // Toggle hot
  toggleHot(post: Post) {
    post.hot = !post.hot;
    this.postService.updatePost(post.id, post).subscribe({
      next: updated => console.log(`Post ${post.id} hot status updated`),
      error: err => console.error(err)
    });
  }

  
}
