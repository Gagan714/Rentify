import CryptoJS from 'crypto-js';

const secretKey = 'thisismysecretkey';

export function encrypt(text) {
  console.log('Input text:', text);

  if (typeof text !== 'string') {
    text = JSON.stringify(text);
    console.log('Converted text to string:', text);
  }

  const encrypted = CryptoJS.AES.encrypt(text, secretKey).toString();
  console.log('Encrypted text:', encrypted);

  return encrypted;
}
