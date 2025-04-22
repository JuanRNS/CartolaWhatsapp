import puppeteer, { Browser, Page } from "puppeteer";
import path from "path";
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
  await page.waitForSelector(`span[title="${nomeGrupo}"]`, { visible: true, timeout: 10 * 60 * 1000 });
  await page.click(`span[title="${nomeGrupo}"]`);

  await page.waitForSelector('div[tabindex="10"]', { visible: true });
  await page.click('div[tabindex="10"]');
  await page.evaluate((msg) => {
    const input = document.querySelector('div[tabindex="10"]') as HTMLElement;
    input.innerHTML = msg;
  }, mensagem);
  await page.keyboard.press("Enter");
}
