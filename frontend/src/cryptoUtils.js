import CryptoJS from 'crypto-js';

const secretKey = 'thisismysecretkey';

export function encrypt(text) {

  if (typeof text !== 'string') {
    text = JSON.stringify(text);
  }

  const encrypted = CryptoJS.AES.encrypt(text, secretKey).toString();


  return encrypted;
}
