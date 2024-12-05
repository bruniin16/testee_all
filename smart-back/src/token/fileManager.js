import fs from 'fs';

// Aqui aonde lemos e escrevemos o aquivo do token 


/**
 * Caminho do arquivo que contém o token.
 * @constant {string}
 */
const tokenFilePath = 'config/token.json';

/**
 * Lê o token do arquivo.
 * @returns {Object|null} O objeto do token ou null se não encontrado.
 */
export function readToken() {
  try {
    const tokenData = fs.readFileSync(tokenFilePath, 'utf-8');
    console.log('Token lido com sucesso:', tokenData); // Log para confirmar a leitura do token
    return JSON.parse(tokenData); // Faz o parse do JSON para um objeto JavaScript
  } catch (err) {
    // Trata o erro caso o arquivo não seja encontrado
    if (err.code === 'ENOENT') {
      console.warn('Arquivo token.json não encontrado. Um novo token será gerado.'); // Aviso se o arquivo não existir
      return null;  // Retorna null se o arquivo não for encontrado
    } else {
      console.error('Erro ao ler o arquivo token.json:', err); // Log do erro
      throw err; // Lança o erro para tratamento superior
    }
  }
}

/**
 * Escreve o token no arquivo.
 * @param {Object} token - O objeto do token a ser salvo.
 */ 
export function writeToken(token) {
  try {
    const tokenData = JSON.stringify(token, null, 2);
    // Escreve o token no arquivo
    fs.writeFileSync(tokenFilePath, tokenData, 'utf-8');
    console.log('Token salvo com sucesso:', tokenData); // Confirmação no log
  } catch (err) {
    console.error('Erro ao escrever no arquivo token.json:', err); // Log do erro
    throw err; // Lança o erro para tratamento superior
  }
}