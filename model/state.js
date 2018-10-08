const Time = require(__dirname + '/../util/time.js');
const Objects = require(__dirname + '/../util/objects.js');
const Elevator = require(__dirname + '/elevator.js');
const ProblemRepository = require(__dirname + '/../repository/problem_repository.js');

const problem_repository = new ProblemRepository();

class State {
    constructor(user_key, token, problem_id, num_of_elevators) {
        this.user_key = user_key;
        this.token = token;
        this.created_time = Time.getCurrentMillisec();
        this.problem_id = problem_id;
        this.timestamp = 0;
        this.elevators = this._createElevators(num_of_elevators);
        this.calls = [];
        this.ended_calls = 0;

        this._updateCalls();
    }

    getElapsedTime() {
        return Time.getCurrentMillisec() - this.created_time;
    }
    
    isEnd() {
        const problem = this._getProblem();
        return (this.ended_calls == problem.calls.length);
    }

    update(action) {
        if (!this._isValidAction(action)) {
            return false;
        }

        this._doAction(action);
        this.timestamp += 1;
        this._updateCalls();
        return true;
    }

    clone() {
        return Objects.clone(this);
    }

    _setPropertiesAll(state) {
        for (const key in state) {
            this[key] = state[key];
        }
    }

    _getProblem() {
        return problem_repository.get(this.problem_id);
    }

    _createElevators(num_of_elevators) {
        const problem = this._getProblem();

        const elevators = [];
        for (let i = 0; i < num_of_elevators; i++) {
            elevators.push(new Elevator(i, problem.max_passengers, problem.max_floor));
        }
        return elevators;
    }

    _isValidAction(action) {
        try {
            const commands = action.commands;
            if (!this._isValidElevatorIds(commands)) {
                return false;
            }
            if (!this._isValidCommands(commands)) {
                return false;
            }

            return true;
        }
        catch (e) {
            return false;
        }
    }

    _isValidElevatorIds(commands) {
        try {
            const num_of_elevators = this.elevators.length;
            if (commands.length != num_of_elevators) {
                return false;
            }
    
            const exists = [];
            for (let i = 0; i < commands.length; i++) {
                const command = commands[i];
                const id = command.elevator_id;
    
                if ((id < 0) || (id >= num_of_elevators)) {
                    return false;
                }
                if (exists[id]) {
                    return false;
                }
                exists[id] = true;
            }

            return true;
        }
        catch (e) {
            return false;
        }
    }

    _isValidCommands(commands) {
        const calls = Objects.clone(this.calls);

        for (let i = 0; i < commands.length; i++) {
            const command = commands[i];
            const command_type = command.command;
            const elevator = this.elevators[command.elevator_id];

            if (!elevator.isExecutable(calls, command)) {
                return false;
            }
            if ((command_type == "ENTER") || (command_type == "EXIT")) {
                elevator.updateCalls(calls, command, false);
            }
        }

        return true;
    }

    _doAction(action) {
        const commands = action.commands;
        for (let i = 0; i < commands.length; i++) {
            const command = commands[i];
            const elevator = this.elevators[command.elevator_id];

            elevator.execute(this.calls, command);
        }
    }

    _updateCalls() {
        const problem = this._getProblem();

        console.log(problem);
        const new_calls = problem.additional_calls[this.timestamp];
        if (new_calls) {
            for (const i in new_calls) {
                const new_call = new_calls[i];
                this.calls.push(new_call);
            }
        }
    }
}

module.exports = State;
