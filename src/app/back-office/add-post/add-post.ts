import { Component, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../../services/post-service';

import { Post } from '../../models/post';

@Component({
  selector: 'app-add-post',
  imports: [ReactiveFormsModule],
  templateUrl: './add-post.html',
  styleUrl: './add-post.css',
})
export class AddPost implements OnInit {

  postForm!: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  private router = inject(Router);
  postService: PostService = inject(PostService);
  posts: Post[] = []
  ngOnInit(): void {
    this.postForm = this.fb.nonNullable.group({
      id: [''],
      title: ['', [Validators.required, Validators.maxLength(150)]],
      description: ['', [Validators.required, Validators.maxLength(5000)]],
      image: ['', [Validators.required]],
      visible: [false],
      hot: [false],
      date: [""],
      location: ["", [Validators.required]],
      tags: this.fb.array([])
    });
    this.postService.getPosts().subscribe(
      data => { this.posts = data; }
      // error=>console.log(error)
    )
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
      console.log("Form is invalid");

    }
    else {
      console.log("Form Submitted!", this.postForm.value);
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
      const dd = String(today.getDate()).padStart(2, '0');

      const formattedDate = `${yyyy}-${mm}-${dd}`;

      this.postForm.patchValue({
        id: (this.posts.length + 1).toString(),
        date: formattedDate
      });
      console.log("hello")
      this.postService.addPost(this.postForm.value).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/dashboard/controlpanel']);
        },
      );
    }
  }


}