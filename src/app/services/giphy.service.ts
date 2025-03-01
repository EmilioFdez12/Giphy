import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GIF, Datum } from '../interfaces/giphy.interface';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})

/**
 * * Servicio para interactuar con la API de Giphy
 */
export class GiphyService {
  private apiKey = environment.giphyApiKey;
  private baseUrl = 'https://api.giphy.com/v1/gifs';
  public gifs: Datum[] = [];
  public totalGifs: number = 0;
  public lastSearchTerm: string = '';
  public gifsChanged = new EventEmitter<void>();

  constructor(private http: HttpClient) {
    this.getTrendingGifs().subscribe();
  }

  /**
   * * Obtiene los GIFs más populares
   *
   * @param limit Cantidad de resultados a obtener
   * @param offset Desplazamiento de resultados
   * @returns Listado con los GIFs más populares
   */
  public getTrendingGifs(limit: number = 12, offset: number = 0): Observable<GIF> {
    const url = `${this.baseUrl}/trending?api_key=${this.apiKey}&limit=${limit}&offset=${offset}&rating=g&bundle=messaging_non_clips`;
    return this.http.get<GIF>(url);
  }

  /**
   * * Busca GIFs por término
   *
   * @param query Término de búsqueda
   * @param limit Cantidad de resultados a obtener
   * @param offset Desplazamiento de resultados
   * @returns Listado con los GIFs que coinciden con la búsqueda
   */
  public searchGifs(query: string, limit: number = 12, offset: number = 0): Observable<GIF> {
    this.lastSearchTerm = query.trim();
    const encodedQuery = encodeURIComponent(query.trim());
    const url = `${this.baseUrl}/search?api_key=${this.apiKey}&q=${encodedQuery}&limit=${limit}&offset=${offset}&rating=g&lang=es`;
    return this.http.get<GIF>(url);
  }
}
