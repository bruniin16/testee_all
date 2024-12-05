import express from 'express';
const router = express.Router();
import { getDeviceStatus, getDevicesStatus, getAllDevices, setDeviceStatus } from '../controller/controlerDevic.js';
import devices from "../config/deviceConfig.js";

/**
 * @route POST /devices/toggle/:deviceIndex/:state
 * @description Liga ou desliga um dispositivo específico.
 * @param {number} deviceIndex - O índice do dispositivo na lista de dispositivos (começando em 1).
 * @param {string} state - O estado desejado do dispositivo ('true' para ligar, 'false' para desligar).
 * @returns {object} - Um objeto JSON com uma mensagem de sucesso ou erro.
 * 
 * @example
 * Para ligar o dispositivo com índice 2:
 * POST /devices/toggle/2/true
 */
router.post('/devices/toggle/:deviceIndex/:state', async (req, res) => {
  try {
    // Converte o índice do dispositivo para um número inteiro.
    const deviceIndex = parseInt(req.params.deviceIndex);

    // Converte o estado do dispositivo para um valor booleano.
    const state = req.params.state.toLowerCase() === 'true';

    // Obtém a lista de IDs de dispositivos.
    const deviceIds = Object.keys(devices);

    // Obtém o ID do dispositivo com base no índice fornecido.
    const deviceId = deviceIds[deviceIndex - 1]; // Subtrai 1 porque o índice começa em 1.

    // Verifica se o dispositivo existe.
    if (!deviceId) {
      return res.status(404).json({ error: 'Dispositivo não encontrado' });
    }

    // Chama a função setDeviceStatus para ligar/desligar o dispositivo.
    await setDeviceStatus(state, deviceIndex - 1);

    // Retorna uma mensagem de sucesso.
    res.json({ message: `Dispositivo ${deviceIndex} ${state ? 'ligado' : 'desligado'} com sucesso` });
  } catch (error) {
    // Em caso de erro, imprime o erro no console e retorna uma mensagem de erro.
    console.error('Erro ao ligar/desligar dispositivo:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * @route GET /devices/status
 * @description Obtém o status de todos os dispositivos.
 * @returns {object} - Um objeto JSON com o status de cada dispositivo.
 */
router.get('/devices/status', async (req, res) => {
  try {
    // Chama a função getDevicesStatus para obter o status de todos os dispositivos.
    const statuses = await getDevicesStatus();

    // Retorna o status dos dispositivos.
    res.json(statuses);
  } catch (error) {
    // Em caso de erro, imprime o erro no console e retorna uma mensagem de erro.
    console.error('Erro ao obter o status dos dispositivos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * @route GET /devices/:id/status
 * @description Obtém o status de um dispositivo específico.
 * @param {string} id - O ID do dispositivo.
 * @returns {object} - Um objeto JSON com o status do dispositivo.
 */
router.get('/devices/:id/status', async (req, res) => {
  try {
    // Obtém o ID do dispositivo da URL.
    const deviceId = req.params.id;

    // Chama a função getDeviceStatus para obter o status do dispositivo.
    const status = await getDeviceStatus(deviceId);

    // Retorna o status do dispositivo.
    res.json(status);
  } catch (error) {
    // Em caso de erro, imprime o erro no console e retorna uma mensagem de erro.
    console.error('Erro ao obter o status do dispositivo:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * @route GET /devices
 * @description Obtém informações de todos os dispositivos.
 * @returns {object} - Um objeto JSON com as informações de cada dispositivo.
 */
router.get('/devices', async (req, res) => {
  try {
    // Chama a função getAllDevices para obter as informações de todos os dispositivos.
    const devices = await getAllDevices();

    // Retorna as informações dos dispositivos.
    res.json(devices);
  } catch (error) {
    // Em caso de erro, imprime o erro no console e retorna uma mensagem de erro.
    console.error('Erro ao obter a lista de dispositivos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

export default router;
