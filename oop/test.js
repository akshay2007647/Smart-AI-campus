const bcrypt = require("bcryptjs");

const User = require("./user");
const Student = require("./student");
const Admin = require("./admin");
const { AttendanceService } = require("./CampusService");

async function runTest() {

    console.log("===== SMART AI CAMPUS OOP TEST =====");

    // 1. ENCAPSULATION
    const passwordHash = await bcrypt.hash("password123", 10);

    const user = new User(
        "Akshay",
        "akshay@rec.edu",
        passwordHash
    );

    console.log("\n1. ENCAPSULATION:");

    const result = await user.verifyPassword("password123");

    console.log("Password verification:", result);

    // 2. INHERITANCE
    const student = new Student(
        "Akshay",
        "akshay@rec.edu",
        passwordHash,
        "REC101"
    );

    console.log("\n2. INHERITANCE:");

    student.showDashboard();

    // 3. POLYMORPHISM
    const admin = new Admin(
        "Admin",
        "admin@rec.edu",
        passwordHash,
        "ADM01"
    );

    console.log("\n3. POLYMORPHISM:");

    admin.showDashboard();

    // 4. ABSTRACTION
    const attendance = new AttendanceService();

    console.log("\n4. ABSTRACTION:");

    attendance.execute();

    console.log("\n===== OOP TEST COMPLETED =====");
}

runTest().catch(error => {
    console.error("OOP Test Error:", error);
});