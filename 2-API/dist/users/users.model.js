"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users = [
    {
        name: 'Luidi',
        email: 'luidi@email.com'
    },
    {
        name: 'Matheus',
        email: 'matheus@email.com'
    }
];
class User {
    static findAll() {
        return Promise.resolve(users);
    }
}
exports.User = User;
