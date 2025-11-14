import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../models/post';
import { PostService } from '../../services/post-service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-selected-post',
  imports: [JsonPipe],
  templateUrl: './selected-post.html',
  styleUrl: './selected-post.css'
})
export class SelectedPost {
    idP!:string;
    post!:Post;
    postService:PostService=inject(PostService)
    
  activatedRoute:ActivatedRoute=inject(ActivatedRoute)
  ngOnInit(): void {
    this.idP=this.activatedRoute.snapshot.params['id']
       // v2 : return 1 return
    this.postService.getPost(this.idP).subscribe(
      data => this.post = data
      // error=>console.log(error)
    )
    
  }

}
