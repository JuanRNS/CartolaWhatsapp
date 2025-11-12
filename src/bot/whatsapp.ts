import puppeteer, { Browser, Page } from "puppeteer";
import path from "node:path";
import fs from "fs";
import { environment } from "../environments/enviroment";

const nomeGrupo = environment.nomeGrupo;
const sessionPath = path.join(__dirname, "..", "whatsapp-session");

if (!fs.existsSync(sessionPath)) {
  fs.mkdirSync(sessionPath);
}

let browser: Browser;
let page: Page;

export async function iniciarWhatsapp() {
  browser = await puppeteer.launch({
    headless: false,
    userDataDir: sessionPath,
    args: ["--start-maximized"],
    defaultViewport: null,
  });

  page = await browser.newPage();
  await page.goto("https://web.whatsapp.com/");
  if (page.url() === "https://web.whatsapp.com/") {
    console.log("WhatsApp Web is loaded!");
  }
}

export async function enviarMensagemGrupo(mensagem: string) {
  await page.waitForSelector('div[contenteditable="true"][data-tab="3"]', { visible: true, timeout: 10 * 60 * 1000 });
  await page.click('div[contenteditable="true"][data-tab="3"]');
  await page.keyboard.type(nomeGrupo, { delay: 100 });
  await page.keyboard.press("Enter", { delay: 100 });
  

  await page.waitForSelector('div[tabindex="10"]', { visible: true });
  await page.click('div[tabindex="10"]');
  await page.keyboard.type(mensagem , { delay: 100 }  );// Aguarda 1 segundo antes de enviar a mensagem
  await page.keyboard.press("Enter" );
}
