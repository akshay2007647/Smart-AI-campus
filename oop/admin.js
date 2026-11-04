const User = require("./user");

class Admin extends User {
    constructor(name, email, password, adminId) {
        super(name, email, password);
        this.adminId = adminId;
    }

    showDashboard() {
        console.log("Welcome Admin: " + this.name);
        console.log("Admin ID: " + this.adminId);
    }
}

module.exports = Admin;