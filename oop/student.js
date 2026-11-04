const User = require("./user");

class Student extends User {
    constructor(name, email, passwordHash, studentId) {
        super(name, email, passwordHash);
        this.studentId = studentId;
    }

    showDashboard() {
        console.log("Welcome Student: " + this.name);
        console.log("Student ID: " + this.studentId);
    }
}

module.exports = Student;