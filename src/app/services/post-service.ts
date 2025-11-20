import { inject, Injectable } from '@angular/core';
import { Post } from '../models/post';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';

const BASE_URL = "http://localhost:3000/posts";

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly http: HttpClient = inject(HttpClient);

  public getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(BASE_URL);
  }
   public getPost(id:string): Observable<Post> {
    return this.http.get<Post>(`${BASE_URL}/${id}`);
  }

  public getVisiblePosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${BASE_URL}?visible=true`);
  }

  public addPost(p: Post): Observable<Post> {
    return this.http.post<Post>(BASE_URL, p);
  }

  public deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/${id}`);
  }

  public updatePost(id: string, p: Post): Observable<Post> {
    return this.http.put<Post>(`${BASE_URL}/${id}`, p);
  }

public addComment(postId: string, comment: Comment): Observable<Post> {
  return new Observable<Post>((observer) => {
    this.http.get<Post>(`${BASE_URL}/${postId}`).subscribe(post => {
      post.comments.push(comment);
      this.http.put<Post>(`${BASE_URL}/${postId}`, post).subscribe(observer);
    });
  });
}


  public getHotPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${BASE_URL}?hot=true`);
  }

  public deleteComment(postId: string, commentId: string): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/${postId}/comments/${commentId}`);
  }


}
