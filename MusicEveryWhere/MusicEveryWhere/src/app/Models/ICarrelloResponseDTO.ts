import { ICarrelloItemResponseDTO } from "./ICarrelloItemResponseDTO";
import { IProdotto } from "./IProdotto";
import { IUtente } from "./IUtente";


export interface ICarrelloResponseDTO {
  id: number;
  utente:IUtente;
  prodotti:IProdotto[];
  totaleAcquisto: number;
}
