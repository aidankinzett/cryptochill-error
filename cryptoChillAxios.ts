import axios from "axios";
import { Base64 } from "js-base64";
import crypto from "crypto";

const encodeHmac = (key: string, msg: string) =>
  crypto.createHmac("sha256", key).update(msg).digest("hex");

// create the axios instance
const cryptoChillAxios = axios.create({
  baseURL: `${process.env.CRYPTOCHILL_API_URL}/v1`,
});

cryptoChillAxios.interceptors.request.use((config) => {
  const nonce = new Date().getTime();

  const encodedPayload = JSON.stringify({
    ...config.data,
    nonce,
    request: `/v1${config.url}`,
  });
  const b64 = Base64.encode(encodedPayload);
  const signature = encodeHmac(
    process.env.CRYPTOCHILL_API_SECRET as string,
    b64
  );

  // Add your API key, encoded payload and signature to following headers
  const requestHeaders = {
    "X-CC-KEY": process.env.CRYPTOCHILL_API_KEY,
    "X-CC-PAYLOAD": b64,
    "X-CC-SIGNATURE": signature,
  };

  return { ...config, headers: { ...config.headers, ...requestHeaders } };
});

export default cryptoChillAxios;
