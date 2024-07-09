import { IProdotto } from "./IProdotto";

export interface ICarrelloItemResponseDTO {
  id: number;
  prodotto: IProdotto;
  quantita: number;
  prezzo: number;
}
