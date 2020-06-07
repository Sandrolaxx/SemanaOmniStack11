const crypto = require('crypto');

module.exports = function criaId() {
    return crypto.randomBytes(4).toString("HEX");
}