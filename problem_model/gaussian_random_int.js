const gaussian = require('gaussian');

class GaussianRandomInt {
    constructor({ min, max, mean, variance }) {
        this.min = min;
        this.max = max;
        this._mean = mean;
        this._variance = variance;
        this._distribution = null;
        this._updateDistribution();
    }

    get mean() {
        return this._mean;
    }

    set mean(value) {
        this._variance = value;
        this._updateDistribution();
    }

    get variance() {
        return this._variance;
    }

    set variance(value) {
        this._variance = value;
        this._updateDistribution();
    }

    get() {
        if (this.variance == 0) {
            return this.mean;
        }

        while (true) {
            const gaussianRandom = this._distribution.ppf(Math.random());
            const randomInt = Math.round(gaussianRandom);
            if ((randomInt >= this.min) && (randomInt <= this.max)) {
                return randomInt;
            }
        }
    }

    _updateDistribution() {
        if (this._variance != 0) {
            this._distribution = gaussian(this._mean, this._variance);
        }
        else {
            this._distribution = null;
        }
    }
}

module.exports = GaussianRandomInt;
