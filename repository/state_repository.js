function StateRepository() {
}

StateRepository.prototype.hasUserKey = function (user_key) {
    return false;
}

StateRepository.prototype.getByUserKey = function (user_key) {
    return null;
}

StateRepository.prototype.hasToken = function (token) {
    return false;
}

StateRepository.prototype.add = function (state) {
    return false;
}

StateRepository.prototype.remove = function (state) {
    return false;
}

module.exports = StateRepository;
