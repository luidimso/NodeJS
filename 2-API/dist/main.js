"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const server = new server_1.Server();
server.bootstrap().then(server => {
    console.log("Tá ouvindo");
}).catch(error => {
    console.log("Deu ruim no servidor");
    console.error(error);
    process.exit(1);
});
