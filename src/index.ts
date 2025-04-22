import { iniciarWhatsapp } from "./bot/whatsapp";
import { getDadosCartolaMercadoAbertoFechado } from "./services/cartolaService";

(async () => {
  await iniciarWhatsapp();
  await getDadosCartolaMercadoAbertoFechado();

  setInterval(() => {
    getDadosCartolaMercadoAbertoFechado();
  }, 60 * 1000);
})();