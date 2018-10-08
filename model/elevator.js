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

function getCallById(calls, id) {
    const n = calls.length;
    for (let i = 0; i < n; i++) {
        const call = calls[i];
        if (call.id == id) {
            return call;
        }
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
        this.floor = 1;
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

    }

    execute(calls, command) {
        
    }

    _nextStatus(command_type) {
        return STATUS_TABLE[this.status][command_type];
    }
}

module.exports = Elevator;
