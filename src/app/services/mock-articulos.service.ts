import { Injectable } from '@angular/core';
import { of } from "rxjs";
import { Articulo, Articulos } from '../models/articulo';

@Injectable({
  providedIn: 'root'
})
export class MockArticulosService {

  constructor() { }
  //info extra sobre el metodo filter
  //https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

  get(Nombre: string, Activo: boolean|null, pagina: number):any {
    var Items = Articulos.filter(item => (Nombre == null ||
      item.Nombre.toUpperCase().includes(Nombre.toUpperCase()))
      && (Activo == null || Activo == item.Activo)
    )

    //ordenamos
    //https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

    Items = Items.sort( (a,b) => a.Nombre.toUpperCase() > b.Nombre.toUpperCase() ? 1: -1)

    // paginar con slice
    var RegistrosTotal = Items.length;
    var RegistroDesde = (pagina - 1) * 10;
    Items = Items.slice(RegistroDesde, RegistroDesde + 10);
    return of({ Items: Items, RegistrosTotal: RegistrosTotal });
  }

  getById(Id: number) {
    //filter nos devuelve un array, nosotros necesitamos un Objetivo de Articulo
    //Cuando nos envuentra un articulo con el ID buscado, en realidad nos devuelve un array con
    //un solo objeto, por eso hacemos -->Articulos.filter(x => x.IdArticulo)[0].
    var Item: Articulo = Articulos.filter(x => x.IdArticulo)[0]
  }

  //agregamos un nuevo articulo
  post(obj: Articulo) {
    obj.IdArticulo = new Date().getTime();

    obj.IdArticuloFamilia = +obj.IdArticuloFamilia;
    obj.Precio = +obj.Precio;
    obj.Stock = +obj.Stock;

    Articulos.push(obj);
    return of(obj);
  }

  //Actualizamos un nuevo articulo
  put(Id: number, obj: Articulo) {
    let indice: number = 0;

    let Items = Articulos.filter(function(item, index) {
      if(item.IdArticulo === Id) {
        //ponemos el indice del arreglo donde esta el articulo que buscamos
        indice = index
      }
    })

    obj.IdArticuloFamilia = +obj.IdArticuloFamilia;   // convierto a número, cuando se envia al servidor se hace automáticamente al enlazar las propiedades del modelo definido en el  backend
    obj.Precio = +obj.Precio;
    obj.Stock = +obj.Stock;

    Articulos[indice] = obj;
    return of(obj);
  }

  delete(Id: number) {
    let items = Articulos.filter(x => x.IdArticulo === Id);
    items[0].Activo = !items[0].Activo;
    return of(items[0]);
  }
}
