class ProblemRepository {
    constructor() {
        this._problems = {};
        this._problems[0] = require(__dirname + '/../problems/problem_0.json');
    }

    hasProblemId(problem_id) {
        return this._problems.hasOwnProperty(problem_id);
    }
}

module.exports = ProblemRepository;
