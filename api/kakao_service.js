const Time = require(__dirname + '/../util/time.js');
const UserRepository = require(__dirname + '/../repository/user_repository.js');
const StateRepository = require(__dirname + '/../repository/state_repository.js');
const ProblemRepository = require(__dirname + '/../repository/problem_repository.js');
const State = require(__dirname + '/../model/state.js');

const MIN_TOKEN_GENERATION_INTERVAL = 10 * Time.SEC_TO_MILLISEC;
const TOKEN_EXPIRATION_TIME = 10 * Time.MIN_TO_MILLISEC;

const MIN_NUM_OF_ELEVATORS = 1;
const MAX_NUM_OF_ELEVATORS = 4;

const user_repository = new UserRepository();
const state_repository = new StateRepository();
const problem_repository = new ProblemRepository();

function KakaoService() {
}

KakaoService.prototype.start = function (user_key, problem_id, num_of_elevators) {
    if (!user_repository.isValid(user_key)) {
        return response(403, null);
    }
    if (state_repository.hasUserKey(user_key)) {
        const state = state_repository.getByUserKey(user_key);
        if (state.getElapsedTime() < MIN_TOKEN_GENERATION_INTERVAL) {
            return response(405, null);
        }
    }
    if (!problem_repository.hasProblemId(problem_id)) {
        return response(405, null);
    }
    if ((num_of_elevators < MIN_NUM_OF_ELEVATORS) ||
            (num_of_elevators > MAX_NUM_OF_ELEVATORS)) {
        return response(405, null);
    }

    const oldState = state_repository.getByUserKey(user_key);
    state_repository.remove(oldState);

    const token = createUniqueToken();
    const state = new State(user_key, token, problem_id, num_of_elevators);
    state_repository.add(state);

    const body = {
        'token': state.token,
        'timestamp': state.timestamp,
        'elevators': state.elevators,
        'is_end': state.isEnd()
    };
    return response(200, body);
}

KakaoService.prototype.onCalls = function (token) {
    return response(200, null);
}

KakaoService.prototype.action = function (token, action) {
    return response(200, null);
}

const response = function (status, body) {
    const res = {
        'status': status,
        'body': body
    };
    return res;
}

const createUniqueToken = function () {
    return null;
}

module.exports = KakaoService;
