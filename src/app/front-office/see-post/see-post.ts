import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Heart, SquarePen, LucideAngularModule, Sun, Cloud, CloudRain, CloudSnow } from 'lucide-angular';
import { Post } from '../../models/post';
import { PostService } from '../../services/post-service';
import { FormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { Comment } from '../../models/comment';
import { WeatherService } from '../../services/weather-service';

@Component({
  selector: 'app-see-post',
  imports: [RouterLink, ɵInternalFormsSharedModule, FormsModule, LucideAngularModule],
  templateUrl: './see-post.html',
  styleUrl: './see-post.css',
})
export class SeePost {
  idP!: string;
  post!: Post;
  relatedPosts: Post[] = [];
  nbComment: number = 0;
  newCommentMessage: string = '';

  weather: { temp: number; condition: string; icon: any } | null = null;

  readonly HeartIcon = Heart;
  readonly SquarePenIcon = SquarePen;
  readonly SunIcon = Sun;
  readonly CloudIcon = Cloud;
  readonly CloudRainIcon = CloudRain;
  readonly CloudSnowIcon = CloudSnow;

  postService = inject(PostService);
  weatherService = inject(WeatherService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.idP = this.activatedRoute.snapshot.params['id'];

    this.postService.getPost(this.idP).subscribe((post) => {
      this.post = post;

      if (post.location) this.loadWeather(post.location);

      this.postService.getPosts().subscribe((allPosts) => {
        allPosts.forEach(p => (this.nbComment += p.comments.length));
        this.relatedPosts = allPosts.filter(
          (p) =>
            p.id !== this.post.id &&
            p.tags?.some((tag) => this.post.tags?.includes(tag))
        );
      });
    });
  }

  onSeePost(id: string) {
    this.router.navigate(['/home', id]).then(() => {
      this.ngOnInit();
    });
  }

  onAddComment(msg: string, field: HTMLInputElement) {
    if (msg.trim() !== '') {
      const comment: Comment = {
        id: 'c' + this.nbComment.toString(),
        message: msg,
        date: new Date().toISOString().split('T')[0],
        liked: false,
      };
      this.postService.addComment(this.post.id, comment).subscribe({
        next: (updatedPost) => {
          this.post = updatedPost;
          this.newCommentMessage = '';
          field.value = '';
          this.nbComment++;
        },
      });
    }
  }
  private loadWeather(city: string) {
    this.weatherService.getCurrentWeather(city).subscribe({
      next: (res) => {
        const conditionText = res.current.condition.text;
        const iconUrl = 'https:' + res.current.condition.icon;

        this.weather = {
          temp: res.current.temp_c,
          condition: conditionText,
          icon: iconUrl,
        };
      },
      error: (err) => console.error('Weather error:', err),
    });
  }

}
