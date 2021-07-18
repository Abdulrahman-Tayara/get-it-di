"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContainerFactory = void 0;
const Container_1 = require("./Container");
class ContainerFactory {
    static create() {
        return new Container_1.Container();
    }
}
exports.ContainerFactory = ContainerFactory;
