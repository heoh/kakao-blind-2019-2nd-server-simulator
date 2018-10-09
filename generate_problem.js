const fs = require('fs');
const ProblemGenerator = require(__dirname + '/problem_model/problem_generator.js');
const TrafficGenerator = require(__dirname + '/problem_model/traffic_generator.js');

function generateApeachMansion() {
    const generator = new ProblemGenerator();
    generator.setProblemId(0);
    generator.setMaxFloor(5);
    generator.setMaxPassengers(8);
    generator.setTotalCalls(6);

    const resident_traffic = new TrafficGenerator();
    resident_traffic.setEnterance(1);
    resident_traffic.setFloors([ 2, 3, 4, 5 ]);
    resident_traffic.setIncomingTraffic(0.5);
    resident_traffic.setOutgoingTraffic(0.4);
    resident_traffic.setInterfloorTraffic(0.1);

    generator.addTrafficGenerator(resident_traffic, 1);
    generator.setCallBatchSize({ min:1, max:1, mean:1, variance:0 });
    generator.setCallBatchInterval({ min:1, max:1, mean:1, variance:0 });

    return generator.generate();
}

function generateJayGBuilding() {
    const generator = new ProblemGenerator();
    generator.setProblemId(1);
    generator.setMaxFloor(25);
    generator.setMaxPassengers(8);
    generator.setTotalCalls(200);

    const employee_traffic = new TrafficGenerator();
    const employee_floors = [ 2, 3, 4, 5, 6, 7, 8, 9, 10,
            11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
            21, 22, 23, 24 ,25 ];
    employee_traffic.setEnterance(1);
    employee_traffic.setFloors(employee_floors);
    employee_traffic.setIncomingTraffic(0.5);
    employee_traffic.setOutgoingTraffic(0.5);

    generator.addTrafficGenerator(employee_traffic, 1);
    generator.setCallBatchSize({ min:1, max:10, mean:1.2, variance:8 });
    generator.setCallBatchInterval({ min:1, max:20, mean:7, variance:10 });

    return generator.generate();
}

function generateRyanTower() {
    const generator = new ProblemGenerator();
    generator.setProblemId(2);
    generator.setMaxFloor(25);
    generator.setMaxPassengers(8);
    generator.setTotalCalls(500);

    const customer_traffic = new TrafficGenerator();
    customer_traffic.setEnterance(1);
    customer_traffic.setFloors([ 13 ]);
    customer_traffic.setIncomingTraffic(0.5);
    customer_traffic.setOutgoingTraffic(0.5);

    const employee_traffic = new TrafficGenerator();
    employee_traffic.setEnterance(1);
    employee_traffic.setFloors([ 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]);
    employee_traffic.setIncomingTraffic(0.5);
    employee_traffic.setOutgoingTraffic(0.5);

    const kakao_traffic = new TrafficGenerator();
    kakao_traffic.setEnterance(1);
    kakao_traffic.setFloors([ 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25 ]);
    kakao_traffic.setIncomingTraffic(0.4);
    kakao_traffic.setOutgoingTraffic(0.4);
    kakao_traffic.setInterfloorTraffic(0.2);

    generator.addTrafficGenerator(customer_traffic, 0.4);
    generator.addTrafficGenerator(employee_traffic, 0.3);
    generator.addTrafficGenerator(kakao_traffic, 0.3);
    generator.setCallBatchSize({ min:1, max:10, mean:1.2, variance:8 });
    generator.setCallBatchInterval({ min:1, max:20, mean:7, variance:10 });

    return generator.generate();
}

function writeJsonToFile(filename, obj) {
    fs.writeFileSync(filename, JSON.stringify(obj, null, 4)); 
}

function main() {
    writeJsonToFile("problem_0.json", generateApeachMansion());
    writeJsonToFile("problem_1.json", generateJayGBuilding());
    writeJsonToFile("problem_2.json", generateRyanTower());
}

main();
