const Time = require(__dirname + '/../util/time.js');

class State {
    constructor(user_key, token, problem_id, num_of_elevators) {
        this.user_key = user_key;
        this.token = token;
        this.created_time = Time.getCurrentMillisec();
        this.problem_id = problem_id;
        this.timestamp = 0;
        this.elevators = this._createElevators(num_of_elevators);
    }

    getElapsedTime() {
        return 0;
    }
    
    isEnd() {
        return false;
    }

    _createElevators(num_of_elevators) {
        return null;
    }
}

module.exports = State;
