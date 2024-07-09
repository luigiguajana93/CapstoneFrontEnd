import { IProdotto } from "./IProdotto";

export interface INoleggioResponseDTO {
  id: number;
  utenteId: number;
  dataInizioNoleggio: string;
  dataFineNoleggio: string;
  costoNoleggioTotale: number;
  cittaNoleggio: string;
  prodottiNoleggiati: IProdotto[];
}
