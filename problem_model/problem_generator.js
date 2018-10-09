const RandomSelector = require(__dirname + '/random_selector.js');
const GaussianRandomInt = require(__dirname + '/gaussian_random_int.js');

class ProblemGenerator {
    constructor() {
        this._problem_id = 0;
        this._max_floor = 0;
        this._max_passengers = 0;
        this._total_calls = 0;
        this._traffic_generators = [];
        this._call_batch_size = {};
        this._call_batch_interval = {};
    }

    setProblemId(id) {
        this._problem_id = id;
    }

    setMaxFloor(floor) {
        this._max_floor = floor;
    }

    setMaxPassengers(n) {
        this._max_passengers = n;
    }

    setTotalCalls(n) {
        this._total_calls = n;
    }

    addTrafficGenerator(traffic_gen, weight) {
        this._traffic_generators.push({ 'traffic_gen': traffic_gen, 'weight': weight });
    }

    setCallBatchSize(flexible_int={ min, max, mean, variance }) {
        this._call_batch_size = flexible_int;
    }

    setCallBatchInterval(flexible_int={ min, max, mean, variance }) {
        this._call_batch_interval = flexible_int;
    }

    generate() {
        const problem = {
            'id': this._problem_id,
            'max_passengers': this._max_passengers,
            'max_floor': this._max_floor,
            'calls': this._generateCalls(this._total_calls)
        };
        return problem;
    }

    _generateCalls(n) {
        const traffic_gens = this._createTrafficGeneratorSelector();
        const random_size = new GaussianRandomInt(this._call_batch_size);
        const random_interval = new GaussianRandomInt(this._call_batch_interval);

        const calls = [];
        let timestamp = 0;
        while (calls.length < n) {
            let batch_size = random_size.get();
            if (calls.length + batch_size > n) {
                batch_size = n - calls.length;
            }

            for (let i = 0; i < batch_size; i++) {
                const generator = traffic_gens.get();
                const id = calls.length;
                const call = generator.generate(id, timestamp);

                calls.push(call);
            }

            timestamp += random_interval.get();
        }

        return calls;
    }

    _createTrafficGeneratorSelector() {
        const selector = new RandomSelector();

        for (const i in this._traffic_generators) {
            const data = this._traffic_generators[i];
            selector.add(data.traffic_gen, data.weight);
        }

        return selector;
    }
}

module.exports = ProblemGenerator;
