import express from 'express';
import routes from './routes/routes.js'; // Importa as rotas

const app = express();

// Middlewares
app.use(express.json()); // Permite que a aplicação processe dados JSON

// Rotas
app.use('/', routes); // Usa as rotas definidas no arquivo routes.js

// Abertura do Server
const PORT = process.env.PORT || 3000; // Define a porta do servidor

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});