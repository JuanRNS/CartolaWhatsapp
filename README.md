```markdown
# CartolaWhatsapp

CartolaWhatsapp é um bot simples escrito em TypeScript para enviar avisos automáticos via WhatsApp (usando Puppeteer). O objetivo principal é lembrar os participantes de uma liga do Cartola a escalarem seus times antes do fechamento do mercado.

Descrição rápida
- Foi criado para uso em um grupo que tinha uma liga do Cartola — o bot verifica a cada minuto e envia avisos em horários configuráveis para que ninguém esqueça de escalar o time.
- Implementado para ser leve e fácil de customizar: edite os avisos, o grupo alvo e as variáveis de ambiente.

Principais funcionalidades
- Envia lembretes no grupo do WhatsApp antes do fechamento do mercado do Cartola.
- Configuração simples dos tempos/avisos (offsets em relação ao fechamento).
- Roda periodicamente (por padrão a cada 1 minuto) e dispara avisos quando necessário.
- Implementado com Puppeteer (automatiza o WhatsApp Web).

Tecnologias usadas
- TypeScript
- Node.js
- Puppeteer (controle do navegador / WhatsApp Web)
- dotenv (variáveis de ambiente)

Como funciona (resumo)
1. O bot roda em um loop agendado (por padrão a cada 1 minuto).
2. A cada execução ele:
   - Calcula quanto tempo falta para o fechamento do mercado.
   - Compara com os offsets configurados (lista de avisos).
   - Se o tempo restante bater com algum offset e o aviso ainda não foi enviado, o bot usa o WhatsApp Web via Puppeteer para enviar a mensagem ao grupo.
3. Na primeira execução será necessário escanear o QR code no WhatsApp Web, a não ser que você mantenha o profile do navegador persistente.

Configuração dos avisos
No código existe um array chamado `avisos` com o formato abaixo. `tempo` é em segundos e representa o deslocamento em relação ao horário de fechamento:

```ts
const avisos = [
  { tempo: 60 * 60 * 5, mensagem: '⏳ Faltam 5 horas para fechar o mercado! ⏳' },
  { tempo: 60 * 60 * 3, mensagem: '⏰ Faltam 3 horas para fechar o mercado! ⏰' },
  { tempo: 60 * 60 * 1, mensagem: '⏱️ Falta 1 hora para fechar o mercado! ⏱️' },
  { tempo: 60 * 10, mensagem: '🕐 Faltam 10 minutos para fechar o mercado! 🕐' },
  { tempo: 60 * 5, mensagem: '⏲️ Faltam 5 minutos para fechar o mercado! ⏲️' },
  { tempo: 60 * 1, mensagem: '🕒 Falta 1 minuto para fechar o mercado! 🕒' },
];
```

- Para ajustar os avisos, edite esse array no arquivo onde ele está definido.
- `tempo` em segundos: por exemplo 60 * 60 * 5 = 5 horas.

Variáveis de ambiente (exemplo)
- TARGET_GROUP_ID — ID do grupo do WhatsApp (ou identificador usado pelo código).
- CHROME_EXECUTABLE_PATH — (opcional) caminho para o binário do Chrome/Chromium.
- PROFILE_PATH — pasta onde o profile do Puppeteer será salvo (para persistir login).
- INTERVAL_MINUTES — intervalo em minutos para checagem (padrão: 1).
- LOG_LEVEL — nível de logs (info, debug, error).

Instalação
1. Clone o repositório:
   git clone https://github.com/JuanRNS/CartolaWhatsapp.git
   cd CartolaWhatsapp

2. Instale dependências:
   npm install
   # ou
   yarn install

3. Copie e ajuste as variáveis de ambiente:
   cp .env.example .env
   # edite .env conforme necessário

Como rodar
- Em desenvolvimento (com hot-reload, se configurado):
  npm run dev
- Build + start:
  npm run build
  npm start
- Em produção recomendo usar PM2 ou Docker para manter o processo em execução.

Observações sobre Puppeteer e WhatsApp Web
- Puppeteer abre um navegador e controla o WhatsApp Web. Na primeira execução você terá que escanear o QR code com seu celular.
- Para evitar reautenticação, configure PROFILE_PATH e mantenha essa pasta persistente.
- Em servidores sem display, rode com flags apropriadas (por exemplo --no-sandbox) ou use um container com Chrome instalado.
- Respeite os termos de uso do WhatsApp — para uso em grande escala prefira soluções oficiais.

Sugestões de melhorias
- Integrar com a API do Cartola para avisos baseados em horários/alterações oficiais.
- Suporte a múltiplas ligas/grupos com mensagens distintas.
- Histórico de avisos enviados para evitar duplicações após reinício.
- UI simples para configurar horários e mensagens via web.

Contribuições
Contribuições são bem-vindas. Abra issues para bugs ou melhorias e envie pull requests.

Contato
Criado por @JuanRNS — ajuste o README conforme preferir.
```
