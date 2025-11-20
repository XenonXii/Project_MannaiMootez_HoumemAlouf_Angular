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

  // Weather
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

    // Load post
    this.postService.getPost(this.idP).subscribe((post) => {
      this.post = post;

      // Load weather for post location
      if (post.location) this.loadWeather(post.location);

      // Load related posts
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
        },
      });
    }
  }

  private loadWeather(city: string) {
    this.weatherService.getCurrentWeather(city).subscribe({
      next: (res) => {
        const condition = res.current.condition.text.toLowerCase();
        let icon = this.SunIcon;
        let desc = 'Sunny';

        if (condition.includes('rain')) {
          icon = this.CloudRainIcon;
          desc = 'Rainy';
        } else if (condition.includes('cloud')) {
          icon = this.CloudIcon;
          desc = 'Cloudy';
        } else if (condition.includes('snow')) {
          icon = this.CloudSnowIcon;
          desc = 'Snowy';
        } else if (res.current.temp_c >= 30) {
          icon = this.SunIcon;
          desc = 'Hot';
        }

        this.weather = {
          temp: res.current.temp_c,
          condition: desc,
          icon: icon,
        };
      },
      error: (err) => console.error('Weather error:', err),
    });
  }
}
