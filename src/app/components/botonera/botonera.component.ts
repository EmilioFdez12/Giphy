import { Component } from '@angular/core';
import { GiphyService } from '../../services/giphy.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-botonera',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './botonera.component.html',
  styleUrl: './botonera.component.css'
})
export class BotoneraComponent {
  categories: string[] = ['trending', 'deporte', 'cine', 'videojuegos', 'memes', 'anime'];

  constructor(public giphyService: GiphyService) {}

  searchCategory(category: string): void {
    if (category === 'trending') {
      this.giphyService.lastSearchTerm = '';
      this.giphyService.getTrendingGifs().subscribe({
        next: (response) => {
          this.giphyService.gifs = response.data;
          this.giphyService.totalGifs = response.pagination.total_count;
          this.giphyService.gifsChanged.emit();
        }
      });
    } else {
      this.giphyService.searchGifs(category).subscribe({
        next: (response) => {
          this.giphyService.gifs = response.data;
          this.giphyService.totalGifs = response.pagination.total_count;
          this.giphyService.gifsChanged.emit();
        }
      });
    }
  }
}
