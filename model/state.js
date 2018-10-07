function State(user_key, token, problem_id, num_of_elevators) {
    this.user_key = user_key;
    this.token = token;
    this.created_time = Time.getCurrentMillisec();
    this.problem_id = problem_id;
    this.timestamp = 0;
    this.elevators = createElevators(num_of_elevators);
}

const createElevators = function (num_of_elevators) {
    return null;
}

State.prototype.getElapsedTime = function () {
    return 0;
}

State.prototype.isEnd = function () {
    return false;
}

module.exports = State;
