export interface CartolaMercado {
    fechamento: {
        dia: number;
        mes: number;
        ano: number;
        hora: number;
        minuto: number;
        timestamp: number;
      };
}

export interface CartolaTimes{
  time:{
    nome_cartola: string;
    nome: string;
  }
  pontos_campeonato: number;
  pontos: number;
}