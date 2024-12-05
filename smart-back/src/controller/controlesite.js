// Back-end (Node.js + Express.js)
import 'dotenv/config';
import { client } from "../client/clientConfig.js";
import { checkAndUpdateToken } from '../token/tokenManager.js';


const express = require('express');
const app = express();

app.use(express.json()); // Para processar o corpo da requisição

app.post('/ligar-dispositivo', async (req, res) => {
  const { status } = req.body;

  try {
    const token = await checkAndUpdateToken(client);
    client.at = token.accessToken;

    await client.device.setThingStatus({  // Certifique-se de que isso é uma operação assíncrona
        type: 1, 
        id: "1002018c47" , 
        params: {
            switch: status,
        },
        headers: {
            Authorization: `Bearer ${token.accessToken}` // Use token.accessToken aqui
        },
    });

    res.status(200).json({ mensagem: 'Dispositivo atualizado com sucesso!' });
} catch (error) {
    console.error(error); // Log do erro para depuração
    res.status(500).json({ erro: 'Erro ao atualizar o dispositivo.' });
}

})

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});