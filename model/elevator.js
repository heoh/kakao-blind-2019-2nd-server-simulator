class Elevator {
    constructor(id, max_passengers, max_floor) {
        this.id = id;
        this.floor = 1;
        this.passengers = [];
        this.status = "STOPPED";
        this.max_floor = max_floor;
        this.max_passengers = max_passengers;
    }

    isExecutable(calls, command) {
        return false;
    }

    updateCalls(calls, command) {

    }

    execute(calls, command) {
        
    }
}

module.exports = Elevator;
