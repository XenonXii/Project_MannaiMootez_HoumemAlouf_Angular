import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../models/post';
import { PostService } from '../../services/post-service';
import { Heart, LucideAngularModule } from 'lucide-angular';
import { Comment } from '../../models/comment';


@Component({
  selector: 'app-selected-post',
  imports: [LucideAngularModule],
  templateUrl: './selected-post.html',
  styleUrl: './selected-post.css'
})
export class SelectedPost {
    idP!:string;
    post!:Post;
    postService:PostService=inject(PostService)
    readonly HeartIcon=Heart
    
  activatedRoute:ActivatedRoute=inject(ActivatedRoute)
  ngOnInit(): void {
    this.idP=this.activatedRoute.snapshot.params['id']
       // v2 : return 1 return
    this.postService.getPost(this.idP).subscribe(
      data => this.post = data
      // error=>console.log(error)
    )
    
  }
onDeleteComment(c: Comment) {
  // Remove the comment locally first
  this.post.comments = this.post.comments.filter(comment => comment.id !== c.id);

  // Send the updated post to JSON-Server
  this.postService.updatePost(this.post.id, this.post).subscribe({
    next: updated => {
      console.log(`Comment ${c.id} deleted successfully.`);
      this.post = updated; // refresh local post in case server modifies anything
    },
    error: err => console.error('Failed to delete comment', err)
  });
}

onToggleLikeComment(c: Comment) {
  c.liked=!c.liked

  this.postService.updatePost(this.post.id, this.post).subscribe({
    next: updated => {
      this.post = updated; // refresh local copy
    },
    error: err => console.error('Failed to update like', err)
  });
}
}