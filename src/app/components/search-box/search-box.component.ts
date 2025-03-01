import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiphyService } from '../../services/giphy.service';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})

/**
 * * Componente para la barra de búsqueda de gifs
 */
export class SearchBoxComponent {
  @ViewChild('txtBuscaGif') txtBuscaGif!: ElementRef<HTMLInputElement>;

  constructor(private giphyService: GiphyService) {}

  /**
   * * Busca gifs en la API de Giphy
   *
   * @param termino Término de búsqueda
   */
  public buscarGif(termino: string): void {
    if (termino.trim().length === 0) {
      // Si el término está vacío, cargar trending
      this.giphyService.lastSearchTerm = '';
      this.giphyService.getTrendingGifs().subscribe();
      return;
    }

    this.giphyService.searchGifs(termino).subscribe();
    this.txtBuscaGif.nativeElement.value = '';
  }
}
