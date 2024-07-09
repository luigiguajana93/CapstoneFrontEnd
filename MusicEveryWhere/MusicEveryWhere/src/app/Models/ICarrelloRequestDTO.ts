import { ICarrelloItemRequestDTO } from './ICarrelloItemRequestDTO';
export interface ICarrelloRequestDTO {
  utenteId: number;
  carrelloItems: ICarrelloItemRequestDTO[];
}
