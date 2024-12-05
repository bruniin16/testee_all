const CryptoJS = require('crypto-js');
const puppeteer = require('puppeteer');
const axios = require('axios');
const crypto = require('crypto');
const fs = require('fs');

const express = require('express');

const app = express();
const port = 8081;
const server = app.listen(port);


// Definições de credenciais do cliente
const clientId = '6JSF8CmDkWQUUAmvFCZP1m2IDlA9ml8c';
const clientSecret = 'qY3pK9KOLOoLuqN8HOvHyoRj3RYTXsS7';
const redirectUrl = 'http://localhost:8081/';
const nonce = '97113723';
const state = 'f400967e-c91d-4a4f-8a8b-1c0544f91f00';
const region = 'us';

// Mapeia as regiões para os respectivos domínios da API
const domainMap = new Map([
  ['cn', 'cn-apia.coolkit.cn'],
  ['as', 'as-apia.coolkit.cc'],
  ['us', 'us-apia.coolkit.cc'],
  ['eu', 'eu-apia.coolkit.cc'],
  ['au', 'au-apia.coolkit.info'],
  ['test', 'test-apia.coolkit.cn'],
]);

const domain = domainMap.get(region);
const seq = Date.now();

// Cálculo da assinatura para autorização OAuth
const message = `${clientId}_${seq}`;
const authorization = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(message, clientSecret));

// URL de autorização para autenticação OAuth
const authUrl = `https://c2ccdn.coolkit.cc/oauth/index.html?clientId=${clientId}&redirectUrl=${redirectUrl}&grantType=authorization_code&state=${state}&nonce=${nonce}&seq=${seq}&authorization=${authorization}`;

console.log("URL de autorização gerada:", authUrl);

// Função para simular uma espera
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Função principal para abrir a URL de autorização, capturar o código e obter tokens
async function authenticateAndFetchToken() {
  try {

    // VARIÁVEIS COM LOGIN E SENHA EWELINK PARA TESTE DE AUTOMAÇÃO (TEMPORÁRIO)
    const email = "gabriel.sobral808@gmail.com";
    const pass = "Tita1020";

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    console.log("Navegador aberto. Acessando URL de autenticação...");

    await page.goto(authUrl, { waitUntil: 'networkidle2', timeout: 100000 });
    console.log("Página de autenticação carregada.");

    // Automação de preenchimento dos dados
    await page.click('#rc_select_0');
    await wait(500)
    await page.type("#rc_select_0", "Brazil", {delay:100});
    await wait(500)
    page.keyboard.press("Enter");
    console.log("Brazil selecionado");

    await page.type("#loginForm > form > div:nth-child(2) > div > div > div > span > input", email, {delay:100});
    console.log("Email inserido.");
    await page.type("#loginForm > form > div:nth-child(3) > div > div > div > span > input", pass, {delay:100});
    console.log("Senha inserida.");

    // Simula pressionar a tecla "Enter" no campo de senha
    await page.keyboard.press('Enter');

    await page.waitForNavigation();
    await wait(2000);
    const codeLink = await page.url();
    await browser.close();

    const codeMatch = codeLink.match(/code=([a-zA-Z0-9-]+)/);
    const stateMatch = codeLink.match(/state=([a-zA-Z0-9-]+)/);

    if (!codeMatch) {
      console.error("Código de autorização não encontrado.");
      return;
    }

    const code = codeMatch[1];
    const state = stateMatch ? stateMatch[1] : null;
    console.log("Código de autorização capturado:", code);
    console.log("State capturado:", state);

    setTimeout(() => {
        server.close(() => {
            console.log('Servidor encerrado');
        });
    }, 5000);

    // Obter o token com o código de autorização capturado
    await fetchToken(code);
  } catch (error) {
    console.error("Erro durante o processo de autenticação:", error);
  }

  console.log('Iniciando a geração do expiresAt...');
  generateExpiresAt(3600);
}

// Função para obter e salvar tokens
async function fetchToken(code) {
  const message = JSON.stringify({
    code: code,
    redirectUrl: redirectUrl,
    grantType: 'authorization_code',
  });

  const sign = crypto.createHmac('sha256', clientSecret).update(message).digest('base64');
  
  try {
    console.log("Enviando requisição para obter o token...");

    const response = await axios.post(`https://${domain}/v2/user/oauth/token`, {
      code: code,
      redirectUrl: redirectUrl,
      grantType: 'authorization_code',
    }, {
      headers: {
        'X-CK-Nonce': nonce,
        'Authorization': `Sign ${sign}`,
        'Content-Type': 'application/json',
        'X-CK-Appid': clientId,
      }
    });

    if (response.data.error === 0) {
      const { accessToken, refreshToken, expire } = response.data.data;
      const expiresAt = Date.now() + expire * 1000;

      const tokenData = { code, accessToken, refreshToken, expiresAt };
      console.log("Token obtido com sucesso:", tokenData);

      saveTokenToFile(tokenData);

      // **Aqui é onde o token pode ser enviado ao front-end**
      // Por exemplo, você pode criar uma rota para servir o token ao frontend
      // app.get('/token', (req, res) => res.json(tokenData));
    } else {
      console.error("Erro ao obter o token:", response.data);
    }
  } catch (error) {
    console.error("Erro na requisição para obter o token:", error);
  }
}

// Função para salvar o token em um arquivo
function saveTokenToFile(token) {
  try {
    const tokenPath = 'config/token.json';
    fs.writeFileSync(tokenPath, JSON.stringify(token, null, 2), 'utf-8');
    console.log("Token salvo em:", tokenPath);
  } catch (error) {
    console.error("Erro ao salvar o token no arquivo:", error);
  }
}

function generateExpiresAt(expiresIn) {
    const tokenFilePath = 'config/token.json';
    try {
      // Lê o conteúdo do arquivo de token
      const tokenData = fs.readFileSync(tokenFilePath, 'utf-8');
      const token = JSON.parse(tokenData); // Faz o parse do JSON para um objeto JavaScript
  
      // Calcula o expiresAt em milissegundos
      const expiresAt = Date.now() + (expiresIn * 1000); // Converte expiresIn de segundos para milissegundos
  
      // Exibe o expiresAt no terminal
      console.log('expiresAt:', expiresAt);
  
      token.expiresAt = expiresAt; // Atualiza o objeto do token com o novo expiresAt
  
      // Converte o objeto do token de volta para JSON
      const updatedTokenData = JSON.stringify(token, null, 2);
      // Escreve o token atualizado de volta no arquivo
      fs.writeFileSync(tokenFilePath, updatedTokenData, 'utf-8');
  
      console.log('expiresAt gerado e salvo com sucesso:', expiresAt); // Confirmação no terminal
    } catch (err) {
      // Trata qualquer erro que ocorra durante o processo
      console.error('Erro ao gerar ou salvar o expiresAt:', err);
    }
  }
  
  // Inicia o processo de autenticação e obtenção do token
  authenticateAndFetchToken();
