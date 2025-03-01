import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule, PaginationService } from 'ngx-pagination';
import { Datum } from '../../interfaces/giphy.interface';
import { GiphyService } from '../../services/giphy.service';

@Component({
  selector: 'app-giphy-list',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './giphy-list.component.html',
  styleUrl: './giphy-list.component.css',
  providers: [PaginationService]
})

/**
 * * Componente que muestra el listado de gifs
 */
export class GiphyListComponent implements OnInit {
  // Array de gifs
  public gifs: Datum[] = [];
  // Página actual
  public currentPage: number = 1;
  // Gifts por página
  public itemsPerPage: number = 12;
  // Total de gifs
  public totalGifs: number = 0;
  // Bandera de carga
  public loading: boolean = false;

  constructor(private giphyService: GiphyService) { }

  /**
   * * Método que se ejecuta al iniciar el componente
   */
  ngOnInit() {
    this.loadGifs(1);

    this.giphyService.gifsChanged.subscribe(() => {
      this.currentPage = 1;
      this.loadGifs(1);
    });
  }

  /**
   * * Método que carga los gifs de la página indicada
   *
   * @param page Página a cargar
   */
  private loadGifs(page: number) {
    this.loading = true;
    const offset = (page - 1) * this.itemsPerPage;

    if (this.giphyService.lastSearchTerm) {
      this.giphyService.searchGifs(
        this.giphyService.lastSearchTerm,
        this.itemsPerPage,
        offset
      ).subscribe({
        next: (response) => {
          this.gifs = response.data;
          this.totalGifs = response.pagination.total_count;
          this.currentPage = page;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching gifs', error);
          this.loading = false;
        }
      });
    } else {
      this.giphyService.getTrendingGifs(
        this.itemsPerPage,
        offset
      ).subscribe({
        next: (response) => {
          this.gifs = response.data;
          this.totalGifs = response.pagination.total_count;
          this.currentPage = page;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching gifs', error);
          this.loading = false;
        }
      });
    }
  }

  /**
   * * Método que se ejecuta al cambiar de página
   *
   * @param page Página actual
   */
  pageChanged(page: number) {
    if (page !== this.currentPage) {
      // window.scrollTo(0, 0);
      this.loadGifs(page);
    }
  }
}
