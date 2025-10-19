// Este arquivo "aumenta" a definição de tipos original do Express
// e adiciona a propriedade 'user' ao 'Request'
declare namespace Express {
  export interface Request {
    user: {
      id: string;
      // Se você adicionou mais coisas ao payload (nome, email),
      // adicione-as aqui também para ter o auto-complete!
      name: string;
      email: string;
    };
  }
}
