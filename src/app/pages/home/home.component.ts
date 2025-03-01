import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SearchBoxComponent } from "../../components/search-box/search-box.component";
import { GiphyListComponent } from '../../components/giphy-list/giphy-list.component';
import { GiphyService } from '../../services/giphy.service';
import { Datum } from '../../interfaces/giphy.interface';
import { BotoneraComponent } from '../../components/botonera/botonera.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, SearchBoxComponent, GiphyListComponent, BotoneraComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

/**
 * * Componente para la página principal de la aplicación (Home)
 */
export class HomeComponent {
  constructor(private giphyService: GiphyService) { }

  get gifs(): Datum[] {
    return this.giphyService.gifs;
  }
}
