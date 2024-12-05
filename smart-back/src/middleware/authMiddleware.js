import jwt from 'jsonwebtoken';

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({   
 message: 'Token não fornecido' });
  }

  try   
 {
    jwt.verify(token, 'seu_segredo_jwt'); // Verifica se o token é válido
    next(); // Se o token for válido, permite que a requisição continue
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}

export default authMiddleware;