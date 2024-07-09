import { ICarrelloItemResponseDTO } from "./ICarrelloItemResponseDTO";
import { IUtente } from "./IUtente";


export interface ICarrelloResponseDTO {
  id: number;
  utente: IUtente;
  carrelloItems: ICarrelloItemResponseDTO[];
  totaleAcquisto: number;
}
