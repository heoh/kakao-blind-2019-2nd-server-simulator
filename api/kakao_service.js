const Time = require(__dirname + '/../util/time.js');
const TokenGenerator = require(__dirname + '/../util/token_generator.js');
const UserRepository = require(__dirname + '/../repository/user_repository.js');
const StateRepository = require(__dirname + '/../repository/state_repository.js');
const ProblemRepository = require(__dirname + '/../repository/problem_repository.js');
const State = require(__dirname + '/../model/state.js');

const MIN_TOKEN_GENERATION_INTERVAL = 10 * Time.SEC_TO_MILLISEC;
const TOKEN_EXPIRATION_TIME = 10 * Time.MIN_TO_MILLISEC;

const MIN_NUM_OF_ELEVATORS = 1;
const MAX_NUM_OF_ELEVATORS = 4;

function response(status, body) {
    const res = {
        'status': status,
        'body': body
    };
    return res;
}

class KakaoService {
    constructor() {
        this._user_repository = new UserRepository();
        this._state_repository = new StateRepository();
        this._problem_repository = new ProblemRepository();
    }

    start(user_key, problem_id, num_of_elevators) {
        if (!this._user_repository.isValid(user_key)) {
            return response(403, null);
        }
        if (this._state_repository.hasUserKey(user_key)) {
            const state = this._state_repository.getByUserKey(user_key);
            if (state.getElapsedTime() < MIN_TOKEN_GENERATION_INTERVAL) {
                return response(405, null);
            }
        }
        if (!this._problem_repository.hasProblemId(problem_id)) {
            return response(405, null);
        }
        if ((num_of_elevators < MIN_NUM_OF_ELEVATORS) ||
                (num_of_elevators > MAX_NUM_OF_ELEVATORS)) {
            return response(405, null);
        }
    
        if (this._state_repository.hasUserKey(user_key)) {
            const oldState = this._state_repository.getByUserKey(user_key);
            this._state_repository.remove(oldState);
        }
    
        const token = this._createUniqueToken();
        const state = new State(user_key, token, problem_id, num_of_elevators);
        this._state_repository.add(state);
    
        const body = {
            'token': state.token,
            'timestamp': state.timestamp,
            'elevators': state.elevators,
            'is_end': state.isEnd()
        };
        return response(200, body);
    }

    onCalls(token) {
        return response(200, null);
    }

    action(token, action) {
        return response(200, null);
    }
    
    _createUniqueToken() {
        const token_generator = new TokenGenerator();
        let token = token_generator.generate();
        while (this._state_repository.hasToken(token)) {
            token = token_generator.generate();
        }
        return token;
    }
}

module.exports = KakaoService;
