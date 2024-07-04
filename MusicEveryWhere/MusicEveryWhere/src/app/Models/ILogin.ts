import { IRole } from "./IRole";

export interface ILogin {

  token: string;
  user: {
    id: number;
    nome: string;
    cognome: string;
    username: string;
    email: string;
    roles: IRole[];
        }
}


