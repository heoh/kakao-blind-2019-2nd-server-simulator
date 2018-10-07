class Time {
    static get MIN_TO_SEC() { return 60; }
    static get SEC_TO_MILLISEC() { return 1000; }
    static get MIN_TO_MILLISEC() { return Time.MIN_TO_SEC * Time.SEC_TO_MILLISEC; }

    static getCurrentMillisec() {
        return (new Date()).getTime();
    }
}

module.exports = Time;
