import { inject, Injectable } from '@angular/core';
import { Post } from '../models/post';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = "http://localhost:4002/posts";

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

  public addPost(p: Post): Observable<Post> {
    return this.http.post<Post>(BASE_URL, p);
  }

  public deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/${id}`);
  }

  public updatePost(id: number, p: Post): Observable<Post> {
    return this.http.put<Post>(`${BASE_URL}/${id}`, p);
  }
}
