import { iniciarWhatsapp } from "./bot/whatsapp";
import { getDadosCartolaMercadoAbertoFechado, getDadosTimesCartola } from "./services/cartolaService";

try{
  await iniciarWhatsapp();
  await getDadosCartolaMercadoAbertoFechado();
  await getDadosTimesCartola();

  setInterval(() => {
    getDadosCartolaMercadoAbertoFechado();
  }, 60 * 1000);
}catch(error){
  console.error("Erro ao iniciar o bot:", error);
}