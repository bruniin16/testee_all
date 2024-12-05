import 'dotenv/config';
import { client } from "../client/clientConfig.js";
import { checkAndUpdateToken } from '../token/tokenManager.js';
import { IDdevice1, status1 } from './status.js';

// pode fica tanto dentro quanto fora da function 

const token = await checkAndUpdateToken(client);
client.at = token.accessToken;

async function main() {
    try {
      // Verifica e atualiza o token de acesso do cliente antes de realizar requisições
      const token = await checkAndUpdateToken(client);

      // Define o token de acesso (accessToken) no cliente para autenticação nas próximas chamadas
      client.at = token.accessToken;
  
      // A função que faz tudo que nosso aplicativo precisa  ou controlador
      // a função deleyExect so import se tivemos executado varios "setThinsStatus" seguido no mesmo codigo que em nosso caso não é o ideal mais funciona
      // explico melhor sobre essa limitação na documentação que estou fazendo mais pode me pergunta que eu explico.    
     
      function deleyExect() { 
      client.device.setThingStatus({
      type: 1, 
      id: IDdevice1, 
      params:{
        switch: status1,
      },
      headers: {
        Authorization: `Bearer ${token}` 
      },
    
    });
   }

    setTimeout(deleyExect,3000)


    } catch (error) {
      // Tratamento de erro em caso de falha em qualquer parte do código
      console.error('Erro inesperado:', error);
    }
}
  
  // Chama a função principal para executar o código
  main();
