import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ArticulosFamilias } from '../models/articulo-familia'; //trae los articulos declarados en models

@Injectable({
  providedIn: 'root'
})
export class MockArticulosFamiliasService {

  constructor() { }

  //este get simula una petición asincrona
  get() {
    return of(ArticulosFamilias)
  }
}
