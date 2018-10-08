const PROBLEM_PATHS = [
    __dirname + '/../problems/problem_0.json'
];

class ProblemRepository {
    constructor() {
        this._problems = {};
        for (const i in PROBLEM_PATHS) {
            this.loadProblem(require(PROBLEM_PATHS[i]));
        }
    }

    loadProblem(problem) {
        problem.additional_calls = this._createAdditionalCalls(problem);
        this._problems[problem.id] = problem;
    }

    hasProblemId(problem_id) {
        return this._problems.hasOwnProperty(problem_id);
    }

    get(problem_id) {
        return this._problems[problem_id];
    }

    _createAdditionalCalls(problem) {
        const additional_calls = [];

        const calls = problem.calls;
        for (const i in calls) {
            const call = calls[i];
            const timestamp = call.timestamp;

            if (!additional_calls[timestamp]) {
                additional_calls[timestamp] = [];
            }

            additional_calls[timestamp].push(call);
        }

        return additional_calls;
    }
}

module.exports = ProblemRepository;
