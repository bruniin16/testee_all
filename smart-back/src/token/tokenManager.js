import { readToken, writeToken } from './fileManager.js';
import fs from 'fs';


function isTokenExpired(token) {
  if (!token || !token.expiresAt) {
    return true; // Considera o token expirado se não houver token ou expiresAt
  }
  return token.expiresAt < Date.now();
}

async function refreshExistingToken(client) {
  try {
    // Lê o token.json usando fs.readFileSync dentro da função
    const tokenData = JSON.parse(fs.readFileSync('config/token.json', 'utf-8'));

    const refreshStatus = await client.user.refreshToken({
      rt: tokenData.refreshToken
    }, {
      headers: {
        Authorization: `Bearer ${tokenData.accessToken}`
      }
    });

    if (refreshStatus.error !== 0) {
      throw new Error('Falha ao renovar o token.');
    }

    const newToken = createTokenObject(refreshStatus.data);
    writeToken(newToken);
    return newToken;
  } catch (error) {
    console.error('Erro ao renovar o token:', error);
    throw error;
  }
}

function createTokenObject(data) {
  return {
    code: data.code,
    accessToken: data.at,
    refreshToken: data.rt,
    expiresAt: Date.now() + data.expire * 1000,
  };
}

async function checkAndUpdateToken(client) {
  try {
    let token = readToken();

    if (!token || isTokenExpired(token)) {
      token = await refreshExistingToken(client);
    }

    return token;
  } catch (error) {
    console.error('Erro ao verificar e atualizar o token:', error);
    throw error;
  }
}

export { checkAndUpdateToken };