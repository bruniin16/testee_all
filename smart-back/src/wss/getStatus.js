import devices from '../config/deviceConfig.js';
import 'dotenv/config';
import { client } from "../client/clientConfig.js";
import { checkAndUpdateToken } from '../token/tokenManager.js';

const token = await checkAndUpdateToken(client);
client.at = token.accessToken;


async function getStatus() {
  client.device.getThingStatus({
    type: 1,
    id:"1002018c47",
    params:"switch",
    headers: {
      Authorization: `Bearer ${token}` }
    })
}

getStatus()
