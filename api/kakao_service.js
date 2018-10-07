function KakaoService() {
    const response = function (status, body) {
        const res = {
            'status': status,
            'body': body
        };
        return res;
    }

    this.start = function (user_key, problem_id, num_of_elevators) {
        return response(200, null);
    }

    this.onCalls = function (token) {
        return response(200, null);
    }

    this.action = function (token, action) {
        return response(200, null);
    }
}

module.exports = KakaoService;
