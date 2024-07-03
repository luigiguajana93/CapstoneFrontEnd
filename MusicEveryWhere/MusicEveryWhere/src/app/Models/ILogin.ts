export interface ILogin {
  roles: string[];
  token: string;
  user: {
    id: number;
    nome: string;
    cognome: string;
    username: string;
    email: string;
    password:string;
        }
}


