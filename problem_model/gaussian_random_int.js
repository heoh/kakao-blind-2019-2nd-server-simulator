const gaussian = require('gaussian');

class GaussianRandomInt {
    constructor(flexible_int={ min, max, mean, variance }) {
        this.min = flexible_int.min;
        this.max = flexible_int.max;
        this._distribution = gaussian(mean, variance);
    }

    get mean() { return this._distribution.mean; }
    set mean(value) { this._distribution.mean = value; }
    get variance() { return this._distribution.variance; }
    set variance(value) { this._distribution.variance = value; }

    get() {
        while (true) {
            const gaussianRandom = this._distribution.ppf(Math.random());
            const randomInt = Math.round(gaussianRandom);
            if ((randomInt >= this.min) && (randomInt <= this.max)) {
                return randomInt;
            }
        }
    }
}

module.exports = GaussianRandomInt;
