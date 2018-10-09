const RandomSelector = require(__dirname + '/random_selector.js');

// ref: http://yang-wei.github.io/blog/2015/09/14/initialize-an-array-with-fix-length-in-javascript/
function createArray(length, init_value) {
    return Array.from(new Array(length), () => { return init_value; });
}

const TYPE_INCOMING = 0;
const TYPE_OUTGOING = 1;
const TYPE_INTERFLOOR = 2;
const NUM_OF_TYPES = 3;

class TrafficGenerator {
    constructor() {
        this._enterance = 1;
        this._floors = [];
        this._traffic_weights = createArray(NUM_OF_TYPES, 0);
        this._traffic_selector = null;
        this._floor_selector = null;
    }

    setEnterance(floor) {
        this._enterance = floor;
    }

    setFloors(floors) {
        this._floors = floors;
    }

    setIncomingTraffic(weight) {
        this._traffic_weights[TYPE_INCOMING] = weight;
        this._updateTrafficSelector();
    }

    setOutgoingTraffic(weight) {
        this._traffic_weights[TYPE_OUTGOING] = weight;
        this._updateTrafficSelector();
    }

    setInterfloorTraffic(weight) {
        this._traffic_weights[TYPE_INTERFLOOR] = weight;
        this._updateTrafficSelector();
    }

    generate(id, timestamp) {
        const type = this._getRandomType();
        
        let start;
        let end;
        if (type == TYPE_INCOMING) {
            start = this._enterance;
            end = this._getRandomFloor();
        }
        else if (type == TYPE_OUTGOING) {
            start = this._getRandomFloor();
            end = this._enterance;
        }
        else if (type == TYPE_INTERFLOOR) {
            start = this._getRandomFloor();
            end = this._getRandomFloor();
            while (end == start) {
                end = this._getRandomFloor();
            }
        }

        const call = {
            'id': id,
            'timestamp': timestamp,
            'start': start,
            'end': end
        }
        return call;
    }

    _updateTrafficSelector() {
        this._traffic_selector = new RandomSelector();

        for (const type in this._traffic_weights) {
            const weight = this._traffic_weights[type];
            this._traffic_selector.add(type, weight);
        }
    }

    _updateFloorSelector() {
        this._floor_selector = new RandomSelector();

        for (const i in this._floors) {
            const floor = this._floors[i];
            this._floor_selector.add(floor, 1);
        }
    }

    _getRandomType() {
        return this._traffic_selector.get();
    }

    _getRandomFloor() {
        return this._floor_selector.get();
    }
}

module.exports = TrafficGenerator;
