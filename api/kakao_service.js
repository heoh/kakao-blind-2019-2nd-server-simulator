function KakaoService() {
}

KakaoService.prototype.start = function (user_key, problem_id, num_of_elevators) {
    return response(200, null);
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

module.exports = KakaoService;
