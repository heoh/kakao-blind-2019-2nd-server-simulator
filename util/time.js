Time = {};

Time.MIN_TO_SEC = 60;
Time.SEC_TO_MILLISEC = 1000;
Time.MIN_TO_MILLISEC = Time.MIN_TO_SEC * Time.SEC_TO_MILLISEC;

Time.getCurrentMillisec = function () {
    return (new Date()).getTime();
}

module.exports = Time;
