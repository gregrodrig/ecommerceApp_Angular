export interface CarritoModel {
  id: number;
  articuloId: number;
  articulo: {
    id: number;
    nombre: string;
    cantidad: number;
    precio: number;
    imagen: string;
    descripcion: string;
    categoriaId: number;
    categoria: {
      id: number;
      nombre: string;
    };
  };
  cantidad: number;
}
