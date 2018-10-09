class GaussianRandomInt {
    constructor(flexible_int={ min, max, mean, variance }) {
        this.min = flexible_int.min;
        this.max = flexible_int.max;
        this.mean = flexible_int.mean;
        this.variance = flexible_int.variance;
    }

    get() {
        return 0;
    }
}

module.exports = GaussianRandomInt;
