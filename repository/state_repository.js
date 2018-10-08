class StateRepository {
    constructor() {
        this._tokens = {};
        this._states = {};
    }

    hasUserKey(user_key) {
        return this._tokens.hasOwnProperty(user_key);
    }
    
    getByUserKey(user_key) {
        const token = this._tokens[user_key];
        return this.getByToken(token);
    }
    
    hasToken(token) {
        return this._states.hasOwnProperty(token);
    }

    getByToken(token) {
        return this._states[token];
    }
    
    add(state) {
        const user_key = state.user_key;
        const token = state.token;

        if (this.hasUserKey(user_key)) return false;
        if (this.hasToken(token)) return false;

        this._tokens[user_key] = token;
        this._states[token] = state;

        return true;
    }
    
    remove(state) {
        const user_key = state.user_key;
        const token = state.token;

        if (!this.hasUserKey(user_key) && !this.hasToken(token)) {
            return false;
        }

        delete this._tokens[user_key];
        delete this._states[token];

        return true;
    }
}

module.exports = StateRepository;
