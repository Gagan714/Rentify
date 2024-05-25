const CryptoJS = require('crypto-js');

const srtk = 'mysecretkey';

function decrypt(ciphertext) {

  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, srtk);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
  

    if (!originalText) {
      throw new Error('Decryption failed');
    }
    return originalText;
  } catch (error) {
  }
}

module.exports = { decrypt };
