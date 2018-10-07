class Elevator {
    constructor(id, max_passengers, max_floor) {
        this.id = id;
        this.floor = 1;
        this.passengers = [];
        this.status = "STOPPED";
        this._max_floor = max_floor;
        this._max_passengers = max_passengers;
    }
}

module.exports = Elevator;
