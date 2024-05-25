const CryptoJS = require('crypto-js');

const secretKey = 'thisismysecretkey';

function decrypt(ciphertext) {
  console.log(ciphertext)

  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    console.log(originalText)

    if (!originalText) {
      throw new Error('Decryption failed');
    }
    return originalText;
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Invalid encrypted text');
  }
}

module.exports = { decrypt };
