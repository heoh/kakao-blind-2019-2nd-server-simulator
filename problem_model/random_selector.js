function randomBetween(min, max) {
    return (Math.random() * (max - min)) + min;
}

class RandomSelector {
    constructor() {
        this._items = [];
        this._total_weight = 0.;
    }

    add(item, weight) {
        this._items.push({ 'item': item, 'weight': weight });
        this._total_weight += weight;
    }

    get() {
        const p = randomBetween(0, this._total_weight);

        let cdf = 0.;
        for (const i in this._items) {
            const item = this._items[i].item;
            const weight = this._items[i].weight;
            cdf += weight;

            if (p <= cdf) {
                return item;
            }
        }

        return this._items[0];
    }
}

module.exports = RandomSelector;
