import CryptoJS from 'crypto-js';

const srtk = 'mysecretkey';

export function encrypt(text) {

  if (typeof text !== 'string') {
    text = JSON.stringify(text);
  }

  const encrypted = CryptoJS.AES.encrypt(text, srtk).toString();


  return encrypted;
}
