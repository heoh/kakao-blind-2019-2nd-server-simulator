const fs = require('fs');

function createProblem2() {
    const problem = {
        'id': 2,
        'max_passengers': 8,
        'max_floor': 25,
        'calls': []
    }
    const calls = problem.calls;

    const NUM_OF_CALLS = 500;
    let timestamp = 0;
    for (let i = 0; i < NUM_OF_CALLS; i++) {
        timestamp += randomInt(0, 2);
        const call = {
            'id': i,
            'timestamp': timestamp,
            'start': 0,
            'end': 0
        }

        const p = random();
        if (p < 0.3) {  // 입주 회사 직원
            const floor = randomInt(2, 12);

            if (random() < 0.5) {   // 출근
                call.start = 1;
                call.end = floor;
            }
            else {  // 퇴근
                call.start = floor;
                call.end = 1;
            }
        }
        else if (p < 0.6) { // 카카오 직원
            const floor = randomInt(13, 25);

            const p2 = random();
            if (p2 < 0.3) {   // 출근
                call.start = 1;
                call.end = floor;
            }
            else if (p2 < 0.6) {    // 퇴근
                call.start = floor;
                call.end = 1;
            }
            else {  // 타부서 방문
                let target = randomInt(13, 25);
                while (target == floor) {
                    target = randomInt(13, 25);
                }

                call.start = floor;
                call.end = target;
            }
        }
        else {  // 상점 방문 고객
            if (random() < 0.5) {   // 출근
                call.start = 1;
                call.end = 13;
            }
            else {  // 퇴근
                call.start = 13;
                call.end = 1;
            }
        }

        calls.push(call);
    }

    return problem;
}

function random() {
    return Math.random();
}

function randomInt(start, end) {
    return Math.floor(Math.random() * (end - start + 1)) + start;
}

function writeJsonToFile(filename, obj) {
    fs.writeFileSync(filename, JSON.stringify(obj, null, 4)); 
}

function main() {
    writeJsonToFile("problem_2.json", createProblem2());
}

main();
