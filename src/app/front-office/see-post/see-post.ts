import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Heart, SquarePen } from 'lucide-angular';
import { Post } from '../../models/post';
import { PostService } from '../../services/post-service';
import { JsonPipe, NgIf, NgFor } from '@angular/common';
import { FormBuilder, FormGroup, ɵInternalFormsSharedModule } from "@angular/forms";

@Component({
  selector: 'app-see-post',
  imports: [RouterLink, ɵInternalFormsSharedModule],
  templateUrl: './see-post.html',
  styleUrl: './see-post.css',
})
export class SeePost {
  idP!: string;
  post!: Post;
  relatedPosts: Post[] = [];
  postService = inject(PostService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  readonly HeartIcon = Heart;
  readonly SquarePenIcon = SquarePen;

  ngOnInit(): void {
    this.idP = this.activatedRoute.snapshot.params['id'];

    // First load the selected post
    this.postService.getPost(this.idP).subscribe((post) => {
      this.post = post;

      // Then load all posts and filter them
      this.postService.getPosts().subscribe((allPosts) => {
        this.relatedPosts = allPosts.filter(
          (p) =>
            p.id !== this.post.id &&
            p.tags?.some((tag) => this.post.tags?.includes(tag))
        );

        console.log(this.relatedPosts);
      });
    });
  }

  onSeePost(id: string) {
     this.router.navigate(['/home', id]).then(() => {
    this.ngOnInit();
  });
  }
}
