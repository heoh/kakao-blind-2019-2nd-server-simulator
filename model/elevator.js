const _max_floor = new WeakMap();
const _max_passengers = new WeakMap();

class Elevator {
    constructor(id, max_passengers, max_floor) {
        this.id = id;
        this.floor = 1;
        this.passengers = [];
        this.status = "STOPPED";
        this._max_floor = max_floor;
        this._max_passengers = max_passengers;
    }

    get _max_floor() { return _max_floor.get(this); }
    set _max_floor(value) { return _max_floor.set(this, value); }
    get _max_passengers() { return _max_passengers.get(this); }
    set _max_passengers(value) { return _max_passengers.set(this, value); }
}

module.exports = Elevator;
