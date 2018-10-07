class StateRepository {
    hasUserKey(user_key) {
        return false;
    }
    
    getByUserKey(user_key) {
        return null;
    }
    
    hasToken(token) {
        return false;
    }
    
    add(state) {
        return false;
    }
    
    remove(state) {
        return false;
    }
}

module.exports = StateRepository;
