function UserRepository() {
}

UserRepository.prototype.isValid = function (user_key) {
    return true;
}

module.exports = UserRepository;
