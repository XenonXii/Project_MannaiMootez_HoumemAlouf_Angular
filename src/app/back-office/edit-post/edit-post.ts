import { Component, inject, OnInit } from '@angular/core';
import { PostService } from '../../services/post-service';
import { Post } from '../../models/post';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-post',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-post.html',
  styleUrl: './edit-post.css',
})
export class EditPost implements OnInit {
  idP!:string;
    post!:Post;
    postService:PostService=inject(PostService)
     activatedRoute:ActivatedRoute=inject(ActivatedRoute)

     postForm!: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  private router = inject(Router);
  
ngOnInit(): void {
  this.idP = this.activatedRoute.snapshot.params['id'];

  this.postService.getPost(this.idP).subscribe(data => {
    this.post = data;

    // Initialize the form AFTER receiving the post
    this.postForm = this.fb.group({
      id: [this.post.id],
      title: [this.post.title, [Validators.required, Validators.maxLength(150)]],
      description: [this.post.description, [Validators.required, Validators.maxLength(5000)]],
      image: [this.post.image, [Validators.required]],
      visible: [this.post.visible],
      hot: [this.post.hot],
      date: [this.post.date],
      comments: [this.post.comments],
      tags: this.fb.array([])
    });

    // Load existing tags into FormArray
    this.post.tags.forEach(t => {
      this.getTags.push(this.fb.control(t, Validators.required));
    });
  });
}



    // Getter for tags
  public get getTags(): FormArray {
    return this.postForm.get("tags") as FormArray;
  }

  // Add tag
  onAddTag() {
    const tag = this.fb.control('', Validators.required);
    this.getTags.push(tag);
  }

  // Remove tag
  removeTag(index: number) {
    this.getTags.removeAt(index);
  }

  // Reset form
  onResetForm() {
    this.postForm.reset();
    this.getTags.clear();
    this.postForm.get("visible")?.setValue(false);
    this.postForm.get("hot")?.setValue(false);
  }
 onSubmit() {
  if (this.postForm.invalid) {
    this.postForm.markAllAsTouched();
    return;
  }

  const updatedPost: Post = this.postForm.value;

  this.postService.updatePost(this.idP, updatedPost).subscribe(() => {
    this.router.navigate(['/dashboard/controlpanel', this.idP]);
  });
}

}
