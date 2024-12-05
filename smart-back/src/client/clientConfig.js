import 'dotenv/config'; // Carrega as variáveis de ambiente a partir de um arquivo .env
import eWeLink from 'ewelink-api-next';
// Configurações da API eWeLink
const ewelinkConfig = {
  appId: "6JSF8CmDkWQUUAmvFCZP1m2IDlA9ml8c",        // ID do aplicativo, fornecido pela plataforma eWeLink e configurado em .env
  appSecret: "qY3pK9KOLOoLuqN8HOvHyoRj3RYTXsS7", // Segredo do aplicativo, usado para autenticação, configurado em .env
  region:  'us', // Região padrão do servidor eWeLink (pode ser 'us', 'eu', 'cn')
  requestRecord: true,                // Habilita ou desabilita o registro das requisições (útil para debugging)
  logObj: console,                    // Objeto de log para registrar atividades no console
};



// Verifica se as credenciais (appId e appSecret) foram fornecidas nas variáveis de ambiente
if (!ewelinkConfig.appId || !ewelinkConfig.appSecret) {
  throw new Error('As credenciais do aplicativo eWeLink não foram configuradas.');
}

// Verifica se a região especificada é válida (deve ser 'us', 'eu' ou 'cn')
if (!['us', 'eu', 'cn'].includes(ewelinkConfig.region)) {
  throw new Error('Região inválida. Opções válidas: us, eu, cn');
}

export { ewelinkConfig }; // Exporta a configuração para ser usada em outras partes do aplicativo

const client = new eWeLink.WebAPI(ewelinkConfig); 

export {client};