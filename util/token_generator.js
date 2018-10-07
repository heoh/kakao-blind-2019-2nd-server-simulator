const CHARSET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LENGTH = 64;

class TokenGenerator {
    generate() {
        let token = "";
        for (let i = 0; i < LENGTH; i++) {
            const idx = Math.floor(Math.random() * CHARSET.length);
            token += CHARSET[idx];
        }
        return token;
    }
}

module.exports = TokenGenerator;
