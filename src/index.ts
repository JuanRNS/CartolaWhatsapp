import puppeteer, { Browser, Page } from "puppeteer";
import path from "path";
import fs from "fs";

const nomeGrupo = "Anotações";


const sessionPath = path.join(__dirname, "whatsapp-session");
if (!fs.existsSync(sessionPath)) {
  fs.mkdirSync(sessionPath);
}

let browser:Browser;
let page: Page;

async function iniciarWhatsapp() {
  // iniciar navegador
  browser = await puppeteer.launch({
    headless: false,
    userDataDir: sessionPath,
    args: ["--start-maximized"],
    defaultViewport: null,
  });
  // abrir nova aba
  page = await browser.newPage();
  await page.goto("https://web.whatsapp.com/");
  if (page.url() === "https://web.whatsapp.com/") {
    console.log("WhatsApp Web is loaded!");
  }
  //await browser.close();
};

async function enviarMensagemGrupo(mensagem: string) {
    // localizar grupo
    await page.waitForSelector('span[title="' + nomeGrupo + '"]', { visible: true });
    await page.click('span[title="' + nomeGrupo + '"]');
    // Selecionando campo de mensagem
    await page.waitForSelector('div[tabindex="10"]', { visible: true });
    await page.click('div[tabindex="10"');
    // Escrevendo mensagem
    await page.keyboard.type(mensagem);
    // Enviar mensagem
    await page.keyboard.press("Enter");
    console.log("Mensagem enviada: " + mensagem);
};

interface CartolaMercado {
  fechamento: {
    dia: number;
    mes: number;
    ano: number;
    hora: number;
    minuto: number;
    timestamp: number;
  };
}
async function getDadosCartolaMercadoAbertoFechado() {
  const apiCartolaMercado = "https://api.cartola.globo.com/mercado/status";
  const response = await fetch(apiCartolaMercado);
  const dataFechamento: CartolaMercado = await response.json();
  const dataAtual = Math.floor(Date.now() / 1000);
  if (dataAtual > dataFechamento.fechamento.timestamp) {
    await enviarMensagemGrupo("O mercado do Cartola FC está fechado!");
  }else {
    await enviarMensagemGrupo("O mercado do Cartola FC está aberto!");
  };
};

(async () => {
  // inicia uma vez só
  await iniciarWhatsapp(); 
   // primeira execução imediata
  await getDadosCartolaMercadoAbertoFechado();

  // verifica a cada 1 minuto
  setInterval(() => {
    getDadosCartolaMercadoAbertoFechado();
  }, 1000 * 60);
})();
