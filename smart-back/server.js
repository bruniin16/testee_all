// Back-end (Node.js + Express.js)
import express from "express"
import { client } from "./client/clientConfig.js";
import { checkAndUpdateToken } from './token/tokenManager.js';
import cors from "cors"

const app = express();

app.use(cors())

const token = await checkAndUpdateToken(client);
client.at = token.accessToken;

app.use(express.json()); // Para processar o corpo da requisição


app.post('/ligar-dispositivo', async (req, res) => {
  const { status } = req.body;

  try {
    
  
    await client.device.setThingStatus({  // Certifique-se de que isso é uma operação assíncrona
        type: 1, 
        id: "100164cb89" , 
        params: {
            switch: status,
        },
        headers: {
            Authorization: `Bearer ${token.accessToken}` 
        },
    });

    res.status(200).json({ mensagem: 'Dispositivo atualizado com sucesso!' });
} catch (error) {
    console.error(error); // Log do erro para depuração
    res.status(500).json({ erro: 'Erro ao atualizar o dispositivo.' });
}

})

app.post('/ligar-dispositivo1', async (req, res) => {
  const { status1 } = req.body;

  try {
    
  
    await client.device.setThingStatus({  // Certifique-se de que isso é uma operação assíncrona
        type: 1, 
        id: "1002018c47" , 
        params: {
            switch: status1,
        },
        headers: {
            Authorization: `Bearer ${token.accessToken}` 
        },
    });

    res.status(200).json({ mensagem: 'Dispositivo atualizado com sucesso!' });
} catch (error) {
    console.error(error); // Log do erro para depuração
    res.status(500).json({ erro: 'Erro ao atualizar o dispositivo.' });
}

})

app.listen(3001, () => {
  console.log('Servidor iniciado na porta 3001');
});

app.use(
    cors({
      origin: "http://localhost:3001/",
    }),
  );