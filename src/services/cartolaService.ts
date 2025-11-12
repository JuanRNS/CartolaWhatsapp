import { environment } from "../environments/enviroment";
import { enviarMensagemGrupo } from "../bot/whatsapp";
import { CartolaMercado, CartolaTimes } from "../interface/cartola-mercado";

const avisosEnviados: Set<number> = new Set();
const avisosAbertoFechado: Set<number> = new Set();

export async function getDadosCartolaMercadoAbertoFechado() {
  const apiCartolaMercado = environment.apiCartolaMercadoStatus;
  const response = await fetch(apiCartolaMercado);
  const dataFechamento: CartolaMercado = await response.json();

  const dataAtual = Math.floor(Date.now() / 1000);
  const dataFechamentoDate = new Date(dataFechamento.fechamento.timestamp * 1000);
  const dataFechamentoDia = dataFechamentoDate.toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });
  const dataFechamentoHora = dataFechamentoDate.toLocaleTimeString("pt-BR", { timeZone: "America/Sao_Paulo" });

  const avisos = [
    { tempo: 60 * 60 * 5, mensagem: '⏳ Faltam 5 horas para fechar o mercado! ⏳' },
    { tempo: 60 * 60 * 3, mensagem: '⏰ Faltam 3 horas para fechar o mercado! ⏰' },
    { tempo: 60 * 60 * 1, mensagem: '⏱️ Falta 1 hora para fechar o mercado! ⏱️' },
    { tempo: 60 * 10, mensagem: '🕐 Faltam 10 minutos para fechar o mercado! 🕐' },
    { tempo: 60 * 5, mensagem: '⏲️ Faltam 5 minutos para fechar o mercado! ⏲️' },
    { tempo: 60 * 1, mensagem: '🕒 Falta 1 minuto para fechar o mercado! 🕒' },
  ];

  if (dataAtual > dataFechamento.fechamento.timestamp) {
    if (!avisosAbertoFechado.has(0)) {
        await enviarMensagemGrupo(`🔴 *MERCADO FECHADO!* 🔴 O mercado do *Cartola FC* está oficialmente fechado! 🚫⏰ Agora é torcer para sua escalação render muitos pontos! 📈⚽
        🍀 Boa sorte na rodada e que venha a mitada! 💥🔥 Nos vemos na próxima abertura! 📅😉`);
            
      avisosAbertoFechado.add(0);
      avisosAbertoFechado.delete(1);
      avisosEnviados.clear();
    }
  } else if (!avisosAbertoFechado.has(1)) {
        await enviarMensagemGrupo(`🟢 *MERCADO ABERTO!* 🟢 O mercado do *Cartola FC* está aberto até as ⏰ *${dataFechamentoHora}* do dia 📅 *${dataFechamentoDia}*. 🚨 Não vacile, cartoleiro(a)! Já escalou seu time? ⚽📝 Faça suas alterações, confira os jogadores e monte sua estratégia! A rodada promete! 🔥🔥
          💚 Boa sorte e mitadas para todos! 💥`);
            
      avisosAbertoFechado.add(1);
      avisosAbertoFechado.delete(0);
    }

  const tempoFalta = dataFechamento.fechamento.timestamp - dataAtual;
  for (const aviso of avisos) {
    console.log
(`Tempo restante: ${tempoFalta} segundos`);
    console.log(`Aviso: ${aviso.tempo} segundos`);
    if (tempoFalta <= aviso.tempo && tempoFalta > aviso.tempo - 60) {
      if (!avisosEnviados.has(aviso.tempo)) {
        await enviarMensagemGrupo(aviso.mensagem);
        avisosEnviados.add(aviso.tempo);
      }
    }
  }
}

export async function getDadosTimesCartola() {
  const idTimes = [26973599,18739659,2709721];
  const times: CartolaTimes[] = [];
  for (const idTime of idTimes) {
    const apiCartolaTimes = environment.apiCartolaBuscarTimes + idTime;
    const response = await fetch(apiCartolaTimes);
    const dataTimes = await response.json();
    const time: CartolaTimes = {
      time: {
        nome_cartola: dataTimes.time.nome_cartola,
        nome: dataTimes.time.nome,
      },
      pontos_campeonato: dataTimes.pontos_campeonato,
      pontos: dataTimes.pontos,
  }
  times.push(time);
}
}