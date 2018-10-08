const Objects = require(__dirname + '/../util/objects.js');

const STATUS_STOPPED = "STOPPED";
const STATUS_OPENED = "OPENED";
const STATUS_UPWARD = "UPWARD";
const STATUS_DOWNWARD = "DOWNWARD";

const COMMAND_STOP = "STOP";
const COMMAND_UP = "UP";
const COMMAND_DOWN = "DOWN";
const COMMAND_OPEN = "OPEN";
const COMMAND_CLOSE = "CLOSE";
const COMMAND_ENTER = "ENTER";
const COMMAND_EXIT = "EXIT";

const STATUS_TABLE = {};
STATUS_TABLE[STATUS_STOPPED] = {};
STATUS_TABLE[STATUS_STOPPED][COMMAND_STOP] = STATUS_STOPPED;
STATUS_TABLE[STATUS_STOPPED][COMMAND_OPEN] = STATUS_OPENED;
STATUS_TABLE[STATUS_STOPPED][COMMAND_UP] = STATUS_UPWARD;
STATUS_TABLE[STATUS_STOPPED][COMMAND_DOWN] = STATUS_DOWNWARD;
STATUS_TABLE[STATUS_OPENED] = {};
STATUS_TABLE[STATUS_OPENED][COMMAND_OPEN] = STATUS_OPENED;
STATUS_TABLE[STATUS_OPENED][COMMAND_CLOSE] = STATUS_STOPPED;
STATUS_TABLE[STATUS_OPENED][COMMAND_ENTER] = STATUS_OPENED;
STATUS_TABLE[STATUS_OPENED][COMMAND_EXIT] = STATUS_OPENED;
STATUS_TABLE[STATUS_UPWARD] = {};
STATUS_TABLE[STATUS_UPWARD][COMMAND_UP] = STATUS_UPWARD;
STATUS_TABLE[STATUS_UPWARD][COMMAND_STOP] = STATUS_STOPPED;
STATUS_TABLE[STATUS_DOWNWARD] = {};
STATUS_TABLE[STATUS_DOWNWARD][COMMAND_DOWN] = STATUS_DOWNWARD;
STATUS_TABLE[STATUS_DOWNWARD][COMMAND_STOP] = STATUS_STOPPED;

const MIN_FLOOR = 1;

function indexOfCallId(calls, call_id) {
    const n = calls.length;
    for (let i = 0; i < n; i++) {
        const call = calls[i];
        if (call.id == call_id) {
            return i;
        }
    }
    return -1;
}

function getCallById(calls, call_id) {
    const index = indexOfCallId(calls, call_id);
    if (index >= 0) {
        return calls[index];
    }
    return null;
}

function isUnique(arr) {
    try {
        const exists = [];
        const n = arr.length;
        for (let i = 0; i < n; i++) {
            const value = arr[i];
            if (exists[value]) {
                return false;
            }
            exists[value] = true;
        }

        return true;
    }
    catch (e) {
        return false;
    }
}

class Elevator {
    constructor(id, max_passengers, max_floor) {
        this.id = id;
        this.floor = MIN_FLOOR;
        this.passengers = [];
        this.status = STATUS_STOPPED;
        this.max_floor = max_floor;
        this.max_passengers = max_passengers;
    }

    isExecutable(calls, command) {
        try {
            const command_type = command.command;
            const call_ids = command.call_ids;

            if (!this._nextStatus(command_type)) {
                return false;
            }

            if (command_type == COMMAND_ENTER) {
                if (!isUnique(call_ids)) {
                    return false;
                }

                for (let i = 0; call_ids.length; i++) {
                    const id = call_ids[i];
                    const call = getCallById(calls, id);
                    if (call.start != this.floor) {
                        return false;
                    }
                }
            }
            else if (command_type == COMMAND_EXIT) {
                if (!isUnique(call_ids)) {
                    return false;
                }

                for (let i = 0; call_ids.length; i++) {
                    const id = call_ids[i];
                    if (!getCallById(this.passengers, id)) {
                        return false;
                    }
                }
            }
            
            return true;
        }
        catch (e) {
            return false;
        }
    }

    updateCalls(calls, command) {
        const command_type = command.command;
        const call_ids = command.call_ids;
        const n = call_ids.length;
        if (command_type == COMMAND_ENTER) {
            for (let i = 0; i < n; i++) {
                const id = call_ids[i];
                const index = indexOfCallId(calls, id);
                calls.splice(index, 1);
            }
        }
        else if (command_type == COMMAND_EXIT) {
            for (let i = 0; i < n; i++) {
                const id = call_ids[i];
                let call = getCallById(this.passengers, id);
                if (call.end != this.floor) {
                    call = Objects.clone(call);
                    call.start = this.floor;
                    calls.push(call);
                }
            }
        }
    }

    updatePassengers(calls, command) {
        const command_type = command.command;
        const call_ids = command.call_ids;
        const n = call_ids.length;
        if (command_type == COMMAND_ENTER) {
            for (let i = 0; i < n; i++) {
                const id = call_ids[i];
                const call = getCallById(calls, id);
                this.passengers.push(call);
            }
        }
        else if (command_type == COMMAND_EXIT) {
            for (let i = 0; i < n; i++) {
                const id = call_ids[i];
                const index = indexOfCallId(this.passengers, id);
                this.passengers.splice(index, 1);
            }
        }
    }

    execute(calls, command) {
        const command_type = command.command;
        this.status = this._nextStatus(command_type);

        if (this.status == STATUS_UPWARD) {
            const next_floor = this.floor + 1;
            if (next_floor <= this.max_floor) {
                this.floor = next_floor;
            }
        }
        else if (this.status == STATUS_DOWNWARD) {
            const next_floor = this.floor - 1;
            if (next_floor >= MIN_FLOOR) {
                this.floor = next_floor;
            }
        }

        if ((command_type == COMMAND_ENTER) || (command_type == COMMAND_EXIT)) {
            this.updateCalls(calls, command);
            this.updatePassengers(calls, command);
        }
    }

    _nextStatus(command_type) {
        return STATUS_TABLE[this.status][command_type];
    }
}

module.exports = Elevator;
