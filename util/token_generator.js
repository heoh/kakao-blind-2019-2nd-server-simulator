const CHARSET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LENGTH = 64;

function TokenGenerator() {
}

TokenGenerator.prototype.generate = function () {
    let token = "";
    for (let i = 0; i < LENGTH; i++) {
        const idx = Math.floor(Math.random() * CHARSET.length);
        token += CHARSET[idx];
    }
    return token;
}

module.exports = TokenGenerator;
