class CampusService {
    constructor(serviceName) {
        if (new.target === CampusService) {
            throw new Error("Cannot create an abstract class directly");
        }

        this.serviceName = serviceName;
    }

    execute() {
        throw new Error("execute() must be implemented");
    }
}

class AttendanceService extends CampusService {
    constructor() {
        super("Attendance Service");
    }

    execute() {
        console.log("Processing student attendance...");
    }
}

module.exports = { CampusService, AttendanceService };