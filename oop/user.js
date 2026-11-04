const bcrypt = require("bcryptjs");

class User {
    #passwordHash;

    constructor(name, email, passwordHash) {
        this.name = name;
        this.email = email;
        this.#passwordHash = passwordHash;
    }

    async verifyPassword(password) {
        return await bcrypt.compare(password, this.#passwordHash);
    }

    displayDetails() {
        return {
            name: this.name,
            email: this.email
        };
    }
}

module.exports = User;