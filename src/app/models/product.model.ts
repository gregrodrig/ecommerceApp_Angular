export interface ProductModel {
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
}
