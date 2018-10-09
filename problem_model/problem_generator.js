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
        const calls = [];
        return calls;
    }
}

module.exports = ProblemGenerator;
