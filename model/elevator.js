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
        this.status = "STOPPED";
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

            if (command_type == "ENTER") {
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
            else if (command_type == "EXIT") {
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

    }
}

module.exports = Elevator;
