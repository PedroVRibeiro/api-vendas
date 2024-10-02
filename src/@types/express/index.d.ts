// Realizando override de Request para adicionar propriedades
declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
