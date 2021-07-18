"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
class Container {
    constructor() {
        this._registries = new Map();
    }
    register(token, value) {
        this._registries.set(token, {
            singleton: false,
            initializer: value,
        });
    }
    registerLazySingleton(token, value) {
        this._registries.set(token, {
            singleton: true,
            initializer: value,
        });
    }
    registerSingleton(token, value) {
        this._registries.set(token, {
            singleton: true,
            initializer: () => value,
            value: value,
        });
    }
    resolve(token) {
        const registry = this._registries.get(token);
        if (!registry) {
            throw new Error(`Type ${token} is unregistered`);
        }
        if (registry.singleton) {
            if (registry.value)
                return registry.value;
            registry.value = registry.initializer(this);
            this._registries.set(token, registry);
            return registry.value;
        }
        return registry.initializer(this);
    }
}
exports.Container = Container;
