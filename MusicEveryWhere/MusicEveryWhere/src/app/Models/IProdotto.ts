import { ICategoria } from "./ICategoria";

export interface IProdotto {
  id: number;
  nomeProdotto: string;
  descrizione: string;
  prezzo: number;
  imageUrl: string;
  isDisponibile: boolean;
  categoria: ICategoria;
}
